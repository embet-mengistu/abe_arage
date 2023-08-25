// import express
const express = require("express");

const router = express.Router();

const installRouter = require("./install.routes");
const employeeRouter = require("./employee.routes");
const loginRoutes = require("./login.routes");

// create the tables in db
router.use(installRouter);

// create the employess
router.use(employeeRouter);

// to login
router.use(loginRoutes);

module.exports = router;
