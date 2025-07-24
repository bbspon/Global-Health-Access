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
import axios from "axios";
import { useParams } from "react-router-dom"; // <-- for dynamic ID

const HealthCoachDashboard = () => {
  const [showSimModal, setShowSimModal] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [coachData, setCoachData] = useState(null);
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const userIdFromStorage = bbsUserData?.user?.id;
  const { userID } = useParams(); // ✅ get from URL
  console.log(userIdFromStorage, "UserId");

  useEffect(() => {
    if (!userID) return;

    axios
      .get(`http://localhost:5000/api/coach-data/${userID}`)
      .then((res) => setCoachData(res.data))
      .catch((err) => console.error("Failed to fetch coach data", err));
  }, [userID]);

  const runSimulation = () => {
    setSimResult({
      risk: "🔴 High Risk",
      nextAction: "Recommend Endocrinologist Call",
      AIExplanation: "Frequent spikes + missed insulin = hypoglycemia risk",
    });
    setShowSimModal(true);
  };

  if (!coachData) {
    return (
      <Container className="mt-4">
        <h4>Loading coach data...</h4>
      </Container>
    );
  }

  return (
    <>
      <Container fluid className="mt-4">
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>🧠 AI Coach – Patient Overview</Card.Title>
                <p>
                  <strong>Name:</strong> {coachData.patient.name}
                </p>
                <p>
                  <strong>Condition:</strong> {coachData.patient.condition}
                </p>
                <p>
                  <strong>Plan:</strong> {coachData.patient.plan}
                </p>
                <p>
                  <strong>Coach Status:</strong>{" "}
                  <Badge bg="success">{coachData.patient.coachStatus}</Badge>
                </p>
                <p>
                  <strong>Last HbA1c:</strong> {coachData.patient.lastHbA1c}
                </p>
                <p>
                  <strong>Adherence:</strong>{" "}
                  <ProgressBar
                    now={coachData.patient.medsAdherence}
                    label={`${coachData.patient.medsAdherence}%`}
                  />
                </p>
                <p>
                  <strong>Emotional State:</strong> {coachData.patient.mood}
                </p>
                <Button variant="outline-dark" onClick={runSimulation}>
                  🔍 Run Risk Simulation
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Body>
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
                    {coachData.alerts.map((alert, idx) => (
                      <tr key={idx}>
                        <td>{alert.type}</td>
                        <td>{alert.message}</td>
                        <td>
                          <Badge
                            bg={
                              alert.level === "High"
                                ? "danger"
                                : alert.level === "Medium"
                                ? "warning"
                                : "info"
                            }
                          >
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
            <p>
              <strong>Risk Level:</strong> {simResult?.risk}
            </p>
            <p>
              <strong>Next Action:</strong> {simResult?.nextAction}
            </p>
            <p>
              <strong>AI Suggestion:</strong> {simResult?.AIExplanation}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSimModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default HealthCoachDashboard;
