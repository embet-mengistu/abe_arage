import React from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";

function AddCustomerForm() {
  return (
    <div>
      <Container>
        <div>
          <h2 style={{ paddingTop: "50px" }}>Add a new customer</h2>
          <br />

          <Row style={{ marginBottom: "20px", marginTop: "20px" }}>
            <Col sm="12" md="12" lg="6" xl="6">
              <Form.Control
                type="email"
                name="CustomerEmail"
                placeholder="Customer email"
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: "20px" }}>
            <Col sm="12" md="12" lg="6" xl="6">
              <Form.Control
                type="text"
                name="customerFName"
                placeholder="Customer first name"
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: "20px" }}>
            <Col sm="12" md="12" lg="6" xl="6">
              <Form.Control
                type="text"
                name="customerLName"
                placeholder="Customer last name"
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: "20px" }}>
            <Col sm="12" md="12" lg="6" xl="6">
              <Form.Control
                type="number"
                name="customerphoneNum"
                placeholder="Customer phone (555-555-5555)"
              />
            </Col>
          </Row>

          <div style={{ paddingBottom: "30px" }}>
            <Button
              as="input"
              type="submit"
              value="Add customer"
              style={{ backgroundColor: "#ED0C0A" }}
            />
            <br />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddCustomerForm;
