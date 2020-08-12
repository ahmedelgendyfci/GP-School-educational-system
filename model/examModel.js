const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    level: Number,
    subject:String,
    examType: String,
    deadline: Date,
    mark: Number,
    teacherEmail: String,
    mcqQuestionID:[],
    correctQuestionID:[]

})

const Exam = mongoose.model('Exam', examSchema)
module.exports = Exam