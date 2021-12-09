const mongoose = require("mongoose")
const imageSchema = new mongoose.Schema({
    ImageUrl: {
        type: String,
        required: [true, "Image is required"]
    }
})

module.exports = mongoose.model('Image', imageSchema)