const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express()
require('./model/db')


const Student = require('./model/studentModel')
const Teacher = require('./model/teacherModel')
const Librarian = require('./model/librarianModel')
const Parent = require('./model/parentModel')
const Event = require('./model/eventModel')
const Course = require('./model/coursesModel')


// set handlebars engine for html content.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(session({secret: 'sms',saveUninitialized: true,resave: false}));
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

var sess;
app.get('/login', async (req, res) => {
    res.render('login', {
        title: "SMS || Login"
    })
})
app.get('/logout',async (req,res)=>{
    console.log(req.session.email)
    req.session.destroy(function (err) {
        if (err){
            console.log(err)
        }
        else {
            res.redirect('/login')
        }
    })
})
app.post('/loginAuth', async (req, res) => {

    if (req.body.role == 'student'){
        const student = await Student.findOne({email:req.body.email})
        if(student){
            if(req.body.password == student.password){
                sess = req.session;
                sess.user = student
                sess.role = req.body.role
                res.redirect('/')
            }
            res.redirect('/login')
        }else {
            res.redirect('/login')
        }
    }
    else if (req.body.role == 'teacher'){
        const teacher = await Teacher.findOne({email:req.body.email})
        if(teacher){
            if(req.body.password == teacher.password){
                sess = req.session;
                sess.user = teacher
                sess.role = req.body.role
                res.redirect('/')
            }
            res.redirect('/login')
        }else {
            res.redirect('/login')
        }
    }
    else if (req.body.role == 'librarian'){
        const librarian = await Librarian.findOne({email:req.body.email})
        if(librarian){
            if(req.body.password == librarian.password){
                sess = req.session;
                sess.user = librarian
                sess.role = req.body.role
                res.redirect('/')
            }
            res.redirect('/login')
        }else {
            res.redirect('/login')
        }
    }
    else {
        const parent = await Parent.findOne({email:req.body.email})
        if(parent){
            if(req.body.password == parent.password){
                sess = req.session;
                sess.user = parent
                sess.role = req.body.role
                res.redirect('/')
            }
            res.redirect('/login')
        }else {
            res.redirect('/login')
        }
    }
})

app.get('/',(req,res) => {
    sess = req.session;
    if(sess.user) {
        return res.redirect('/home');
    }
    res.redirect('/login');
});
app.get('/home',async (req,res) => {
    sess = req.session
    var roles={
        student: false,
        parent:false,
        librarian:false,
        teacher:false
    }

    if(sess.role == 'student'){
        roles={
            student: true,
            parent:false,
            librarian:false,
            teacher:false
        }
    }
    if(sess.role == 'teacher'){
        roles={
            student: false,
            parent:false,
            librarian:false,
            teacher:true
        }
    }
    if(sess.role == 'librarian'){
        roles={
            student: false,
            parent:false,
            librarian:true,
            teacher:false
        }
    }
    if(sess.role == 'parent'){
        roles={
            student: false,
            parent:true,
            librarian:false,
            teacher:false
        }
    }
    console.log(roles)
    try {
        const events = await Event.find().limit(3).lean()
        const courses = await Course.find().limit(6).lean()
        // res.send(courses)
        res.render('home',{
            events,
            courses,
            roles
        })
    }catch (e) {

    }

});
app.get('/event', (req, res) => {
    res.render('event')
})
app.get('/calendar', (req, res) => {
    res.render('calendar')
})

app.get('/qb', (req, res) => {
    res.render('questionBank')
})

app.get('/parent', (req, res) => {
    res.render('parent')
})

app.get('/newst', (req, res) => {
    res.render('newStudent')
})

app.get('/createExam', (req, res) => {
    res.render('createExam')
})

app.get('/teacherProfile', (req, res) => {
    res.render('teacherProfile')
})
app.get('/addAbsance', (req, res) => {
    res.render('addAbsance');
})
// app.get('/events', (req, res) => {
//     res.render('eventsList')
// })
app.get('/teachersList', (req, res) => {
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