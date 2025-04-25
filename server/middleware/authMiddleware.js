// const jwt=require('jsonwebtoken')

// module.exports=(req,res,next)=>{

//     try{
//         const token=req.headers.authorization.split('')[1]

//         const decodeToken=jwt.verify(token,process.env.SECRET_KEY) //{userid:user._id}

//         req.body.userId=decodeToken.userId
//         next()
//     }
//     catch(error){
//         res.send({
//             message:error.message,
//             success:false
//         });
//     }
// }


const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                message: "Authorization token missing or malformed",
                success: false
            });
        }

        const token = authHeader.split(' ')[1];

        // Decode the token using your secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        console.log("Decoded Token:", decoded);

        // Set the userId in the req object directly (not in req.body!)
        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error("JWT Middleware Error:", error);
        return res.status(401).send({
            message: error.message || "Invalid Token",
            success: false
        });
    }
};
