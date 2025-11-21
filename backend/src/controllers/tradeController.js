const pool = require('../db')

/**
 * Retrieves a list of all predefined trading sessions.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} 200 - An array of session objects.
 * @returns {object} 500 - Database error.
 * @example
 * // GET /session
 * [
 * { "session_id": "uuid-1", "name": "London", "start_time": "...", "end_time": "..." },
 * // ...
 * ]
 */
const getSessions = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "session"')
    res.json(rows)
  } catch (err) {
    console.error('GET /session error:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

/**
 * Retrieves trade data for a specific month, filtered for calendar view.
 * If the user is an admin, it retrieves all trades for the month; otherwise, it is user-specific.
 *
 * @param {object} req - Express request object.
 * @param {object} req.query - Query parameters.
 * @param {string} req.query.date - A date string (e.g., '2024-01-01') representing the start of the month to query.
 * @param {string} req.query.user_id - The ID of the authenticated user.
 * @param {object} res - Express response object.
 * @returns {object} 200 - An array of simplified trade objects (trade_id, exit_date, pnl, outcome).
 * @returns {object} 500 - Database error.
 */
const getTradeCalendar = async (req, res) => {
  try {
    const { date, user_id } = req.query

    // Check if the user is an admin (used to show all trades in the calendar for admins)
    const userCheck = await pool.query('SELECT is_admin FROM users WHERE user_id = $1', [user_id])
    const isAdmin = userCheck.rows.length > 0 && userCheck.rows[0].is_admin

    let sql
    let params

    if (isAdmin) {
      sql = `
        SELECT trade_id, exit_date, pnl, outcome 
        FROM "trade" 
        WHERE exit_date >= $1 
        AND exit_date < $1::date + INTERVAL '1 month'
      `
      params = [date]
    } else {
      sql = `
        SELECT trade_id, exit_date, pnl, outcome 
        FROM "trade" 
        WHERE exit_date >= $1 
        AND exit_date < $1::date + INTERVAL '1 month'
        AND user_id = $2
      `
      params = [date, user_id]
    }
    
    const { rows } = await pool.query(sql, params)
    res.json(rows)
  } catch (err) {
    console.error('GET /trade_calendar error:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

/**
 * Retrieves all trades for a specific user, or all trades for an admin.
 * Joins with the session and tags table to provide comprehensive data for the trade table view.
 *
 * @param {object} req - Express request object.
 * @param {object} req.query - Query parameters.
 * @param {string} req.query.user_id - The ID of the authenticated user.
 * @param {object} res - Express response object.
 * @returns {object} 200 - An array of detailed trade objects.
 * @returns {object} 500 - Database error.
 */
const getTrades = async (req, res) => {
    try {
        const { user_id } = req.query

        const userCheck = await pool.query('SELECT is_admin FROM users WHERE user_id = $1', [user_id])
        const isAdmin = userCheck.rows.length > 0 && userCheck.rows[0].is_admin

        let sql
        let params

        const tagsSubquery = `
          COALESCE(
            json_agg(json_build_object('tag_id', tag.tag_id, 'tag_name', tag.tag_name, 'tag_color', tag.tag_color)) 
            FILTER (WHERE tag.tag_id IS NOT NULL), 
            '[]'
          ) as tags
        `

        if (isAdmin) {
          sql = `
            SELECT trade.trade_id, trade.asset, trade.entry_date, trade.exit_date, trade.size, trade.pnl, trade.outcome, 
                   trade.strategy, trade.is_reviewed, trade.notes, trade.created_at, trade.direction,
                   session.name AS session_name,
                   users.username AS username,
                   ${tagsSubquery}
            FROM trade
            JOIN session ON trade.session_id = session.session_id
            LEFT JOIN users ON trade.user_id = users.user_id
            LEFT JOIN trade_tags ON trade.trade_id = trade_tags.trade_id
            LEFT JOIN tag ON trade_tags.tag_id = tag.tag_id
            GROUP BY trade.trade_id, session.name, users.username
            ORDER BY trade.entry_date DESC
          `
          params = []
        } else {
          sql = `
            SELECT trade.trade_id, trade.asset, trade.entry_date, trade.exit_date, trade.size, trade.pnl, trade.outcome, 
                   trade.strategy, trade.is_reviewed, trade.notes, trade.created_at, trade.direction,
                   session.name AS session_name,
                   users.username AS username,
                   ${tagsSubquery}
            FROM trade
            JOIN session ON trade.session_id = session.session_id
            LEFT JOIN users ON trade.user_id = users.user_id
            LEFT JOIN trade_tags ON trade.trade_id = trade_tags.trade_id
            LEFT JOIN tag ON trade_tags.tag_id = tag.tag_id
            WHERE trade.user_id = $1
            GROUP BY trade.trade_id, session.name, users.username
            ORDER BY trade.entry_date DESC
          `
          params = [user_id]
        }

        const { rows } = await pool.query(sql, params)
        res.json(rows)
    } catch (err) {
        console.error('GET /trade error:', err)
        res.status(500).json({ error: 'Database error' })
    }
}

/**
 * Deletes a single trade record by its ID.
 *
 * @param {object} req - Express request object.
 * @param {object} req.params - Route parameters.
 * @param {string} req.params.trade_id - The ID of the trade to delete.
 * @param {object} res - Express response object.
 * @returns {object} 200 - Success message.
 * @returns {object} 404 - Error if the trade ID is not found.
 * @returns {object} 500 - Database error.
 */
const deleteTrade = async (req, res) => {
  try {
    const { trade_id } = req.params
    console.log('Backend received DELETE request for ID:', trade_id)

    const { rowCount } = await pool.query('DELETE FROM "trade" WHERE trade_id = $1', [trade_id])

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Trade not found' })
    }

    res.status(200).json({ message: `Trade with ID ${trade_id} deleted successfully` })
  } catch (err) {
    console.error('DELETE /trade error:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

/**
 * Creates a new trade record in the database and optionally links it to tags.
 *
 * @param {object} req - Express request object.
 * @param {object} req.body - Trade details.
 * @param {string} req.body.user_id - ID of the user creating the trade.
 * @param {string} req.body.asset - Trading asset/pair.
 * @param {('Buy'|'Sell')} req.body.direction - Trade direction.
 * @param {string} req.body.entry_date - Entry timestamp/date.
 * @param {string} req.body.exit_date - Exit timestamp/date.
 * @param {number} req.body.size - Position size/lot size.
 * @param {number} [req.body.pnl=null] - Profit and Loss amount.
 * @param {('Win'|'Loss'|'BE')} [req.body.outcome=null] - Trade outcome.
 * @param {string} [req.body.session_id=null] - The ID of the associated session.
 * @param {string} [req.body.strategy=null] - The strategy used for the trade.
 * @param {boolean} [req.body.is_reviewed=false] - Whether the trade has been reviewed.
 * @param {string} [req.body.notes=null] - Notes and reflection for the trade.
 * @param {string[]} [req.body.tags=[]] - An array of tag IDs (UUIDs) to associate with the trade.
 * @param {object} res - Express response object.
 * @returns {object} 201 - The newly created trade object including its tags.
 * @returns {object} 500 - Server error during creation or tag association.
 */
const createTrade = async (req, res) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const {
      user_id = null,
      asset,
      direction,
      entry_date,
      exit_date,
      size,
      pnl = null,
      outcome = null,
      session_id = null,
      strategy = null,
      is_reviewed = false,
      notes = null,
      screenshot_url = null,
      tags = [] 
    } = req.body

    const insertTradeSql = `
      INSERT INTO trade (
        user_id, asset, direction, entry_date, exit_date,
        size, pnl, outcome, session_id, strategy, is_reviewed, notes,
        screenshot_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING trade_id, *;
    `

    const { rows } = await client.query(insertTradeSql, [
      user_id, asset, direction, entry_date, exit_date,
      size, pnl, outcome, session_id, strategy, is_reviewed, notes,
      screenshot_url
    ])
    
    const newTrade = rows[0]

    if (tags && tags.length > 0) {
      const tagValues = tags.map((_, i) => `($1, $${i + 2})`).join(',')
      const tagParams = [newTrade.trade_id, ...tags]
      
      await client.query(
        `INSERT INTO trade_tags (trade_id, tag_id) VALUES ${tagValues}`, 
        tagParams
      )
    }

    await client.query('COMMIT')

    res.status(201).json({ ...newTrade, tags })

  } catch (e) {
    await client.query('ROLLBACK')
    console.error('POST /trades error', e)
    res.status(500).json({ error: 'Server error' })
  } finally {

    client.release()
  }
}

module.exports = { getSessions, getTradeCalendar, getTrades, deleteTrade, createTrade }