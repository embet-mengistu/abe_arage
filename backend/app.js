//import router
const router = require("./routes");

// import express
const express = require("express");

//call express to create the webserver
const app = express();

// impoet dotenv to load environment variables from a .env file into the process environment
require("dotenv").config();

// import sanitizer module
const sanitiaze = require("sanitize");

// import cors module when u install it
const cors = require("cors");

// cors options
var corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// create app variable to hold port number
const port = process.env.PORT;

// add express.json middleware to app
app.use(express.json());

// add sanitiazer to express middleware
app.use(sanitiaze.middleware);

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//  export the webserver fro use in application
module.exports = app;
