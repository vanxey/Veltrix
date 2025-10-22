const dotenv = require('dotenv');
const { Pool } = require('pg');

const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env';
dotenv.config({ path: envFile });


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: envFile
    ? false
    : {rejectUnauthorized: false},
});

module.exports = pool;
