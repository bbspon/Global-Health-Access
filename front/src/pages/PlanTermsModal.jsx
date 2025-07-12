import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PlanTermsModal = ({ show, onClose, onAccept, termsText, version }) => {
  const [signature, setSignature] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted && signature.trim()) {
      const metadata = {
        signature,
        version,
        timestamp: new Date().toISOString(),
        ipAddress: "FETCH_ON_SERVER", // handled backend side
        device: navigator.userAgent,
      };
      onAccept(metadata);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="w-100 text-center">Terms & Consent</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "65vh", overflowY: "auto" }}>
        <div className="p-2" style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
          {termsText}
        </div>
        <Form className="mt-3">
          <Form.Check
            type="checkbox"
            label="I have read and agree to these terms"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <Form.Group controlId="signatureInput" className="mt-3">
            <Form.Label className="fw-semibold">Type your full name as your signature</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., John Doe"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              autoComplete="name"
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between flex-column flex-md-row">
        <Button variant="outline-secondary" onClick={onClose} className="w-100 mb-2 mb-md-0 me-md-2">
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleAccept}
          className="w-100"
          disabled={!accepted || !signature.trim()}
        >
          Accept & Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlanTermsModal;
