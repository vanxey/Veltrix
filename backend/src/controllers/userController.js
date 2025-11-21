const pool = require('../db')
const bcrypt = require('bcryptjs')

/**
 * Retrieves a list of all users, ordered by creation date (DESC).
 * Access is restricted to users with the 'is_admin' flag set to true.
 *
 * @param {object} req - Express request object.
 * @param {object} req.query - Query parameters.
 * @param {string} req.query.user_id - The ID of the authenticated user.
 * @param {object} res - Express response object.
 * @returns {object} 200 - An array of all user objects (admin only).
 * @returns {object} 403 - Forbidden access error if the user is not an admin.
 * @returns {object} 500 - Database error.
 */
const getUsers = async (req, res) => {
  try {
    const { user_id } = req.query

    if (!user_id) {
        return res.status(403).json({ error: 'Access Forbidden: Authentication required.' });
    }
    
    const userCheck = await pool.query('SELECT is_admin FROM users WHERE user_id = $1', [user_id]);
    const isAdmin = userCheck.rows.length > 0 && userCheck.rows[0].is_admin;

    if (!isAdmin) {
      return res.status(403).json({ error: 'Access Forbidden: Only administrators can view all users.' });
    }

    const { rows } = await pool.query('SELECT user_id, username, email, is_verified, is_admin, created_at FROM users ORDER BY created_at DESC')
    res.json(rows)

  } catch (err) {
    console.error('GET /users error:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

/**
 * Updates a user's profile (username and/or email).
 *
 * @param {object} req - Express request object.
 * @param {object} req.params - Route parameters.
 * @param {string} req.params.user_id - The ID of the user to update.
 * @param {object} req.body - Request body containing new profile data.
 * @param {string} [req.body.username] - The new username.
 * @param {string} [req.body.email] - The new email address.
 * @param {object} res - Express response object.
 * @returns {object} 200 - Success object with the updated user data.
 * @returns {object} 400 - Error if the provided email is already in use by another user.
 * @returns {object} 404 - Error if the user_id is not found.
 * @returns {object} 500 - Server error during profile update.
 */
const updateProfile = async (req, res) => {
  try {
    const { user_id } = req.params
    const { username, email } = req.body
    
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

/**
 * Deletes a user account and all associated trades. Requires password confirmation.
 *
 * @param {object} req - Express request object.
 * @param {object} req.params - Route parameters.
 * @param {string} req.params.user_id - The ID of the user whose account should be deleted.
 * @param {object} req.body - Request body containing the password for confirmation.
 * @param {string} req.body.password - The user's current password (plain text).
 * @param {object} res - Express response object.
 * @returns {object} 200 - Success message.
 * @returns {object} 401 - Error for incorrect password.
 * @returns {object} 404 - Error if the user_id is not found.
 * @returns {object} 500 - Server error during account deletion.
 */
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