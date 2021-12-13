const router = require('express').Router()
const adminController = require('../controllers/adminController')
const categoryController = require('../controllers/categoryController')
const bankControlelr = require('../controllers/bankController')

router.get('/dashboard', adminController.dashboard)

// category
router.get('/categories', categoryController.category)
router.post('/categories', categoryController.storeCategory)
router.put('/categories', categoryController.updateCategory)
router.delete('/categories/:id', categoryController.deleteCategory)

// bank
router.get('/banks', bankControlelr.bank)
router.post('/banks', bankControlelr.storeBank)
router.put('/banks', bankControlelr.updateBank)
router.delete('/banks/:id', bankControlelr.deleteBank)

// item
router.get('/items', adminController.item)

// booking
router.get('/bookings', adminController.booking)

module.exports = router;