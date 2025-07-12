import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Alert,
  Table,
} from "react-bootstrap";

const CoverageStatusDashboard = () => {
  const [userId, setUserId] = useState("");
  const [coverageResult, setCoverageResult] = useState(null);

  const [simPlan, setSimPlan] = useState("");
  const [simService, setSimService] = useState("");
  const [simResult, setSimResult] = useState(null);

  // MOCK: Replace with real API call
  const mockCoverageCheck = () => {
    setCoverageResult({
      user: "Fatima Sheikh",
      plan: "Super Premium",
      service: "OPD Consultation",
      status: "Partially Covered",
      copay: "₹300",
      visitsUsed: 5,
      visitsAllowed: 6,
      amountLeft: "₹500",
      nextEligibility: "12 Aug 2025",
    });
  };

  const handleSimulate = () => {
    if (!simPlan || !simService) {
      alert("Please select a plan and enter a service type");
      return;
    }

    let simulated = {
      status: "Not Covered",
      copay: "₹0",
      visitsAllowed: 0,
      visitsUsed: 0,
      amountLeft: "₹0",
    };

    if (simPlan === "Super Premium") {
      simulated = {
        status: "✅ Fully Covered",
        copay: "₹0",
        visitsAllowed: 6,
        visitsUsed: 2,
        amountLeft: "₹4200",
      };
    } else if (simPlan === "Premium") {
      simulated = {
        status: "⚠️ Partially Covered",
        copay: "₹250",
        visitsAllowed: 4,
        visitsUsed: 3,
        amountLeft: "₹1200",
      };
    } else if (simPlan === "Basic") {
      simulated = {
        status: "❌ Not Covered",
        copay: "₹500",
        visitsAllowed: 2,
        visitsUsed: 2,
        amountLeft: "₹0",
      };
    }

    setSimResult({
      plan: simPlan,
      service: simService,
      ...simulated,
    });
  };

  return (
    <Container className="mt-4">
      <h4>🧠 Real-Time Coverage Engine</h4>

      {/* Live Coverage Check Form */}
      <Card className="mb-4 mt-3">
        <Card.Header>🚦 Check User Access</Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Enter User ID / QR Code"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Col>
            <Col>
              <Button onClick={mockCoverageCheck}>Check Eligibility</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Result Display */}
      {coverageResult && (
        <Card className="mb-4">
          <Card.Header>📋 Coverage Status</Card.Header>
          <Card.Body>
            <h5>
              {coverageResult.user} -{" "}
              <Badge bg="success">{coverageResult.plan}</Badge>
            </h5>
            <p>Service: {coverageResult.service}</p>
            <Alert variant="warning">
              <strong>{coverageResult.status}</strong> — Co-pay Required:{" "}
              {coverageResult.copay}
            </Alert>
            <Table bordered>
              <tbody>
                <tr>
                  <td>OPD Visits Used</td>
                  <td>
                    {coverageResult.visitsUsed}/{coverageResult.visitsAllowed}
                  </td>
                </tr>
                <tr>
                  <td>Amount Left</td>
                  <td>{coverageResult.amountLeft}</td>
                </tr>
                <tr>
                  <td>Next Eligible Date</td>
                  <td>{coverageResult.nextEligibility}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Admin Sim Zone */}
      <Card className="mb-4">
        <Card.Header>🛠 Admin Simulation</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col>
                <Form.Select
                  value={simPlan}
                  onChange={(e) => setSimPlan(e.target.value)}
                >
                  <option value="">Choose Plan</option>
                  <option>Basic</option>
                  <option>Premium</option>
                  <option>Super Premium</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Control
                  placeholder="Service Type (e.g., X-Ray)"
                  value={simService}
                  onChange={(e) => setSimService(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="secondary" onClick={handleSimulate}>
                  Run Simulation
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Simulated Output */}
          {simResult && (
            <div className="mt-4">
              <h6>🧪 Simulation Result</h6>
              <p>Plan: {simResult.plan}</p>
              <p>Service: {simResult.service}</p>
              <Alert variant="info">{simResult.status}</Alert>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Visits Allowed</td>
                    <td>{simResult.visitsAllowed}</td>
                  </tr>
                  <tr>
                    <td>Visits Used</td>
                    <td>{simResult.visitsUsed}</td>
                  </tr>
                  <tr>
                    <td>Balance Left</td>
                    <td>{simResult.amountLeft}</td>
                  </tr>
                  <tr>
                    <td>Co-pay</td>
                    <td>{simResult.copay}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Future Features */}
      <Card className="mb-4">
        <Card.Body>
          <h6>🔮 Upcoming Features:</h6>
          <ul>
            <li>Bill scan upload for pre-check approval</li>
            <li>User self-check coverage bot</li>
            <li>Multi-hospital balance sharing</li>
            <li>Smart plan upgrade suggestion</li>
            <li>AI rule explanation for hospital staff</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CoverageStatusDashboard;
