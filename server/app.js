const app=require('./server')

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

const port=process.env.PORT_NUMBER||4000
app.listen(port,()=>{
    console.log(`listening to requests on port:${port}`)
})