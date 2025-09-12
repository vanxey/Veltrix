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
