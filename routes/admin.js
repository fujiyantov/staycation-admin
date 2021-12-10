const router = require('express').Router()
const adminController = require('../controllers/adminController')

router.get('/dashboard', adminController.dashboard)

// category
router.get('/categories', adminController.category)
router.post('/categories', adminController.storeCategory)

// bank
router.get('/banks', adminController.bank)

// item
router.get('/items', adminController.item)

// booking
router.get('/bookings', adminController.booking)

module.exports = router;