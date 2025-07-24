// WalletTopupPage.jsx
import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { topupWallet } from "../services/walletAPI";

const WalletTopupPage = () => {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleTopup = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
    try {
      await topupWallet({
        amount,
        method: "UPI", // static for now
        referenceId: "TXN" + Date.now(),
        token,
      });
      setStatus("✅ Wallet Top-up Successful");
    } catch {
      setStatus("❌ Failed to top-up");
    }
  };

  return (
    <Container className="my-5">
      <h2>💰 Wallet Top-up</h2>
      {status && (
        <Alert variant={status.includes("✅") ? "success" : "danger"}>
          {status}
        </Alert>
      )}
      <Form onSubmit={handleTopup}>
        <Form.Group>
          <Form.Label>Amount (₹)</Form.Label>
          <Form.Control
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-3" type="submit">
          Add Money
        </Button>
      </Form>
    </Container>
  );
};

export default WalletTopupPage;
