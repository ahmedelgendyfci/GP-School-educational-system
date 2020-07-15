const express = require('express')
const router = express.Router()
const Attendance = require('../model/attendanceModel')

router.post('/newAttendance',async (req,res)=>{
    const newAttendance = new Attendance({
        "absanceDate": req.body.absanceDate,
        "studentId": req.body.studentId
    })
    console.log(req.body)
    console.log(newAttendance)
    try {
        await newAttendance.save()
        res.send(newAttendance)
    }catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router