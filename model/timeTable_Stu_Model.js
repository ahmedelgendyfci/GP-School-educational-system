const mongoose = require('mongoose')

const timeTableSchema_Stu = new mongoose.Schema({
    level: {
        type: String
    },
    lectures:[
        {
            day: String,
            slot_num: Number,
            subject: String
        }
    ]
})

const Timetable_Student = mongoose.model('Timetable_Student',timeTableSchema_Stu);
module.exports = Timetable_Student