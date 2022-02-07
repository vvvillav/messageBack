var mongoose = require('mongoose');


const messageSchema= new mongoose.Schema({
    id:{
        type: String
    },
    body:{
        type: String
    },
    date:{
        type: Date
    }
})

module.exports=mongoose.model('Message',messageSchema);