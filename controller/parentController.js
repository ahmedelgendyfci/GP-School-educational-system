const express = require('express')
const router = express.Router();
const Parent = require('../model/parentModel')
const Student = require('../model/studentModel')

// push new student
const getStudent = async (email)=>{
    const student = await Student.findOne({email});
    return student
}
router.post('/newParent', async (req,res)=>{
    const newParent = new Parent({
        "name": req.body.name,
        "studentEmail": req.body.studentEmail,
        "email":req.body.email,
        "password":req.body.password,
        "gender": req.body.gender
    })
    try {
        const student = await getStudent(newParent.studentEmail)
        if(!student)
            throw "Student not found"

        await newParent.save()
        res.status(201).send(newParent)
    }catch (e) {
        res.status(400).send(e)
    }

})

// view all students

const allParents = async (req,res)=>{
    try {
        const parents = await Parent.find({}).lean();
        return parents
    }catch (e) {
        res.status(400).send(e)
    }
}
router.get('/allParents',async (req,res)=>{
    const parents = await allParents(req,res)
    res.render('allParents',{
        title:"SMS || Admin Dashboard",
        parents
    })
})

// delete student
router.delete('/parent/:id',async (req,res)=>{
    const _id = req.params.id

    try {
        const parent = await Parent.findByIdAndDelete(_id)
        if(!parent){
            res.status(404).send('Parent Not Found')
        }
        res.send(parent)
    }catch (e) {
        res.status(400).send(e)
    }
})
const getParent = async (_id)=>{
    const parent = await Parent.findById(_id).lean();
    return parent
}
router.get('/parent/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        const parent = await getParent(_id)

        if(!parent){
            res.status(404).send('Not Found')
        }
        // console.log(parent)
        res.render('editParent',{
            parent
        })
        // res.send()
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/parent/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        Parent.findByIdAndUpdate(_id, {
                name: req.body.name,
                email: req.body.email,
                studentEmail: req.body.studentEmail,
                gender: req.body.gender,
                password: req.body.password
            },
            function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated User : ", docs)
                }
            });
        // const parent = await Parent.findById(_id);
        // console.log(parent)
        // if(!parent){
        //     res.status(404).send('Not Found')
        // }
        // requestedUpdates.forEach((update)=>{
        //     parent[update] = req.body[update]
        // })
        // await parent.save();
        res.send()
    }catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router