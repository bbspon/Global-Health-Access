import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Modal,
  Alert,
  Spinner
} from "react-bootstrap";

import {
  FaFingerprint,
  FaLock,
  FaRobot,
  FaWallet
} from "react-icons/fa"; // Optional icons

const FraudDetectionDashboard = () => {
  const [riskScores, setRiskScores] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulated API response
    setRiskScores([
      { id: 1, type: "User", name: "User 1123", risk: "High", flags: 4 },
      { id: 2, type: "Hospital", name: "Hospital XYZ", risk: "Medium", flags: 12 }
    ]);
    setDisputes([
      {
        id: "D001",
        user: "User1123",
        hospital: "XYZ",
        issue: "Duplicate Claims",
        status: "Pending"
      },
      {
        id: "D002",
        user: "User7754",
        hospital: "Nova Med",
        issue: "Overbilling",
        status: "Resolved"
      }
    ]);
    setLoading(false);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  const getHighRiskActions = () => (
    <div className="mt-3">
      <h6 className="text-danger">🔴 High-Risk Suggested Actions:</h6>
      <ul>
        <li><FaLock className="me-2" />Auto-freeze wallet & block claims</li>
        <li><FaFingerprint className="me-2" />Trigger biometric re-verification</li>
        <li><FaRobot className="me-2" />Launch AI deep behavior scan</li>
        <li><FaWallet className="me-2" />Notify Insurance & Admin Oversight</li>
        <li>Restrict login from unknown devices for 7 days</li>
        <li>Flag user for manual re-KYC if issue repeats</li>
      </ul>
    </div>
  );

  return (
    <Container fluid className="p-4">
      <h3 className="mb-4">🚨 AI Fraud Detection & Risk Dashboard</h3>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <>
          <Row>
            {/* Risk Score Overview */}
            <Col md={6}>
              <Card className="mb-4 shadow-sm h-100">
                <Card.Header>📊 Risk Score Overview</Card.Header>
                <Card.Body>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Risk</th>
                        <th>Flags</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskScores.map((item) => (
                        <tr key={item.id}>
                          <td>{item.type}</td>
                          <td>{item.name}</td>
                          <td>
                            <Badge bg={item.risk === "High" ? "danger" : "warning"}>
                              {item.risk}
                            </Badge>
                          </td>
                          <td>{item.flags}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleView(item)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            {/* Dispute Log Section */}
            <Col md={6}>
              <Card className="mb-4 shadow-sm h-100">
                <Card.Header>🧾 Dispute Flow & Audit Logs</Card.Header>
                <Card.Body >
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>Dispute ID</th>
                        <th>User</th>
                        <th>Hospital</th>
                        <th>Issue</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {disputes.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.user}</td>
                          <td>{item.hospital}</td>
                          <td>{item.issue}</td>
                          <td>
                            <Badge bg={item.status === "Resolved" ? "success" : "warning"}>
                              {item.status}
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

          {/* View Modal for Detail Inspection */}
          <Modal show={viewModal} onHide={() => setViewModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>📌 Detail View: {selectedItem?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Type:</strong> {selectedItem?.type}</p>
              <p><strong>Flags:</strong> {selectedItem?.flags}</p>
              <p><strong>Risk Level:</strong> {selectedItem?.risk}</p>
              <p><strong>Trigger:</strong> 3 OPDs within 2 hrs + geo/IP mismatch</p>

              {selectedItem?.risk === "High" && getHighRiskActions()}

              <Alert variant="info" className="mt-3">
                📡 All logs stored in Digital Vault. Review dispute trail via Admin Panel.
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setViewModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default FraudDetectionDashboard;
