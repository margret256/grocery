const { query } = require('../config/db')

const editableColumns = {
  name: 'name',
  quantity: 'quantity',
  price: 'price',
  category: 'category',
  completed: 'completed'
}

const parseId = (value) => {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

const mapItem = (row) => {
  if (!row) return null

  return {
    id: String(row.id),
    _id: String(row.id),
    userId: String(row.user_id),
    name: row.name,
    quantity: Number(row.quantity),
    price: Number(row.price),
    category: row.category,
    completed: row.completed,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

const findByUserId = async (userId, filter = 'all') => {
  const conditions = ['user_id = $1']
  const values = [userId]

  if (filter === 'completed') {
    conditions.push('completed = TRUE')
  }

  if (filter === 'active') {
    conditions.push('completed = FALSE')
  }

  const result = await query(
    `SELECT *
     FROM grocery_items
     WHERE ${conditions.join(' AND ')}
     ORDER BY created_at DESC`,
    values
  )

  return result.rows.map(mapItem)
}

const create = async ({ userId, name, quantity, price, category }) => {
  const result = await query(
    `INSERT INTO grocery_items (user_id, name, quantity, price, category)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, name, quantity, price, category]
  )

  return mapItem(result.rows[0])
}

const update = async (id, userId, data) => {
  const itemId = parseId(id)
  if (!itemId) return null

  const entries = Object.entries(data)
    .filter(([key]) => Object.prototype.hasOwnProperty.call(editableColumns, key))

  if (entries.length === 0) {
    const result = await query(
      'SELECT * FROM grocery_items WHERE id = $1 AND user_id = $2',
      [itemId, userId]
    )

    return mapItem(result.rows[0])
  }

  const assignments = entries.map(([key], index) => {
    return `${editableColumns[key]} = $${index + 3}`
  })
  const values = [itemId, userId, ...entries.map(([, value]) => value)]

  const result = await query(
    `UPDATE grocery_items
     SET ${assignments.join(', ')}, updated_at = NOW()
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    values
  )

  return mapItem(result.rows[0])
}

const deleteById = async (id, userId) => {
  const itemId = parseId(id)
  if (!itemId) return null

  const result = await query(
    `DELETE FROM grocery_items
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [itemId, userId]
  )

  return mapItem(result.rows[0])
}

const deleteCompletedByUserId = async (userId) => {
  await query(
    'DELETE FROM grocery_items WHERE user_id = $1 AND completed = TRUE',
    [userId]
  )
}

const deleteAllByUserId = async (userId) => {
  await query('DELETE FROM grocery_items WHERE user_id = $1', [userId])
}

module.exports = {
  create,
  deleteAllByUserId,
  deleteById,
  deleteCompletedByUserId,
  findByUserId,
  update
}
