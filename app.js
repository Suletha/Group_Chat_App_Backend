const path = require("path");
const fs = require("fs");
const PORT = 3000; // Choose a port number

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./util/database");
const userRoutes = require("./routes/user-routes");
const { error } = require("console");


const app = express();

app.use(
  cors({
    origin:"http://127.0.0.1:5500",
    credentials: true
  })
)
app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));


// Define a route
app.use("/users", userRoutes);

//sync the DB sequealize with models
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000);
})
.catch((error) => {
  console.error(error);
});



