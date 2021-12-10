module.exports = {
    dashboard: (req, res) => {
        res.render('admin/dashboard/index')
    },
    category: (req, res) => {
        res.render('admin/category/index')
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