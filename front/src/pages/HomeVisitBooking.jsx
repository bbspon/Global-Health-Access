import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const HomeVisitBooking = () => {
  const [serviceType, setServiceType] = useState("");
  const [slot, setSlot] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const userIdFromStorage = bbsUserData?.user?.id;
  console.log(userIdFromStorage, "UserId");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceType || !slot || !address) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/home-visits`,
        {
          serviceType,
          slot,
          address,
          userId: userIdFromStorage, // Optional: replace or remove if not available
          paymentStatus: "Paid", // Optional: or set to "Pending"
        }
      );

      console.log("Booking successful:", response.data);
      setSubmitted(true);
      setServiceType("");
      setSlot("");
      setAddress("");
    } catch (err) {
      console.error("Booking error:", err);
      setError("Booking failed. Please try again.");
    }
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

            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            {submitted && (
              <Alert variant="success" className="mt-3">
                ✅ Booking Confirmed! Redirecting to payment...
              </Alert>
            )}

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
