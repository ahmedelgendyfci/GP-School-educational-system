const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/SMS',{
    useUnifiedTopology:true,
    autoIndex: true,
    useNewUrlParser:true,
    useCreateIndex:true

},(e)=>{
    if(!e){
        console.log('Database Connected')
    } else
    {
        console.log('Database Not Connected')
    }
})