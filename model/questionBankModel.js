const mongoose = require('mongoose')

const questionBankSchema = new mongoose.Schema({
    level:Number,
    mcq:[{
        content:{
            type: String,
            required: true
        },
        choice:[
            {
                choiceNumber: String,
                choiceContent: String
            }
        ],
        answer:{
            type: String,
            required: true
        }
    }],
    correct:[{
        content:{
            type: String,
            required: true
        },
        answer:{
            type: String
        }
    }]

})


const QuestionBank = mongoose.model('QuestionBank',questionBankSchema)
module.exports = QuestionBank