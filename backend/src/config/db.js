const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('DB connection error:', err);
  else console.log('DB connected:', res.rows[0]);
});

module.exports = pool;