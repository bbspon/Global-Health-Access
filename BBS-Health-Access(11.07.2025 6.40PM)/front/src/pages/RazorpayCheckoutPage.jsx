import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const RazorpayCheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) return alert("Failed to load Razorpay");

    const { data } = await axios.post("/api/payment/razorpay-order", {
      planId: state.planId,
    });

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "BBSCART Health",
      description: `Purchase ${data.plan.title}`,
      order_id: data.order.id,
      handler: async (response) => {
        await axios.post("/api/payment/razorpay-complete", {
          planId: state.planId,
          paymentId: response.razorpay_payment_id,
        });
        navigate("/my-health-plan");
      },
      prefill: {
        name: state.user.name,
        email: state.user.email,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    if (state?.planId) handlePay();
  }, [state]);

  return <div className="text-center py-5">Processing your payment...</div>;
};

export default RazorpayCheckoutPage;
