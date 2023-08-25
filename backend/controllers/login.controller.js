// import the service
const loginService = require("../services/login.service");
// import jsonwebtoken
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Handle employee login
async function logIn(req, res, next) {
  try {
    console.log(req.body);
    // putting the daata from the frontend to the varaible employee data
    const employeeData = req.body;

    // Call the logIn method from the login service and pass the data from the frontend(line 12)
    const employee = await loginService.logIn(employeeData);
    // If the employee is not found
    if (employee.status === "fail") {
      res.status(403).json({
        status: employee.status,
        message: employee.message,
      });
      // console.log(employee.message);
    }
    //else  If successful(if we get the user  by its email),then we are putting the data found by its email in into the payload variable so that we can generate token(employee (line 15 exccting the function in login service.data(the data(lodin serverive line 38) returened when finding it by the email.the variables in z db)))
    // console.log(employee.data);

    const payload = {
      employee_id: employee.data.employee_id,
      employee_email: employee.data.employee_email,
      employee_role: employee.data.company_role_id,
      employee_first_name: employee.data.employee_first_name,
    };
    // takes the payload and generates a token(generates it using the jwt which it a secret we wrote in .env)
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });
    // console.log(token);
    const sendBack = {
      employee_token: token,
    };
    // so at last send the message succes and the token too
    res.status(200).json({
      status: "success",
      message: "Employee logged in successfully",
      data: sendBack,
    });
  } catch (error) {
    console.log(error);
  }
}
// export the function
module.exports = {
  logIn,
};
