const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{

    try{
        const token=req.headers.authorization.split('')[1]

        const decodeToken=jwt.verify(token,process.env.SECRET_KEY) //{userid:user._id}

        req.body.userId=decodeToken.userId
        next()
    }
    catch(error){
        res.send({
            message:error.message,
            success:false
        });
    }
}