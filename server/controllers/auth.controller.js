const router=require('express').Router()
const User=require("./../models/user.model.js")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


router.post("/signup",async(req,res)=>{
    try{
        // if the user already exists
       const user= await User.findOne({email:req.body.email})
       
       if(user){
      return  res.status(400).send({
        message:"alreadu exisetd",
        success:true
       })
    }

    // encrypt the password
    const hashedPassword=await bcrypt.hash(req.body.password,10)
    req.body.password=hashedPassword
    const newUser=new User(req.body)
    await newUser.save()
    res.status(201).send({
        message:'user created successfully',
        success:true
    })

    }
    catch(error){
         res.send({
            message:error.message,
            successs:false
         })
    }
    

})


// router.post('/login',async(req,res)=>{

//     try{
//         // check if user exists
//         const user=await User.findOne({email:req.body.email})
//         if(!user){
//             return res.status(400).send({message:"user does not exist",
//                 success:false
//             })
//         }


//         // password checking
//         const isValid=await bcrypt.compare(req.body.password,user.password)
//         if(!isValid){
//             return res.status(400).send({
//                 message:"invalid password try again",
//                 success:false
//             })
//         }


//         // create a josn web token
//         const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})

//         res.send({
//             message:"user logged successfully",
//             success:true,
//             token:token
//         })

//     }
//     catch(error){
//         res.status(400).send({
//             message:error.message,
//             success:false
//         })

//     }
    
// })


router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body;
        console.log("Request body:", req.body);

        if (!email || !password) {
            return res.status(400).send({
                message: "Email and password are required",
                success: false
            });
        }

        // Select password explicitly if it's excluded by default
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).end({
                message: "User does not exist",
                success: false
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).send({
                message: "Invalid password. Try again.",
                success: false
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY || 'defaultSecret', {
            expiresIn: "1d"
        });

        res.status(201).send({
            message: "User logged in successfully",
            success: true,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Something went wrong. Please try again later.",
            success: false
        });
    }
});



module.exports=router