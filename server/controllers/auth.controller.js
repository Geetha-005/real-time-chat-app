const router=require('express').Router()
const User=require("./../models/user.model.js")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


router.post("/signup",async(req,res)=>{
    try{
        // if the user already exists
       const user= await User.findOne({email:req.body.email})
       
       if(user){
      return  res.send({
        message:"alreadu exisetd",
        success:true
       })
    }

    // encrypt the password
    const hashedPassword=await bcrypt.hash(req.body.password,10)
    req.body.password=hashedPassword
    const newUser=new User(req.body)
    await newUser.save()
    res.send({
        message:'user created successfully'
    })

    }
    catch(error){
         res.send({
            message:"error.message",
            successs:false
         })
    }
    

})

router.post('/login',async(req,res)=>{

    try{
        // check if user exists
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.send({message:"user does not exist",
                success:false
            })
        }


        // password checking
        const isValid=await bcrypt.compare(req.body.password,user.password)
        if(!isValid){
            return res.send({
                message:"invalid password try again",
                success:false
            })
        }


        // create a josn web token
        const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"7d"})

        res.send({
            message:"user logged successfully",
            success:true,
            token:token
        })

    }
    catch(error){
        res.send({
            message:error.message,
            success:false
        })

    }
    
})



module.exports=router