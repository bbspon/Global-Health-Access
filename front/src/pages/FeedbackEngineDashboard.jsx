// Filename: PatientFeedbackEngine.jsx

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Modal,
  Badge,
  Alert,
} from "react-bootstrap";
import { Mic, CameraVideo, StarFill } from "react-bootstrap-icons";

const feedbackTags = [
  "Long Wait",
  "Friendly Staff",
  "Clean Facility",
  "No Female Doctor",
  "Quick Service",
  "Delay in Report",
];

const PatientFeedbackEngine = () => {
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    type: "",
    rating: 0,
    tags: [],
    text: "",
  });
  const [errors, setErrors] = useState({});
  const [voiceTranscribing, setVoiceTranscribing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (field, value) => {
    setNewFeedback({ ...newFeedback, [field]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newFeedback.type) newErrors.type = "Service type is required.";
    if (!newFeedback.rating || newFeedback.rating < 1 || newFeedback.rating > 5)
      newErrors.rating = "Rating must be between 1 and 5.";
    if (!newFeedback.text) newErrors.text = "Feedback text is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    setVoiceTranscribing(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewFeedback((prev) => ({ ...prev, text: prev.text + " " + transcript }));
      setVoiceTranscribing(false);
    };

    recognition.onerror = () => {
      alert("Voice input failed.");
      setVoiceTranscribing(false);
    };
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newEntry = {
      id: `FB${feedbacks.length + 1}`,
      hospital: "Dynamic Hospital",
      sentiment: newFeedback.rating >= 4 ? "Positive" : "Negative",
      status: newFeedback.rating < 3 ? "Escalated" : "Closed",
      impact: newFeedback.rating < 3
        ? "Flagged to hospital compliance"
        : "Added to hospital NPS",
      ...newFeedback,
      image: imageFile || null,
    };
    setFeedbacks([newEntry, ...feedbacks]);
    setShowModal(false);
    setNewFeedback({ type: "", rating: 0, tags: [], text: "" });
    setErrors({});
    setImageFile(null);
  };

  return (
    <Container className="py-4">
      <h3>📊 Patient Feedback & Plan Refinement Engine</h3>
      <Row className="my-3">
        <Col>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Submit Feedback
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Hospital</th>
            <th>Rating</th>
            <th>Tags</th>
            <th>Text</th>
            <th>Sentiment</th>
            <th>Status</th>
            <th>Impact</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb.id}>
              <td>{fb.id}</td>
              <td>{fb.type}</td>
              <td>{fb.hospital}</td>
              <td>
                {[...Array(fb.rating)].map((_, i) => (
                  <StarFill key={i} color="gold" />
                ))}
              </td>
              <td>{fb.tags.join(", ")}</td>
              <td>{fb.text}</td>
              <td>
                <Badge bg={fb.sentiment === "Positive" ? "success" : "danger"}>
                  {fb.sentiment}
                </Badge>
              </td>
              <td>{fb.status}</td>
              <td>{fb.impact}</td>
              <td>{fb.image && <img src={fb.image} alt="upload" height={40} />}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                as="select"
                value={newFeedback.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              >
                <option value="">Select...</option>
                <option>OPD Visit</option>
                <option>Doctor Appointment</option>
                <option>Lab Test</option>
                <option>Pharmacy</option>
                <option>App Experience</option>
              </Form.Control>
              {errors.type && <Alert variant="danger">{errors.type}</Alert>}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={5}
                value={newFeedback.rating}
                onChange={(e) => handleInputChange("rating", parseInt(e.target.value))}
              />
              {errors.rating && <Alert variant="danger">{errors.rating}</Alert>}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="E.g., Clean, Delay, Staff"
                onChange={(e) => handleInputChange("tags", e.target.value.split(","))}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newFeedback.text}
                onChange={(e) => handleInputChange("text", e.target.value)}
              />
              {errors.text && <Alert variant="danger">{errors.text}</Alert>}
            </Form.Group>

            <Form.Group className="mt-3">
              <Button
                variant={voiceTranscribing ? "danger" : "outline-primary"}
                onClick={handleVoiceInput}
              >
                <Mic /> {voiceTranscribing ? "Listening..." : "Voice Input"}
              </Button>{' '}
              <Form.Label className="btn btn-outline-primary mb-0">
                <CameraVideo /> Upload Image
                <Form.Control type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </Form.Label>
            </Form.Group>

            {imageFile && (
              <div className="mt-3">
                <strong>Preview:</strong>
                <img src={imageFile} alt="Feedback Upload" className="img-fluid mt-2 rounded shadow" style={{ maxHeight: '200px' }} />
              </div>
            )}

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PatientFeedbackEngine;