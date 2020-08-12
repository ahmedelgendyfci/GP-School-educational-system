const express = require('express')
const router = express.Router()
const Course = require('../model/coursesModel')

router.get('/newCourse', async (req,res)=>{
    res.render('newCourse')
})
router.post('/newCourse', async (req,res)=>{
    try {
        const newCourse = new Course(req.body)
        await newCourse.save()
        res.redirect('/dashboard')
    }catch (e) {
        res.send(e)
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

router.get('/allCourses', async (req,res)=>{
    try {
        const courses = await Course.find().lean()
        if(!courses)
            throw('level not available')
        res.render('allCourses',{
            courses
        })
    }catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router