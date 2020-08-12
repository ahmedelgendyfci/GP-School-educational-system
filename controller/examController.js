const express = require('express')
const router = express.Router()
const Exam = require('../model/examModel')
const QusetionBank = require('../model/questionBankModel')

router.post('/newExam', async (req, res) => {
    const exam = new Exam({
        "level": req.body.level,
        "subject": req.body.subject,
        "examType": req.body.examType,
        "deadline": req.body.deadline,
        "teacherEmail": req.body.teacherEmail,
        "questionsID": []
    })

    try {
        await exam.save()
        console.log(exam._id)
        // console.log('exam created')
        res.redirect('/allQuestions/' + req.body.subject + "/" + exam._id)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.get('/doExam/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const exam = await Exam.findById({_id}).lean()
        // console.log(exam)
        if (!exam) {
            res.send({
                "Message": "Exam Not Found"
            })
        }
        const course = await QusetionBank.find({course: exam.subject}).lean()

        const mcq = exam.mcqQuestionID;
        var mcqQuestions = []// collect the mcq questions for the exam
        mcq.forEach(function (id) {
            course[0].mcq.forEach(function (element) {
                element.choice.forEach(function (ele) {
                    ele.id = element._id.toString() // to add the question id to the choice elements
                })
                if (id == element._id.toString()) {
                    mcqQuestions.push(({
                        id: id,
                        content: element.content,
                        choice: element.choice,
                    }))
                }
            })
        })

        const correct = exam.correctQuestionID
        var correctQuestions = [] // collect the correct questions for the exam
        correct.forEach(function (id) {
            course[0].correct.forEach(function (element) {
                // console.log(element._id.toString())
                if (id == element._id.toString()) {
                    correctQuestions.push(({
                        id: element._id.toString(),
                        content: element.content
                    }))
                }
            })
        })
        // console.log(correctQuestions)


        res.render('doExam', {
            exam,
            mcqQuestions,
            correctQuestions
        })
        // res.send(examDetails)
    } catch (e) {
        res.send(e)
    }
})
router.get('/examByLevel/:level', async (req, res) => {
    const level = req.params.level
    try {
        const exam = await Exam.find({level})
        if (!exam) {
            res.send({
                "Message": "Exam Not Found"
            })
        }
        res.send(exam)
    } catch (e) {
        res.send(e)
    }
})
router.get('/examBySubject/:subject', async (req, res) => {
    const subject = req.params.subject
    try {
        const exam = await Exam.find({subject})
        if (!exam) {
            res.send({
                "Message": "Exam Not Found"
            })
        }
        res.send(exam)
    } catch (e) {
        res.send(e)
    }
})
router.get('/examByEmail/:email', async (req, res) => {
    const teacherEmail = req.params.email
    try {
        const exam = await Exam.find({teacherEmail})
        if (!exam) {
            res.send({
                "Message": "Exam Not Found"
            })
        }
        res.send(exam)
    } catch (e) {
        res.send(e)
    }
})
router.post('/selectedQuestions/:id', async (req, res) => {

    const examID = req.params.id
    // console.log(examID)
    console.log(req.body)
    if (!req.body.mcqQuestionID && !req.body.correctQuestionID) { // if no data sent
        res.redirect(req.get('referer'));
    } else {
        const IDs = req.body
        const exam = await Exam.findById({_id: examID})
        if (!exam) {
            res.send({
                "Message": "Exam Not Found"
            })
        }
        // console.log(IDs.mcqQuestionID)

        if (typeof (IDs.mcqQuestionID) == 'object') {
            console.log('objejct')
            IDs.mcqQuestionID.forEach(function (id) {
                console.log('1')
                if (!exam.mcqQuestionID.includes(id)) {
                    exam.mcqQuestionID.push(id)
                }
            })
            // res.send(exam)
        } else if (typeof (IDs.mcqQuestionID) == 'string') {
            console.log('string')
            if (!exam.mcqQuestionID.includes(IDs.mcqQuestionID)) {
                exam.mcqQuestionID.push(IDs.mcqQuestionID)
            }
            // res.send(exam)
        }

        if (typeof (IDs.correctQuestionID) == 'object') {
            console.log('objejct')
            IDs.correctQuestionID.forEach(function (id) {
                console.log('1')
                if (!exam.correctQuestionID.includes(id)) {
                    exam.correctQuestionID.push(id)
                }
            })
            // res.send(exam)
        } else if (typeof (IDs.correctQuestionID) == 'string') {
            console.log('string')
            if (!exam.correctQuestionID.includes(IDs.correctQuestionID)) {
                exam.correctQuestionID.push(IDs.correctQuestionID)
            }
            // res.send(exam)
        }

        await exam.save()
        res.send(exam)

        // res.send(IDs)
        // console.log(exam)
        //
        // if(
        //     IDs.mcqQuestionID.length>1
        // ){
        //     IDs.mcqQuestionID.forEach(id => {
        //         if (!exam.mcqQuestionID.includes(id)){
        //             exam.mcqQuestionID.push(id)
        //         }
        //     });
        // }
        // else {
        //     exam.mcqQuestionID.push(IDs.mcqQuestionID)
        // }
        //


        // await exam.save()
        // res.send(exam)
    }


})
router.get('/allExams', async (req, res) => {
    try {
        const exams = await Exam.find({});
        res.status(200).send(exams)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/doExam', async (req, res) => {
    res.render('doExam')
})
router.post('/createResult',async (req,res)=>{

    const studentAnswers = req.body
    const keys = Object.keys(studentAnswers)

    const exam = await Exam.findById({_id:studentAnswers['examID']})
    const courseQusetions = await QusetionBank.find({course:exam.subject})
    let examDegree = 0;

    keys.forEach(function (key) {
        if (key != 'examID'){
            if (studentAnswers[key] != 'true' && studentAnswers[key] != 'false'){
                // for mcq questions
                courseQusetions[0].mcq.forEach(function (mcqEl) {
                    if(key == mcqEl._id.toString()){
                        // compare the two values and add the degree
                        if(studentAnswers[key] == mcqEl.answer){
                            examDegree += 2;
                        }
                        // console.log(mcqEl.answer)
                        // console.log(studentAnswers[key])
                    }
                })
            }
            else {
                // for correct questions
                courseQusetions[0].correct.forEach(function (correctEl) {
                    if(key == correctEl._id.toString()){
                        // compare the two values and add the degree
                        if(studentAnswers[key] == correctEl.answer){
                            examDegree += 2;
                        }
                        // console.log(correctEl.answer)
                        // console.log(studentAnswers[key])
                    }
                })
            }

        }
    })
    res.send({
        courseQusetions,
        'degree': examDegree
    })
})

// --------------------------------------APIs for question bank---------------------------------------
router.get('/newQuestion', async (req, res) => {
    res.render('newQuestion')
})

router.post('/newQuestion', async (req, res) => {

    const type = req.body.type;
    const course = req.body.course

    try {
        const courseQuestions = await QusetionBank.find({course: course})
        // console.log('-------------')
        // console.log(courseQuestions)
        if (courseQuestions.length < 1) {
            if (type == 'choice') {
                const reqAnswer = req.body.answer;
                var answer = "";
                if (reqAnswer == 'first') {
                    answer = "a"
                } else if (reqAnswer == 'second') {
                    answer = "b"
                } else if (reqAnswer == 'third') {
                    answer = "c"
                } else {
                    answer = "d"
                }


                const newCourseQuestions = new QusetionBank({
                    "course": course,
                    "mcq": [{
                        "content": req.body.content,
                        "choice": [
                            {
                                "choiceNumber": "a",
                                "choiceContent": req.body.firstChoice
                            },
                            {
                                "choiceNumber": "b",
                                "choiceContent": req.body.secondChoice
                            },
                            {
                                "choiceNumber": "c",
                                "choiceContent": req.body.thirdChoice
                            },
                            {
                                "choiceNumber": "d",
                                "choiceContent": req.body.fourthChoice
                            }
                        ],
                        "answer": answer
                    }],
                    "correct": []
                })
                await newCourseQuestions.save()
                // console.log(newCourseQuestions)
                // console.log(newCourseQuestions.mcq[0].choice)
            }
            if (type == 'correct') {
                const newCourseQuestions = new QusetionBank({
                    "course": course,
                    "mcq": [],
                    "correct": [
                        {
                            "content": req.body.content,
                            "answer": req.body.answer
                        }
                    ]
                })
                await newCourseQuestions.save()
                // console.log(newCourseQuestions)
            }
        } else {
            if (type == 'choice') {

                const reqAnswer = req.body.answer;
                var answer = "";
                if (reqAnswer == 'first') {
                    answer = "a"
                } else if (reqAnswer == 'second') {
                    answer = "b"
                } else if (reqAnswer == 'third') {
                    answer = "c"
                } else {
                    answer = "d"
                }

                const newQ = {
                    "content": req.body.content,
                    "choice": [
                        {
                            "choiceNumber": "a",
                            "choiceContent": req.body.firstChoice
                        },
                        {
                            "choiceNumber": "b",
                            "choiceContent": req.body.secondChoice
                        },
                        {
                            "choiceNumber": "c",
                            "choiceContent": req.body.thirdChoice
                        },
                        {
                            "choiceNumber": "d",
                            "choiceContent": req.body.fourthChoice
                        }
                    ],
                    "answer": answer
                }

                await courseQuestions[0].mcq.push(newQ)
                // console.log('pushed')
                await courseQuestions[0].save()
            }
            if (type == 'correct') {
                const newQ = {
                    "content": req.body.content,
                    "answer": req.body.answer
                }
                await courseQuestions[0].correct.push(newQ)
                await courseQuestions[0].save()
            }
        }
        res.redirect('/newQuestion')
    } catch (e) {
        res.send(e)
    }

})


router.get('/allQuestions/:course/:_id', async (req, res) => {
    // console.log('d5l')
    try {
        const _id = req.params._id
        const course = req.params.course;
        const questions = await allQuestions(course)
        // console.log(questions)
        if (questions) {
            // console.log("1")
            res.render('allQuestions', {
                questions,
                examID: _id
            })
        } else {
            // console.log("2")
            const Q = {
                "course": "Not Found",
                "mcq": [],
                "correct": []
            }
            res.render('allQuestions', {
                questions: Q
            })
        }

        // res.send(questions)
    } catch (e) {
        res.status(400).send(e)
    }
})

const allQuestions = async (course) => {
    // get all questions from the question bank to complete the exam
    const allQuestions = await QusetionBank.findOne({course}).lean()
    // console.log(allQuestions)
    return allQuestions
}


module.exports = router