import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import loginService from "../../../services/login.service";

function Loginform() {
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let emailErrorMessage = "";
    let passwordErrorMessage = "";

    if (!employee_email) {
      emailErrorMessage = "Please enter your email address.";
      valid = false;
    } else if (!employee_email.includes("@")) {
      emailErrorMessage = "Invalid email format.";
      valid = false;
    }

    if (!employee_password) {
      passwordErrorMessage = "Enter your password";
      valid = false;
    }

    if (!valid) {
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
      return;
    }

    setEmailError("");
    setPasswordError("");

    const formData = {
      employee_email,
      employee_password,
    };

    try {
      // excuting the function we wrote in loginservice  by paasin the form data
      const response = await loginService.logIn(formData);

      // block processes the response, parses the JSON data(converting the raw JSON text)
      const responseData = await response.json();

      // ===succes came from the backend we wrote in login controller and service(onces it paases all z critrea,it returns a data)
      if (responseData.status === "success") {
        // and if there is a token with it (which we wrote in login controleer to return login once succesfull logged in)...put in in the variable employee and takes the responseData.data object and converts it into a JSON string.
        if (responseData.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(responseData.data));
        }
        // and then navigate it to home page
        if (location.pathname === "/login") {
          window.location.replace("/");
        } else {
          window.location.reload();
        }
      } else {
        setServerError(responseData.message);
      }
    } catch (error) {
      console.error(error);
      setServerError("An error has occurred. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container>
          <div>
            <h2 style={{ paddingTop: "50px" }}>Login to your account</h2>
            <br />
            <div>
              {emailError && (
                <div
                  className="validations-error"
                  style={{ color: "red" }}
                  role="alert"
                >
                  {emailError}
                </div>
              )}
              {serverError && (
                <div
                  className="validations-error"
                  style={{ color: "red" }}
                  role="alert"
                >
                  {serverError}
                </div>
              )}
              {passwordError && (
                <div
                  className="validations-error"
                  style={{ color: "red" }}
                  role="alert"
                >
                  {passwordError}
                </div>
              )}
            </div>
          </div>

          <div>
            <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
              <Col sm="12" md="12" lg="6" xl="6">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={employee_email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "20px" }}>
              <Col sm="12" md="12" lg="6" xl="6">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={employee_password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Col>
            </Row>

            <br />
            <div style={{ paddingBottom: "30px" }}>
              <Button
                as="input"
                type="submit"
                value="Login"
                style={{ backgroundColor: "#ED0C0A" }}
              />
            </div>

            <br />
          </div>
        </Container>
      </form>
    </div>
  );
}

export default Loginform;
