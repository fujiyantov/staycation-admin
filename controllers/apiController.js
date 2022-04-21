const ItemSchema = require("../models/Item")
const ActivitySchema = require("../models/Activity")
const BookingSchema = require("../models/Booking")
const CategorySchema = require("../models/Category")
const BankSchema = require("../models/Bank")
const MemberSchema = require("../models/Member")

module.exports = {
    landingPage: async (req, res) => {
        try {
            const mostPicked = await ItemSchema.find().select('_id title price city country unit imageId').limit(5).populate({
                path: 'imageId',
                select: '_id imageUrl'
            })
            const category = await CategorySchema.find().select('_id name').limit(3).populate({
                path: 'itemId',
                select: '_id title price country isPopular imageId',
                perDocumentLimit: 4,
                populate: {
                    path: 'imageId',
                    select: '_id imageUrl',
                    perDocumentLimit: 1
                }
            })
            const city = await ItemSchema.find()
            const treasure = await ActivitySchema.find()
            const traveler = await BookingSchema.find()

            const testimonial = {
                _id: "asdadsa1asd",
                imageUlr: "images/testimonial2.jpg",
                name: "Fujiyantov",
                rate: 4.9,
                content: "Lorem Ipsum Dolor Sit Amet",
                familyName: "Fuji Family",
                familyOccupation: "Fuji Occupation",
            }

            res.status(200).json({
                hero: {
                    treasure: treasure.length,
                    traveler: traveler.length,
                    city: city.length
                },
                mostPicked,
                category,
                testimonial
            })
        } catch (error) {
            req.status(500).json({
                message: "internal server error"
            })
        }
    },
    detailPage: async (req, res) => {
        try {
            const {
                id
            } = req.params
            const item = await ItemSchema.find({
                _id: id
            }).populate({
                path: 'imageId',
                select: '_id imageUrl'
            }).populate({
                path: 'featureId',
                select: '_id name qty imageUrl'
            }).populate({
                path: 'activityId',
                select: '_id imageUrl'
            })

            const bank = await BankSchema.find()

            const testimonial = {
                _id: "asdadsa1asd",
                imageUlr: "images/testimonial2.jpg",
                name: "Fujiyantov",
                rate: 4.9,
                content: "Lorem Ipsum Dolor Sit Amet",
                familyName: "Fuji Family",
                familyOccupation: "Fuji Occupation",
            }

            res.status(200).json({
                ...item[0]._doc,
                bank,
                testimonial
            })
        } catch (error) {
            req.status(500).json({
                message: "internal server error"
            })
        }
    },
    booking: async (req, res) => {
        try {
            const {
                idItem,
                duration,
                price,
                bookingStartDate,
                bookingEndDate,
                firstName,
                lastName,
                email,
                phoneNumber,
                accountHolder,
                bankForm
            } = req.body
            if (!req.file) {
                res.status(422).json({
                    message: "image not found"
                })
            }

            if (
                idItem === undefined ||
                duration === undefined ||
                // price === undefined ||
                bookingStartDate === undefined ||
                bookingEndDate === undefined ||
                firstName === undefined ||
                lastName === undefined ||
                email === undefined ||
                phoneNumber === undefined ||
                accountHolder === undefined ||
                bankForm === undefined
            ) {
                res.status(422).json({
                    message: "unprocessable Entity"
                })
            }

            const item = await ItemSchema.findOne({
                _id: idItem
            })

            if (!item) {
                res.status(404).json({
                    message: "resource not found"
                })
            }

            item.sumBoking += 1
            await item.save()

            let total = item.price * duration
            let tax = price * 0.10

            const invoice = Math.floor(1000000 + Math.random() * 9000000)

            const member = await MemberSchema.create({
                firstName,
                lastName,
                email,
                phoneNumber
            })

            const storeBooking = {
                invoice,
                bookingStartDate,
                bookingEndDate,
                total: total,
                itemId: {
                    _id: item.id,
                    title: item.title,
                    price: item.price,
                    duration: duration
                },
                memberId: member.id,
                payments: {
                    proofPayment: `image/${req.file.filename}`,
                    bankFrom: bankForm,
                    accountHolder: accountHolder,
                    status: '',
                }
            }

            const booking = await BookingSchema.create(storeBooking)

            res.status(201).json({
                message: "store item has been successfully",
                booking
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: "internal server error"
            })
        }
    }
}