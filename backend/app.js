const express = require("express")
require("dotenv").config();
const app = express()

const connectDB = require('./database');
connectDB();

app.use(express.json());  //to parse json data

const authroutes = require("./routes/authroutes")

app.use("/api",authroutes)


const port = process.env.PORT 
app.listen(port,()=>{
    console.log(`server working at ${port}`)
})