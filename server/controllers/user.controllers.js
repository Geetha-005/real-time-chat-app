const router=require('express').Router()
const User=require('./../models/user.model.js')
const authMiddleware=require('./../middleware/authMiddleware.js')


router.get('/logged', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');

        res.send({
            message: "Access granted",
            user,
            success: true
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
})

router.get('/getall', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const allUser = await User.find({_id:{$ne:userId}})

        res.send({
            message: "Access granted",
            allUser,
            success: true
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            success: false
        });
    }
});




module.exports=router