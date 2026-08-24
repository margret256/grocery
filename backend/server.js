const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const { initDB } = require('./config/db')

dotenv.config()

const startServer = async () => {
  await initDB()

  const app = express()
  app.use(cors())
  app.use(express.json())

  app.use('/api/auth', require('./routes/authRoutes'))
  app.use('/api/groceries', require('./routes/groceryRoutes'))

  const clientDistPath = path.join(__dirname, '..', 'frontend', 'dist')
  const clientIndexPath = path.join(clientDistPath, 'index.html')

  if (fs.existsSync(clientIndexPath)) {
    app.use(express.static(clientDistPath))
    app.use((req, res, next) => {
      if (req.method !== 'GET' || req.path.startsWith('/api')) {
        return next()
      }

      res.sendFile(clientIndexPath, (err) => {
        if (err) next(err)
      })
    })
  }

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

startServer()
