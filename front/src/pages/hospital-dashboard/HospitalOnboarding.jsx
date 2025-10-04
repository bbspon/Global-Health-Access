import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HospitalOnboarding = () => {
    const navigate = useNavigate();

  return (
    <Container className="py-4">
      <h4 className="mb-3">🏥 Hospital Onboarding</h4>
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => navigate("/hospital-admin")}
      >
   Hospital Admin
      </Button>
      <Card body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Hospital Name</Form.Label>
            <Form.Control type="text" placeholder="Enter hospital name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control type="text" placeholder="Enter registration number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload License Document</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button variant="primary">Submit</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default HospitalOnboarding;
