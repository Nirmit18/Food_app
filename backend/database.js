const mongoose = require("mongoose")




const connection = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/food_app");
        console.log("db connected");
    } catch (error) {
        console.log("server issues");
    }
}

module.exports= connection;