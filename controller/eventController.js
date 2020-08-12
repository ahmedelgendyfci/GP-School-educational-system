const express = require('express')
const router = express.Router();
const Event = require('../model/eventModel')

// push new event
router.post('/newEvent', async (req,res)=>{
    const newEvent = new Event(req.body)
    try {
        await newEvent.save()
        res.status(201).send(newEvent)
    }catch (e) {
        res.status(400).send(e)
    }

})

// view all events
const allEvents = async (req,res)=>{
        const events = await Event.find({}).lean();
        return events

}
router.get('/allEvents',async (req,res)=>{
    const events = await allEvents(req,res)
    res.render('allEvents',{
        title:"SMS || Admin Dashboard",
        events
    })
})

router.get('/events',async (req,res)=>{
    const events = await allEvents(req,res)
    res.render('eventsList',{
        title:"SMS || Events",
        events
    })
})

// delete event
router.delete('/event/:id',async (req,res)=>{
    const _id = req.params.id

    try {
        const event = await Event.findByIdAndDelete(_id)
        if(!event){
            res.status(404).send('event Not Found')
        }
        res.send()
    }catch (e) {
        res.status(400).send(e)
    }
})
router.get('/test',(req,res)=>{
    console.log(req.body)
})
const FindEvent = async (_id)=>{
    const event = await Event.findById(_id).lean()
    return event
}
router.get('/editEvent/:id',async (req,res)=>{
    const _id = req.params.id;
    try {
        const event = await FindEvent(_id)
        if(!event){
            res.status(404).send('Not Found')
        }
        res.render('editEvent',{
            event
        })
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/event/:id',async (req,res)=>{

    const _id = req.params.id;
    try {

        Event.findByIdAndUpdate(_id, {
            'eventTitle': req.body.eventTitle,
            'description': req.body.description,
            'eventDate': req.body.eventDate
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