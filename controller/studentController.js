const express = require('express')
const router = express.Router();
const Student = require('../model/studentModel')

// push new student
router.post('/newStudent', async (req,res)=>{
    console.log(req.body)
    const newStudent = new Student({
        "name": req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "address":req.body.address,
        "phoneNumber": req.body.phoneNumber,
        "level":req.body.level,
        "gender": req.body.gender
    })
    try {
        await newStudent.save()
        res.status(201).send(newStudent)
    }catch (e) {

        res.status(400).send(e)
    }

})

// view all students
const allStudents = async (req,res)=>{
    try {
        const students = await Student.find({}).lean();
        // console.log(students)
        return students;
    }catch (e) {
        res.status(400).send(e)
    }
}
router.get('/allStudents',async (req,res)=>{
    const students = await allStudents(req,res)
    console.log(students[0])
    res.render('allStudents',{
        title:"SMS || Admin Dashboard",
        stu: students
    })
})

// delete student
router.delete('/student/:id',async (req,res)=>{
    const _id = req.params.id

    try {
        const student = await Student.findByIdAndDelete(_id)
        if(!student){
            res.status(404).send('Student Not Found')
        }
        res.send(student)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/student/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        const student = await Student.findById(_id).lean();
        console.log(student)
        if(!student){
            res.status(404).send('Not Found')
        }
        res.render('editStudent',{
            student
        })
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/student/:id',async (req,res)=>{
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
                fee: req.body.fee
            },
            function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    // console.log("Updated User : ", docs)
                }
            });
        res.send()
    }catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router