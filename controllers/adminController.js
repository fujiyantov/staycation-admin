const schemaCateogry = require('../models/Category')

module.exports = {
    dashboard: (req, res) => {
        res.render('admin/dashboard/index')
    },
    category: (req, res) => {
        res.render('admin/category/index')
    },
    storeCategory: async (req, res) => {
        const {
            name
        } = req.body

        await schemaCateogry.create({
            name
        })

        res.redirect('/admin/categories')
    },
    bank: (req, res) => {
        res.render('admin/bank/index')
    },
    item: (req, res) => {
        res.render('admin/item/index')
    },
    booking: (req, res) => {
        res.render('admin/booking/index')
    },
}