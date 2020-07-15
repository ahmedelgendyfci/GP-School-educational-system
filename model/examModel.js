const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    level: Number,
    examType: String,
    deadline: Date,
    mark: {
        type: Number,
        default: 0
    },
    teacherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    questions:[{
        Q_Type: String,
        Q_Content: String
    }]
})

const Exam = mongoose.model('Exam', examSchema)
module.exports = Exam