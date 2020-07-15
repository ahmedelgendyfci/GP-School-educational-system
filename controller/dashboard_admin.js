const express = require('express')
const router = express.Router()

router.get('/dashboard', async (req,res)=>{
    res.render('dashboard_admin',{
        title:"SMS || Admin Dashboard"
    })
})

router.get('/adminNewStudent', async (req,res)=>{
    res.render('newStudent',{
        title:"SMS || Admin Dashboard"
    })
})

router.get('/adminNewTeacher', async (req,res)=>{
    res.render('newTeacher',{
        title:"SMS || Admin Dashboard"
    })
})


router.get('/adminNewParent', async (req,res)=>{
    res.render('newParent',{
        title:"SMS || Admin Dashboard"
    })
})

router.get('/adminAllParents', async (req,res)=>{
    res.render('allParents',{
        title:"SMS || Admin Dashboard"
    })
})
router.get('/adminNewLibrarian', async (req,res)=>{
    res.render('newLibrarian',{
        title:"SMS || Admin Dashboard"
    })
})

router.get('/adminAllLibrarians', async (req,res)=>{
    res.render('allLibrarians',{
        title:"SMS || Admin Dashboard"
    })
})

router.get('/studentTimetable', async (req,res)=>{
    res.render('student-time-table',{
        title:"SMS || Admin Dashboard"
    })
})
router.get('/adminAllTimetable', async (req,res)=>{
    res.render('all-time-tables',{
        title:"SMS || Admin Dashboard"
    })
})
router.get('/adminNewEvent', async (req,res)=>{
    res.render('newEvent',{
        title:"SMS || Admin Dashboard"
    })
})
router.get('/adminAllEvents', async (req,res)=>{
    res.render('allEvents',{
        title:"SMS || Admin Dashboard"
    })
})
router.get('/viewBook', async (req,res)=>{
    res.render('view-book',{
        title:"SMS || Admin Dashboard"
    })
})


router.get('/login',async (req,res)=>{
    res.render('login',{
        title:"SMS || Login"
    })
})
router.get('/profile',async (req,res)=>{
    res.render('profile',{
        title:"SMS || profile"
    })
})
module.exports = router;