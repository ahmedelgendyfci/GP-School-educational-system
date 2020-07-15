const mongoose = require('mongoose')

const BookRequestSchema = new mongoose.Schema({
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const BookRequest = mongoose.model('BookRequest',BookRequestSchema )

module.exports = BookRequest