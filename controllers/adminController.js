const User = require('../models/Users')
const bcrypt = require('bcrypt')

module.exports = {
    dashboard: (req, res) => {
        res.render('admin/dashboard/index', {
            title: 'Staycation | Dashboard',
            user: req.session.user
        })
    },
    booking: (req, res) => {
        res.render('admin/booking/index', {
            title: 'Staycation | Booking',
            user: req.session.user
        })
    },
    viewSignIn: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {
                message: alertMessage,
                status: alertStatus
            }

            if(req.session.user == null || req.session.user == undefined) {
                res.render('index', {
                    alert,
                    title: 'Staycation | Login'
                })
            } else {
                res.redirect('/admin/dashboard')
            }
            
        } catch (error) {
            res.redirect('/admin/signin')
        }
    },
    actionSignIn: async (req, res) => {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username: username})
            if(!user) {
                req.flash('alertMessage', 'User tidak ditemukan')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/signin')
            } 

            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if(!isPasswordMatch) {
                req.flash('alertMessage', 'Password tidak sama')
                req.flash('alertStatus', 'danger')
                res.redirect ('/admin/signin')
            }

            req.session.user = {
                id: user.id,
                username: user.username
            }

            res.redirect('/admin/dashboard')
        } catch (error) {
            res.redirect('/admin/signin')
        }
    },
    actionSignOut: async (req, res) => {
        req.session.destroy();
        res.redirect('/admin/signin')
    }
}