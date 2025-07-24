// Web → src/pages/PlanPaymentPage.jsx
import React, { useState } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const PlanPaymentPage = () => {
  const [planId, setPlanId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("razorpay");
  const [txnId, setTxnId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInitiate = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/plan/pay/initiate",
        { planId, amount, method },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTxnId(res.data.txnId);
      setMessage("✅ Payment Initiated. Now confirm it.");
    } catch (err) {
      setMessage("❌ Failed to initiate: " + err.response?.data?.message);
    }
    setLoading(false);
  };

  const handleConfirm = async () => {
    if (!txnId) return setMessage("No transaction to confirm.");

    const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
    const paymentRef = "SIMULATED_TXN_" + new Date().getTime();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/plan/pay/confirm",
        { txnId, paymentRef },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Payment confirmed. Plan activated.");
    } catch (err) {
      setMessage("❌ Confirmation failed.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 600 }}>
      <h3>💳 Plan Payment</h3>

      {message && <Alert variant="info">{message}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Plan ID</Form.Label>
        <Form.Control
          type="text"
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Payment Method</Form.Label>
        <Form.Select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="razorpay">Razorpay</option>
          <option value="wallet">Wallet</option>
          <option value="upi">UPI</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button onClick={handleInitiate} disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Initiate Payment"
          )}
        </Button>
        {txnId && (
          <Button variant="success" onClick={handleConfirm}>
            Confirm Payment
          </Button>
        )}
      </div>
    </Container>
  );
};

export default PlanPaymentPage;
