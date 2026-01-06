const GroceryItem = require('../models/GroceryItem')

// GET ITEMS
exports.getItems = async (req, res) => {
  const items = await GroceryItem.find({ userId: req.user.id })
  res.json(items)
}

// ADD ITEM
exports.addItem = async (req, res) => {
  const { name, quantity, category } = req.body

  if (!name || !quantity || !category) {
    return res.status(400).json({ message: 'All fields required' })
  }

  const item = await GroceryItem.create({
    userId: req.user.id,
    name,
    quantity,
    category
  })

  res.status(201).json(item)
}

// UPDATE ITEM
exports.updateItem = async (req, res) => {
  const item = await GroceryItem.findById(req.params.id)

  if (!item || item.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not allowed' })
  }

  Object.assign(item, req.body)
  await item.save()

  res.json(item)
}

// DELETE ITEM
exports.deleteItem = async (req, res) => {
  const item = await GroceryItem.findById(req.params.id)

  if (!item || item.userId.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not allowed' })
  }

  await item.deleteOne()
  res.json({ message: 'Item deleted' })
}

// CLEAR COMPLETED
exports.clearCompleted = async (req, res) => {
  await GroceryItem.deleteMany({ userId: req.user.id, completed: true })
  res.json({ message: 'Completed items cleared' })
}
