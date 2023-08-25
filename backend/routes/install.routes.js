// import express
const express = require("express");

// import dotenv
require("dotenv").config();

// call the router method from express to create the router
const router = express.Router();

// import the intall router
const installController = require(`../controllers/install.controller`);

// create a route to handle the install request on get
router.get(`/install`, installController.install);

module.exports = router;
