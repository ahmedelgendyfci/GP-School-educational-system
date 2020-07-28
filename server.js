const express = require('express');
const exphbs = require('express-handlebars');

const app = express()
const bodyParser = require('body-parser');

require('./model/db')
// set handlebars engine for html content.
app.engine('handlebars',exphbs());
app.set('view engine', 'handlebars');

// change the directory for the front-end files.
app.use(express.static(__dirname + '/public'));

const stuRouter = require('./controller/studentController')
const teacherRouter = require('./controller/teacherController')
const exam = require('./controller/examController')
const admin = require('./controller/adminController')
const timetable = require('./controller/timeTableController')
const bookRequest = require('./controller/bookRequestController')
const attendance = require('./controller/attendanceController')
const course = require('./controller/coursesController')
const adminDashboard = require('./controller/dashboard_admin')
const librarian = require('./controller/librarianController')
const parent = require('./controller/parentController')
const event = require('./controller/eventController')
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.render('home')
    // res.redirect('/dashboard')
})
app.get('/event',(req,res)=>{
    res.render('event')
})
app.get('/calendar',(req,res)=>{
    res.render('calendar')
})

app.get('/qb',(req,res)=>{
    res.render('questionBank')
})

app.get('/parent',(req,res)=>{
    res.render('parent')
})

app.get('/newst',(req,res)=>{
    res.render('newStudent')
})
app.get('/teacherProfile',(req,res)=>{
    res.render('teacherProfile')
})
app.get('/addAbsance',(req,res)=>{
    res.render('addAbsance');
})
app.get('/events',(req,res)=>{
    res.render('eventsList')
})
app.get('/teachersList',(req,res)=>{
    res.render('teachersList')
})


app.use(stuRouter)
app.use(parent)
app.use(librarian)
app.use(teacherRouter)
app.use(exam)
app.use(admin)
app.use(timetable)
app.use(bookRequest)
app.use(attendance)
app.use(course)
app.use(adminDashboard)
app.use(event)


app.listen(port, () => {
    console.log('Server Works On Port: ', port)
})