const pool = require('../db')
const bcrypt = require('bcryptjs')

const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    console.error('GET /users error:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const { user_id } = req.params
    const { username, email } = req.body
    //console.log(username, email)
    
    if (email) {
      const existing = await pool.query('SELECT * FROM users WHERE email = $1 AND user_id != $2', [email, user_id])
      if (existing.rows.length > 0) {
        return res.status(400).json({ error: 'Email is already in use' })
      }
    }

    const sql = `
      UPDATE users 
      SET username = COALESCE($1, username), 
          email = COALESCE($2, email)
      WHERE user_id = $3
      RETURNING user_id, username, email
    `
    
    const { rows } = await pool.query(sql, [username, email, user_id])

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user: rows[0], message: 'Profile updated successfully' })
  } catch (e) {
    console.error('PUT /user error', e)
    res.status(500).json({ error: 'Server error updating profile' })
  }
}

const deleteAccount = async (req, res) => {
  try {
    const { user_id } = req.params
    const { password } = req.body

    const userResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id])
    if (userResult.rows.length === 0) return res.status(404).json({ error: 'User not found' })
    
    const user = userResult.rows[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' })
    }

    await pool.query('DELETE FROM trade WHERE user_id = $1', [user_id])
    await pool.query('DELETE FROM users WHERE user_id = $1', [user_id])

    res.json({ message: 'Account deleted successfully' })
  } catch (e) {
    console.error('DELETE /user error', e)
    res.status(500).json({ error: 'Server error deleting account' })
  }
}

module.exports = { getUsers, updateProfile, deleteAccount }