const express = require('express')
const router = express.Router();
const Admin = require('../model/adminModel')

// push new admin
router.post('/newAdmin', async (req,res)=>{
    const newAdmin = new Admin({
        "name": req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "address":req.body.address,
        "phoneNumber": req.body.phoneNumber,
        "gender": req.body.gender
    })
    try {
        await newAdmin.save()
        res.status(201).send(newAdmin)
    }catch (e) {
        res.status(400).send(e)
    }

})

// view all admins
router.get('/allAdmins',async (req,res)=>{
    try {
        const admin = await Admin.find({});
        res.status(200).send(admin)
    }catch (e) {
        res.status(400).send(e)
    }
})

// delete admin
router.delete('/admin/:id',async (req,res)=>{
    const _id = req.params.id

    try {
        const admin = await Admin.findByIdAndDelete(_id)
        if(!admin){
            res.status(404).send('admin Not Found')
        }
        res.send(admin)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/admin/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        const admin = await Admin.findById(_id);
        if(!admin){
            res.status(404).send('Not Found')
        }
        res.send(admin)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/admin/:id',async (req,res)=>{
    const _id = req.params.id;

    const allawedUupdates = ['name', 'email', 'password', 'address', 'phoneNumber', 'gender'];

    const requestedUpdates = Object.keys(req.body)

    // take every object in the sent request and check the if in the database or not
    const isValid = requestedUpdates.every((update)=> allawedUupdates.includes(update))


    if(!isValid){
        res.status(400).send('Invalid Updates')
    }

    try {
        const admin = await Admin.findById(_id);
        if(!admin){
            res.status(404).send('Not Found')
        }
        requestedUpdates.forEach((update)=>{
            admin[update] = req.body[update]
        })
        await admin.save();
        res.send(admin)
    }catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router