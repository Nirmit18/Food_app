const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');
const crypto = require("crypto")
const {Cashfree} = require("cashfree-pg")

require('dotenv').config();

const connectDB = require("./database");
connectDB();

const app = express();
const port = process.env.PORT || 8000; // Fallback to 8000 if process.env.PORT is not set

app.use(express.json());  // To parse JSON data
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

Cashfree.XClientId = process.env.APP_ID;
Cashfree.XClientSecret = process.env.SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

const authroutes = require("./routes/authroutes");
app.use("/api", authroutes);

app.get('/api/categories', async (req, res) => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/api/search', async (req, res) => {
    const searchQuery = req.query.s;
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data' });
    }
  });

  function generateOrderId(){
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');
    return orderId.substring(0,12);
  }

  app.get("/payment",async(req,res)=>{
    try {
      let request = {
        "order_amount":100,
        "order_currency":"INR",
        "order_id":await generateOrderId(),
        "customer_details":{
          "customer_id":"nirmitcoder",
          "customer_phone":"9198201553",
          "customer_name":"nirmitK",
          "customer_email":"nirmit@gmail.com"
        },
      }

      Cashfree.PGCreateOrder("2023-08-01",request).then(response => {
        console.log(response.data);
        res.json(response.data)
      }).catch(error => {
        console.error(error.response.data.message);
        
      })
    } catch (error) {
      console.log('some error');
      
    }
  })

 
  app.post('/verify', async(req,res)=>{
    try {
      let {orderId}=req.body;
      Cashfree.PGOrderFetchPayment("2023-08-01",orderId).then((response)=>{
        res.json(response.data);
      }).catch(error =>{
        console.error(error.response.data.message); 
      })
    } catch (error) {
      console.log('some error');
      
    }
  })



  app.get('/api/meal/:id', async (req, res) => {
    const mealId = req.params.id;
    console.log(`Attempting to fetch meal with ID: ${mealId}`);
    
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      console.log('Meal data fetched successfully:', response.data);
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching meal details", error.message);
      res.status(500).json({ error: 'Error fetching meal details' });
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
