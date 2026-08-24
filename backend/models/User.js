const { query } = require('../config/db')

const mapUser = (row) => {
  if (!row) return null

  return {
    id: String(row.id),
    _id: String(row.id),
    username: row.username,
    email: row.email,
    password: row.password,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

const findByEmailOrUsername = async (email, username) => {
  const result = await query(
    'SELECT * FROM users WHERE email = LOWER($1) OR username = $2 LIMIT 1',
    [email, username]
  )

  return mapUser(result.rows[0])
}

const findByEmail = async (email) => {
  const result = await query(
    'SELECT * FROM users WHERE email = LOWER($1) LIMIT 1',
    [email]
  )

  return mapUser(result.rows[0])
}

const findByLogin = async (login) => {
  const result = await query(
    `SELECT *
     FROM users
     WHERE email = LOWER($1) OR username = $1
     LIMIT 1`,
    [login]
  )

  return mapUser(result.rows[0])
}

const create = async ({ username, email, password }) => {
  const result = await query(
    `INSERT INTO users (username, email, password)
     VALUES ($1, LOWER($2), $3)
     RETURNING *`,
    [username, email, password]
  )

  return mapUser(result.rows[0])
}

module.exports = {
  create,
  findByEmail,
  findByLogin,
  findByEmailOrUsername
}
