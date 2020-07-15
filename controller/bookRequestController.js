const express = require('express')
const router = express.Router()
const Request = require('../model/bookRequestModel')

router.post('/requestBook',async (req,res)=>{
    const newRequest = new Request({
        "bookID" : req.body.bookID,
        "userID" : req.body.userID
    })

    try {
        console.log(newRequest)
        await newRequest.save();
        res.send(newRequest)
    }catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/removeRequest/:id', async (req,res)=>{
    const _id = req.params.id;

    try {
        const request = await Request.findByIdAndDelete(_id)
        if(!request){
            res.status(404).send('request Not Found')
        }
        res.send(request)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/requests',async (req,res)=>{
    try {
        const allRequests = await Request.find({})
        res.send(allRequests)
    }catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router