const mongoose = require("mongoose")
// const validator = require("validator")

const subcategorySchema = new mongoose.Schema({
    url: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    image: {
        type: String
    },
    gallery: {
        type: String
    },
    created_at: { type: Date, default: Date.now },
}, {
    collection: 'subcategory'
})

// we will create a new collection

const Subcategory = new mongoose.model('Subcategory',subcategorySchema);

module.exports =  Subcategory;