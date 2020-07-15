const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator')
const teacherSchema = new mongoose.Schema({
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
    teacherTimetable:[{
        day:{
            type: String,
            default:''
        },
        slot:{
            type: Number,
            default: 0
        },
        subject:{
            type: String,
            default:''
        },
        class:{
            type: String,
            default:''
        }
    }],
    gender:{
        type: String
    }
});
teacherSchema.plugin(uniqueValidator)
const Teacher = mongoose.model('Teacher',teacherSchema);
module.exports = Teacher;