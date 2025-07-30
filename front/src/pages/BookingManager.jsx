import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

const BookingManager = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    bookingType: "opd",
    providerName: "",
    dateTime: "",
    patientName: "",
    sendWhatsapp: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URI}/appointments`, form);
      alert("Appointment Booked Successfully!");
      setShow(false);
      setForm({
        bookingType: "opd",
        providerName: "",
        dateTime: "",
        patientName: "",
        sendWhatsapp: true,
      });
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Failed to book appointment.");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <h3>Booking & Scheduling Dashboard</h3>
          <p className="text-muted">Manage appointments and availability</p>
          <Button variant="primary" onClick={() => setShow(true)}>
            + New Booking
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Appointment Booking</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Booking Type</Form.Label>
              <Form.Select
                name="bookingType"
                value={form.bookingType}
                onChange={handleChange}
              >
                <option value="opd">OPD</option>
                <option value="lab">Lab Test</option>
                <option value="scan">Scan</option>
                <option value="video">Video Consultation</option>
                <option value="home">Home Sample Collection</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Doctor/Provider</Form.Label>
              <Form.Control
                type="text"
                name="providerName"
                value={form.providerName}
                onChange={handleChange}
                placeholder="Dr. Rajesh Sharma"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Preferred Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="dateTime"
                value={form.dateTime}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                name="patientName"
                value={form.patientName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Check
                type="checkbox"
                label="Send WhatsApp Confirmation"
                name="sendWhatsapp"
                checked={form.sendWhatsapp}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Book Appointment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default BookingManager;
