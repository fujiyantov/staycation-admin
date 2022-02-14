const router = require('express').Router()
const adminController = require('../controllers/adminController')
const categoryController = require('../controllers/categoryController')
const bankControlelr = require('../controllers/bankController')
const itemControlelr = require('../controllers/itemController')
const {
    upload,
    uploadMultiple
} = require('../middlewares/multer')

router.get('/dashboard', adminController.dashboard)

// category
router.get('/categories', categoryController.category)
router.post('/categories', categoryController.storeCategory)
router.put('/categories', categoryController.updateCategory)
router.delete('/categories/:id', categoryController.deleteCategory)

// bank
router.get('/banks', bankControlelr.bank)
router.post('/banks', upload, bankControlelr.storeBank)
router.put('/banks', upload, bankControlelr.updateBank)
router.delete('/banks/:id', bankControlelr.deleteBank)

// item
router.get('/items', itemControlelr.item)
router.post('/items', uploadMultiple, itemControlelr.storeItem)
router.get('/items/:id', itemControlelr.editItem)
router.put('/items/:id', uploadMultiple, itemControlelr.updateItem)
router.delete('/items/:id', itemControlelr.deleteItem)

// booking
router.get('/bookings', adminController.booking)

module.exports = router;