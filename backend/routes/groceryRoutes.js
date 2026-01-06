const express = require('express')
const protect = require('../middleware/authMiddleware')
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  clearCompleted
} = require('../controllers/groceryController')

const router = express.Router()

router.use(protect)

router.get('/', getItems)
router.post('/', addItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)
router.delete('/clear/completed', clearCompleted)

module.exports = router
