const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    absanceDate: {
        type: Date
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }
})

const Attendance = mongoose.model('Attendance', attendanceSchema)
module.exports = Attendance