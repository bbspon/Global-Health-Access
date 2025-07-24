// DynamicPricingEngine.jsx

import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Modal,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import { calculateDynamicPrice } from "../services/dynamicPricingAPI";

const basePlans = [
  {
    id: 1,
    name: "Basic Plan",
    basePrice: 999,
    features: ["OPD", "Lab Discounts"],
  },
  {
    id: 2,
    name: "Premium Plan",
    basePrice: 1999,
    features: ["OPD", "IPD", "Dental"],
  },
  {
    id: 3,
    name: "Super Premium",
    basePrice: 2999,
    features: ["All Features", "Wellness Credits"],
  },
];

export default function DynamicPricingEngine() {
  const [userType, setUserType] = useState("public");
  const [location, setLocation] = useState("metro");
  const [promo, setPromo] = useState("");
  const [walletPoints, setWalletPoints] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [calculatedPrices, setCalculatedPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddWallet = () => {
    setWalletPoints(walletPoints + 100);
  };

  const fetchDynamicPrices = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
    const newPrices = {};

    for (const plan of basePlans) {
      const payload = {
        planId: plan.id,
        basePrice: plan.basePrice,
        userType,
        location,
        promoCode: promo,
        walletPoints,
      };

      try {
        const result = await calculateDynamicPrice(payload, token);
        newPrices[plan.id] = result.finalPrice;
      } catch (error) {
        console.error("Dynamic price error:", error);
        newPrices[plan.id] = plan.basePrice; // fallback
      }
    }

    setCalculatedPrices(newPrices);
    setLoading(false);
  };

  return (
    <div className="container py-4">
      <h4>🎯 BBSCART Dynamic Pricing & Discounts</h4>

      <Alert variant="info">
        Select your user type, location, and promo to get best plan pricing.
      </Alert>

      <Alert variant="secondary">
        You are a <strong>{userType.toUpperCase()}</strong> user from{" "}
        <strong>{location.toUpperCase()}</strong> area. Promo Code:{" "}
        <strong>{promo || "None"}</strong>
      </Alert>

      <Row className="mb-3">
        <Col>
          <Form.Label>User Type</Form.Label>
          <Form.Select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="corporate">Corporate</option>
            <option value="ngo">NGO Sponsored</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>Location</Form.Label>
          <Form.Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="metro">Metro</option>
            <option value="semi-urban">Semi-Urban</option>
            <option value="rural">Rural</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Label>Promo Code</Form.Label>
          <Form.Control
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="e.g. FEST500"
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Available Plans</h5>
        <div>
          <Button
            variant="outline-primary"
            onClick={fetchDynamicPrices}
            disabled={loading}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "💡 Recalculate"
            )}
          </Button>{" "}
          <Button variant="outline-info" onClick={() => setShowModal(true)}>
            Wallet: ₹{walletPoints}
          </Button>
        </div>
      </div>

      {showSuccess && selectedPlan && (
        <Alert variant="success">
          ✅ You have selected <strong>{selectedPlan.name}</strong> at ₹
          {calculatedPrices[selectedPlan.id] ?? selectedPlan.basePrice}. Payment
          flow coming soon!
        </Alert>
      )}

      {basePlans.map((plan) => (
        <Card className="mb-3 shadow-sm" key={plan.id}>
          <Card.Body>
            <Row>
              <Col md={8}>
                <h5>{plan.name}</h5>
                <ul>
                  {plan.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </Col>
              <Col md={4} className="text-end">
                <h6>
                  <Badge bg="success">
                    ₹{calculatedPrices[plan.id] ?? plan.basePrice}
                  </Badge>
                </h6>
                <Button
                  variant="primary"
                  onClick={() => handleBuyNow(plan)}
                  disabled={loading}
                >
                  Buy Now
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {/* Modal: Wallet Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>💰 Wallet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have ₹{walletPoints} in your Golddex Wallet.</p>
          <Button variant="outline-primary" onClick={handleAddWallet}>
            + Add ₹100
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
