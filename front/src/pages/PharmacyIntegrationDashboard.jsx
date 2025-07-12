import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import { CloudUpload } from "react-bootstrap-icons";

const mockPrescriptions = [
  {
    id: "RX-001",
    patient: "Aarav Sharma",
    doctor: "Dr. Meera Rao",
    date: "2025-07-09",
    status: "Delivered",
    meds: ["Pantoprazole", "Isotretinoin"],
    deliveryPartner: "PharmEasy",
  },
];

const PharmacyIntegrationDashboard = () => {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [refillSettings, setRefillSettings] = useState({
    refillEnabled: false,
    alertEnabled: false,
  });
  const [uploadFile, setUploadFile] = useState(null);

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!uploadFile) {
      alert("Please select a file to upload");
      return;
    }

    const newPrescription = {
      id: `RX-${Date.now()}`,
      patient: "External Upload",
      doctor: "Unknown",
      date: new Date().toISOString().split("T")[0],
      status: "Pending Scan",
      meds: [uploadFile.name.replace(/\.[^/.]+$/, "")],
      deliveryPartner: "Not Assigned",
    };

    setPrescriptions([newPrescription, ...prescriptions]);
    alert(`Prescription '${uploadFile.name}' uploaded & added to dashboard.`);
    setUploadFile(null);
  };

  const handleRefillUpdate = () => {
    alert(
      `Refill Settings Updated:\n- Refill: ${
        refillSettings.refillEnabled ? "ON" : "OFF"
      }\n- Alert: ${refillSettings.alertEnabled ? "ON" : "OFF"}`
    );
  };

  return (
    <>
    <Container fluid className="  my-4 p-3">
      <h3 className="mb-4">💊 Pharmacy Integration Dashboard</h3>

      {/* Prescription Table */}
      <Row>
        <Col md={12}>
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <strong>📋 All Prescriptions (Live)</strong>
            </Card.Header>
            <Card.Body className="p-0">
              <Table striped bordered hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Prescription ID</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Medications</th>
                    <th>Status</th>
                    <th>Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptions.map((rx) => (
                    <tr key={rx.id}>
                      <td>{rx.id}</td>
                      <td>{rx.patient}</td>
                      <td>{rx.date}</td>
                      <td>{rx.meds.join(", ")}</td>
                      <td>
                        <Badge
                          bg={
                            rx.status === "Delivered"
                              ? "success"
                              : rx.status === "Pending Scan"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {rx.status}
                        </Badge>
                      </td>
                      <td>{rx.deliveryPartner}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upload + Settings Cards */}
      <Row>
        <Col md={6}>
          <Card className="mb-4 shadow-sm h-100">
            <Card.Header>📤 Upload External Prescription</Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Upload Image / PDF</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="mt-3 w-100"
                onClick={handleFileUpload}
              >
                <CloudUpload className="me-2" /> Scan & Add
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 shadow-sm h-100">
            <Card.Header>⚙️ Auto-Refill Settings</Card.Header>
            <Card.Body>
              <Form.Check
                label="Enable refill for chronic patients"
                checked={refillSettings.refillEnabled}
                onChange={() =>
                  setRefillSettings((prev) => ({
                    ...prev,
                    refillEnabled: !prev.refillEnabled,
                  }))
                }
              />
              <Form.Check
                label="Notify after 25 days of inactivity"
                checked={refillSettings.alertEnabled}
                onChange={() =>
                  setRefillSettings((prev) => ({
                    ...prev,
                    alertEnabled: !prev.alertEnabled,
                  }))
                }
              />
              <Button
                variant="success"
                className="mt-3 w-100"
                onClick={handleRefillUpdate}
              >
                Update Settings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default PharmacyIntegrationDashboard;
