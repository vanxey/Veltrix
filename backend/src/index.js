const dotenv = require('dotenv')
const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env'
dotenv.config({ path: envFile })

console.log(`✅ Loaded ${envFile}`)

const express = require('express')
const cors = require('cors')
const app = express()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const tradeRoutes = require('./routes/tradeRoutes')

app.use(cors({
  origin: [process.env.LOCAL_FRONTEND_IP_URL, process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}))
app.use(express.json())

app.get('/', (_req, res) => res.send('Veltrix Backend Running'))

app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', tradeRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`✅ Veltrix backend running on port ${PORT}`)
})