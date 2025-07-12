import React from "react";
import { Modal, Button, Form, ListGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BuyPlanModal = ({ show, onClose, plan, onConfirm }) => {
  const [accepted, setAccepted] = React.useState(false);
  const navigate = useNavigate(); // ✅ This is missing in your current code
  if (!plan) return null;

  const getBadgeColor =
    {
      basic: "secondary",
      premium: "info",
      super_premium: "warning",
    }[plan.tier] || "dark";

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Buy Plan: {plan.name}{" "}
          <Badge bg={getBadgeColor} className="ms-2">
            {plan.tier.toUpperCase()}
          </Badge>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-2">
          <strong>Price:</strong> ₹ {plan.price} / year
        </p>

        <ListGroup variant="flush" className="mb-3">
          {Array.isArray(plan.features) &&
            plan.features.map((feature, idx) => (
              <ListGroup.Item key={idx}>✔ {feature}</ListGroup.Item>
            ))}
        </ListGroup>

        <Form.Check
          type="checkbox"
          label="I accept the terms and conditions"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          disabled={!accepted}
          onClick={() => {
            onClose(); // close modal first
            navigate(`/buy/${plan._id}`); // ✅ navigate to correct path
          }}
        >
          Confirm & Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuyPlanModal;
