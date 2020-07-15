const mongoose = require('mongoose');
const validator = require('validator');

const librarianSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    address:{
        type: String
    },
    phoneNumber:{
        type: Number
    },
    timetable:[{
        day:{
            type: String,
            default:''
        },
        slot:{
            type: Number,
            default: 0
        },
        class:{
            type: String,
            default:''
        }
    }],
    gender: String
});

const Librarian = mongoose.model('Librarian',librarianSchema);
module.exports = Librarian;