// src/pages/HealthcareCartPage.jsx
import React, { useState } from 'react';
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Modal,
  Badge,
  InputGroup,
  Alert,
} from 'react-bootstrap';

const sampleCartItems = [
  {
    id: 1,
    name: 'Comprehensive Family Plan',
    type: 'Plan',
    provider: 'BBSCART Health',
    price: 3999,
    covered: true,
    coPay: 0,
    quantity: 1,
    for: 'Self + 2',
  },
  {
    id: 2,
    name: 'Blood Sugar Test',
    type: 'Lab',
    provider: 'Apollo Diagnostics',
    price: 499,
    covered: true,
    coPay: 99,
    quantity: 1,
    for: 'Self',
  },
  {
    id: 3,
    name: 'General Physician Teleconsult',
    type: 'Consult',
    provider: 'Dr. Raj Clinic',
    price: 699,
    covered: false,
    coPay: 0,
    quantity: 1,
    for: 'Father',
  },
];

const HealthcareCartPage = () => {
  const [cartItems, setCartItems] = useState(sampleCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [walletApplied, setWalletApplied] = useState(false);
  const [showAIRecommendation, setShowAIRecommendation] = useState(true);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.coPay > 0 ? item.coPay : item.price;
    });
    if (promoCode === 'HEALTH100') total -= 100;
    if (walletApplied) total -= 250;
    return total;
  };

  return (
    <div className="container mt-4">
      <h2>🛒 Your Healthcare Cart</h2>
      <Row className="mt-3">
        <Col md={8}>
          {cartItems.map((item) => (
            <Card className="mb-3" key={item.id}>
              <Card.Body>
                <Card.Title>
                  {item.name} <Badge bg="info">{item.type}</Badge>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{item.provider}</Card.Subtitle>
                <Card.Text>
                  For: <strong>{item.for}</strong><br />
                  Price: ₹{item.price}<br />
                  {item.covered && <Badge bg="success">Covered by Plan</Badge>}{' '}
                  {item.coPay > 0 && <Badge bg="warning">Co-Pay ₹{item.coPay}</Badge>}
                </Card.Text>
                <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Checkout Summary</Card.Title>
              <Form.Group className="mb-2">
                <Form.Label>Apply Promo Code</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline-secondary">Apply</Button>
                </InputGroup>
              </Form.Group>
              <Form.Check
                type="switch"
                id="walletSwitch"
                label="Use Wallet ₹250"
                checked={walletApplied}
                onChange={() => setWalletApplied(!walletApplied)}
              />
              <hr />
              <h5>Total: ₹{calculateTotal()}</h5>
              <Button variant="success" className="w-100">
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>

          {showAIRecommendation && (
            <Alert variant="info" className="mt-3">
              🤖 <strong>AI Suggestion:</strong> Adding a <em>Vitamin D Test</em> with this lab combo saves ₹200!
            </Alert>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default HealthcareCartPage;
