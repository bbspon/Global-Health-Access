import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const BuyWithWalletPage = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [walletBalance, setWalletBalance] = useState(0);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    axios.get("/api/health-plans").then((res) => setPlans(res.data));
    axios
      .get("/api/wallet/balance")
      .then((res) => setWalletBalance(res.data.balance));
  }, []);

  const handlePurchase = () => {
    axios
      .post("/api/user-plan/checkout-wallet", { planId: selectedPlan })
      .then((res) =>
        setMsg({ type: "success", text: "Plan purchased successfully" })
      )
      .catch((err) => {
        setMsg({
          type: "danger",
          text: err?.response?.data?.msg || "Transaction failed",
        });
      });
  };

  return (
    <div className="container py-4">
      <h4>Buy Plan Using Wallet</h4>
      <p>Wallet Balance: ₹{walletBalance}</p>

      <Form.Select
        className="mb-3"
        value={selectedPlan}
        onChange={(e) => setSelectedPlan(e.target.value)}
      >
        <option value="">Select a Health Plan</option>
        {plans.map((p) => (
          <option key={p._id} value={p._id}>
            {p.title} — ₹{p.price}
          </option>
        ))}
      </Form.Select>

      <Button onClick={handlePurchase} disabled={!selectedPlan}>
        Buy Now with Wallet
      </Button>

      {msg && (
        <Alert variant={msg.type} className="mt-3">
          {msg.text}
        </Alert>
      )}
    </div>
  );
};

export default BuyWithWalletPage;
