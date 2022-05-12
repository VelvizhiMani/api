const mongoose = require("mongoose")
const subcategorySchema = new mongoose.Schema({
    sub_cat_id: {
        type:String,
        required:true
    },
    cat_name: {
        type:String,
        required:true,
        trim: true
    },
    url: {
        type: String
    },
    subcat_name: {
        type: String
    },
    cat_img: {
        type: String  
    },
    imagealt: {
        type: String
    },
    vedio: {
        type: String
    },
    vedioalt: {
        type: String
    },
    banner: {
        type: String
    },
    metatitle:{
        type:String,
        required:true
    },
    metakeyword:{
        type:String,
        required:true
    },
    metadesc:{
        type:String,
        required:true
    },
    status: {
        type: String
    },
    timestamp: {
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const Subcategory = new mongoose.model('Subcategory',subcategorySchema,'subcategory');

module.exports =  Subcategory;