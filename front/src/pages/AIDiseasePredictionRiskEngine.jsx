import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  ProgressBar,
  Modal,
  Table,
  Badge,
  Form
} from "react-bootstrap";
import {
  Line
} from "react-chartjs-2";
import {
  Download,
  Mic,
  InfoCircle,
  Calendar2Check,
  Smartwatch,
  People
} from "react-bootstrap-icons";
import jsPDF from "jspdf";

const AIDiseasePredictionRiskEngine = () => {
  const [showExplain, setShowExplain] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [showSync, setShowSync] = useState(false);
  const [showAskAI, setShowAskAI] = useState(false);

  const riskData = {
    diabetes: 68,
    cardiac: 44,
    mental: 22,
    ortho: 15,
  };

  const riskChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Diabetes Risk %",
        data: [55, 58, 61, 65, 68],
        fill: false,
        borderColor: "#e74c3c",
        tension: 0.3,
      },
    ],
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("AI Risk Prediction Report", 10, 10);
    Object.entries(riskData).forEach(([k, v], i) => {
      doc.text(`${k.toUpperCase()}: ${v}%`, 10, 20 + i * 10);
    });
    doc.save("BBSCART_AIRiskReport.pdf");
  };

  const handleBookNow = () => {
    window.open("/hospital-booking", "_blank"); // Replace with your booking URL
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f9fbfd" }}>
      <h3 className="mb-4 fw-bold text-primary">🧠 AI Disease Risk & Early Warning</h3>

      <Row>
        {Object.entries(riskData).map(([label, percent]) => (
          <Col md={3} key={label}>
            <Card className="mb-4 shadow-sm rounded-4 border-0">
              <Card.Body>
                <h6 className="text-muted text-uppercase">{label}</h6>
                <ProgressBar
                  variant={percent > 60 ? "danger" : "warning"}
                  now={percent}
                  label={`${percent}%`}
                  className="rounded-pill"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* AI Suggestions */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="text-info fw-bold">🧬 Smart AI Suggestions</Card.Title>
          <ul>
            <li>🚶 Walk 6,000+ steps/day</li>
            <li>🥣 High-fiber morning meals</li>
            <li>🛌 Sleep 7.5+ hours to reduce cortisol</li>
          </ul>
        </Card.Body>
      </Card>

      <Alert variant="danger" className="rounded-4 shadow-sm">
        ⚠️ You're entering the red zone for Diabetes. Act within 7 days.
      </Alert>

      {/* Plan Suggestion */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="text-primary fw-bold">📦 Smart Plan Suggestion</Card.Title>
          <p>Upgrade to <strong>Metabolic Care Plan</strong> for free tests, dietician consults, and more.</p>
          <Button variant="outline-primary" onClick={() => setShowPlans(true)}>Explore Plan Options</Button>
        </Card.Body>
      </Card>

      {/* Risk Tracker */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="text-success fw-bold">📊 Risk Reduction Progress</Card.Title>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Action</th>
                <th>Before</th>
                <th>After</th>
                <th>Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>30 days walking</td>
                <td>BP: 140/90</td>
                <td>BP: 130/85</td>
                <td><Badge bg="success">Improved</Badge></td>
              </tr>
              <tr>
                <td>Low-carb diet</td>
                <td>HbA1c: 6.4%</td>
                <td>HbA1c: 6.0%</td>
                <td><Badge bg="success">Improved</Badge></td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Screening Reminder */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="text-warning fw-bold">🔔 Upcoming Screenings</Card.Title>
          <ul>
            <li>📅 HbA1c test in 5 days</li>
            <li>📅 Cholesterol test in 2 weeks</li>
          </ul>
          <Button variant="outline-success" onClick={handleBookNow}>
            <Calendar2Check className="me-2" /> Book Now
          </Button>
        </Card.Body>
      </Card>

      {/* Wearables Sync */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title><Smartwatch className="me-2" /> Sync Wearable Device</Card.Title>
          <p>Connect your smartwatch or fitness band to improve predictions.</p>
          <Button variant="dark" onClick={() => setShowSync(true)}>Sync My Device</Button>
        </Card.Body>
      </Card>

      {/* Family Risk */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title><People className="me-2" /> Family Risk Overview</Card.Title>
          <p>Your sibling has type 2 diabetes. AI recommends early HbA1c testing and weekly check-ins.</p>
        </Card.Body>
      </Card>

      {/* AI Chat Log */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="fw-bold text-info">🧠 AI Doctor Chat</Card.Title>
          <ul>
            <li><strong>You:</strong> Why is my sugar rising?</li>
            <li><strong>AI:</strong> Increased LDL + inactivity = elevated diabetes risk.</li>
          </ul>
          <Button variant="primary" onClick={() => setShowAskAI(true)}>
            <Mic className="me-2" /> Ask More
          </Button>
        </Card.Body>
      </Card>

      {/* Risk Timeline */}
      <Card className="mb-5 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="text-danger fw-bold">📉 Risk Timeline Forecast</Card.Title>
          <Line data={riskChartData} />
        </Card.Body>
      </Card>

      {/* Footer Buttons */}
      <Row className="mb-5">
        <Col>
          <Button variant="outline-info" onClick={() => setShowExplain(true)}>
            <InfoCircle className="me-2" /> Why This Prediction?
          </Button>{" "}
          <Button variant="danger" onClick={generatePDF}>
            <Download className="me-2" /> Download PDF
          </Button>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={showExplain} onHide={() => setShowExplain(false)}>
        <Modal.Header closeButton>
          <Modal.Title>AI Explanation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Based on recent glucose, activity, and lipid patterns, your diabetes risk rose 12%.
        </Modal.Body>
      </Modal>

      <Modal show={showPlans} onHide={() => setShowPlans(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Explore Health Plans</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li><strong>Basic Plan:</strong> Annual checkups + doctor calls</li>
            <li><strong>Metabolic Care:</strong> Free HbA1c + dietician + wellness rewards</li>
            <li><strong>Complete Health:</strong> Includes cardiac + liver + lifestyle coaching</li>
          </ul>
        </Modal.Body>
      </Modal>

      <Modal show={showSync} onHide={() => setShowSync(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sync Wearables</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select your device type:</p>
          <Form.Select>
            <option>Fitbit</option>
            <option>Apple Watch</option>
            <option>Samsung Health</option>
            <option>Garmin</option>
          </Form.Select>
          <Button className="mt-3" variant="success">Start Sync</Button>
        </Modal.Body>
      </Modal>

      <Modal show={showAskAI} onHide={() => setShowAskAI(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ask AI Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You can ask health-related questions like:</p>
          <ul>
            <li>“What foods lower cholesterol?”</li>
            <li>“How to reduce triglycerides naturally?”</li>
          </ul>
          <Form.Control as="textarea" rows={3} placeholder="Type your question..." />
          <Button className="mt-3" variant="info">Send to AI</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AIDiseasePredictionRiskEngine;
