const GroceryItem = require('../models/GroceryItem')

// GET ITEMS
exports.getItems = async (req, res) => {
  const items = await GroceryItem.findByUserId(req.user.id, req.query.filter)
  res.json(items)
}

// ADD ITEM
exports.addItem = async (req, res) => {
  const { name, quantity, price, category } = req.body

  if (!name || !quantity || price === undefined || !category) {
    return res.status(400).json({ message: 'All fields required' })
  }

  const item = await GroceryItem.create({
    userId: req.user.id,
    name,
    quantity,
    price,
    category
  })

  res.status(201).json(item)
}

// UPDATE ITEM
exports.updateItem = async (req, res) => {
  const item = await GroceryItem.update(req.params.id, req.user.id, req.body)

  if (!item) {
    return res.status(403).json({ message: 'Not allowed' })
  }

  res.json(item)
}

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  const item = await GroceryItem.deleteById(req.params.id, req.user.id)

  if (!item) {
    return res.status(403).json({ message: 'Not allowed' })
  }

  res.json({ message: 'Item deleted' })
}

// CLEAR COMPLETED
exports.clearCompleted = async (req, res) => {
  await GroceryItem.deleteCompletedByUserId(req.user.id)
  res.json({ message: 'Completed items cleared' })
}

// CLEAR ALL
exports.clearAll = async (req, res) => {
  await GroceryItem.deleteAllByUserId(req.user.id)
  res.json({ message: 'All items cleared' })
}
