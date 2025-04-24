const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;




















// const mongoose=require('mongoose')
// const dotenv=require('dotenv')
// //connection logic
// mongoose.connect(process.env.MONGO_URL)

// // connection state

// const db=mongoose.connection

// //check db connection
// db.on('connected',()=>{
//     console.log('db connection is successfully')

// })

// db.on('err',()=>{
//     console.log('db connection failed')
// })

// module.exports=db