const express = require('express')
const router = express.Router();
const Book = require('../model/bookModel')

// push new student
router.post('/newBook', async (req,res)=>{
    const newBook = new Book({
        "title": req.body.title,
        "auther":req.body.auther,
    })
    try {
        await newBook.save()
        res.status(201).send(newBook)
    }catch (e) {
        res.status(400).send(e)
    }

})

// view all students
router.get('/allBooks',async (req,res)=>{
    try {
        const books = await Book.find({});
        res.status(200).send(books)
    }catch (e) {
        res.status(400).send(e)
    }
})

// delete student
router.delete('/book/:id',async (req,res)=>{
    const _id = req.params.id

    try {
        const book = await Book.findByIdAndDelete(_id)
        if(!book){
            res.status(404).send('book Not Found')
        }
        res.send(book)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/book/:id',async (req,res)=>{
    const _id = req.params.id;

    try {
        const book = await Book.findById(_id);
        if(!book){
            res.status(404).send('Not Found')
        }
        res.send(book)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/book/:id',async (req,res)=>{
    const _id = req.params.id;

    const allawedUupdates = ['name', 'email', 'password', 'address', 'phoneNumber', 'level', 'gender', 'fee'];

    const requestedUpdates = Object.keys(req.body)

    // take every object in the sent request and check the if in the database or not
    const isValid = requestedUpdates.every((update)=> allawedUupdates.includes(update))


    if(!isValid){
        res.status(400).send('Invalid Updates')
    }

    try {
        const book = await Book.findById(_id);
        if(!book){
            res.status(404).send('Not Found')
        }
        requestedUpdates.forEach((update)=>{
            book[update] = req.body[update]
        })
        await book.save();
        res.send(book)
    }catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router