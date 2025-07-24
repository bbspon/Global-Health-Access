// Filename: PatientFeedbackEngine.jsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
  Alert,
} from "react-bootstrap";
import { Mic, CameraVideo, StarFill } from "react-bootstrap-icons";
import { fetchAllFeedback, submitFeedback } from "../services/feedbackAPI";

const PatientFeedbackEngine = () => {
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    type: "",
    rating: "",
    tags: [],
    text: "",
  });
  const [errors, setErrors] = useState({});
  const [voiceTranscribing, setVoiceTranscribing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // ✅ Fetch existing feedbacks on page load
  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const data = await fetchAllFeedback();
        setFeedbacks(data);
      } catch (error) {
        console.error("Fetch feedback error:", error);
      }
    };

    loadFeedbacks();
  }, []);

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
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    setVoiceTranscribing(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNewFeedback((prev) => ({
        ...prev,
        text: prev.text + " " + transcript,
      }));
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

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = {
      type: newFeedback.type,
      rating: parseInt(newFeedback.rating),
      tags: newFeedback.tags,
      comment: newFeedback.text,
      image: imageFile,
      submittedAt: new Date(),
    };

    try {
      const res = await submitFeedback(payload);
      setFeedbacks([res.data, ...feedbacks]); // ✅ Correctly append new feedback
      setShowModal(false);
      setNewFeedback({ type: "", rating: "", tags: [], text: "" });
      setErrors({});
      setImageFile(null);
    } catch (err) {
      console.error("Feedback submission failed:", err);
      alert("Error submitting feedback.");
    }
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
            <th>Type</th>
            <th>Rating</th>
            <th>Tags</th>
            <th>Text</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb, index) => (
            <tr key={index}>
              <td>{fb.type}</td>
              <td>
                {[...Array(fb.rating || 0)].map((_, i) => (
                  <StarFill key={i} color="gold" />
                ))}
              </td>
              <td>{fb.tags?.join(", ")}</td>
              <td>{fb.comment}</td>
              <td>
                {fb.image && <img src={fb.image} alt="upload" height={40} />}
              </td>
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
                <option value="opd">OPD Visit</option>
                <option value="doctor">Doctor Appointment</option>
                <option value="lab">Lab Test</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="app">App Experience</option>
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
                onChange={(e) =>
                  handleInputChange(
                    "rating",
                    e.target.value === "" ? "" : parseInt(e.target.value)
                  )
                }
              />
              {errors.rating && <Alert variant="danger">{errors.rating}</Alert>}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="E.g., Clean, Delay, Staff"
                onChange={(e) =>
                  handleInputChange(
                    "tags",
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
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
              </Button>{" "}
              <Form.Label className="btn btn-outline-primary mb-0">
                <CameraVideo /> Upload Image
                <Form.Control
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </Form.Label>
            </Form.Group>

            {imageFile && (
              <div className="mt-3">
                <strong>Preview:</strong>
                <img
                  src={imageFile}
                  alt="Feedback Upload"
                  className="img-fluid mt-2 rounded shadow"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PatientFeedbackEngine;
