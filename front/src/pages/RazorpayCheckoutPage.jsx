import React from "react";
import axios from "axios";

const RazorpayCheckoutPage = () => {
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const bbsUser = JSON.parse(localStorage.getItem("bbsUser"));
    const { data } = await axios.post(
      "http://localhost:5000/api/razorpay/create-order",
      {
        userId: bbsUser.userId,
        amount: 499, // ₹499 test
      }
    );

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: "INR",
      name: "BBS Health Access",
      description: "Plan Payment",
      order_id: data.order.id,
      handler: async (response) => {
        await axios.post(
          `${import.meta.env.VITE_API_URI}/razorpay/verify-payment`,
          response
        );
        alert("Payment successful!");
      },
      prefill: {
        name: bbsUser.name,
        email: bbsUser.email,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container mt-5">
      <h2>🧾 Razorpay Checkout</h2>
      <button className="btn btn-success mt-3" onClick={handlePayment}>
        Pay ₹499
      </button>
    </div>
  );
};

export default RazorpayCheckoutPage;
