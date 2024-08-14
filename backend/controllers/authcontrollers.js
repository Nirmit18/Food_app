const User = require("../models/Usermodel")
const bcrypt = require("bcryptjs")



exports.signup= async(req,res,next)=>{
    console.log("sending details:")
    console.log(req.body);

    const {email}=req.body;
    const userexist = await User.findOne({email});

    if(userexist){
         return res.status(400).json({
            "message":"user already exist"
        })
    }
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success:true,
            user,
            "message":"User Signed In",
        })
    }catch (error){
           next(error)
    }
}


 exports.signin=async(req,res,next)=>{
    console.log(req.body);
    try{
        const {email,password}=req.body;

        if(!email){
            res.json({"message":"there is no email"});
        }
        if(!password){
            res.json({"message":"there is no password"});
        }

        const user =await User.findOne({email});

        const ismatch = await bcrypt.compare(password,user.password)

        if(!ismatch){
            console.log("signin error")
            return res.json({"message":"all not fine"})
        }
        sendtokenresponse(user,200,res);
    }catch(error){
        next(error)
    }
}

const sendtokenresponse=async(user,codestatus,res)=>{
    const token = await user.getjwttoken();
    console.log(token);


    res.cookie('jwt-ka-token', token, {
        httpOnly: true,  // Ensures the cookie is not accessible via JavaScript on the client-side
        secure: process.env.NODE_ENV === 'production',  // Ensures the cookie is only sent over HTTPS in production
        maxAge: 24 * 60 * 60 * 1000  // Cookie expires after 1 day
    });

    res.status(codestatus).json({
        success: true,
        token,
        user
    });


    


}

exports.logout=async(req,res,next)=>{
    console.log("user logging out")
    res.clearCookie('jwt-ka-token');
    res.status(200).json({
        success:true,
        message:"logged out"
    })
}
