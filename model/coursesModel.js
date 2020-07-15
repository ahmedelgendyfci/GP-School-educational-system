const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    level: Number,
    courses:{
        firstTerm:[{
            courseTitle: String
        }],
        secondTerm:[{
            courseTitle: String
        }]
    }

})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course