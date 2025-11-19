const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env';
dotenv.config({ path: envFile });

console.log(`✅ Loaded ${envFile}`);

const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const verificationToken = crypto.randomBytes(32).toString('hex');

    const sql = `
      INSERT INTO users (username, email, password_hash, verification_token)
      VALUES ($1, $2, $3, $4)
      RETURNING user_id, username, email
    `;

    const { rows } = await pool.query(sql, [username, email, passwordHash, verificationToken]);

    const verifyLink = `${process.env.LOCAL_FRONTEND_IP_URL}/verify?token=${verificationToken}`;
    console.log(`[MOCK EMAIL] Verify here: ${verifyLink}`);

    res.status(201).json({ 
      message: 'Registration successful. Please check your email to verify your account.' 
    });

  } catch (e) {
    console.error('POST /register error', e);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/verify_email', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(400).json({ error: "Missing token" });

    const result = await pool.query(
      'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = $1 RETURNING *',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    res.status(200).json({ message: 'Email verified successfully' });

  } catch (e) {
    console.error('POST /verify_email error', e);
    res.status(500).json({ error: 'Server error during verification' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];


    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.is_verified) {
      return res.status(403).json({ error: 'Please verify your email before logging in' });
    }

    res.status(200).json({ 
      user: { user_id: user.user_id, username: user.username, email: user.email }, 
      message: 'Login successful' 
    });

  } catch (e) {
    console.error('POST /login error', e);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (email) {
      const existing = await pool.query('SELECT * FROM users WHERE email = $1 AND user_id != $2', [email, id]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
    }

    const sql = `
      UPDATE users 
      SET name = COALESCE($1, name), 
          email = COALESCE($2, email)
      WHERE user_id = $3
      RETURNING user_id, name, email;
    `;
    
    const { rows } = await pool.query(sql, [name, email, id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: rows[0], message: 'Profile updated successfully' });
  } catch (e) {
    console.error('PUT /user error', e);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const userResult = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (userResult.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    
    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    await pool.query('DELETE FROM trade WHERE user_id = $1', [id]);
    await pool.query('DELETE FROM users WHERE user_id = $1', [id]);

    res.json({ message: 'Account deleted successfully' });
  } catch (e) {
    console.error('DELETE /user error', e);
    res.status(500).json({ error: 'Server error deleting account' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Veltrix backend running on port ${PORT}`);
  console.log(process.env.NODE_ENV)
  console.log(process.env.PORT)
});

