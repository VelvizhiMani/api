const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ModelSchema = new Schema({
    language: {
        type: String
    },
    category: {
        type: String
    },
    modelname: {
        type: String
    },
    image: {
        type: String
    },
    url: {
        type: String
    },
    // timestamp: { 
    //     type: String, 
    //     default: Date 
    // },
}, {
    collection: 'modelphotos'
})

module.exports = mongoose.model('Modelphoto', ModelSchema)