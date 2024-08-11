const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

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
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
