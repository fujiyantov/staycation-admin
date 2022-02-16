const router = require('express').Router()
const adminController = require('../controllers/adminController')
const categoryController = require('../controllers/categoryController')
const bankController = require('../controllers/bankController')
const itemController = require('../controllers/itemController')
const featureController = require('../controllers/featureController')
const activityController = require('../controllers/activityController')
const auth = require('../middlewares/auth.js')
const {
    upload,
    uploadMultiple
} = require('../middlewares/multer')
const bookingController = require('../controllers/bookingController')

router.get('/signin', adminController.viewSignIn)
router.post('/signin', adminController.actionSignIn)

// auth
router.use(auth)
router.get('/signout', adminController.actionSignOut)

// dahsboard
router.get('/dashboard', adminController.dashboard)

// category
router.get('/categories', categoryController.category)
router.post('/categories', categoryController.storeCategory)
router.put('/categories', categoryController.updateCategory)
router.delete('/categories/:id', categoryController.deleteCategory)

// bank
router.get('/banks', bankController.bank)
router.post('/banks', upload, bankController.storeBank)
router.put('/banks', upload, bankController.updateBank)
router.delete('/banks/:id', bankController.deleteBank)

// item
router.get('/items', itemController.item)
router.post('/items', uploadMultiple, itemController.storeItem)
router.get('/items/:id', itemController.editItem)
router.put('/items/:id', uploadMultiple, itemController.updateItem)
router.delete('/items/:id', itemController.deleteItem)

// Feature
router.get('/items/show-detail-item/:itemId', featureController.viewDetailItem);
router.post('/items/add/feature', upload, featureController.addFeature);
router.put('/items/update/feature', upload, featureController.editFeature);
router.delete('/items/:itemId/feature/:id', featureController.deleteFeature);

// Activity
router.post('/items/add/activity', upload, activityController.addActivity);
router.put('/items/update/activity', upload, activityController.editActivity);
router.delete('/items/:itemId/activity/:id', activityController.deleteActivity);

// booking
router.get('/booking', bookingController.viewBooking);
router.get('/booking/:id', bookingController.showDetailBooking);
router.put('/booking/:id/confirmation', bookingController.actionConfirmation);
router.put('/booking/:id/reject', bookingController.actionReject);

module.exports = router;