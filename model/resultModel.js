const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    stu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    total_exams:[{
        examID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam'
        },
        mark:{
            type: Number
        }
    }],
    total_mark: Number


})

const Result = mongoose.model('Result', resultSchema)
module.exports = Result