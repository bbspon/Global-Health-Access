import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Badge,
} from "react-bootstrap";
import { Calendar2Check, GeoAlt, ClockHistory } from "react-bootstrap-icons";

const BookingManager = () => {
  const [show, setShow] = useState(false);
  const [bookingType, setBookingType] = useState("opd");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission here
    alert("Booking submitted!");
    handleClose();
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <h3>Booking & Scheduling Dashboard</h3>
          <p className="text-muted">Manage appointments and availability</p>
          <Button variant="primary" onClick={handleShow}>
            + New Booking
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Appointment Booking</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Booking Type</Form.Label>
              <Form.Select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value)}
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
              <Form.Control type="text" placeholder="Dr. Rajesh Sharma" />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Preferred Date & Time</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Check
                type="checkbox"
                label="Send WhatsApp Confirmation"
                defaultChecked
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
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
