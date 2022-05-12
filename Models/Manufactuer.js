const mongoose = require("mongoose")
const manufactuerSchema = new mongoose.Schema({
    manufactuername: {
        type:Number,
        required:true
    },
    manufactuerurl: {
        type:String,
        required:true
    },
    manufactueraddress: {
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
    adddate: {
        type:String,
        required:true
    },
    adduser:{
        type:String,
        required:true
    },
    updateuser:{
        type:String,
        required:true
    },
    timestamp: {
        type: Date, default: Date.now
    },
    updatedate:{
        type: Date, default: Date.now
    },
    uptimestamp :{
        type: Date, default: Date.now
    },
    updated_at :{
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const Manufactuer = new mongoose.model('Manufactuer',manufactuerSchema,'manufactuer');

module.exports =  Manufactuer;