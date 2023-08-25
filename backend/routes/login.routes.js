// import express
const express = require("express");

// call the router method from express to create the router
const router = express.Router();

//importing controller methods
const loginControllers = require("../controllers/login.controller");

router.post("/api/employee/login", loginControllers.logIn);

module.exports = router;
