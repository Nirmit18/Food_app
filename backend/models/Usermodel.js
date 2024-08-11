const mongoose = require("mongoose");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
    {timestamps:true});

    UserSchema.pre("save",async function (next) {
        if(!this.isModified('password')){
            next();
        }
        this.password=await bcrypt.hash(this.password,10);
    })

    UserSchema.methods.getjwttoken=function(){
        return jwt.sign({id:this.id},"thisisthejwtstring",{
            expiresIn:3600
        })
    }
    

module.exports= mongoose.model("User",UserSchema);

