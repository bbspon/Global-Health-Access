// HealthPlanRenewal.jsx
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card, Alert, Spinner, Badge, Row, Col } from "react-bootstrap";

const planOptions = [
  { name: "Basic", price: 999 },
  { name: "Premium", price: 1499 },
  { name: "Super Premium", price: 1999 }
];

const addOns = [
  { name: "Dental Coverage", price: 99 },
  { name: "Mental Health Pack", price: 149 },
  { name: "Women’s Health Combo", price: 129 }
];

const paymentMethods = ["Wallet", "UPI", "Card", "EMI"];

const HealthPlanRenewal = () => {
  const [plan, setPlan] = useState("Basic");
  const [daysLeft, setDaysLeft] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState("Wallet");
  const [autoRenew, setAutoRenew] = useState(true);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [language, setLanguage] = useState("English");
  const [callRequested, setCallRequested] = useState(false);

  const toggleAddOn = (addOn) => {
    if (selectedAddOns.includes(addOn)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== addOn));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const calculateTotal = () => {
    const base = planOptions.find((p) => p.name === plan)?.price || 0;
    const addOnTotal = selectedAddOns.reduce((acc, item) => {
      const a = addOns.find((a) => a.name === item);
      return acc + (a?.price || 0);
    }, 0);
    return base + addOnTotal;
  };

  const renewPlan = () => {
    alert(`✅ Plan Renewed Successfully!\nPlan: ${plan}\nTotal: ₹${calculateTotal()}`);
  };

  return (
    <div className="container my-4">
      <Row className="mb-3">
        <Col><h4>🛡️ Plan Expiry Management</h4></Col>
        <Col className="text-end">
          🌐 <Form.Select size="sm" style={{ width: 140 }} value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>हिंदी</option>
            <option>العربية</option>
          </Form.Select>
        </Col>
      </Row>

      <Alert variant="danger">
        Your <strong>{plan}</strong> plan expires in <strong>{daysLeft} days</strong>. Grace period starts in: <strong>{daysLeft === 0 ? "Now" : `${daysLeft} days`}</strong>
      </Alert>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>🧾 Renewal Form</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Choose Plan</Form.Label>
              <Form.Select value={plan} onChange={(e) => setPlan(e.target.value)}>
                {planOptions.map((p) => <option key={p.name}>{p.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Add-ons</Form.Label>
              {addOns.map((addon) => (
                <Form.Check key={addon.name} type="checkbox" label={`${addon.name} (₹${addon.price})`}
                  checked={selectedAddOns.includes(addon.name)}
                  onChange={() => toggleAddOn(addon.name)} />
              ))}
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                {paymentMethods.map((method) => <option key={method}>{method}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Check
              className="mt-3"
              type="switch"
              label="Enable Auto-Renewal"
              checked={autoRenew}
              onChange={(e) => setAutoRenew(e.target.checked)}
            />

            <Form.Group className="mt-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            </Form.Group>

            <div className="mt-3">
              <Button variant="success" onClick={renewPlan}>Renew Plan (₹{calculateTotal()})</Button>
              <Button variant="outline-secondary" className="ms-3" onClick={() => window.print()}>🧾 Download Invoice</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>📈 AI-Based Suggestion</Card.Title>
          <p>Based on your past 4 lab visits and family members, we recommend <strong>Super Premium Plan</strong> for more coverage.</p>
          <Button variant="primary" onClick={() => setShowUpgrade(true)}>Compare & Upgrade</Button>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>📞 Need Help?</Card.Title>
          {!callRequested ? (
            <Button variant="dark" onClick={() => {
              setCallRequested(true);
              alert("📲 Advisor call scheduled in 24h");
            }}>Schedule Call With Advisor</Button>
          ) : <Badge bg="info">Advisor Call Scheduled</Badge>}
        </Card.Body>
      </Card>

      <Modal show={showUpgrade} onHide={() => setShowUpgrade(false)}>
        <Modal.Header closeButton><Modal.Title>🔄 Compare Plans</Modal.Title></Modal.Header>
        <Modal.Body>
          <ul>
            <li>🟢 Basic – ₹999 – OPD only</li>
            <li>🟡 Premium – ₹1499 – OPD + IPD + Labs</li>
            <li>🔴 Super Premium – ₹1999 – Full + Wellness + Dental</li>
          </ul>
          <Button variant="danger" onClick={() => alert("Upgraded to Super Premium")}>Upgrade Now</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HealthPlanRenewal;
