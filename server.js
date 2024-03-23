const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./Controllers/controller");
const cors = require('cors');

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:4000', // Replace with your frontend origin
  methods: ['GET', 'POST'],         // Allow only specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow only specific headers
};

// Use CORS middleware with options
app.use(cors());

app.use(express.json());
app.use('/products', productRoutes); // Use product routes

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

mongoose.connect('mongodb+srv://root:9553483839@devminiapi.zqjuhqr.mongodb.net/nodeApi?retryWrites=true&w=majority&appName=DevminiApi')
  .then(() => {
    console.log("connected to the db");
  })
  .catch((error) => {
    console.log(error);
  });
