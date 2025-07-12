import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const SupportPage = () => {
  return (
    <Container className="py-4">
      <h4>🆘 Support & Escalations</h4>
      <Card body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Issue Category</Form.Label>
            <Form.Select>
              <option>Billing Issue</option>
              <option>Tech Support</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Describe the issue</Form.Label>
            <Form.Control as="textarea" rows={4} />
          </Form.Group>
          <Button variant="danger">Raise Ticket</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SupportPage;
