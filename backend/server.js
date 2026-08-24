const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { initDB } = require('./config/db')

dotenv.config()

const startServer = async () => {
  await initDB()

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.use('/api/auth', require('./routes/authRoutes'))
  app.use('/api/groceries', require('./routes/groceryRoutes'))

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

startServer()
