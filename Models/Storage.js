const mongoose = require("mongoose")
const storageSchema = new mongoose.Schema({
    storagename: {
        type:Number,
        required:true
    },
    storageurl: {
        type:String,
        required:true
    },
    status: {
        type:String,
        required:true
    },
    adddate: {
        type: Date, default: Date.now
    },
    timestamp:{
        type: Date, default: Date.now
    },
    updatedate:{
        type: Date, default: Date.now
    },
    uptimestamp:{
        type: Date, default: Date.now
    },
    adduser: {
        type: Date, default: Date.now
    },
    adduser: {
        type:String,
        required:true
    },
    updateuser: {
        type:String,
        required:true
    },
    updated_at: {
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const Storage = new mongoose.model('Storage',storageSchema,'storage');

module.exports =  Storage;