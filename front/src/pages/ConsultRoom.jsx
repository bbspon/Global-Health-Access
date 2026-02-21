import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
  Alert,
  Badge,
  ListGroup,
} from "react-bootstrap";
import {
  CameraVideo,
  ChatDots,
  ClipboardCheck,
  CheckCircle,
  ExclamationTriangle,
  Send,
  Clock,
} from "react-bootstrap-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const ConsultRoom = () => {
  const [showNote, setShowNote] = useState(false);
  const [prescription, setPrescription] = useState("");
  const [note, setNote] = useState("");
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Static values for demo (replace with dynamic state later)
  const doctorId = "64f1b3d2b3c8e321c9999999";
  const patientId = "64f1b3d2b3c8e321c8888888";
  const patientName = "Aisha Khan";
  const symptoms = "Skin rash, itching";

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!chatMsg.trim()) return;
    const newMsg = {
      text: chatMsg,
      sender: "doctor",
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMsg]);
    setChatMsg("");
  };

  const handleSaveAll = async () => {
    setLoading(true);
    setSaved(false);
    setError("");

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
        setPrescription("");
        setNote("");
        setMessages([]);
        setTimeout(() => setSaved(false), 4000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save consultation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <Container fluid className="consult-room-container py-4" style={{ backgroundColor: "#f8fbff", minHeight: "100vh" }}>
      {/* Header Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="mb-1" style={{ color: "#1e3a5f", fontWeight: "700" }}>
              👨‍⚕️ Doctor Virtual Consult Room
            </h2>
            <p className="text-muted small mb-0">
              <Clock size={14} className="me-2" />
              Started at {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/home-visit" className="text-decoration-none">
              <Button variant="outline-info" size="sm">
                Home Visit
              </Button>
            </Link>
            <Link to="/doctor-referral" className="text-decoration-none">
              <Button variant="outline-info" size="sm">
                Doctor Referral
              </Button>
            </Link>
          </div>
        </div>
        <hr className="mt-2 mb-4" style={{ opacity: "0.2" }} />
      </div>

      {/* Alerts */}
      {saved && (
        <Alert variant="success" className="mb-4 border-0 shadow-sm d-flex align-items-center">
          <CheckCircle className="me-2" size={20} />
          <span>✅ Consultation saved to vault successfully!</span>
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mb-4 border-0 shadow-sm d-flex align-items-center">
          <ExclamationTriangle className="me-2" size={20} />
          <span>{error}</span>
        </Alert>
      )}

      <Row className="g-4">
        {/* Main Consultation Area */}
        <Col lg={8}>
          {/* Video Section */}
          <Card className="mb-4 border-0 shadow-sm consultation-card">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <CameraVideo size={20} className="me-2" style={{ color: "#0066cc" }} />
                <h5 className="mb-0" style={{ color: "#1e3a5f" }}>
                  Live Video Consultation
                </h5>
                <Badge bg="danger" className="ms-auto">
                  LIVE
                </Badge>
              </div>
              <div
                className="video-placeholder bg-dark text-white text-center p-5 rounded"
                style={{
                  minHeight: "350px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage:
                    "linear-gradient(135deg, #001a4d 0%, #003d99 100%)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                  🎥 WebRTC Video Stream Starting...
                </span>
              </div>
            </Card.Body>
          </Card>

          {/* Chat Section */}
          <Card className="border-0 shadow-sm consultation-card">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <ChatDots size={20} className="me-2" style={{ color: "#0066cc" }} />
                <h5 className="mb-0" style={{ color: "#1e3a5f" }}>
                  Consultation Chat
                </h5>
              </div>

              {/* Messages Container */}
              <div
                className="messages-container mb-3 p-3 rounded"
                style={{
                  backgroundColor: "#f0f7ff",
                  minHeight: "200px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  border: "1px solid #cce5ff",
                }}
              >
                {messages.length === 0 ? (
                  <div className="text-center text-muted py-5">
                    <ChatDots size={32} className="mb-2 opacity-50" />
                    <p>No messages yet. Start the conversation...</p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`mb-3 d-flex ${
                          msg.sender === "doctor" ? "justify-content-end" : "justify-content-start"
                        }`}
                      >
                        <div
                          className="message-bubble px-3 py-2 rounded"
                          style={{
                            backgroundColor: msg.sender === "doctor" ? "#0066cc" : "#e8f0ff",
                            color: msg.sender === "doctor" ? "#fff" : "#333",
                            maxWidth: "70%",
                            wordWrap: "break-word",
                          }}
                        >
                          <p className="mb-1">{msg.text}</p>
                          <small
                            style={{
                              opacity: "0.7",
                              fontSize: "11px",
                            }}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </small>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Message Input */}
              <Form.Group className="mb-0">
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    value={chatMsg}
                    onChange={(e) => setChatMsg(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message here..."
                    className="rounded-pill"
                  />
                  <Button
                    onClick={sendMessage}
                    variant="primary"
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px", padding: "0" }}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Sidebar - Patient Info & Actions */}
        <Col lg={4}>
          {/* Patient Information Card */}
          <Card className="mb-4 border-0 shadow-sm consultation-card">
            <Card.Body className="p-4">
              <h6 className="mb-3" style={{ color: "#1e3a5f", fontWeight: "600" }}>
                📋 Patient Information
              </h6>
              <ListGroup variant="flush" className="patient-info">
                <ListGroup.Item
                  className="px-0 py-2 border-0"
                  style={{ backgroundColor: "transparent" }}
                >
                  <small className="text-muted">Name</small>
                  <p className="mb-0" style={{ color: "#1e3a5f", fontWeight: "500" }}>
                    {patientName}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item
                  className="px-0 py-2 border-0"
                  style={{ backgroundColor: "transparent" }}
                >
                  <small className="text-muted">Reported Symptoms</small>
                  <p className="mb-0" style={{ color: "#1e3a5f", fontWeight: "500" }}>
                    {symptoms}
                  </p>
                </ListGroup.Item>
              </ListGroup>
              <Button
                variant="outline-primary"
                size="sm"
                className="mt-3 w-100 rounded"
                onClick={() => setShowNote(true)}
              >
                Add Consultation Notes
              </Button>
            </Card.Body>
          </Card>

          {/* Notes Modal */}
          <Modal show={showNote} onHide={() => setShowNote(false)} centered>
            <Modal.Header closeButton className="border-0 bg-light">
              <Modal.Title style={{ color: "#1e3a5f", fontWeight: "600" }}>
                📝 Doctor Notes
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
              <Form.Control
                as="textarea"
                rows={5}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your clinical observations here..."
                className="rounded"
              />
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button variant="secondary" onClick={() => setShowNote(false)} className="rounded">
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowNote(false);
                }}
                className="rounded"
              >
                Save Notes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Prescription Card */}
          <Card className="border-0 shadow-sm consultation-card mb-4">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <ClipboardCheck size={20} className="me-2" style={{ color: "#0066cc" }} />
                <h6 className="mb-0" style={{ color: "#1e3a5f", fontWeight: "600" }}>
                  Create Prescription
                </h6>
              </div>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="e.g. Tab Levocetirizine 5mg - Once daily after dinner"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="mb-3 rounded"
              />
              <Button variant="success" className="w-100 rounded" disabled={!prescription.trim()}>
                💾 Save Rx to Vault
              </Button>
            </Card.Body>
          </Card>

          {/* End Consultation Button */}
          <Button
            variant="danger"
            className="w-100 rounded mb-3"
            onClick={handleSaveAll}
            disabled={loading}
            style={{ padding: "12px 0", fontWeight: "600", fontSize: "16px" }}
          >
            {loading ? "Saving..." : "🏁 End Consultation & Save"}
          </Button>

          {/* Summary Card */}
          <Card className="border-0 shadow-sm" style={{ backgroundColor: "#f0f7ff" }}>
            <Card.Body className="p-3">
              <h6 className="mb-3" style={{ color: "#1e3a5f", fontSize: "14px", fontWeight: "600" }}>
                📊 Session Summary
              </h6>
              <small className="text-muted d-block mb-2">
                ✓ Messages: <strong>{messages.length}</strong>
              </small>
              <small className="text-muted d-block mb-2">
                ✓ Notes: <strong>{note.length > 0 ? "Added" : "Pending"}</strong>
              </small>
              <small className="text-muted d-block">
                ✓ Prescription: <strong>{prescription.length > 0 ? "Added" : "Pending"}</strong>
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <style>
      {`
      /* ConsultRoom Component Styles */

.consult-room-container {
  background: linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%);
}

.consultation-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.consultation-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.video-placeholder {
  background-image: linear-gradient(135deg, #001a4d 0%, #003d99 100%);
  border-radius: 8px;
  animation: pulse-gradient 3s ease-in-out infinite;
}

@keyframes pulse-gradient {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.95;
  }
}

/* Messages Container */
.messages-container {
  background-color: #f0f7ff;
  border: 1px solid #cce5ff;
  border-radius: 8px;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: #f0f7ff;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #0066cc;
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: #0052a3;
}

.message-bubble {
  animation: slideIn 0.3s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Patient Info */
.patient-info .list-group-item {
  border-bottom: 1px solid #e8f0ff;
  padding: 12px 0;
}

.patient-info .list-group-item:last-child {
  border-bottom: none;
}

/* Form Controls */
.form-control {
  border: 1px solid #cce5ff;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 14px;
  padding: 10px 12px;
}

.form-control:focus {
  border-color: #0066cc;
  box-shadow: 0 0 0 0.2rem rgba(0, 102, 204, 0.15);
  background-color: #fff;
}

.form-control::placeholder {
  color: #999;
  font-size: 13px;
}

/* Buttons */
.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 10px 16px;
  font-size: 14px;
}

.btn-primary {
  background-color: #0066cc;
  border-color: #0066cc;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0052a3;
  border-color: #0052a3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover:not(:disabled) {
  background-color: #218838;
  border-color: #218838;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.btn-success:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  font-weight: 600;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
  border-color: #c82333;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.btn-outline-primary {
  color: #0066cc;
  border-color: #0066cc;
}

.btn-outline-primary:hover {
  background-color: #0066cc;
  border-color: #0066cc;
  color: #fff;
}

.btn-outline-info {
  color: #17a2b8;
  border-color: #17a2b8;
  font-size: 13px;
  padding: 8px 12px;
}

.btn-outline-info:hover {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: #fff;
}

.btn-rounded-circle {
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Alerts */
.alert {
  border-radius: 8px;
  border: none;
  font-weight: 500;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

/* Modal */
.modal-content {
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.modal-header {
  background-color: #f8fbff;
  border-bottom: 1px solid #cce5ff;
}

/* Badge */
.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 5px 10px;
  letter-spacing: 0.5px;
}

/* Typography */
h2, h3, h4, h5, h6 {
  color: #1e3a5f;
  font-weight: 600;
}

.text-muted {
  color: #666 !important;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 991px) {
  .consultation-card {
    margin-bottom: 20px;
  }

  .btn {
    padding: 8px 12px;
    font-size: 13px;
  }

  .video-placeholder {
    min-height: 250px !important;
  }

  .messages-container {
    min-height: 150px;
    max-height: 250px;
  }
}

@media (max-width: 576px) {
  .consult-room-container {
    padding: 12px !important;
  }

  h2 {
    font-size: 20px;
  }

  .consultation-card {
    border-radius: 8px;
  }

  .btn {
    padding: 8px 10px;
    font-size: 12px;
  }

  .video-placeholder {
    min-height: 200px !important;
  }

  .message-bubble {
    max-width: 85% !important;
  }
}

/* Loading State */
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
`}
    </style>
  </>
  );
};

export default ConsultRoom;
