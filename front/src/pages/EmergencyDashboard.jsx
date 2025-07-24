// EmergencyDashboard.jsx
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
} from "react-bootstrap";
import { GeoAltFill, AlarmFill } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import axios from "axios";

const EmergencyDashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [logs, setLogs] = useState([]);

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
useEffect(() => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;

  axios
    .get("http://localhost:5000/api/emergency/logs", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("✅ Emergency Logs API Response:", res.data); // <---- ADD THIS
      setLogs(res.data);
    })
    .catch((err) => console.error("❌ API Error:", err));
}, []);


  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <h3>
            <AlarmFill className="text-danger me-2" /> Emergency Event Logs
          </h3>
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
                  {logs.map((log, idx) => (
                    <tr key={idx}>
                      <td>{log.guardianContact || "N/A"}</td>
                      <td>
                        <Badge bg="info">
                          {log.plan || "No Plan Assigned"}
                        </Badge>
                      </td>
                      <td>{new Date(log.triggeredAt).toLocaleString()}</td>
                      <td>
                        <GeoAltFill className="text-danger" />{" "}
                        {log.location?.city || "Unknown"}
                      </td>
                      <td>
                        <Badge bg={log.resolved ? "success" : "warning"}>
                          {log.resolved ? "Resolved" : "Pending"}
                        </Badge>
                      </td>
                      <td>Triggered</td>
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
      <Modal
        show={showProfile}
        onHide={() => setShowProfile(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Patient Emergency Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Name: {selectedUser?.user}</h5>
          <p>
            <strong>Health Plan:</strong> {selectedUser?.plan}
          </p>
          <p>
            <strong>Medical Conditions:</strong> {selectedUser?.conditions}
          </p>
          <p>
            <strong>Allergies:</strong> {selectedUser?.allergies}
          </p>
          <p>
            <strong>Emergency Instructions:</strong>{" "}
            {selectedUser?.instructions}
          </p>
          <p>
            <strong>Location:</strong> {selectedUser?.location}
          </p>
          <p>
            <strong>Trigger Method:</strong> {selectedUser?.method}
          </p>
          <p>
            <strong>Time:</strong> {selectedUser?.time}
          </p>
          <Button variant="success" onClick={downloadPDF}>
            Download Emergency PDF
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EmergencyDashboard;
