const employeeService = require("../services/employee.service");

async function createEmployee(req, res, next) {
  try {
    // we r passing the email which comes from frontend (user) to the funxtion we wrote in  the employee service(its checking if the email exists)
    const employeeExists = await employeeService.checkIfEmployeeExists(
      req.body.employee_email
    );
    // then if it exists...it cant be created bc the email is accocated wz other person
    if (employeeExists) {
      return res.status(400).json({
        error: "This email address is already associated with another employee",
      });
    }
    // else create a new employe

    // the data which comes from the frontend
    const employeeData = req.body;
    // passing it to the function we wrote in employee service(thats creates the employee)
    const employee = await employeeService.createEmployee(employeeData);
    // if it not created pass the message
    if (!employee) {
      res.status(400).json({
        error: "Failed to add the employee",
      });
    } else {
      res.status(200).json({
        status: "true",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}

module.exports = {
  createEmployee,
};
