const express = require('express')
const router = express.Router();
const Student = require('../model/studentModel')
const QRCode = require('qrcode')
const session = require('express-session');
// push new student
var sess;
router.post('/newStudent', async (req, res) => {
    //  console.log(req.body)
    const newStudent = new Student({
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "address": req.body.address,
        "phoneNumber": req.body.phoneNumber,
        "level": req.body.level,
        "gender": req.body.gender,
        "classCode": req.body.classCode
    })
    try {
        await newStudent.save()
        res.status(201).send(newStudent)
    } catch (e) {

        res.status(400).send(e)
    }

})

// view all students
const allStudents = async (req, res) => {
    try {
        const students = await Student.find({}).lean();
        // console.log(students)
        return students;
    } catch (e) {
        res.status(400).send(e)
    }
}
router.get('/allStudents', async (req, res) => {
    const students = await allStudents(req, res)
    //console.log(students[0])
    res.render('allStudents', {
        title: "SMS || Admin Dashboard",
        stu: students
    })
})

// delete student
router.delete('/student/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const student = await Student.findByIdAndDelete(_id)
        if (!student) {
            res.status(404).send('Student Not Found')
        }
        res.send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})

const studentsByClass = async (classCode) => {
    const students = await Student.find({classCode})
    return students
}

router.post('/classCode', async (req, res) => {
    // console.log(req.body)
    var studentCodes = [];
    const studentsIDs = await studentsByClass(req.body.classCode)
    studentsIDs.forEach(async (stu) => {
        const code = await QRCode.toDataURL("localhost:3000/newAbsance/" + stu._id + "/" + req.body.day + "/" + req.body.slot);
        studentCodes.push({
            "classCode": stu.classCode,
            "name": stu.name,
            "code": code
        })
    })
    res.render('classAttendance', {
        studentCodes
    })
})

router.get('/student/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const student = await Student.findById(_id).lean();
        //console.log(student)
        if (!student) {
            res.status(404).send('Not Found')
        }
        res.render('editStudent', {
            student
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/profile', async (req, res) => {
    const sess = req.session
    const email = sess.user.email;
    console.log(email)
    try {
        const student = await Student.find({email:email}).lean();
        //console.log(student)
        if (!student) {
            res.status(404).send('Not Found')
        }
        res.render('profile', {
            student
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/student/:id', async (req, res) => {
    const _id = req.params.id;


    try {
        Student.findByIdAndUpdate(_id, {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                gender: req.body.gender,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                level: req.body.level,
                fee: req.body.fee,
                classCode: req.body.classCode
            },
            function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log("Updated User : ", docs)
                }
            });
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router