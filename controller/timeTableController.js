const express = require('express')
const router = express.Router()
const Table = require('../model/timeTable_Stu_Model')

router.post('/newLecture',async (req,res)=>{
    const newLec = new Table({
        "level": req.body.level,
        "lectures": {
            "day": req.body.day,
            "slot_num": req.body.slot,
            "subject": req.body.subject
        }
    })
    const newSlot = {
        "day": req.body.day,
        "slot_num": req.body.slot,
        "subject": req.body.subject
    }
    try {
        console.log('1')
        if(getTimeTable(newLec.level)){
            console.log('2')
            throw "MongoError"
        }
    }catch (e) {
        console.log('3')
        if(e == "MongoError"){
            // get table of the needed level first
            const table = await getTimeTable(req.body.level);

            console.log('4')
            if(!table){

                console.log('5')
                await newLec.save();

                res.send()
                console.log('6')
            }else
            {
                // check if the lecture that needed to add available or not

                console.log('7')

                const {available,index} = await isAvailable(table.lectures,newLec.lectures)

                console.log('8')
                if(available) {
                    // console.log('mota7 w haydef')
                    console.log('9')
                     table.lectures.push(newSlot)

                    console.log('10')
                }else{
                    // console.log('m4 mota7 w hy3adel')
                    console.log('11')
                     table.lectures[index] = newSlot
                }
                await table.save()
                // console.log('7afaz el 7sa')
                res.send()
            }

        }else {

            res.status(400).send(e)
        }

    }
})

//get table of lectures for the sent level
const getTimeTable = async (level)=>{

    try {
        console.log('t1')
        const lectures = await Table.findOne({level});
        return lectures
    }catch(e)
    {
        console.log(e)
        return false
    }


}

// check if the slot available or not to add or modify
const isAvailable = (lectures,newLecture)=>{
    var index = 0;
    console.log('lec of request')
    console.log(newLecture)
    console.log('1 avial')
    for(i=0 ; i<lectures.length ; i++){
        if(newLecture[0].slot_num == lectures[i].slot_num && newLecture[0].day == lectures[i].day){
            index = i
            console.log('2 avial')

            return {"available":false,"index":index}
        }
    }
    console.log('3 avial')

    return  {"available":true,"index":index}
}

router.get('/timeTable',async (req,res)=>{
    try {
        const tables = await Table.find({});
        res.send(tables)
    }catch (e) {
        res.send(400).send(e)
    }
})

router.get('/timeTable/:level',async (req,res)=>{
    const level = await req.params.level;
    // console.log(level)
    try {
        const table = await getTimeTable(level)
        if(!table){
            res.status(404).send('table not found')
        }
        res.send(table)
    }catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router