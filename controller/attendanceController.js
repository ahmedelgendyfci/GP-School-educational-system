const express = require('express')
const router = express.Router()
const Attendance = require('../model/attendanceModel')

router.get('/newAbsance/:_id/:day/:slot',async (req,res)=>{
    console.log(req.params._id)
    console.log(req.params.day)
    console.log(req.params.slot)
    console.log('----------------------------')

    const newAbsance = new Attendance({
        "day": req.params.day,
        "slot": req.params.slot,
        "studentId": req.params._id
    })
    console.log(newAbsance)
    try {
        await newAbsance.save()
        res.send(newAbsance)
    }catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router