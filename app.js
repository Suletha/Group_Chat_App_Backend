const path = require("path");
const fs = require("fs");
const PORT = 3000; // Choose a port number


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

app.listen(PORT,() => {
    console.log(`Server is running on PORT:${PORT}`)
})

