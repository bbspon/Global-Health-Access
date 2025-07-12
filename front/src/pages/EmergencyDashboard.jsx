// EmergencyDashboard.jsx
import React, { useState } from "react";
import {
  Container, Row, Col, Card, Button, Table, Modal, Badge
} from "react-bootstrap";
import { GeoAltFill, AlarmFill } from "react-bootstrap-icons";
import jsPDF from "jspdf";

const dummyLogs = [
  {
    user: "Riya Verma",
    plan: "Gold",
    time: "2025-07-09 13:24",
    location: "Bandra, Mumbai",
    status: "Resolved",
    method: "Fall Detection",
    allergies: "Penicillin",
    conditions: "Diabetes, Asthma",
    instructions: "Alert daughter, avoid morphine",
  },
  {
    user: "Ahmed Khan",
    plan: "Platinum",
    time: "2025-07-08 22:10",
    location: "Bur Dubai, UAE",
    status: "Escalated",
    method: "Voice Trigger",
    allergies: "None",
    conditions: "Hypertension",
    instructions: "Call wife, avoid sedatives",
  },
];

const EmergencyDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfile(true);
  };

  const downloadPDF = () => {
    if (!selectedUser) return;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Emergency Health Summary", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${selectedUser.user}`, 20, 40);
    doc.text(`Health Plan: ${selectedUser.plan}`, 20, 50);
    doc.text(`Allergies: ${selectedUser.allergies}`, 20, 60);
    doc.text(`Medical Conditions: ${selectedUser.conditions}`, 20, 70);
    doc.text(`Emergency Instructions: ${selectedUser.instructions}`, 20, 80);
    doc.text(`Last Known Location: ${selectedUser.location}`, 20, 90);
    doc.text(`Trigger Method: ${selectedUser.method}`, 20, 100);
    doc.text(`Time of Event: ${selectedUser.time}`, 20, 110);

    doc.save(`Emergency_Profile_${selectedUser.user.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <h3><AlarmFill className="text-danger me-2" /> Emergency Event Logs</h3>
          <Card className="mt-3 shadow">
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Trigger</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyLogs.map((log, idx) => (
                    <tr key={idx}>
                      <td>{log.user}</td>
                      <td><Badge bg="info">{log.plan}</Badge></td>
                      <td>{log.time}</td>
                      <td><GeoAltFill className="text-danger" /> {log.location}</td>
                      <td>
                        <Badge bg={log.status === "Resolved" ? "success" : "warning"}>
                          {log.status}
                        </Badge>
                      </td>
                      <td>{log.method}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewProfile(log)}
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Patient Emergency Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Name: {selectedUser?.user}</h5>
          <p><strong>Health Plan:</strong> {selectedUser?.plan}</p>
          <p><strong>Medical Conditions:</strong> {selectedUser?.conditions}</p>
          <p><strong>Allergies:</strong> {selectedUser?.allergies}</p>
          <p><strong>Emergency Instructions:</strong> {selectedUser?.instructions}</p>
          <p><strong>Location:</strong> {selectedUser?.location}</p>
          <p><strong>Trigger Method:</strong> {selectedUser?.method}</p>
          <p><strong>Time:</strong> {selectedUser?.time}</p>
          <Button variant="success" onClick={downloadPDF}>
            Download Emergency PDF
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EmergencyDashboard;
