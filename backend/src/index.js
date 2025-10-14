require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors({
  origin: ["https://veltrix-1.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());

app.get('/', (_req, res) => res.send('Veltrix Backend Running'));


// Test DB: list users
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

app.get('/trade', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "trade"');
    res.json(rows);
  } catch (err) {
    console.error('GET /trade error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/trade/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Add this line to check the ID received from the frontend
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



// Create trade
// app.post('/trades', async (req, res) => {
//     try {
//         const {
//             user_id = null,          // you can pass null for now
//             asset,
//             direction,
//             entry_date,              // ISO string, e.g. "2025-09-15T10:00:00"
//             entry_price,
//             size,
//             notes = null,
//             screenshot_url = null,
//         } = req.body;

//         if (!asset || !direction || !entry_date || !entry_price || !size) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         const sql = `
//       INSERT INTO trade (
//         user_id, asset, direction, entry_date, entry_price, size, notes, screenshot_url
//       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
//       RETURNING *;
//     `;
//         const { rows } = await pool.query(sql, [
//             user_id, asset, direction, entry_date, entry_price, size, notes, screenshot_url
//         ]);
//         res.status(201).json(rows[0]);
//     } catch (e) {
//         console.error('POST /trades', e);
//         res.status(500).json({ error: 'Server error' });
//     }
// });


app.post('/trades', async (req, res) => {
  try {
    const {
      user_id = null,
      asset,
      direction,
      entry_date,
      entry_price,
      exit_price = null,
      size,
      pnl = null,
      outcome = null,
      session_id = null,
      strategy = null,
      is_reviewed = false,
      notes = null,
      stop_loss = null,
      take_profit = null,
      screenshot_url = null
    } = req.body;

    if (!asset || !direction || !entry_date || !size) {
      return res.status(400).json({ error: 'Missing required fields' });
    }


    const sql = `
      INSERT INTO trade (
        user_id, asset, direction, entry_date, entry_price, exit_price,
        size, pnl, outcome, session_id, strategy, is_reviewed, notes,
        stop_loss, take_profit, screenshot_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *;
    `;

    const { rows } = await pool.query(sql, [
      user_id, asset, direction, entry_date, entry_price, exit_price,
      size, pnl, outcome, session_id, strategy, is_reviewed, notes,
      stop_loss, take_profit, screenshot_url
    ]);

    res.status(201).json(rows[0]);
  } catch (e) {
    console.error('POST /trades', e);
    res.status(500).json({ error: 'Server error' });
  }
});


// List trades (latest first)
// app.get('/trades', async (req, res) => {
//     try {
//         const { user_id } = req.query;
//         const base = `SELECT * FROM trade`;
//         const where = user_id ? ` WHERE user_id = $1` : ``;
//         const order = ` ORDER BY created_at DESC NULLS LAST`;
//         const sql = base + where + order;

//         const { rows } = await pool.query(sql, user_id ? [user_id] : []);
//         res.json(rows);
//     } catch (e) {
//         console.error('GET /trades', e);
//         res.status(500).json({ error: 'Server error' });
//     }
// });
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Veltrix backend running on port ${PORT}`);
});

