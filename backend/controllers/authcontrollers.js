const User = require("../models/Usermodel")



exports.signup= async(req,res,next)=>{
    const {email}=req.body;
    const userexist = await User.findOne({email});

    if(userexist){
        // return next("eamil")
        console.log("user already exist")
    }
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success:true,
            user
        })
    }catch (error){
            next(error)
    }
}