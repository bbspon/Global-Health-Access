import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const SupportPage = () => {
  const [issueCategory, setIssueCategory] = useState("Billing Issue");
  const [issueDescription, setIssueDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/support/raise", {
        issueCategory,
        issueDescription,
      });
      setStatusMessage("✅ Ticket raised successfully.");
      setIssueDescription("");
    } catch (err) {
      console.error("❌ Failed to raise ticket:", err);
      setStatusMessage("❌ Failed to submit. Try again later.");
    }
  };

  return (
    <Container className="py-4">
      <h4>🆘 Support & Escalations</h4>
      <Card body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Issue Category</Form.Label>
            <Form.Select
              value={issueCategory}
              onChange={(e) => setIssueCategory(e.target.value)}
            >
              <option>Billing Issue</option>
              <option>Tech Support</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Describe the issue</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Raise Ticket
          </Button>
        </Form>
        {statusMessage && <p className="mt-3">{statusMessage}</p>}
      </Card>
    </Container>
  );
};

export default SupportPage;
