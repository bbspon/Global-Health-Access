// BuyPlan.jsx
import React, { useState } from "react";
import {
  Container, Row, Col, Card, Button, Form, Modal, Alert, InputGroup
} from "react-bootstrap";

const planTiers = [
  { name: "Basic", price: 199, benefits: "2 OPDs / 1 Lab" },
  { name: "Standard", price: 399, benefits: "4 OPDs / 2 Labs" },
  { name: "Premium", price: 699, benefits: "Unlimited OPDs" },
];

const BuyPlan = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [tenure, setTenure] = useState("monthly");
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [location, setLocation] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [otp, setOtp] = useState("");
  const [consent, setConsent] = useState(false);
  const [activationSuccess, setActivationSuccess] = useState(false);

  const handleAddMember = (member) => {
    setFamilyMembers([...familyMembers, member]);
    setShowFamilyModal(false);
  };

  const handleBuyPlan = () => {
    if (!selectedTier || !consent || otp.length !== 6) return;
    setActivationSuccess(true);
  };

  const totalPrice = selectedTier
    ? selectedTier.price * (tenure === "yearly" ? 12 : tenure === "quarterly" ? 3 : 1) + familyMembers.length * 99
    : 0;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Buy Your Health Access Plan</h2>

      {/* Tier Selection */}
      <Row>
        {planTiers.map((tier, idx) => (
          <Col md={4} key={idx}>
            <Card
              border={selectedTier?.name === tier.name ? "primary" : ""}
              className="mb-3"
              onClick={() => setSelectedTier(tier)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{tier.name}</Card.Title>
                <Card.Text>{tier.benefits}</Card.Text>
                <Card.Text><strong>₹{tier.price}/month</strong></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tenure and Family */}
      <Form className="my-3">
        <Form.Group>
          <Form.Label>Plan Tenure</Form.Label>
          <Form.Select value={tenure} onChange={(e) => setTenure(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </Form.Select>
        </Form.Group>

        <Button variant="secondary" className="mt-3" onClick={() => setShowFamilyModal(true)}>
          Add Family Member
        </Button>

        {familyMembers.length > 0 && (
          <ul className="mt-2">
            {familyMembers.map((m, i) => (
              <li key={i}>{m.name} ({m.relation})</li>
            ))}
          </ul>
        )}

        <Form.Group className="mt-3">
          <Form.Label>Your City</Form.Label>
          <Form.Control value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Chennai" />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Promo or Corporate Code</Form.Label>
          <Form.Control value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>OTP Verification</Form.Label>
          <Form.Control value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="Enter 6-digit OTP" />
        </Form.Group>

        <Form.Check
          className="mt-3"
          label="I accept the Access Plan Agreement"
          checked={consent}
          onChange={() => setConsent(!consent)}
        />

        <h4 className="mt-4">Total: ₹{totalPrice}</h4>
        <Button className="mt-3" disabled={!selectedTier || !consent} onClick={handleBuyPlan}>
          Activate Plan
        </Button>
      </Form>

      {/* Success Message */}
      {activationSuccess && (
        <Alert variant="success" className="mt-4">
          🎉 Your Plan is Activated! QR Health Card sent to your phone.
        </Alert>
      )}

      {/* Family Modal */}
      <Modal show={showFamilyModal} onHide={() => setShowFamilyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Family Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const relation = e.target.relation.value;
              handleAddMember({ name, relation });
            }}
          >
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Relation</Form.Label>
              <Form.Select name="relation">
                <option>Spouse</option>
                <option>Child</option>
                <option>Parent</option>
              </Form.Select>
            </Form.Group>
            <Button className="mt-3" type="submit">Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BuyPlan;
