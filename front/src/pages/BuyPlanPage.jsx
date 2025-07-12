// === src/pages/BuyPlanPage.jsx ===
import React, { useEffect, useState } from "react";
import {
  Container, Card, Form, Button, Alert, Spinner, Row, Col, InputGroup,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getHealthPlans, purchasePlan } from "../services/healthPlanAPI";

const AddOnSelector = ({ selected, onChange }) => {
  const availableAddOns = [
    { name: "Emergency Boost", price: 49 },
    { name: "Maternity Add-on", price: 199 },
    { name: "Child Immunization", price: 99 },
  ];

  const toggleAddOn = (addon) => {
    const exists = selected.find((a) => a.name === addon.name);
    if (exists) onChange(selected.filter((a) => a.name !== addon.name));
    else onChange([...selected, addon]);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h5>Add-Ons</h5>
        {availableAddOns.map((addon, i) => (
          <Form.Check
            key={i}
            type="checkbox"
            label={`${addon.name} (+₹${addon.price})`}
            checked={selected.some((a) => a.name === addon.name)}
            onChange={() => toggleAddOn(addon)}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

const ReferralCodeInput = ({ value, onChange }) => (
  <Card className="mb-3">
    <Card.Body>
      <h5>Referral Code</h5>
      <InputGroup>
        <Form.Control
          placeholder="Enter code"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button variant="secondary">Verify</Button>
      </InputGroup>
    </Card.Body>
  </Card>
);

const WalletUseToggle = ({ useWallet, amount, onToggle, onAmountChange }) => (
  <Card className="mb-3">
    <Card.Body>
      <h5>Use Wallet</h5>
      <Form.Check
        type="switch"
        label="Use wallet balance"
        checked={useWallet}
        onChange={(e) => onToggle(e.target.checked)}
      />
      {useWallet && (
        <Form.Range
          min={0}
          max={500}
          value={amount}
          onChange={(e) => onAmountChange(parseInt(e.target.value))}
        />
      )}
    </Card.Body>
  </Card>
);

const FamilyBundleSelector = ({ members, onChange }) => {
  const addMember = () => onChange([...members, { name: "", age: "", gender: "" }]);
  const updateMember = (index, key, value) => {
    const updated = [...members];
    updated[index][key] = value;
    onChange(updated);
  };
  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h5>Family Members</h5>
        {members.map((m, i) => (
          <Row key={i} className="mb-2">
            <Col><Form.Control placeholder="Name" value={m.name} onChange={(e) => updateMember(i, "name", e.target.value)} /></Col>
            <Col><Form.Control placeholder="Age" value={m.age} onChange={(e) => updateMember(i, "age", e.target.value)} /></Col>
            <Col><Form.Control placeholder="Gender" value={m.gender} onChange={(e) => updateMember(i, "gender", e.target.value)} /></Col>
            <Col><Button variant="danger" onClick={() => removeMember(i)}>Remove</Button></Col>
          </Row>
        ))}
        <Button onClick={addMember}>Add Member</Button>
      </Card.Body>
    </Card>
  );
};

const TotalPriceCalculator = ({ plan, addOns, walletAmount }) => {
  const addOnTotal = addOns.reduce((sum, a) => sum + a.price, 0);
  const total = plan.price + addOnTotal - walletAmount;

  return (
    <Card className="mb-3">
      <Card.Body>
        <h5>Total Price</h5>
        <p>Base Plan: ₹{plan.price}</p>
        <p>Add-Ons: ₹{addOnTotal}</p>
        <p>Wallet Used: -₹{walletAmount}</p>
        <h6>Final Total: ₹{total}</h6>
      </Card.Body>
    </Card>
  );
};

const BuyPlanPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addOns, setAddOns] = useState([]);
  const [referralCode, setReferralCode] = useState("");
  const [walletUse, setWalletUse] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [accepted, setAccepted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await getHealthPlans();
        const found = data.plans.find((p) => p._id === planId);
        setPlan(found);
      } catch {
        setMessage("Failed to load plan");
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [planId]);

  const handlePurchase = async () => {
    if (!accepted || !paymentMethod || !planId) return;
    setSubmitting(true);
    try {
      const res = await purchasePlan(planId, {
        addOns, referralCode, walletAmount: walletUse ? walletAmount : 0, paymentMethod, familyMembers,
      });
      if (res.success) {
        setMessage("✅ Plan purchased!");
        setTimeout(() => navigate("/health-access/my-plan"), 2000);
      } else {
        setMessage("❌ Purchase failed.");
      }
    } catch {
      setMessage("❌ Server error.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (!plan) return <Alert variant="danger">Plan not found</Alert>;

  return (
    <Container className="py-4">
      <h3 className="mb-3 text-center">Buy Plan: {plan.name}</h3>
      {message && <Alert variant="info">{message}</Alert>}
      <Card className="mb-4">
        <Card.Body>
          <h5>{plan.name}</h5>
          <p>{plan.description}</p>
          <ul>{plan.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
          <strong>Base Price:</strong> ₹{plan.price}
        </Card.Body>
      </Card>
      <AddOnSelector selected={addOns} onChange={setAddOns} />
      <ReferralCodeInput value={referralCode} onChange={setReferralCode} />
      <WalletUseToggle useWallet={walletUse} amount={walletAmount} onToggle={setWalletUse} onAmountChange={setWalletAmount} />
      <FamilyBundleSelector members={familyMembers} onChange={setFamilyMembers} />
      <TotalPriceCalculator plan={plan} addOns={addOns} walletAmount={walletUse ? walletAmount : 0} />
      <Form className="mt-3">
        <Form.Label>Select Payment Method</Form.Label>
        <Form.Check type="radio" label="UPI" name="paymentMethod" value="upi" checked={paymentMethod === "upi"} onChange={(e) => setPaymentMethod(e.target.value)} />
        <Form.Check type="radio" label="Card" name="paymentMethod" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} />
        <Form.Check type="radio" label="Wallet (Coming Soon)" disabled />
        <Form.Check type="checkbox" className="mt-3" label="I accept the Terms & Conditions" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
        <Button className="mt-3" variant="success" onClick={handlePurchase} disabled={!accepted || submitting}>
          {submitting ? "Processing..." : "Confirm Purchase"}
        </Button>
      </Form>
    </Container>
  );
};

export default BuyPlanPage;