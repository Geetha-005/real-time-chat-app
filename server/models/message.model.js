const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,ref:'chats'
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,ref:'users'
    },
    text:{
        type:String,
        required:true

    },
    read:{
        type:Boolean,
        default:false,

    }
},{timestamps:true})

module.exports=mongoose.model('message',messageSchema)