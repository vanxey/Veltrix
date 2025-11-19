const pool = require('../db')

const getSessions = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "session"')
    res.json(rows)
  } catch (err) {
    console.error('GET /session error:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

const getTradeCalendar = async (req, res) => {
  try {
    const { date, user_id } = req.query 
    
    // Add WHERE user_id = $2 condition
    const sql = `
      SELECT trade_id, exit_date, pnl, outcome 
      FROM "trade" 
      WHERE exit_date >= $1 
      AND exit_date < $1::date + INTERVAL '1 month'
      AND user_id = $2
    `
    
    const { rows } = await pool.query(sql, [date, user_id])
    res.json(rows)
  } catch (err) {
    console.error('GET /trade_calendar error:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

const getTrades = async (req, res) => {
    try {
        const { user_id } = req.query
        const sql = `
          SELECT trade.trade_id, trade.asset, trade.entry_date, trade.exit_date, trade.size, trade.pnl, trade.outcome, trade.strategy, trade.is_reviewed, trade.notes, trade.created_at,
          session.name AS session_name
          FROM trade
          JOIN session ON trade.session_id = session.session_id
          WHERE trade.user_id = $1
          ORDER BY trade.entry_date DESC
        `
        const { rows } = await pool.query(sql, [user_id])
        res.json(rows)
    } catch (err) {
        console.error('GET /trade error:', err)
        res.status(500).json({ error: 'Database error' })
    }
}

const deleteTrade = async (req, res) => {
  try {
    const { id } = req.params
    console.log('Backend received DELETE request for ID:', id)

    const { rowCount } = await pool.query('DELETE FROM "trade" WHERE trade_id = $1', [id])

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Trade not found' })
    }

    res.status(200).json({ message: `Trade with ID ${id} deleted successfully` })
  } catch (err) {
    console.error('DELETE /trade error:', err)
    res.status(500).json({ error: 'Database error' })
  }
}

const createTrade = async (req, res) => {
  try {
    const {
      user_id = null,
      asset,
      direction,
      entryDate,
      exitDate,
      size,
      pnl = null,
      outcome = null,
      sessionId = null,
      strategy = null,
      isReviewed = false,
      notes = null,
      screenshotUrl = null
    } = req.body

    const sql = `
      INSERT INTO trade (
        user_id, asset, direction, entry_date, exit_date,
        size, pnl, outcome, session_id, strategy, is_reviewed, notes,
        screenshot_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *;
    `

    const { rows } = await pool.query(sql, [
      user_id, asset, direction, entryDate, exitDate,
      size, pnl, outcome, sessionId, strategy, isReviewed, notes,
      screenshotUrl
    ])

    res.status(201).json(rows[0])
  } catch (e) {
    console.error('POST /trades', e)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getSessions, getTradeCalendar, getTrades, deleteTrade, createTrade }