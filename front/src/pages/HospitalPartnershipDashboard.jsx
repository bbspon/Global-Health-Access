// HospitalPartnershipKit.jsx
import React, { useState } from 'react';
import { Button, Modal, Form, Spinner, Container, Row, Col, Accordion, Table, Alert } from 'react-bootstrap';
import { FaFileDownload, FaQrcode, FaFileSignature, FaCheckCircle, FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";

const HospitalPartnershipKit = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', hospitalType: '', location: '', departments: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  const handleDownload = (docType) => {
    alert(`Downloading ${docType}...`);
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-primary">🏥 Hospital Partnership Toolkit</h2>
      <Link
        to="/health-access/pay-plan"
        className="btn btn-outline-success align-items-center gap-2"
      >
        Health Access Pay Plan
      </Link>
      <Link
        to="/health-card"
        className="btn btn-outline-success align-items-center gap-2"
      >
        Health Card
      </Link>
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            📥 Start Onboarding
          </Button>
        </Col>
        <Col>
          <Button variant="success" onClick={() => handleDownload("MSA")}>
            📄 Download MSA
          </Button>
        </Col>
        <Col>
          <Button variant="warning" onClick={() => handleDownload("Toolkit")}>
            🧰 Download Toolkit
          </Button>
          <Link
            to="/health-access/partner"
            className="btn btn-outline-success align-items-center gap-2"
          >
            Health Access Partner
          </Link>
        </Col>
      </Row>

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>🚀 Toolkit Components</Accordion.Header>
          <Accordion.Body>
            <ul>
              <li>📜 Master Service Agreement (India/UAE)</li>
              <li>✅ Terms of Participation (TOP)</li>
              <li>📊 Revenue Share Calculator</li>
              <li>📝 Hospital Onboarding Form</li>
              <li>🎓 Training PDF + Video (Multi-language)</li>
              <li>🎨 Co-Brand Poster & Standee</li>
              <li>📈 Pitch Deck (Editable)</li>
              <li>⚙️ Tech Setup Guide</li>
              <li>🔐 Privacy & Data Agreement</li>
              <li>📣 AI Onboarding Chatbot (Coming Soon)</li>
              <li>🏆 Partner Leaderboard + Gamification</li>
              <li>📡 CRM Auto Sync Integration</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>🌐 Country-Specific Onboarding</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>UAE</th>
                  <th>India</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Emirates ID, DHA, Arabic Docs</td>
                  <td>Aadhaar/GST, NABH, Regional Docs</td>
                </tr>
                <tr>
                  <td>VAT-Linked Invoices</td>
                  <td>GST-Ready Templates</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>📝 Hospital Onboarding</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitted && (
            <Alert variant="success">Form submitted successfully!</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Admin Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hospital Type</Form.Label>
              <Form.Select name="hospitalType" onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="multi-specialty">Multi-Specialty</option>
                <option value="clinic">Clinic</option>
                <option value="lab">Diagnostic Lab</option>
                <option value="pharmacy">Pharmacy</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Departments Offered</Form.Label>
              <Form.Control
                as="textarea"
                name="departments"
                rows={3}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HospitalPartnershipKit;