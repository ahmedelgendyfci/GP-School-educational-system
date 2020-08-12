const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    day: {
        type: String
    },
    slot: {
        type: String
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
})

const Attendance = mongoose.model('Attendance', attendanceSchema)
module.exports = Attendance