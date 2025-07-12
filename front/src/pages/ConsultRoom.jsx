import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import {
  CameraVideo,
  ChatDots,
  ClipboardCheck,
  CloudUpload,
} from "react-bootstrap-icons";

const ConsultRoom = () => {
  const [showNote, setShowNote] = useState(false);
  const [prescription, setPrescription] = useState("");
  const [note, setNote] = useState("");
  const [chat, setChat] = useState([]);

  const handleEndConsult = () => {
    // Placeholder for save logic
    alert("Consultation ended. Notes and prescription saved to Vault.");
  };

  return (
    <Container fluid className="p-4">
      <h4>👨‍⚕️ Doctor Virtual Consult Room</h4>
      <Row>
        {/* Video & Chat Column */}
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <h5><CameraVideo /> Live Video (WebRTC)</h5>
              <div className="bg-dark text-white text-center p-5 rounded">
                [ Video Stream Placeholder ]
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Form.Group>
                <Form.Label><ChatDots /> Chat with Patient</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Type your message..."
                />
              </Form.Group>
              <Button className="mt-2">Send Message</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Side Panel for Notes & Prescription */}
        <Col md={4}>
          {/* Patient Info & Notes */}
          <Card className="mb-3">
            <Card.Body>
              <h6>📄 Patient Information</h6>
              <p><strong>Name:</strong> Aisha Khan</p>
              <p><strong>Reported Symptoms:</strong> Skin rash, itching</p>
              <Button variant="outline-secondary" onClick={() => setShowNote(true)}>
                Add Consultation Notes
              </Button>

              {/* Notes Modal */}
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
                  <Button variant="secondary" onClick={() => setShowNote(false)}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowNote(false);
                      alert("Notes saved.");
                    }}
                  >
                    Save Notes
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Card>

          {/* Prescription Entry */}
          <Card>
            <Card.Body>
              <h6><ClipboardCheck /> Create Prescription</h6>
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
            onClick={handleEndConsult}
          >
            End Consultation & Save Everything
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ConsultRoom;
