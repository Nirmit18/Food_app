const express = require("express")
require("dotenv").config();
const app = express()
var cookieParser=require("cookie-parser");
var bodyParser=require("body-parser");
const cors= require('cors');



const connectDB = require('./database');
connectDB();

app.use(express.json());  //to parse json data
app.use(cors())
app.use(bodyParser.json());



const authroutes = require("./routes/authroutes");

// app.use(cookieParser());
// app.use(bodyparser())

app.use("/api",authroutes)


const port = process.env.PORT 
app.listen(port,()=>{
    console.log(`server working at ${port}`)
})