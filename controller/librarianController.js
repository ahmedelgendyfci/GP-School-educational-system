const express = require('express')
const router = express.Router();
const Librarian = require('../model/librarianModel')

// push new librarian
router.post('/newLibrarian', async (req,res)=>{
    const newLibrarian = new Librarian({
        "name": req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "address":req.body.address,
        "phoneNumber": req.body.phoneNumber,
        "gender": req.body.gender
    })
    try {
        await newLibrarian.save()
        res.status(201).send(newLibrarian)
    }catch (e) {
        res.status(400).send(e)
    }

})

// view all students

const allLibrarians = async (req,res)=>{
    try {
        const librarians = await Librarian.find({}).lean();
        // console.log(librarians)
        return librarians
    }catch (e) {
        res.status(400).send(e)
    }
}
// view all Teachers
router.get('/allLibrarians',async (req,res)=>{
    const librarians = await  allLibrarians(req,res)
    res.render('allLibrarians',{
        title:"SMS || Admin Dashboard",
        librarians
    })
})


// delete student
router.delete('/librarian/:id',async (req,res)=>{
    const _id = req.params.id

    try {
        const librarian = await Librarian.findByIdAndDelete(_id)
        if(!librarian){
            res.status(404).send('librarian Not Found')
        }
        res.send(librarian)
    }catch (e) {
        res.status(400).send(e)
    }
})


const getLibrarian = async (_id)=>{
    const librarian = await Librarian.findById(_id).lean();
    return librarian;
}

router.get('/librarian/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        const librarian = await Librarian.findById(_id).lean()
        console.log(librarian)

        if(!librarian){
            res.status(404).send('Not Found')
        }
        res.render('editLibrarian',{
            librarian
        })
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/librarian/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        Librarian.findByIdAndUpdate(_id, {
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
module.exports = router