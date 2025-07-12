import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";

const HomeVisitBooking = () => {
  const [serviceType, setServiceType] = useState("");
  const [slot, setSlot] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!serviceType || !slot || !address) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    setError("");
    setSubmitted(true);

    // Simulate payment process or API call
    console.log("Booking Details:", { serviceType, slot, address });

    // Future: Navigate to payment or trigger payment modal here
  };

  return (
    <Container className="p-4">
      <h4>🏥 Book Home Doctor / Nurse Visit</h4>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="serviceType">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                as="select"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                <option value="">-- Select Service --</option>
                <option>General Physician</option>
                <option>Nurse (BP, injections)</option>
                <option>Physiotherapy</option>
                <option>Post-discharge Monitoring</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="slot">
              <Form.Label>Select Time Slot</Form.Label>
              <Form.Control
                type="datetime-local"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Enter Your Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {submitted && <Alert variant="success" className="mt-3">✅ Booking Confirmed! Redirecting to payment...</Alert>}

            <Button className="mt-3" variant="primary" type="submit">
              Confirm & Pay
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomeVisitBooking;
