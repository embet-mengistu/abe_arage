// Import the query function from the db.config.js file
const conn = require("../config/db.config");
const bcrypt = require("bcrypt");

// we pass email as a parameter and it selects it from database,if the result is greater than one,it means email ardy existts
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email=?";

  // const rows = await conn.query(
  //   "SELECT * FROM employee WHERE employee_email=?",
  //   [email]
  // );
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// we pass the info which comes from the frontend
async function createEmployee(employee) {
  // creating a variable which holds the returned data
  let createdEmployee = {};
  try {
    const salt = await bcrypt.genSalt(10);
    // take the password which comes from the frontend(the parameter we said employee)ans encryts it
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // ////////
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    // takes the email and active employee and inserts it
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);
    // if there is no affected row in the db it means it is not inserted so,it will return fasle
    if (rows.affectedRows !== 1) {
      return false;
    }
    // else if its inserted,the inserted id will increment whenever we insert data to it ,so which we can take the employee id as the inserted id(the inserted id comes from the db byitself)
    const employee_id = rows.insertId;

    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name,employee_last_name,employee_phone) VALUES (?,?,?,?)";
    // passing the employees id as inserted id in which we put it in the variable employee_id at line 41
    const rows2 = await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    ///////////

    ///////////
    const query3 =
      "INSERT INTO employee_pass (employee_id,employee_password_hashed) VALUES (?,?)";
    const row3 = await conn.query(query3, [employee_id, hashedPassword]);
    //////////////

    /////////////////
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);

    // returing the id bc we will need it for later
    createdEmployee = {
      employee_id: employee_id,
      //   employee_email: employee.employee_email,
      //   active_employee: employee.active_employee,
      //   employee_first_name: employee.employee_first_name,
      //   employee_last_name: employee.employee_last_name,
      //   employee_phone: employee.employee_phone,
    };
  } catch (err) {
    console.log(err);
  }
  return createdEmployee;
}

// selects the employee info when we pass it the employee email as a parameter in employee.controller
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
};
