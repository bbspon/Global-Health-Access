import React, { useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import axios from "axios";

const BuyPlanModal = ({ show, onClose, plan, onConfirm }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!plan) return null;

  const getBadgeColor = (tier) => {
    switch (tier) {
      case "basic":
        return "secondary";
      case "premium":
        return "info";
      case "super_premium":
        return "warning";
      default:
        return "dark";
    }
  };

  const handleConfirm = async () => {
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/user/purchase`,
        {
          planId: plan._id,
          selectedAddons: [], // since we're not showing them now
          paymentMethod: "wallet", // default
          usedWalletAmount: 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Success: " + res.data.message);
      onConfirm(plan);
    } catch (err) {
      console.error("Purchase failed", err);
      alert("Error: Could not complete purchase");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Buy Plan: {plan.name}{" "}
          <Badge bg={getBadgeColor(plan.tier)} className="ms-2">
            {(plan.tier || "N/A").toUpperCase()}
          </Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Price:</strong> ₹ {plan.price} / year
        </p>
        <Form.Check
          type="checkbox"
          label="I accept the terms and conditions"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleConfirm}
          disabled={!acceptedTerms}
        >
          Confirm & Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyPlanModal;
