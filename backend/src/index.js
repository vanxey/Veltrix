const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env';
dotenv.config({ path: envFile });

console.log(`✅ Loaded ${envFile}`);

const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors({
  origin: [process.env.LOCAL_FRONTEND_IP_URL, process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());

app.get('/', (_req, res) => res.send('Veltrix Backend Running'));

app.get('/users', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('GET /users error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/session', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "session"');
    res.json(rows);
  } catch (err) {
    console.error('GET /session error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/trade_calendar', async (req, res) => {
  try {
    const { date } = req.query;
    const { rows } = await pool.query(`SELECT trade_id, exit_date, pnl, outcome 
                                      FROM "trade" 
                                      WHERE exit_date >= $1 
                                      AND exit_date < $1::date + INTERVAL '1 month'`, [date]);
    res.json(rows);
  } catch (err) {
    console.error('GET /trade_calendar error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/trade', async (_req, res) => {
    try {
        const { rows } = await pool.query(`
          SELECT trade.trade_id, trade.asset, trade.entry_date, trade.exit_date, trade.size, trade.pnl, trade.outcome, trade.strategy, trade.is_reviewed, trade.notes, trade.created_at,
          session.name AS session_name
          FROM trade
          JOIN session ON trade.session_id = session.session_id
        `);
        res.json(rows);
    } catch (err) {
        console.error('GET /trade error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.delete('/trade/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Backend received DELETE request for ID:', id);

    const { rowCount } = await pool.query('DELETE FROM "trade" WHERE trade_id = $1', [id]);

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Trade not found' });
    }

    res.status(200).json({ message: `Trade with ID ${id} deleted successfully` });
  } catch (err) {
    console.error('DELETE /trade error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/trades', async (req, res) => {
  try {
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
       screenshot_url = null
      // entry_price,
      // exit_price = null,
      // stop_loss = null,
      // take_profit = null,
    } = req.body;

    // if (!asset || !direction || !entry_date || !exit_date || !size || !strategy || !outcome || !pnl || !session_id) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }


    const sql = `
      INSERT INTO trade (
        user_id, asset, direction, entry_date, exit_date,
        size, pnl, outcome, session_id, strategy, is_reviewed, notes,
        screenshot_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *;
    `;

    //removed entry_price, exit_price, stop_loss, take_profit, (can be added again later on)

    const { rows } = await pool.query(sql, [
      user_id, asset, direction, entry_date, exit_date,
      size, pnl, outcome, session_id, strategy, is_reviewed, notes,
      screenshot_url
    ]);

    res.status(201).json(rows[0]);
  } catch (e) {
    console.error('POST /trades', e);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Veltrix backend running on port ${PORT}`);
  console.log(process.env.NODE_ENV)
  console.log(process.env.PORT)
});

