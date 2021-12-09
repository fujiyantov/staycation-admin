const mongoose = require("mongoose")
const bankSchema = new mongoose.Schema({
    nomorBank: {
        type: String,
        required: true
    },
    nomorRekening: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Bank', bankSchema)