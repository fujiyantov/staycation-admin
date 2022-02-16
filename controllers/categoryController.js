const schemaCateogry = require('../models/Category')

module.exports = {
    category: async (req, res) => {
        try {
            const categories = await schemaCateogry.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {
                message: alertMessage,
                status: alertStatus
            }
            res.render('admin/category/index', {
                categories,
                alert,
                title: 'Staycation | Category',
                user: req.session.user
            })
        } catch (error) {
            res.redirect('/admin/categories')
        }
    },
    storeCategory: async (req, res) => {
        try {
            const {
                name
            } = req.body

            await schemaCateogry.create({
                name
            })
            req.flash('alertMessage', 'Create Category ' + name + ' has been successfully!')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/categories')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/categories')
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {
                id,
                name
            } = req.body
            const category = await schemaCateogry.findOne({
                _id: id
            })
            category.name = name
            await category.save()
            req.flash('alertMessage', 'Update Category ' + name + ' has been successfully!')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/categories')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/categories')
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const {
                id
            } = req.params
            const category = await schemaCateogry.findOne({
                _id: id
            })
            req.flash('alertMessage', 'Delete Category has been successfully!')
            req.flash('alertStatus', 'success')
            await category.remove()
            res.redirect('/admin/categories')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/categories')
        }
    }
}