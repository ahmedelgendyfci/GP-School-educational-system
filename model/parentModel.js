const mongoose = require('mongoose');
const validator = require('validator');

const parentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true,
        ref: 'Student'
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
    gender:{
        type: String
    }
});

const Parent = mongoose.model('Parent',parentSchema);
module.exports = Parent;