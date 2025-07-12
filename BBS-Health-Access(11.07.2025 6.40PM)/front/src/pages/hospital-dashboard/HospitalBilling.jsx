import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const HospitalBilling = () => {
  return (
    <Container className="py-4">
      <h4>💳 Enter Bill & Reimbursement</h4>
      <Card body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Patient ID</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Service Provided</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount (₹)</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Button variant="warning">Submit Bill</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default HospitalBilling;
