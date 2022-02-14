const schemaCategory = require('../models/Category')
const schemaItem = require('../models/Item')
const schemaImage = require('../models/Image')
const fs = require('fs-extra')
const path = require('path')
module.exports = {
    item: async (req, res) => {
        try {
            const item = await schemaItem.find().populate({
                path: 'imageId',
                select: 'id imageUrl'
            }).populate({
                path: 'categoryId',
                select: 'id name'
            })
            const category = await schemaCategory.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {
                message: alertMessage,
                status: alertStatus
            }
            res.render('admin/item/index', {
                category,
                alert,
                item,
                action: 'view',
                title: 'Staycation | Item'
            })
        } catch (error) {
            res.redirect('/admin/items')
        }
    },
    storeItem: async (req, res) => {
        try {
            const {
                categoryId,
                title,
                price,
                city,
                about
            } = req.body
            if (req.files.length > 0) {
                const category = await schemaCategory.findOne({
                    _id: categoryId
                })
                const resource = {
                    categoryId: category._id,
                    title,
                    price,
                    city,
                    description: about
                }

                const item = await schemaItem.create(resource)
                category.itemId.push({
                    _id: item._id
                })
                await category.save()

                for (let i = 0; i < req.files.length; i++) {
                    const imageStore = await schemaImage.create({
                        imageUrl: `images/${req.files[i].filename}`
                    })
                    item.imageId.push({
                        _id: imageStore._id
                    })
                    await item.save()
                }

                req.flash('alertMessage', 'Create Item ' + title + 'has been successfully')
                req.flash('status', 'success')
                res.redirect('/admin/items')
            }
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('status', 'danger')
            res.redirect('/admin/items')
        }
    },
    editItem: async (req, res) => {
        try {
            const {
                id
            } = req.params
            const item = await schemaItem.findOne({
                _id: id
            }).populate({
                path: 'imageId',
                select: 'id imageUrl'
            }).populate({
                path: 'categoryId',
                select: 'id name'
            })
            const category = await schemaCategory.find()
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {
                message: alertMessage,
                status: alertStatus
            }
            res.render('admin/item/index', {
                category,
                alert,
                item,
                action: 'edit',
                title: 'Staycation | Edit Item'
            })
        } catch (error) {
            res.redirect('/admin/items')
        }
    },
    updateItem: async (req, res) => {
        try {
            const {
                id
            } = req.params
            const {
                categoryId,
                title,
                price,
                city,
                about
            } = req.body
            const item = await schemaItem.findOne({
                _id: id
            }).populate({
                path: 'imageId',
                select: 'id imageUrl'
            }).populate({
                path: 'categoryId',
                select: 'id name'
            })

            if (req.files.length > 0) {
                for (let i = 0; i < item.imageId.length; i++) {
                    const imageUpdate = await schemaImage.findOne({
                        _id: item.imageId[i]._id
                    })
                    await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`))
                    imageUpdate.imageUrl = `images/${req.files[i].filename}`
                    await imageUpdate.save()
                }
            }

            item.title = title;
            item.price = price;
            item.city = city;
            item.description = about;
            item.categoryId = categoryId;
            await item.save();

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {
                message: alertMessage,
                status: alertStatus
            }
            res.redirect('/admin/items')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('status', 'danger')
            res.redirect('/admin/items')
        }
    },
    deleteItem: async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const item = await schemaItem.findOne({
                _id: id
            }).populate('imageId');
            for (let i = 1; i < item.imageId.length; i++) {
                schemaImage.findOne({
                    _id: item.imageId[i]._id
                }).then((image) => {
                    fs.unlink(path.join(`public/${image.imageUrl}`));
                    image.remove();
                }).catch((error) => {
                    req.flash('alertMessage', error.message)
                    req.flash('status', 'danger')
                    res.redirect('/admin/items')
                })
            }
            await item.remove();

            req.flash('alertMessage', 'Item has been removed')
            req.flash('status', 'success')
            res.redirect('/admin/items')
        } catch (error) {
            req.flash('alertMessage', error.message)
            req.flash('status', 'danger')
            res.redirect('/admin/items')
        }
    }
}