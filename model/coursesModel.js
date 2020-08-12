const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    level: Number,
    course:String
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course