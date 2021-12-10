const router = require('express').Router()
const adminController = require('../controllers/adminController')

router.get('/dashboard', adminController.dashboard)
router.get('/categories', adminController.category)
router.get('/banks', adminController.bank)
router.get('/items', adminController.item)
router.get('/bookings', adminController.booking)

module.exports = router;