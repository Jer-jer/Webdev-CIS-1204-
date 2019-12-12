const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: true
    },
    images: {
        type: Array
    },
    imgName:{
        type: String
    },
    mimetype: {
        type: String
    },
    size: {
        type: String
    }
})

module.exports = mongoose.model('Article', articleSchema)