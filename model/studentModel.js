const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
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
    level:{
        type: Number,
        default: 1
    },
    classCode:{
        type: String,
        default: "1.1"
    },
    gender:{
        type: String
    },
    fee:{
        type: Boolean,
        default: false
    }
});

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;