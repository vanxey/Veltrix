const pool = require('../db')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

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

    const userSql = `
      INSERT INTO users (username, email, password_hash, verification_token)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, username, email
    `

    const { rows } = await client.query(userSql, [
      username,
      email,
      passwordHash,
      verificationToken
    ])

    await client.query('COMMIT')

    try {
      const frontendUrl = process.env.FRONTEND_URL
      const verifyLink = `${frontendUrl}/verify?token=${verificationToken}`

      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify your Veltrix Account',
        html: `
          <h1 style="margin: 0; font-size: 32px; font-family: sans-serif;">Welcome to <span style="color: #126eee;">Veltrix</span></h1>
          <p style="font-size: 16px; font-family: sans-serif;">Hi ${username}, please verify your account:</p>
          <a href="${verifyLink}" style="background-color: #126eee; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: bold; font-family: sans-serif; display: inline-block;">Verify Account</a>
        `
      })
    } catch (emailError) {
      console.error("WARNING: Failed to send email:", emailError.message)
    }

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.'
    })

  } catch (e) {
    await client.query('ROLLBACK')
    res.status(500).json({ error: 'Server error during registration' })
  } finally {
    client.release()
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body

    if (!token) return res.status(400).json({ error: "Missing token" })

    const result = await pool.query(
      'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1 RETURNING *',
      [token]
    )

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token' })
    }

    res.status(200).json({ message: 'Email verified successfully' })
  } catch (e) {
    res.status(500).json({ error: 'Server error during verification' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
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
    res.status(500).json({ error: 'Server error during login' })
  }
}

module.exports = { register, verifyEmail, login }
