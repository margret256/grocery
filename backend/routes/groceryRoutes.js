const express = require('express')
const protect = require('../middleware/authMiddleware')
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  clearCompleted,
  clearAll
} = require('../controllers/groceryController')

const router = express.Router()

router.use(protect)

router.get('/', getItems)
router.post('/', addItem)
router.delete('/clear/completed', clearCompleted)
router.delete('/', clearAll)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

module.exports = router
