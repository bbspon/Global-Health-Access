import React, { useState } from "react";
import axios from "axios";

const WalletTopupPage = () => {
  const [amount, setAmount] = useState("");

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  const handleTopup = async () => {
    const { data } = await axios.post("/api/wallet/topup-order", { amount });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.order.amount,
      currency: "INR",
      name: "BBSCART Wallet",
      description: "Wallet Top-Up",
      order_id: data.order.id,
      handler: async (response) => {
        await axios.post("/api/wallet/topup-confirm", {
          amount: parseInt(amount),
          razorpayPaymentId: response.razorpay_payment_id,
        });
        alert("Wallet credited!");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container py-4">
      <h4>Top-Up Wallet</h4>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="form-control my-3"
        placeholder="Enter amount"
      />
      <button className="btn btn-primary" onClick={handleTopup}>
        Top-Up Now
      </button>
    </div>
  );
};

export default WalletTopupPage;
