const pool = require('../db')

/**
 * Retrieves all custom tags belonging to a specific user.
 * Tags are ordered alphabetically by name.
 *
 * @param {object} req - Express request object.
 * @param {object} req.query - Query parameters.
 * @param {string} req.query.user_id - The ID of the authenticated user.
 * @param {object} res - Express response object.
 * @returns {object} 200 - An array of tag objects.
 * @returns {object} 500 - Database error.
 * @example
 * // GET /tags?user_id=123
 * [
 * { "tag_id": "uuid-1", "user_id": "uuid-0", "tag_name": "FOMO", "tag_type": "Psychology", "tag_color": "red" },
 * // ...
 * ]
 */
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

/**
 * Creates a new tag associated with a user.
 *
 * @param {object} req - Express request object.
 * @param {object} req.body - Request body containing new tag details.
 * @param {string} req.body.user_id - The ID of the user creating the tag.
 * @param {string} req.body.tag_name - The name of the new tag (e.g., 'Impulse').
 * @param {string} [req.body.tag_type='general'] - The category of the tag (e.g., 'Strategy', 'Psychology').
 * @param {string} [req.body.tag_color='blue'] - The color code/name for the tag display.
 * @param {object} res - Express response object.
 * @returns {object} 201 - The newly created tag object.
 * @returns {object} 500 - Database error.
 */
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

/**
 * Deletes a tag specified by its ID.
 * All associations to this tag in the 'trade_tags' table are automatically deleted via CASCADE.
 *
 * @param {object} req - Express request object.
 * @param {object} req.params - Route parameters.
 * @param {string} req.params.tag_id - The ID of the tag to delete.
 * @param {object} res - Express response object.
 * @returns {object} 200 - Success message.
 * @returns {object} 404 - Error if the tag ID is not found.
 * @returns {object} 500 - Database error.
 */
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