const pool = require('../db')

const getTags = async (req, res) => {
  try {
    const { user_id } = req.query
    const { rows } = await pool.query('SELECT * FROM tag WHERE user_id = $1 ORDER BY tag_name', [user_id])
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

const createTag = async (req, res) => {
  try {
    const { user_id, tag_name, tag_type, tag_color } = req.body
    const { rows } = await pool.query(
      'INSERT INTO tag (user_id, tag_name, tag_type, tag_color) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, tag_name, tag_type || 'general', tag_color || 'blue']
    )
    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

const deleteTag = async (req, res) => {
  try {
    const { tag_id } = req.params
    const { rowCount } = await pool.query('DELETE FROM tag WHERE tag_id = $1', [tag_id])

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Tag not found' })
    }

    res.json({ message: 'Tag deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

module.exports = { getTags, createTag, deleteTag}