const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
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
    gender: {
        type: String
    }
});

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;