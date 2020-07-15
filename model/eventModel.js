const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventTitle: String,
    description: String,
    eventDate: Date
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event