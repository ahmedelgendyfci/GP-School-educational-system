const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    stu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    examID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    teacherEmail: String,
    examType: String,
    course: String,
    mark: Number


})

const Result = mongoose.model('Result', resultSchema)
module.exports = Result