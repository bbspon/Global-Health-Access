import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const partnerTypes = ["Hospital", "Lab", "Franchisee", "Agent"];

const initialForm = {
  type: "Hospital",
  name: "",
  email: "",
  phone: "",
  city: "",
  organization: "",
  message: "",
  file: null,
};

const PartnerWithUsForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    setSubmitted(true);
  };

  const dynamicFields = () => {
    switch (formData.type) {
      case 'Hospital':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Accreditation (e.g., NABH)</Form.Label>
              <Form.Control type="text" name="accreditation" onChange={handleChange} />
            </Form.Group>
          </>
        );
      case 'Lab':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control type="text" name="license" onChange={handleChange} />
            </Form.Group>
          </>
        );
      case 'Franchisee':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Investment Budget (INR)</Form.Label>
              <Form.Control type="number" name="budget" onChange={handleChange} />
            </Form.Group>
          </>
        );
      case 'Agent':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Experience (in years)</Form.Label>
              <Form.Control type="number" name="experience" onChange={handleChange} />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-4">🤝 Partner With Us</h4>
            {submitted ? (
              <div className="alert alert-success">
                Thank you for your submission! We’ll get back to you shortly.
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Partner Type</Form.Label>
                  <Form.Select name="type" value={formData.type} onChange={handleChange}>
                    {partnerTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {dynamicFields()}

                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control type="text" name="organization" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" name="message" rows={3} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Document (Optional)</Form.Label>
                  <Form.Control type="file" name="file" onChange={handleChange} />
                </Form.Group>
                <Button type="submit" variant="primary">Submit Inquiry</Button>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PartnerWithUsForm;
