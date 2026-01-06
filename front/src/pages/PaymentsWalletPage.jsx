import React, { useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URI;


const PaymentsWalletPage = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [topupAmount, setTopupAmount] = useState("");
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("basic");
  const [offersOpen, setOffersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
const getAuthToken = () => {
  try {
    const raw = localStorage.getItem("bbsUser");
    return raw ? JSON.parse(raw)?.token : null;
  } catch {
    return null;
  }
};
  // -----------------------------
  // FETCH WALLET BALANCE
  // -----------------------------
  const fetchWalletBalance = async () => {
    try {
    const token = getAuthToken();
    if (!token) return;

    const res = await axios.get(`${API_BASE_URL}/wallet`, {
      headers: { Authorization: `Bearer ${token}` },
    });

setWalletBalance(res.data.balance ?? 0);

    } catch (err) {
      console.error("❌ Wallet load failed", err?.response?.data || err);
      alert("Failed to load wallet balance");
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const getPlanPrice = () => {
    switch (paymentPlan) {
      case "basic":
        return 499;
      case "premium":
        return 999;
      case "govt":
        return 0;
      default:
        return 0;
    }
  };

  // -----------------------------
  // WALLET TOP-UP
  // -----------------------------
  const handleTopUp = async () => {
    const amt = parseInt(topupAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      const raw = localStorage.getItem("bbsUser");
      const token = JSON.parse(raw)?.token;

     await axios.post(
       `${API_BASE_URL}/wallet/topup`,
       {
         amount: amt,
         method: "wallet", // ✅ must match enum
         referenceId: `WALLET_TOPUP_${Date.now()}`,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );


      alert("✅ Wallet topped up successfully");
      setTopupAmount("");
      setShowTopUpModal(false);
      fetchWalletBalance();
    } catch (err) {
      console.error("❌ Topup failed", err?.response?.data || err);
      alert("Wallet top-up failed");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // PLAN PAYMENT (WALLET)
  // -----------------------------
  const handlePlanPayment = async () => {
    const amount = getPlanPrice();
    if (amount > walletBalance) {
      alert("Please top-up your wallet first");
      return;
    }

    try {
      setLoading(true);
      const raw = localStorage.getItem("bbsUser");
      const token = JSON.parse(raw)?.token;

      const initiateRes = await axios.post(
        `${API_BASE_URL}/plan/pay/initiate`,
        {
          planId: paymentPlan,
          amount,
          method: "wallet",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { txnId } = initiateRes.data;

      await axios.post(
        `${API_BASE_URL}/plan/pay/confirm`,
        {
          txnId,
          paymentRef: "WEB_WALLET_" + Date.now(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Plan activated successfully");
      fetchWalletBalance();
    } catch (err) {
      console.error("❌ Payment failed", err?.response?.data || err);
      alert("Plan payment failed");
    } finally {
      setLoading(false);
    }
  };
const handleApplyCoupon = async () => {
  if (!couponCode) {
    alert("Enter coupon code");
    return;
  }

  alert("Coupon system coming soon");
};

const handleApplyReferral = async () => {
  if (!referralCode) {
    alert("Enter referral code");
    return;
  }

  alert("Referral system coming soon");
};


  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.heading}>💼 Payments & Wallet</h2>
        <button
          style={{ ...styles.button, backgroundColor: "green" }}
          onClick={() => setShowTopUpModal(true)}
        >
          Top-up Wallet
        </button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Wallet Balance</h3>
        <p style={styles.balance}>₹{walletBalance}</p>
        <small style={styles.smallText}>
          Use for bookings, plans, and offers
        </small>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>💳 Buy Health Plan</h3>
        <select
          value={paymentPlan}
          onChange={(e) => setPaymentPlan(e.target.value)}
          style={styles.select}
        >
          <option value="basic">Basic Plan – ₹499</option>
          <option value="premium">Premium Plan – ₹999</option>
          <option value="govt">Govt Sponsored – ₹0</option>
        </select>

        <div style={styles.row}>
          <input
            placeholder="Enter Coupon Code"
            style={styles.input}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            style={{
              ...styles.button,
              backgroundColor: "#0d6efd",
              marginLeft: 8,
            }}
            onClick={handleApplyCoupon}
          >
            Apply
          </button>
        </div>

        <button
          style={{
            ...styles.button,
            backgroundColor: "#0d6efd",
            marginTop: 12,
          }}
          onClick={handlePlanPayment}
        >
          Pay & Activate Plan
        </button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>👥 Referral Program</h3>
        <p>
          Your Code: <strong>BBSCART123</strong>
        </p>

        <div style={styles.row}>
          <input
            placeholder="Enter Referral Code"
            style={styles.input}
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <button
            style={{
              ...styles.button,
              backgroundColor: "green",
              marginLeft: 8,
            }}
            onClick={handleApplyReferral}
          >
            Apply
          </button>
        </div>
        <small style={styles.smallText}>
          Invite friends & earn wallet bonus.
        </small>
      </div>

      <div
        style={styles.accordionHeader}
        onClick={() => setOffersOpen(!offersOpen)}
      >
        <h3 style={styles.cardTitle}>🎁 Available Offers</h3>
        <span>{offersOpen ? "▲" : "▼"}</span>
      </div>

      {offersOpen && (
        <div style={styles.card}>
          <p>💸 ₹50 Cashback on ₹500 Top-up</p>
          <p>🎁 10% off Premium Plan</p>
          <p>🆓 Free Plan for Approved Users</p>
        </div>
      )}

      {showTopUpModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3 style={styles.modalTitle}>Top-up Wallet</h3>
            <input
              placeholder="Enter amount"
              type="number"
              style={styles.input}
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 12,
              }}
            >
              <button
                style={{
                  ...styles.button,
                  backgroundColor: "#6c757d",
                  marginRight: 8,
                }}
                onClick={() => setShowTopUpModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#0d6efd" }}
                onClick={handleTopUp}
              >
                Top-up Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles converted for web
const styles = {
  container: {
    padding: 16,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  },
  heading: { fontSize: 20, fontWeight: "bold" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    border: "1px solid #ddd",
    marginBottom: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: 600, marginBottom: 8 },
  balance: { fontSize: 28, fontWeight: "bold", margin: "8px 0" },
  smallText: { fontSize: 12, color: "#666", marginTop: 6 },
  input: {
    width: "100%", // full width
    maxWidth: 400, // optional max width
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 6,
    boxSizing: "border-box", // ensures padding doesn't break width
    display: "block", // needed for margin auto
    margin: "0 auto", // centers horizontally
  },
  row: { display: "flex", alignItems: "center", marginTop: 8 },
  select: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    padding: "10px 16px",
    borderRadius: 6,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
  },
  accordionHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 6,
    backgroundColor: "#f1f1f1",
    marginBottom: 6,
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "400px",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
};

export default PaymentsWalletPage;
