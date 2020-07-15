const express = require('express')
const router = express.Router()
const Exam = require('../model/examModel')
const QusetionBank = require('../model/questionBankModel')

router.post('/newExam',async (req,res)=>{
    const exam = new Exam({
        "level": req.body.level,
        "examType": req.body.examType,
        "deadline": req.body.deadline,
        "teacherID": req.body.teacherID,
        "questions": []
    })

    try {
        await exam.save()
        console.log('exam created')
        res.redirect('/selectQuestions')
    }catch (e) {
        res.status(500).send(e)
    }
})

router.get('/selectQuestions',async (req,res)=>{
    // get all questions from the question bank
    // depends on the level
    // select questions
})

router.get('/allExams',async (req,res)=>{
    try {
        const exams = await Exam.find({});
        res.status(200).send(exams)
    }catch (e) {
        res.status(400).send(e)
    }
})





// --------------------------------------APIs for question bank---------------------------------------





router.post('/setupQuestionBank/:level',async (req,res)=>{
    const level = req.params.level
    try {
        const setupQB = new QusetionBank({
            "level": level,
            "mcq":[],
            "correct":[]
        })

        const QB = await QusetionBank.findOne({level});

        if(QB)
            throw('The level found, try again');

        await setupQB.save();
        res.send(setupQB)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/addQusetion/:level/:type',async (req,res)=>{

    const level = req.params.level
    const type = req.params.type

    try {
        const questions = await allQuestions(level)
        if(!questions){
            res.status(404).send('level not found')
        }
        console.log(questions)
        if(type == 'mcq'){
            // console.log("mcq")
            const newQuestion = {
                content: req.body.content,
                choice: req.body.choice,
                answer: req.body.answer
            }

            console.log(newQuestion)
            await questions.mcq.push(newQuestion)

            // console.log(questions[0].mcq)

            await questions.save();
        }
        else if(type == 'correct'){
            const newQuestion = {
                "content": req.body.content,
                "answer": req.body.answer
            }

            await questions.correct.push(newQuestion)
            await questions.save();
        }

        // allQuestions()
        res.send(questions);

    }catch (e) {
        res.status(400).send(e)
    }


})

router.get('/allQuestions/:level', async (req,res)=>{
    const level = req.params.level;

    try {
       const questions = await allQuestions(level)
        // console.log(questions)
        res.send(questions)
    }catch (e) {
        res.status(400).send(e)
    }
})

const allQuestions = async (level)=>{
    // get all questions from the question bank to complete the exam
    const allQuestions = await QusetionBank.findOne({level})
   // console.log(allQuestions)
    return allQuestions
}

module.exports = router