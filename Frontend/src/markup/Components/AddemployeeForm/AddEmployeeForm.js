import React, { useState } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import employeeService from "../../../services/employee.service";

function AddEmployeeForm() {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle client side validation
    let valid = true;
    // First name is required
    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // email required
    if (!employee_email) {
      setEmailError("email is required");
      valid = "false";
    } else if (!employee_email.includes(`@`)) {
      setEmailError("Invalid emial format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };
    // Pass the form data to the function we wrote in the employee.service(which posts the data)
    const newEmployee = employeeService.createEmployee(formData);
    // and then once its posted .then() block processes the response, parses the JSON data(converting the raw JSON text), and passes it to the next .then() block. If there's an error, it's caught in the .catch() block.
    newEmployee
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          // Redirect to the employees page after 2 seconds
          // For now, just redirect to the home page
          setTimeout(() => {
            // window.location.href = '/admin/employees';
            window.location.href = "/";
          }, 2000);
          // console.log(formData);
        }
      })
      // If any error occurs during the promise chain (including the API call or parsing the response), this block is executed. It processes the error object and extracts an error message that is then set in the serverError state.
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container>
          <div>
            <h2 style={{ paddingTop: "50px" }}>Add a new employee</h2>
            <br />

            <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
              {serverError && (
                <div className="validation-error" role="alert">
                  {serverError}
                </div>
              )}
              <Col sm="12" md="12" lg="6" xl="6">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Employee email"
                  value={employee_email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Col>
              {emailError && (
                <div className="validation-error" role="alert">
                  {emailError}
                </div>
              )}
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col sm="12" md="12" lg="6" xl="6">
                <Form.Control
                  type="text"
                  name="fName"
                  placeholder="Employee first name"
                  value={employee_first_name}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Col>
              {firstNameRequired && (
                <div className="validation-error" role="alert">
                  {firstNameRequired}
                </div>
              )}
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col sm="12" md="12" lg="6" xl="6">
                <Form.Control
                  type="text"
                  name="lName"
                  placeholder="Employee last name"
                  value={employee_last_name}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col sm="12" md="12" lg="6" xl="6">
                <Form.Control
                  type="number"
                  name="phoneNum"
                  placeholder="Employee phone (555-555-5555)"
                  value={employee_phone}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col sm="12" md="12" lg="6" xl="6">
                <Form.Control
                  as="select"
                  name="employee_role"
                  value={company_role_id}
                  placeholder="Employee role "
                  onChange={(event) => setCompany_role_id(event.target.value)}
                >
                  <option value="1">Employee</option>
                  <option value="2">Manager</option>
                  <option value="3">Admin</option>
                </Form.Control>
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col sm="12" md="12" lg="6" xl="6">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={employee_password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Col>
            </Row>
            <div style={{ paddingBottom: "30px" }}>
              <Button
                as="input"
                type="submit"
                value="Add employee"
                style={{ backgroundColor: "#ED0C0A" }}
              />
              <br />
            </div>
          </div>
        </Container>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
