const express= require('express');
const app=express();
require('dotenv').config()
const mongoose = require('mongoose');
const message = require('./models/message');
const { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser')


mongoose.connect(process.env.MONGODB_PATH)

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/messages', async (req, res)=>{
    console.log(req.body)
    try{
        const newMessages= new message({
            id: uuidv4(),
            body: req.body.body,
            date: new Date()
        });
        await newMessages.save();
        res.status(200).send({message: "Creado con exito", data: newMessages})
    }catch(e){
        console.log(e);
        res.status(500).send({message: "No se creo", data: null});
    }
})

app.get('/messages', async(req, res)=>{
    try{
        const messagesReceived = await  message.find({}).sort({ date: -1 })
        console.log(messagesReceived);
        res.status(201).send({ messagesReceived });
    }catch(e){
        console.log(e);
        res.status(400).send({message: "No se muestra",data:null});
    }
})

/*
app.get('/messages/:messageId', (req, res)=>{
    
})
*/

app.listen(3000);
console.log('Server on port 3000');