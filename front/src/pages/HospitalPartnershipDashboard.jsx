// HospitalPartnershipKit.jsx
import React, { useState } from 'react';
import { Button, Modal, Form, Spinner, Container, Row, Col, Accordion, Table, Alert, Card } from 'react-bootstrap';
import { FaFileDownload, FaQrcode, FaFileSignature, FaCheckCircle, FaPlus, FaHospital, FaClipboardList, FaToolbox } from 'react-icons/fa';
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
    const base = import.meta.env.VITE_BASE_URL;
    const url =
      docType === "MSA"
        ? `${base}/downloads/msa.pdf`
        : `${base}/downloads/hospital-toolkit.zip`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="mb-5">
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#1a3a52", marginBottom: "12px" }}>
          🏥 Hospital Partnership Toolkit
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666", fontWeight: 500, marginBottom: 0 }}>
          Complete onboarding, resources, and support for hospital partners
        </p>
      </div>

      {/* Action Buttons Grid */}
      <Row className="mb-5 g-3">
        <Col md={6} lg={4}>
          <Card className="shadow-sm border-0 h-100 hover-shadow" style={{ transition: "all 0.3s ease" }}>
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📥</div>
              <h5 style={{ fontWeight: 600, marginBottom: "8px" }}>Start Onboarding</h5>
              <p className="text-muted small flex-grow-1">Begin your hospital partnership journey with our guided onboarding form</p>
              <Button variant="primary" onClick={() => setShowForm(true)} className="w-100 mt-3">
                <FaPlus className="me-2" /> Onboard Now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm border-0 h-100" style={{ transition: "all 0.3s ease" }}>
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📄</div>
              <h5 style={{ fontWeight: 600, marginBottom: "8px" }}>Master Service Agreement</h5>
              <p className="text-muted small flex-grow-1">Download the official MSA document for India & UAE regions</p>
              <Button variant="success" onClick={() => handleDownload("MSA")} className="w-100 mt-3">
                <FaFileDownload className="me-2" /> Download MSA
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="shadow-sm border-0 h-100" style={{ transition: "all 0.3s ease" }}>
            <Card.Body className="d-flex flex-column align-items-center text-center p-4">
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🧰</div>
              <h5 style={{ fontWeight: 600, marginBottom: "8px" }}>Complete Toolkit</h5>
              <p className="text-muted small flex-grow-1">Get all resources needed for successful partnership implementation</p>
              <Button variant="warning" onClick={() => handleDownload("Toolkit")} className="w-100 mt-3">
                <FaToolbox className="me-2" /> Download Toolkit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Links */}
      <div className="mb-5">
        <h5 style={{ fontWeight: 600, marginBottom: "16px", color: "#333" }}>Quick Access</h5>
        <Row className="g-2">
          <Col xs={12} sm={6} md={4}>
            <Link to="/health-access/pay-plan" className="btn btn-outline-info w-100 d-flex align-items-center justify-content-center">
              <FaClipboardList className="me-2" /> Health Access Pay Plan
            </Link>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Link to="/health-card" className="btn btn-outline-info w-100 d-flex align-items-center justify-content-center">
              <FaQrcode className="me-2" /> Health Card
            </Link>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Link to="/health-access/partner" className="btn btn-outline-info w-100 d-flex align-items-center justify-content-center">
              <FaHospital className="me-2" /> Health Access Partner
            </Link>
          </Col>
        </Row>
      </div>

      {/* Accordion Sections */}
      <div className="mb-5">
        <Accordion defaultActiveKey="0" className="shadow-sm">
          <Accordion.Item eventKey="0" className="border-0">
            <Accordion.Header style={{ fontWeight: 600, fontSize: "1.1rem", padding: "20px" }}>
              🚀 Toolkit Components
            </Accordion.Header>
            <Accordion.Body style={{ padding: "24px" }}>
              <Row>
                <Col md={6}>
                  <ul style={{ lineHeight: 1.8 }}>
                    <li>📜 Master Service Agreement (India/UAE)</li>
                    <li>✅ Terms of Participation (TOP)</li>
                    <li>📊 Revenue Share Calculator</li>
                    <li>📝 Hospital Onboarding Form</li>
                    <li>🎓 Training PDF + Video (Multi-language)</li>
                    <li>🎨 Co-Brand Poster & Standee</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul style={{ lineHeight: 1.8 }}>
                    <li>📈 Pitch Deck (Editable)</li>
                    <li>⚙️ Tech Setup Guide</li>
                    <li>🔐 Privacy & Data Agreement</li>
                    <li>📣 AI Onboarding Chatbot (Coming Soon)</li>
                    <li>🏆 Partner Leaderboard + Gamification</li>
                    <li>📡 CRM Auto Sync Integration</li>
                  </ul>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className="border-0">
            <Accordion.Header style={{ fontWeight: 600, fontSize: "1.1rem", padding: "20px" }}>
              🌐 Country-Specific Onboarding
            </Accordion.Header>
            <Accordion.Body style={{ padding: "24px" }}>
              <Table striped bordered hover responsive>
                <thead style={{ backgroundColor: "#f8f9fa" }}>
                  <tr>
                    <th style={{ fontWeight: 600, color: "#333" }}>UAE</th>
                    <th style={{ fontWeight: 600, color: "#333" }}>India</th>
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
      </div>

      {/* Modal */}
      <Modal show={showForm} onHide={() => { setShowForm(false); setSubmitted(false); }} size="lg" centered>
        <Modal.Header closeButton className="border-0 bg-primary bg-opacity-10">
          <Modal.Title style={{ fontWeight: 600, fontSize: "1.3rem" }}>
            📝 Hospital Onboarding Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {submitted ? (
            <Alert variant="success" className="d-flex align-items-center">
              <FaCheckCircle className="me-3" size={24} />
              <div>
                <strong>Success!</strong> Your onboarding request has been submitted. Our team will contact you shortly.
              </div>
            </Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: 600, marginBottom: "10px" }}>Hospital Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your hospital name"
                  onChange={handleChange}
                  className="form-control-lg"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: 600, marginBottom: "10px" }}>Admin Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="admin@hospital.com"
                  onChange={handleChange}
                  className="form-control-lg"
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6} className="mb-4">
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600, marginBottom: "10px" }}>Hospital Type *</Form.Label>
                    <Form.Select 
                      name="hospitalType" 
                      onChange={handleChange} 
                      className="form-control-lg"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="multi-specialty">Multi-Specialty</option>
                      <option value="clinic">Clinic</option>
                      <option value="lab">Diagnostic Lab</option>
                      <option value="pharmacy">Pharmacy</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-4">
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600, marginBottom: "10px" }}>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      placeholder="City, Country"
                      onChange={handleChange}
                      className="form-control-lg"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: 600, marginBottom: "10px" }}>Departments Offered</Form.Label>
                <Form.Control
                  as="textarea"
                  name="departments"
                  placeholder="e.g., Cardiology, Orthopedic, General Medicine"
                  rows={3}
                  onChange={handleChange}
                  className="form-control"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaFileSignature className="me-2" /> Submit Onboarding Request
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HospitalPartnershipKit;