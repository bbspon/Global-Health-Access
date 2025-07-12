import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Badge,
  Table,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";
import {
  CheckCircleFill,
  ArrowUpCircle,
  ArrowRepeat,
  PeopleFill,
  InfoCircle,
} from "react-bootstrap-icons";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    features: ["AI Symptom Checker", "Limited Consults", "OPD Discounts"],
    consultLimit: 2,
    opdLimit: 1,
  },
  {
    name: "Premium",
    price: "₹999/year",
    features: [
      "Unlimited AI Consults",
      "5 Doctor Consults",
      "3 OPD Visits",
      "Health Reports",
    ],
    consultLimit: 5,
    opdLimit: 3,
  },
  {
    name: "Corporate",
    price: "Custom",
    features: [
      "Everything in Premium",
      "Family Members Access",
      "Corporate Dashboard",
      "Dedicated Health Coach",
    ],
    consultLimit: 10,
    opdLimit: 5,
  },
];

const HealthMembershipPage = () => {
  const [currentPlan, setCurrentPlan] = useState("Basic");
  const [usedConsults, setUsedConsults] = useState(1);
  const [usedOpd, setUsedOpd] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleUpgrade = (planName) => {
    setCurrentPlan(planName);
    setShowUpgrade(false);
  };

  const currentTier = tiers.find((tier) => tier.name === currentPlan);

  return (
    <Container className="mt-4 mb-5">
      <h2 className="text-center">My Health Membership</h2>
      <p className="text-center text-muted">
        Track your benefits, upgrade plans, and access smart health care.
      </p>

      {/* CURRENT PLAN CARD */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-info text-white d-flex justify-content-between">
          <strong>{currentPlan} Plan</strong>
          <Badge bg="dark">QR ID: BBSC-HEALTH-6721</Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>Plan Usage</h6>
              <p>Consultations Used</p>
              <ProgressBar
                now={(usedConsults / currentTier.consultLimit) * 100}
                label={`${usedConsults}/${currentTier.consultLimit}`}
              />
              <p className="mt-3">OPD Visits Used</p>
              <ProgressBar
                variant="warning"
                now={(usedOpd / currentTier.opdLimit) * 100}
                label={`${usedOpd}/${currentTier.opdLimit}`}
              />
            </Col>
            <Col md={6}>
              <ListGroup>
                {currentTier.features.map((f, idx) => (
                  <ListGroup.Item key={idx}>
                    <CheckCircleFill className="text-success me-2" />
                    {f}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="mt-3 d-flex justify-content-between">
                <Button variant="outline-primary" onClick={() => setShowUpgrade(true)}>
                  <ArrowUpCircle className="me-2" />
                  Upgrade Plan
                </Button>
                <Button variant="outline-dark">
                  <ArrowRepeat className="me-2" />
                  Enable Auto Renew
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* TIER COMPARISON TABLE */}
      <h5 className="text-center mb-3">Compare All Plans</h5>
      <Table striped bordered responsive className="text-center">
        <thead className="table-light">
          <tr>
            <th>Features</th>
            {tiers.map((tier, i) => (
              <th key={i}>{tier.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>AI Consults</td>
            {tiers.map((t) => (
              <td key={t.name}>{t.consultLimit === Infinity ? "Unlimited" : t.consultLimit}</td>
            ))}
          </tr>
          <tr>
            <td>Doctor Consults</td>
            {tiers.map((t) => (
              <td key={t.name}>{t.consultLimit}</td>
            ))}
          </tr>
          <tr>
            <td>OPD Visits</td>
            {tiers.map((t) => (
              <td key={t.name}>{t.opdLimit}</td>
            ))}
          </tr>
          <tr>
            <td>Price</td>
            {tiers.map((t) => (
              <td key={t.name}>{t.price}</td>
            ))}
          </tr>
          <tr>
            <td></td>
            {tiers.map((t) => (
              <td key={t.name}>
                <Button
                  size="sm"
                  variant={currentPlan === t.name ? "secondary" : "success"}
                  disabled={currentPlan === t.name}
                  onClick={() => handleUpgrade(t.name)}
                >
                  {currentPlan === t.name ? "Current Plan" : "Select Plan"}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>

      {/* AI SUGGESTION & FUTURE CARDS */}
      <Row className="mt-5 g-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>🧠 Smart Suggestion</Card.Title>
              <Card.Text>
                You’ve used 90% of your consults. We recommend switching to the Premium Plan to unlock unlimited AI support.
              </Card.Text>
              <Button variant="outline-danger" onClick={() => setShowUpgrade(true)}>
                View Upgrade Options
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>🎖 Future Feature: Badges</Card.Title>
              <Card.Text>
                Coming Soon: Earn badges like Wellness Champ, Diagnostic Hero & more based on your health engagement.
              </Card.Text>
              <Badge bg="info">Gamification Beta</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* UPGRADE MODAL */}
      <Modal show={showUpgrade} onHide={() => setShowUpgrade(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upgrade Your Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select a new plan to enjoy more benefits.</p>
          {tiers
            .filter((t) => t.name !== currentPlan)
            .map((t, idx) => (
              <Card key={idx} className="mb-3 shadow-sm">
                <Card.Header>{t.name}</Card.Header>
                <Card.Body>
                  <ListGroup>
                    {t.features.map((f, i) => (
                      <ListGroup.Item key={i}>{f}</ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button
                    className="mt-3"
                    onClick={() => handleUpgrade(t.name)}
                    variant="success"
                  >
                    Upgrade to {t.name} ({t.price})
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HealthMembershipPage;
