const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    cat_id: {
        type:Number,
        required:true
    },
    url: {
        type:String,
        required:true
    },
    category_name: {
        type:String,
        required:true
    },
    cat_type: {
        type:String,
        required:true
    },
    cat_img:{
        type:String,
        required:true
    },
    stockcheck:{
        type:String,
        required:true
    },
    imagealt:{
        type:String,
        required:true
    },
    vedio:{
        type:String,
        required:true
    },
    vedioalt:{
        type:String,
        required:true
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
    status:{
        type:String,
        required:true
    },
    timestamp: {
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const Category = new mongoose.model('Category',categorySchema,'category');

module.exports =  Category;