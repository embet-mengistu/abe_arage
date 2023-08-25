// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// import the byrcpt module to password comparison
const bcrypt = require("bcrypt");
const employeeService = require("./employee.service");

async function logIn(employeeData) {
  let returnData = {};
  try {
    // passing the employeeData.employee_email to the function we worte in emolyee service which take s the email and returns the all info we want
    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email
    );
    // if ther is no result it means there is no user registered by that email
    if (employee.length === 0) {
      returnData = {
        status: "fail",
        message: "Employee does not exist",
      };
      return returnData;
    }
    // comparing the password from the frontend and backened
    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password_hashed
    );
    // if it doesnt match return fail
    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password",
      };
      return returnData;
    }
    // and if it matches return the data which we got by selcting using the email(at line 11)
    returnData = {
      status: "success",
      data: employee[0],
    };
    return returnData;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  logIn,
};
