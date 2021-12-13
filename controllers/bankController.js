const schemaBank = require('../models/Bank')
const fs = require('fs-extra')
const path = require('path')
module.exports = {
    bank: async (req, res) => {
        try {
            const banks = await schemaBank.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {
                message: alertMessage,
                status: alertStatus
            }
            res.render('admin/bank/index', {
                banks,
                alert,
                'title': 'Staycation | Bank'
            })
        } catch (error) {
            res.redirect('/admin/banks')
        }
    },
    storeBank: async (req, res) => {
        try {
            const {
                nameBank,
                nomorRekening,
                name
            } = req.body

            await schemaBank.create({
                nameBank,
                nomorRekening,
                name,
                imageUrl: `images/${req.file.filename}`
            })
            req.flash('alertMessage', 'Create Bank ' + name + 'has been successfully')
            req.flash('status', 'success')
            res.redirect('/admin/banks')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('status', 'danger')
            res.redirect('/admin/banks')
        }
    },
    updateBank: async (req, res) => {
        try {
            const {
                nameBank,
                nomorRekening,
                name,
                id
            } = req.body
            const bank = await schemaBank.findOne({
                _id: id
            })
            if(req.file == undefined) {

                bank.nameBank = nameBank
                bank.nomorRekening = nomorRekening
                bank.name = name
                await bank.save();
            } else {
                await fs.unlink(path.join(`public/${bank.imageUrl}`))
                bank.nameBank = nameBank
                bank.nomorRekening = nomorRekening
                bank.name = name
                bank.imageUrl = `images/${req.file.filename}`
                await bank.save();
            }

            req.flash('alertMessage', 'Update bank ' + name + 'has been successfully')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/banks')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/banks')
        }
    },
    deleteBank: async (req, res) => {
        try {
            const {
                id
            } = req.params
            bank = await schemaBank.findOne({
                _id: id
            })
            req.flash('alertMessage', 'Destory bank has been successfully')
            req.flash('alertStatus', 'success')
            await fs.unlink(path.join(`public/${bank.imageUrl}`))
            await bank.remove()
            res.redirect('/admin/banks')
        } catch (error) {
            req.flash('alertMessage', 'Destory bank has been successfully')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/banks')
        }
    }
}