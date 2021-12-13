module.exports = {
    dashboard: (req, res) => {
        res.render('admin/dashboard/index', {
            title: 'Staycation | Dashboard'
        })
    },
    item: (req, res) => {
        res.render('admin/item/index', {
            title: 'Staycation | Item'
        })
    },
    booking: (req, res) => {
        res.render('admin/booking/index', {
            title: 'Staycation | Booking'
        })
    },
}