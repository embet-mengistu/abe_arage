// import express
const express = require("express");

// import dotenv
require("dotenv").config();

// call the router method from express to create the router
const router = express.Router();

const empolyeeController = require("../controllers/employee.controller");

router.post("/api/employee", empolyeeController.createEmployee);

module.exports = router;
