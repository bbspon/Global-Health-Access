import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const HospitalPlanTiers = () => {
  return (
    <Container className="py-4">
      <h4>🛠 Create Custom Plan Tier</h4>
      <Card body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Plan Name</Form.Label>
            <Form.Control type="text" placeholder="Enter plan name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Coverage Details</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Button variant="success">Save Plan</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default HospitalPlanTiers;
