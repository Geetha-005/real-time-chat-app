const router=require('express').Router()
const Chat=require('./../models/chat.model.js')
const authMiddleware=require('./../middleware/authMiddleware.js')

router.post('/create-new-chat',authMiddleware,async(req,res)=>{
    try{
        const chat=new Chat(req.body)
       const savedChat= await chat.save()
        res.status(201).send({
            message:'chat created successfully',
            success:true,
            savedChat
        }) 

    }
    catch(error){
        res.status(400).send({
            message:error.message,
            success:false
        })
    }
})


router.get('/get-all-chats',authMiddleware,async(req,res)=>{
    try{
        const allChat=await Chat.find({members:{$in:[req.userId]}})
      
        res.status(200).send({
            message:'chat fetched successfully',
            success:true,
            allChat
        }) 

    }
    catch(error){
        res.status(400).send({
            message:error.message,
            success:false
        })
    }
})

module.exports=router