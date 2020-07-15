const express = require('express')
const router = express.Router()
const Course = require('../model/coursesModel')

router.get('/addCourse/:level',async (req,res)=>{

    const level = req.params.level;

    const newCourse = new Course({
        "level": level,
        "courses":{
            "firstTerm":[],
            "secondTerm":[]
        }
    })

    try {
        const course = await Course.findOne({level});

        if(course)
            throw('The level found, try again');

        await newCourse.save();
        res.send(newCourse)
    }catch (e) {
        res.status(400).send(e)
    }
})


router.patch('/addCourse/:level/:term',async (req,res)=>{

    const level = req.params.level
    const term = req.params.term
    // console.log(term)
    try {
        const courses = await Course.findOne({level})

        if(!courses){
            res.status(404).send('level not found')
        }
        if(term == 'first'){
            // console.log(term)
            // console.log("mcq")
            const newCourse = {
                "courseTitle": req.body.courseTitle
            }

            await courses.courses.firstTerm.push(newCourse)
            console.log(courses)
            // console.log(questions[0].mcq)

            await courses.save();
        }
        else if(term == 'second'){
            const newCourse = {
                "courseTitle": req.body.courseTitle
            }

            await courses.courses.secondTerm.push(newCourse)
            await courses.save();
        }

        // allQuestions()
        res.send(courses);

    }catch (e) {
        res.status(400).send(e)
    }
})


router.get('/allCourses/:level', async (req,res)=>{
    const level = req.params.level;

    try {
        const courses = await Course.findOne({level})
        if(!courses)
            throw('level not available')
        // console.log(questions)
        res.send(courses)
    }catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router