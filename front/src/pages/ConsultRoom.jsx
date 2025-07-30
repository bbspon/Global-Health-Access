import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { CameraVideo, ChatDots, ClipboardCheck } from "react-bootstrap-icons";
import axios from "axios";

const ConsultRoom = () => {
  const [showNote, setShowNote] = useState(false);
  const [prescription, setPrescription] = useState("");
  const [note, setNote] = useState("");
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Static values for demo (replace with dynamic state later)
  const doctorId = "64f1b3d2b3c8e321c9999999";
  const patientId = "64f1b3d2b3c8e321c8888888";
  const patientName = "Aisha Khan";
  const symptoms = "Skin rash, itching";

  const sendMessage = () => {
    if (!chatMsg) return;
    const newMsg = {
      text: chatMsg,
      sender: "doctor",
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMsg]);
    setChatMsg("");
  };

  const handleSaveAll = async () => {
    try {
      const payload = {
        doctorId,
        patientId,
        patientName,
        symptoms,
        notes: note,
        prescription,
        messages,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/consultation/save`,
        payload
      );
      if (res.data.success) {
        setSaved(true);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save consultation.");
    }
  };

  return (
    <Container fluid className="p-4">
      <h4>👨‍⚕️ Doctor Virtual Consult Room</h4>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <h5>
                <CameraVideo /> Live Video (WebRTC)
              </h5>
              <div className="bg-dark text-white text-center p-5 rounded">
                [ Video Stream Placeholder ]
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Form.Group>
                <Form.Label>
                  <ChatDots /> Chat with Patient
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  placeholder="Type your message..."
                />
              </Form.Group>
              <Button className="mt-2" onClick={sendMessage}>
                Send Message
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <h6>📄 Patient Information</h6>
              <p>
                <strong>Name:</strong> {patientName}
              </p>
              <p>
                <strong>Reported Symptoms:</strong> {symptoms}
              </p>
              <Button
                variant="outline-secondary"
                onClick={() => setShowNote(true)}
              >
                Add Consultation Notes
              </Button>

              <Modal show={showNote} onHide={() => setShowNote(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Doctor Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write your clinical observations here..."
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowNote(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => setShowNote(false)}>
                    Save Notes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h6>
                <ClipboardCheck /> Create Prescription
              </h6>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="e.g. Tab Levocetirizine 5mg - Once daily after dinner"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
              />
              <Button className="mt-2 w-100" variant="success">
                Save Rx to Vault
              </Button>
            </Card.Body>
          </Card>

          <Button
            variant="danger"
            className="mt-3 w-100"
            onClick={handleSaveAll}
          >
            End Consultation & Save Everything
          </Button>

          {saved && (
            <Alert variant="success" className="mt-2">
              ✅ Saved to vault.
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-2">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultRoom;
