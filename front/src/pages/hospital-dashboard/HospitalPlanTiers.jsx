import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { PeopleFill, Clipboard2Check } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const HospitalPlanTiers = () => {
  return (
    <Container className="py-4">
      <h4>🛠 Create Custom Plan Tier</h4>
      {/* 🔹 Quick Navigation Links */}
      <div className="mb-3 d-flex gap-3">
        <Link
          to="/doctor-management"
          className="btn btn-outline-primary d-flex align-items-center gap-2"
        >
          <PeopleFill size={18} /> Doctor Management
        </Link>
        <Link
          to="/doctor-scorecard"
          className="btn btn-outline-success d-flex align-items-center gap-2"
        >
          <Clipboard2Check size={18} /> Doctor Scorecard
        </Link>
      </div>
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
