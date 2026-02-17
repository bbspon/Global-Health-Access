// src/pages/PlanTermsModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PlanTermsModal = ({ show, onClose, onAccept, version, termsText: propTermsText, planId: propPlanId }) => {
  // allow parent to supply planId directly when not using route params
  const params = useParams();
  const planId = propPlanId || params.planId;
  const navigate = useNavigate();

  // If used as page, modal should always show
  const isOpen = show ?? true;

  const [loading, setLoading] = useState(false);
  const [termsText, setTermsText] = useState(propTermsText || "");
  const [error, setError] = useState("");

  // YOUR BACKEND URL (fixes the wrong 5173 call)
  const API_BASE = import.meta.env.VITE_API_URI || "http://localhost:5000/api";

  // -------------------------------
  // FETCH TERMS WHEN PAGE LOADS
  // -------------------------------
  useEffect(() => {
    if (!planId) {
      console.warn("PlanTermsModal mounted without planId");
      return;
    }

    // if parent supplied static text, keep it instead of re-fetching
    if (propTermsText) {
      setTermsText(propTermsText);
      return;
    }

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
  }, [planId, propTermsText]);

  // -------------------------------
  // CLOSE MODAL
  // -------------------------------
  const handleClose = onClose ?? (() => navigate(-1));

  // -------------------------------
  // ACCEPT TERMS
  // -------------------------------
const handleAccept = async () => {
  // quick validation first so we don't hit the network with bad payload
  if (!planId) {
    setError("No plan specified. Cannot accept terms.");
    console.warn("handleAccept called without planId", { planId, version, propTermsText });
    return;
  }

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

    const payload = {
      planId,
      version: version || "v1",
      signature: "auto",
      device: "web",
    };

    console.debug("sending acceptTerms payload", payload);

    await axios.post(`${API_BASE}/plans/terms/accept`, payload, { headers });

    handleClose();
  } catch (err) {
    console.error("Accept terms failed:", err);
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Unable to accept terms at the moment. Please try again.";
    setError(msg);
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
