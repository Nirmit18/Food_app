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
            user
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
            res.json({"message":"all not fine"})
        }
        sendtokenresponse(user,200,res);
    }catch(error){
        next(error)
    }
}

const sendtokenresponse=async(user,codestatus,res)=>{
    const token = await user.getjwttoken();
    res
        // .status(codestatus)
        .cookie('token',token,{maxAge:60*60*3600})
        .json({success:true,token,user});
}
