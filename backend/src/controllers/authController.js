const pool = require('../db')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const verificationToken = crypto.randomBytes(32).toString('hex')

    const sql = `
      INSERT INTO users (username, email, password_hash, verification_token)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, username, email
    `
    const { rows } = await pool.query(sql, [username, email, passwordHash, verificationToken])

    const verifyLink = `${process.env.LOCAL_FRONTEND_IP_URL}/verify?token=${verificationToken}`
    console.log(`[MOCK EMAIL] Verify here: ${verifyLink}`)

    res.status(201).json({ 
      message: 'Registration successful. Please check your email to verify your account.' 
    })

  } catch (e) {
    console.error('POST /register error', e)
    res.status(500).json({ error: 'Server error during registration' })
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
    console.error('POST /verify_email error', e)
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
      user: { user_id: user.user_id, username: user.username, email: user.email }, 
      message: 'Login successful' 
    })

  } catch (e) {
    console.error('POST /login error', e)
    res.status(500).json({ error: 'Server error during login' })
  }
}

module.exports = { register, verifyEmail, login }