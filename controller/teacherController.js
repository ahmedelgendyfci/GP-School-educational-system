const express = require('express')
const router = express.Router();
const Teacher = require('../model/teacherModel')

// push new Teacher
router.post('/newTeacher', async (req,res)=>{
    const newTeacher = new Teacher({
        "name": req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "address":req.body.address,
        "phoneNumber": req.body.phoneNumber,
        "gender": req.body.gender
    })
    try {
        await newTeacher.save()
        res.status(201).send(newTeacher)
    }catch (e) {
        res.status(400).send(e)
    }

})
const allTeachers = async (req,res)=>{
    try {
        const teachers = await Teacher.find({}).lean();
        return teachers
        res.status(200).send(teachers)
    }catch (e) {
        res.status(400).send(e)
    }
}
// view all Teachers
router.get('/allTeachers',async (req,res)=>{
    const teachers = await  allTeachers(req,res)
    res.render('allTeachers',{
        title:"SMS || Admin Dashboard",
        teachers
    })
})

// delete Teacher
router.delete('/teacher/:id',async (req,res)=>{
    const _id = req.params.id

    try {
        const teacher = await Teacher.findByIdAndDelete(_id)
        if(!teacher){
            res.status(404).send('Teacher Not Found')
        }
        res.send(teacher)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/teacher/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        const teacher = await Teacher.findById(_id).lean();
        if(!teacher){
            res.status(404).send('Not Found')
        }
        res.render('editTeacher',{
            teacher
        })
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/teacher/:id',async (req,res)=>{
    const _id = req.params.id;


    try {
        Teacher.findByIdAndUpdate(_id, {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                gender: req.body.gender,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password
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

router.patch('/teacherTimetable/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const teacher = await Teacher.findById(_id)
        if(!teacher){
            res.status(404).send('not Found')
        }
        const newLecture = req.body

        // check if the teacher is available or not
        var index = 0;
        const isAvailable = ()=>{
            var available = true
            for(i=0 ; i<teacher.teacherTimetable.length ; i++){
                if(newLecture.slot == teacher.teacherTimetable[i].slot && newLecture.day == teacher.teacherTimetable[i].day){
                    index = i
                    return false
                }
            }
            return true
        }

        // if is available
        if(isAvailable()){
            teacher.teacherTimetable.push(newLecture)
        }

        // if not available
        if(!isAvailable()){
            teacher.teacherTimetable[index] = newLecture
        }

        await teacher.save()
        res.send(teacher)

    }catch (e) {

        res.status(400).send(e)
    }
})

module.exports = router