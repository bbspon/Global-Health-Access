// src/pages/PlanTermsModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PlanTermsModal = ({ show, onClose, onAccept, version }) => {
  const { planId } = useParams();
  const navigate = useNavigate();

  // If used as page, modal should always show
  const isOpen = show ?? true;

  const [loading, setLoading] = useState(false);
  const [termsText, setTermsText] = useState("");
  const [error, setError] = useState("");

  // YOUR BACKEND URL (fixes the wrong 5173 call)
  const API_BASE = import.meta.env.VITE_API_URI || "http://localhost:5000/api";

  // -------------------------------
  // FETCH TERMS WHEN PAGE LOADS
  // -------------------------------
  useEffect(() => {
    if (!planId) return;

    setLoading(true);
    setError("");

    axios
      .get(`${API_BASE}/plans/terms/${planId}`)
      .then((res) => {
        setTermsText(res.data?.termsText || "");
      })
      .catch((err) => {
        console.error("Error loading terms:", err);
        setError(
          "Unable to load terms and conditions. Please try again later."
        );
      })
      .finally(() => setLoading(false));
  }, [planId]);

  // -------------------------------
  // CLOSE MODAL
  // -------------------------------
  const handleClose = onClose ?? (() => navigate(-1));

  // -------------------------------
  // ACCEPT TERMS
  // -------------------------------
const handleAccept = async () => {
  try {
    const raw = localStorage.getItem("bbsUser");
    const token = raw ? JSON.parse(raw).token : null;

    if (!token) {
      setError("You must be logged in to accept terms.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.post(
      `${API_BASE}/plans/terms/accept`,
      { planId, version: version || "v1", signature: "auto", device: "web" },
      { headers }
    );

    handleClose();
  } catch (err) {
    console.error("Accept terms failed:", err);
    setError("Unable to accept terms at the moment. Please try again.");
  }
};


  return (
    <Modal show={isOpen} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Plan Terms & Conditions — #{planId}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading && (
          <div className="d-flex align-items-center gap-2">
            <Spinner animation="border" size="sm" /> <span>Loading terms…</span>
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-danger mb-3">{error}</div>
        )}

        {!loading && !error && (
          <>
            {termsText ? (
              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                {termsText}
              </div>
            ) : (
              <div className="text-muted">
                No terms found for this plan yet.
              </div>
            )}
          </>
        )}
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <div className="text-muted small">
          {version ? `Version: ${version}` : null}
        </div>

        <div>
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            className="me-2"
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            I Accept
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PlanTermsModal;
