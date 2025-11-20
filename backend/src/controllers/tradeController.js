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