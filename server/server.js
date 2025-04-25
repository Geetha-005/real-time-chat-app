const express=require('express')
// const dbconfig=require('./config/db.config.js')
const authrouter=require('./controllers/auth.controller.js')
const userrouter=require('./controllers/user.controllers.js')
const chatrouter=require('./controllers/chat.controller.js')
const messagerouter=require('./controllers/message.controller.js')

require('dotenv').config();

const connectDB = require('./config/db.config');


const dotenv=require('dotenv')
const app=express()
//dotenv.config({path:'./config.env'})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',authrouter)
app.use('/api/user',userrouter)
app.use('/api/chat',chatrouter)
app.use('/api/message',messagerouter)

const port=process.env.PORT_NUMBER||4000
app.listen(port,()=>{
    console.log(`listening to requests on port:${port}`)
    connectDB();
})



//http://localhost:6000/api/auth/signup


//ZE5mt1CycG5SV1S7
//geetachilla4
//mongodb+srv://geetachilla4:<db_password>@cluster0.2qfcrod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0