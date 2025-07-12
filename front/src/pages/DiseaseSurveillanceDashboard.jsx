// File: DiseaseSurveillanceDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mockHospitalSpikes = [
  { id: 1, city: "Mumbai", cases: 78, lastUpdated: "2025-07-10 10:30" },
  { id: 2, city: "Dubai", cases: 42, lastUpdated: "2025-07-10 11:00" },
];
const mockLabTrends = [
  { test: "Blood Culture Positivity", value: 12, trend: "up" },
  { test: "COVID PCR Positivity", value: 5, trend: "down" },
];
const mockPharmacyTrends = [
  { drug: "Paracetamol", sales: 230, trend: "up" },
  { drug: "Cough Syrup", sales: 150, trend: "steady" },
];
const mockAlerts = [
  {
    id: 101,
    region: "Delhi NCR",
    message: "Fever spike detected; hospital ICU capacity at 80%",
    level: "warning",
    time: "2025-07-10 11:45",
  },
  {
    id: 102,
    region: "Sharjah",
    message: "Increase in OTC cough syrup sales over threshold",
    level: "info",
    time: "2025-07-10 11:15",
  },
];

// Geo Heatmap mock clusters
const geoClusters = [
  {
    id: "c1",
    lat: 28.7041,
    lng: 77.1025,
    radius: 5000,
    intensity: 0.7,
    region: "Delhi",
  },
  {
    id: "c2",
    lat: 25.276987,
    lng: 55.296249,
    radius: 3000,
    intensity: 0.5,
    region: "Dubai",
  },
];

export default function DiseaseSurveillanceDashboard() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [icuBeds, setIcuBeds] = useState(100);
  const [icuDemand, setIcuDemand] = useState(70);

  // Simulate alert auto refresh every 30 seconds (mock)
  useEffect(() => {
    const interval = setInterval(() => {
      // In real: fetch new alerts here
      // For now, simulate new alert
      // Skip to keep UI stable
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Hospital Surge Simulation (simple example)
  const runSimulation = () => {
    // Predict ICU bed needs if outbreak grows 25%
    const projected = Math.min(Math.round(icuDemand * 1.25), icuBeds);
    alert(
      `Hospital Surge Simulation Result:\nCurrent ICU Beds: ${icuBeds}\nProjected Demand (25% growth): ${projected}`
    );
  };

  return (
    <Container fluid className="p-3" style={{ minHeight: "100vh", backgroundColor: "#f7f9fc" }}>
      <h2 className="mb-4 text-primary">AI Disease Surveillance Grid + Pandemic Readiness</h2>

      <Row className="mb-3">
        <Col md={4}>
          <Card border="info">
            <Card.Header>🏥 Hospital Admission Spike Monitor</Card.Header>
            <Card.Body>
              <ListGroup variant="flush" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {mockHospitalSpikes.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <strong>{item.city}</strong>: {item.cases} fever/respiratory cases{" "}
                    <small className="text-muted">({item.lastUpdated})</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card border="success">
            <Card.Header>🧪 Lab Result Correlation Engine</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {mockLabTrends.map((test) => (
                  <ListGroup.Item key={test.test}>
                    {test.test}: <strong>{test.value}%</strong>{" "}
                    <span
                      style={{
                        color:
                          test.trend === "up"
                            ? "green"
                            : test.trend === "down"
                            ? "red"
                            : "gray",
                      }}
                    >
                      ({test.trend})
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card border="warning">
            <Card.Header>💊 Pharmacy Sales Trends</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {mockPharmacyTrends.map((drug) => (
                  <ListGroup.Item key={drug.drug}>
                    {drug.drug}: <strong>{drug.sales}</strong> units{" "}
                    <span
                      style={{
                        color:
                          drug.trend === "up"
                            ? "green"
                            : drug.trend === "down"
                            ? "red"
                            : "gray",
                      }}
                    >
                      ({drug.trend})
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Header>📍 Geo Heatmap Dashboard (Cluster Detection)</Card.Header>
            <Card.Body style={{ height: "400px" }}>
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={4}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {geoClusters.map((cluster) => (
                  <CircleMarker
                    key={cluster.id}
                    center={[cluster.lat, cluster.lng]}
                    radius={Math.min(cluster.radius / 1000, 50)}
                    pathOptions={{
                      color: `rgba(255, 0, 0, ${cluster.intensity})`,
                      fillColor: `rgba(255, 0, 0, ${cluster.intensity * 0.5})`,
                    }}
                  >
                    <Tooltip>{`${cluster.region} - Intensity: ${(cluster.intensity * 100).toFixed(
                      0
                    )}%`}</Tooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Card border="danger h-100">
            <Card.Header>🚨 Auto Alert Triggers</Card.Header>
            <Card.Body style={{ maxHeight: "250px", overflowY: "auto" }}>
              {alerts.length === 0 && <Alert variant="info">No alerts currently.</Alert>}
              <ListGroup>
                {alerts.map((alert) => (
                  <ListGroup.Item
                    key={alert.id}
                    variant={alert.level === "warning" ? "warning" : alert.level === "info" ? "info" : "danger"}
                  >
                    <strong>{alert.region}</strong>: {alert.message}{" "}
                    <small className="text-muted float-end">{alert.time}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card border="primary">
            <Card.Header>🛡️ Pandemic Readiness & Response Engine</Card.Header>
            <Card.Body>
              <p>
                <strong>ICU Beds Available:</strong> {icuBeds}
                <br />
                <strong>Current ICU Demand:</strong> {icuDemand}
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setShowSimulationModal(true);
                }}
              >
                Run Hospital Surge Simulation
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={() => alert("Resource deployment planner will open here (future).")}
              >
                Open Resource Deployment Planner
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Hospital Surge Simulation Modal */}
      <Modal
        show={showSimulationModal}
        onHide={() => setShowSimulationModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hospital Surge Simulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="icuBedsInput" className="mb-3">
              <Form.Label>Total ICU Beds</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={icuBeds}
                onChange={(e) => setIcuBeds(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="icuDemandInput" className="mb-3">
              <Form.Label>Current ICU Demand</Form.Label>
              <Form.Control
                type="number"
                min={0}
                value={icuDemand}
                onChange={(e) => setIcuDemand(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
          <Alert variant="info">
            This simulation predicts ICU demand growth based on outbreak progression.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              runSimulation();
              setShowSimulationModal(false);
            }}
          >
            Run Simulation
          </Button>
          <Button variant="secondary" onClick={() => setShowSimulationModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
