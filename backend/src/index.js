require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
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

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));

// Create trade
app.post('/trades', async (req, res) => {
    try {
        const {
            user_id = null,          // you can pass null for now
            asset,
            direction,
            entry_date,              // ISO string, e.g. "2025-09-15T10:00:00"
            entry_price,
            size,
            notes = null,
            screenshot_url = null,
        } = req.body;

        if (!asset || !direction || !entry_date || !entry_price || !size) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const sql = `
      INSERT INTO trade (
        user_id, asset, direction, entry_date, entry_price, size, notes, screenshot_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;
        const { rows } = await pool.query(sql, [
            user_id, asset, direction, entry_date, entry_price, size, notes, screenshot_url
        ]);
        res.status(201).json(rows[0]);
    } catch (e) {
        console.error('POST /trades', e);
        res.status(500).json({ error: 'Server error' });
    }
});

// List trades (latest first)
app.get('/trades', async (req, res) => {
    try {
        const { user_id } = req.query;
        const base = `SELECT * FROM trade`;
        const where = user_id ? ` WHERE user_id = $1` : ``;
        const order = ` ORDER BY created_at DESC NULLS LAST`;
        const sql = base + where + order;

        const { rows } = await pool.query(sql, user_id ? [user_id] : []);
        res.json(rows);
    } catch (e) {
        console.error('GET /trades', e);
        res.status(500).json({ error: 'Server error' });
    }
});