import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const PlanPaymentPage = ({ planId, totalAmount }) => {
  const [method, setMethod] = useState("wallet");
  const [partialPayment, setPartialPayment] = useState(false);

  const pay = async () => {
    const res = await axios.post("/api/plan-payment/initiate", {
      planId,
      amount: totalAmount,
      method,
      partialPayment,
    });

    const { payment } = res.data;

    if (method === "wallet") {
      await axios.post("/api/plan-payment/wallet-pay", {
        paymentId: payment._id,
      });
      alert("Payment done via Wallet");
    } else {
      // redirect to gateway payment here
      alert("Redirecting to payment gateway...");
    }
  };

  return (
    <div className="container py-4">
      <h4>Choose Payment Method</h4>
      <Form.Select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="wallet">Wallet</option>
        <option value="gateway">Online Payment</option>
      </Form.Select>

      <Form.Check
        type="checkbox"
        label="Partial Payment (40%)"
        className="mt-3"
        checked={partialPayment}
        onChange={() => setPartialPayment(!partialPayment)}
      />

      <Button className="mt-3" onClick={pay}>
        Pay Now
      </Button>
    </div>
  );
};

export default PlanPaymentPage;
