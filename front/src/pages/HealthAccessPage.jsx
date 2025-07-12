// BBSCART HealthAccessPage.jsx
import React from "react";
import {
  Container, Row, Col, Card, Button, Badge, ListGroup,
} from "react-bootstrap";
import { CheckCircleFill, PersonBadge, ChatDotsFill, Hospital, ShieldShaded } from "react-bootstrap-icons";

const plans = [
  { tier: "Basic", features: ["AI Consult", "Discounted OPD", "Lab Vouchers"], color: "secondary" },
  { tier: "Premium", features: ["Unlimited Consults", "Priority Booking", "Health Coach", "Family Support"], color: "primary" },
  { tier: "Corporate", features: ["Team Health Plans", "Dashboard", "Dedicated Doctors"], color: "dark" },
];

const HealthAccessPage = () => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4"> Choose Your  Health-Care  Access </h2>
      <p className="text-muted text-center">
        Your gateway to AI-powered care, partner hospitals, and smart health management.
      </p>

      <Row className="my-4 g-4 justify-content-center align-items-center " >
        {plans.map((plan) => (
          <Col md={4} key={plan.tier}>
            <Card className={`border-${plan.color} shadow`}>
              <Card.Header className={`bg-${plan.color} text-white`}>
                {plan.tier} Plan
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {plan.features.map((f, i) => (
                    <ListGroup.Item key={i}>
                      <CheckCircleFill className="text-success me-2" />
                      {f}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Button variant={plan.color} className="mt-3 w-100">
                  Join Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Title><Hospital /> Partner Hospital Access</Card.Title>
            <Card.Text>Find clinics, OPD slots & priority care through our verified partners.</Card.Text>
            <Button variant="outline-primary">Explore Hospitals</Button>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Title><ChatDotsFill /> AI Symptom Checker</Card.Title>
            <Card.Text>Describe your symptoms and let our AI guide you instantly.</Card.Text>
            <Button variant="outline-success">Try AI Check</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HealthAccessPage;
