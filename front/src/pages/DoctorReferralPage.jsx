import React, { useState } from "react";
import { Form, Button, Modal, Card, Alert, Row, Col, Badge } from "react-bootstrap";

const specialists = [
  { id: 1, name: "Dr. Latha (Dermatologist)", specialty: "Skin", language: "English", available: true },
  { id: 2, name: "Dr. Vikram (Cardiologist)", specialty: "Heart", language: "Hindi", available: true },
  { id: 3, name: "Dr. Noor (Nutritionist)", specialty: "Diet", language: "Arabic", available: true }
];

export default function DoctorReferralPage() {
  const [referral, setReferral] = useState({
    doctors: [],
    reason: "",
    notes: "",
    file: null,
    priority: "Routine",
    language: "",
    consent: false,
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setShowConfirm(false);
  };

  const handleFile = (e) => {
    setReferral({ ...referral, file: e.target.files[0] });
  };

  const handleWhatsAppSend = () => {
    setWhatsappSent(true);
  };

  const toggleDoctor = (doctorName) => {
    const updatedDoctors = referral.doctors.includes(doctorName)
      ? referral.doctors.filter((doc) => doc !== doctorName)
      : [...referral.doctors, doctorName];
    setReferral({ ...referral, doctors: updatedDoctors });
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow">
        <h4>📤 Issue Patient Referral</h4>

        <Form>
          <Form.Group>
            <Form.Label>Select Specialist(s)</Form.Label>
            {specialists.map((doc) => (
              <Form.Check
                key={doc.id}
                label={`${doc.name} (${doc.specialty}) - ${doc.language}`}
                checked={referral.doctors.includes(doc.name)}
                onChange={() => toggleDoctor(doc.name)}
              />
            ))}
          </Form.Group>

          <Row className="mt-2">
            <Col>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={referral.priority}
                  onChange={(e) => setReferral({ ...referral, priority: e.target.value })}
                >
                  <option>Routine</option>
                  <option>Urgent</option>
                  <option>Critical</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Preferred Language</Form.Label>
                <Form.Select
                  value={referral.language}
                  onChange={(e) => setReferral({ ...referral, language: e.target.value })}
                >
                  <option value="">Any</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Arabic</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mt-3">
            <Form.Label>Reason for Referral</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., Follow-up Cardiology Evaluation"
              value={referral.reason}
              onChange={(e) => setReferral({ ...referral, reason: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Clinical Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write any history, symptoms, prior test..."
              value={referral.notes}
              onChange={(e) => setReferral({ ...referral, notes: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Attach File (PDF, Image)</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>

          <Form.Check
            className="mt-3"
            type="checkbox"
            label="I have obtained patient consent for this referral"
            checked={referral.consent}
            onChange={(e) => setReferral({ ...referral, consent: e.target.checked })}
          />

          <Button
            className="mt-3"
            variant="primary"
            disabled={!referral.consent || referral.doctors.length === 0}
            onClick={() => setShowConfirm(true)}
          >
            Send Referral
          </Button>
        </Form>
      </Card>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Referral</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Specialists:</strong> {referral.doctors.join(", ")}</p>
          <p><strong>Reason:</strong> {referral.reason}</p>
          <p><strong>Priority:</strong> {referral.priority}</p>
          <p>Confirm sending this referral?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSubmit}>Confirm & Send</Button>
        </Modal.Footer>
      </Modal>

      {submitted && (
        <Alert variant="success" className="mt-3">
          ✅ Referral Sent to: <strong>{referral.doctors.join(", ")}</strong><br />
          <Button variant="outline-success" size="sm" className="mt-2" onClick={handleWhatsAppSend}>
            📲 Send Summary via WhatsApp
          </Button>
        </Alert>
      )}

      {whatsappSent && (
        <Alert variant="info" className="mt-2">
          ✅ WhatsApp summary sent to patient (simulated)
        </Alert>
      )}

      {/* SLA Alert (simulated after delay, real logic can fetch from backend) */}
      {submitted && (
        <Alert variant="warning" className="mt-4">
          ⚠️ Specialist hasn't accepted within 24 hours — system will escalate soon.
        </Alert>
      )}

      {/* QR Code placeholder */}
      {submitted && (
        <div className="mt-4 text-center">
          <Badge bg="secondary">📎 QR Code for Referral (Simulated)</Badge>
          <div className="border p-3 mt-2" style={{ backgroundColor: "#f9f9f9" }}>
            <p>[🔳 QR Code here for hospital scanning]</p>
          </div>
        </div>
      )}
    </div>
  );
}
