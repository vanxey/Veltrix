const pool = require('../db')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const TOKEN_EXPIRATION_HOURS = 24

/**
 * Handles user registration, creates a new user in the database, and sends a verification email.
 *
 * @param {object} req - Express request object.
 * @param {object} req.body - Request body containing user credentials.
 * @param {string} req.body.username - The desired username.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's chosen password (plain text).
 * @param {object} res - Express response object.
 * @returns {object} 201 - Success message with instructions to check email.
 * @returns {object} 400 - Error if user already exists.
 * @returns {object} 500 - Server error during registration or email sending.
 */
const register = async (req, res) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const { username, email, password } = req.body

    const existingUser = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK')
      return res.status(400).json({ error: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000)

    const userSql = `
      INSERT INTO users (username, email, password_hash, verification_token, verification_token_expires_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id, username, email
    `

    const { rows } = await client.query(userSql, [
      username,
      email,
      passwordHash,
      verificationToken,
      expiresAt
    ])

    await client.query('COMMIT')

    const frontendUrl = process.env.FRONTEND_URL
    const verifyLink = `${frontendUrl}/verify?token=${verificationToken}`

    try {
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify your Veltrix Account',
        html: `
          <h1 style="margin: 0; font-size: 32px; font-family: sans-serif;">
            Welcome to <span style="color: #126eee;">Veltrix</span>
          </h1>
          <p style="font-size: 16px; font-family: sans-serif;">
            Hi ${username}, please verify your account:
          </p>
          <a
            href="${verifyLink}"
            style="
              background-color: #126eee;
              color: #ffffff;
              padding: 14px 28px;
              text-decoration: none;
              border-radius: 10px;
              font-weight: bold;
              font-family: sans-serif;
              display: inline-block;
            "
          >
            Verify Account
          </a>
        `
      })

      if (error) {
        console.error('RESEND ERROR:', error)
      } else {
        console.log('[EMAIL SENT]', data)
      }
    } catch (emailErr) {
      console.error('RESEND UNEXPECTED ERROR:', emailErr)
    }

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.'
    })
  } catch (e) {
    console.error('REGISTER ERROR:', e)
    await client.query('ROLLBACK')
    res.status(500).json({ error: 'Server error during registration' })
  } finally {
    client.release()
  }
}

/**
 * Verifies a user's email address using a token sent in the registration email.
 *
 * @param {object} req - Express request object.
 * @param {object} req.body - Request body containing the verification token.
 * @param {string} req.body.token - The unique verification token.
 * @param {object} res - Express response object.
 * @returns {object} 200 - Success message.
 * @returns {object} 400 - Error for invalid or expired token.
 * @returns {object} 500 - Server error during verification.
 */
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body
    if (!token) return res.status(400).json({ error: 'Missing token' })

    const result = await pool.query(
      `
      UPDATE users
      SET is_verified = TRUE,
          verification_token = NULL,
          verification_token_expires_at = NULL
      WHERE verification_token = $1
        AND verification_token_expires_at > NOW()
      RETURNING *
      `,
      [token]
    )

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token' })
    }

    res.status(200).json({ message: 'Email verified successfully' })
  } catch (e) {
    console.error('VERIFY EMAIL ERROR:', e)
    res.status(500).json({ error: 'Server error during verification' })
  }
}

/**
 * Handles user login and returns essential user data upon success.
 *
 * @param {object} req - Express request object.
 * @param {object} req.body - Request body containing login credentials.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password (plain text).
 * @param {object} res - Express response object.
 * @returns {object} 200 - Success object containing the user's non-sensitive profile data and a message.
 * @returns {object} 401 - Error for invalid credentials.
 * @returns {object} 403 - Error if the email is not verified.
 * @returns {object} 500 - Server error during login.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const user = rows[0]

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    if (!user.is_verified) {
      return res.status(403).json({ error: 'Please verify your email before logging in' })
    }

    res.status(200).json({
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        is_admin: user.is_admin
      },
      message: 'Login successful'
    })
  } catch (e) {
    console.error('LOGIN ERROR:', e)
    res.status(500).json({ error: 'Server error during login' })
  }
}

module.exports = { register, verifyEmail, login }