module.exports = {
    dashboard: (req, res) => {
        res.render('admin/dashboard/index', {
            title: 'Staycation | Dashboard'
        })
    },
    booking: (req, res) => {
        res.render('admin/booking/index', {
            title: 'Staycation | Booking'
        })
    },
}