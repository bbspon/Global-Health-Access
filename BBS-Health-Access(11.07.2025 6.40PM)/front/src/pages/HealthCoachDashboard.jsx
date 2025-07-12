import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Badge,
  ProgressBar,
} from "react-bootstrap";

const dummyData = {
  patient: {
    name: "Fatima Sheikh",
    condition: "Type 2 Diabetes",
    plan: "Chronic Plus (₹1200/month)",
    coachStatus: "Active",
    lastHbA1c: "7.2%",
    medsAdherence: 82,
    mood: "😐 Neutral",
  },
  alerts: [
    { type: "Vitals Spike", message: "3 sugar spikes in 48hrs", level: "High" },
    { type: "Missed Dose", message: "No insulin log for 2 days", level: "Medium" },
    { type: "Appointment Due", message: "HbA1c Test overdue by 5 days", level: "Low" },
  ],
};

const HealthCoachDashboard = () => {
  const [showSimModal, setShowSimModal] = useState(false);
  const [simResult, setSimResult] = useState(null);

  const runSimulation = () => {
    setSimResult({
      risk: "🔴 High Risk",
      nextAction: "Recommend Endocrinologist Call",
      AIExplanation: "Frequent spikes + missed insulin = hypoglycemia risk",
    });
    setShowSimModal(true);
  };

  return (
  <>
     <Container fluid className="mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>🧠 AI Coach – Patient Overview</Card.Title>
              <p><strong>Name:</strong> {dummyData.patient.name}</p>
              <p><strong>Condition:</strong> {dummyData.patient.condition}</p>
              <p><strong>Plan:</strong> {dummyData.patient.plan}</p>
              <p><strong>Coach Status:</strong> <Badge bg="success">{dummyData.patient.coachStatus}</Badge></p>
              <p><strong>Last HbA1c:</strong> {dummyData.patient.lastHbA1c}</p>
              <p><strong>Adherence:</strong> <ProgressBar now={dummyData.patient.medsAdherence} label={`${dummyData.patient.medsAdherence}%`} /></p>
              <p><strong>Emotional State:</strong> {dummyData.patient.mood}</p>
              <Button variant="outline-dark" onClick={runSimulation}>🔍 Run Risk Simulation</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} >
          <Card>
            <Card.Body >
              <Card.Title>🚨 Alerts & Flags</Card.Title>
              <Table striped>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Message</th>
                    <th>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.alerts.map((alert, idx) => (
                    <tr key={idx}>
                      <td>{alert.type}</td>
                      <td>{alert.message}</td>
                      <td>
                        <Badge bg={
                          alert.level === "High" ? "danger" :
                          alert.level === "Medium" ? "warning" : "info"
                        }>
                          {alert.level}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showSimModal} onHide={() => setShowSimModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🧪 Simulation Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Risk Level:</strong> {simResult?.risk}</p>
          <p><strong>Next Action:</strong> {simResult?.nextAction}</p>
          <p><strong>AI Suggestion:</strong> {simResult?.AIExplanation}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSimModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  </>
  );
};

export default HealthCoachDashboard;
