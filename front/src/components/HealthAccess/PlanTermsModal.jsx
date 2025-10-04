// src/pages/PlanTermsModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PlanTermsModal = ({ show, onClose, onAccept, version }) => {
  // --- keep existing props; add route params ---
  const { planId } = useParams();
  const navigate = useNavigate();

  // --- default to open when used as a page/route ---
  const isOpen = show ?? true;

  // --- local state (keep your existing fields) ---
  const [loading, setLoading] = useState(false);
  const [termsText, setTermsText] = useState("");
  const [error, setError] = useState("");

  // --- base URL helper (works both local/prod) ---
  const API_BASE = import.meta?.env?.VITE_API_URI || "/api";

  // --- fetch terms whenever planId changes (route usage) ---
  useEffect(() => {
    if (!planId) return;
    setLoading(true);
    setError("");

    axios
      .get(`${API_BASE}/plans/terms/${planId}`)
      .then((res) => {
        // Expecting { termsText: string, version?: string }
        const data = res.data || {};
        setTermsText(data.termsText || "");
      })
      .catch((err) => {
        console.error("Error loading terms:", err);
        setError(
          "Unable to load terms and conditions. Please try again later."
        );
      })
      .finally(() => setLoading(false));
  }, [planId]);

  // --- close handler (works as modal or route) ---
  const handleClose = onClose ?? (() => navigate(-1));

  // --- accept handler (preserve existing prop if provided) ---
  const handleAccept = async () => {
    try {
      if (typeof onAccept === "function") {
        await onAccept(planId, version);
        return;
      }
      // default accept flow if onAccept not provided
      const raw = localStorage.getItem("bbsUser");
      const token = raw ? JSON.parse(raw).token : null;

      await axios.post(
        `${API_BASE}/plans/terms/${planId}/accept`,
        { version: version || "v1" },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );

      // go back/close after accept
      handleClose();
    } catch (e) {
      console.error("Accept terms failed:", e);
      setError("Unable to accept terms at the moment. Please try again.");
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          Plan Terms & Conditions {version ? `(v${version})` : ""} — #{planId}
        </Modal.Title>
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
          {/* keep any footer info you had; version shown if provided */}
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
