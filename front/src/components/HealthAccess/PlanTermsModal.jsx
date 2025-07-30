import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import axios from "axios";
const PlanTermsModal = ({ show, onClose, onAccept, version, planId }) => {
  console.log(planId, "planID");

  const [signature, setSignature] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [termsText, setTermsText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (show && planId) {
      setLoading(true);
      setError("");
      axios
        .get(`/api/plans/terms/${planId}`)
        .then((res) => {
          setTermsText(res.data.termsText);
        })
        .catch((err) => {
          console.error("Error loading terms:", err);
          setError(
            "Unable to load terms and conditions. Please try again later."
          );
        })
        .finally(() => setLoading(false));
    }
  }, [show, planId]);
  const handleAccept = async () => {
    if (accepted && signature.trim()) {
      const metadata = {
        planId,
        signature,
        version,
        device: navigator.userAgent,
      };

      try {
         const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
         const token = bbsUserData?.token;
        await axios.post(`${import.meta.env.VITE_API_URI}/terms/accept`, metadata, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Consent submitted!");
        onAccept(metadata); // optional callback
      } catch (err) {
        toast.error("Failed to submit terms");
        console.error(err);
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="w-100 text-center">Terms & Consent</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "65vh", overflowY: "auto" }}>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <div className="text-danger text-center">{error}</div>
        ) : (
          <>
            <div
              className="p-2"
              style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}
            >
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
                <Form.Label className="fw-semibold">
                  Type your full name as your signature
                </Form.Label>
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
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between flex-column flex-md-row">
        <Button
          variant="outline-secondary"
          onClick={onClose}
          className="w-100 mb-2 mb-md-0 me-md-2"
        >
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
