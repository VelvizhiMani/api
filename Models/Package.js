const mongoose = require("mongoose")
const packageSchema = new mongoose.Schema({
    packagename: {
        type:Number,
        required:true
    },
    packageurl: {
        type:String,
        required:true
    },
    status: {
        type:String,
        required:true
    },
    adddate: {
        type:String,
        required:true
    },
    timestamp: {
        type: Date, default: Date.now
    },
    updatedate: {
        type: Date, default: Date.now
    },
    uptimestamp: {
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
const Package = new mongoose.model('Package',packageSchema,'package');

module.exports =  Package;