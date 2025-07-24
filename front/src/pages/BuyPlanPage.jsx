import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PlanTermsModal from "../components/HealthAccess/PlanTermsModal"; // ✅ Add your modal import
import { useNavigate, Link } from "react-router-dom";

const BuyPlanPage = () => {
    const navigate = useNavigate();

  const location = useLocation();
  const selectedPlan = location.state?.plan || null;

  const [addons, setAddons] = useState([]);
  const [referralCode, setReferralCode] = useState("");
  const [wallet, setWallet] = useState(0);
  const [useWallet, setUseWallet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [loading, setLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false); // ✅ State for modal
  const [acceptedMetadata, setAcceptedMetadata] = useState(null); // ✅ Metadata storage

  const termsText = `By accepting this plan, you agree to the BBSCART Health Access terms and conditions...`; // 🔁 Can be loaded via API later

  useEffect(() => {
 const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
 const token = bbsUserData?.token;    axios
      .get("http://localhost:5000/api/user/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWallet(res.data.balance))
      .catch((err) => console.warn("Wallet fetch failed", err));
  }, []);

  const toggleAddon = (name) => {
    setAddons((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  // ✅ Actual purchase API call AFTER accepting terms
  const handleFinalPurchase = async (metadata) => {
    setLoading(true);
    try {
 const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
 const token = bbsUserData?.token;
       const res = await axios.post(
        "http://localhost:5000/api/user/purchase",
        {
          planId: selectedPlan._id,
          selectedAddons: addons,
          paymentMethod,
          usedWalletAmount: useWallet ? wallet : 0,
          referralCode,
          termsMetadata: metadata, // ✅ Send terms signature + meta
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

navigate("/health-access/purchase-summary", {
  state: {
    plan: selectedPlan,
    addons,
    usedWalletAmount: useWallet ? wallet : 0,
    paymentMethod,
    referralCode,
  },
});
    } catch (err) {
      console.error("Purchase error", err);
      alert("Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = () => {
    setShowTermsModal(true); // ✅ Show terms before buying
  };

  if (!selectedPlan) return <p>No plan selected</p>;

  return (
    <div className="container my-4">
      <h3>Checkout: {selectedPlan.name}</h3>
      <p>₹ {selectedPlan.price}</p>

      <h5>Add-ons:</h5>
      {selectedPlan.addons?.map((addon, i) => (
        <div key={i}>
          <label>
            <input
              type="checkbox"
              onChange={() => toggleAddon(addon.name)}
              checked={addons.includes(addon.name)}
            />{" "}
            {addon.name} (+₹{addon.price})
          </label>
        </div>
      ))}

      <div className="mt-3">
        <label>Referral Code:</label>
        <input
          className="form-control"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />
      </div>

      <div className="form-check mt-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={useWallet}
          onChange={(e) => setUseWallet(e.target.checked)}
        />
        <label className="form-check-label">
          Use Wallet Balance (₹{wallet})
        </label>
      </div>

      <div className="mt-3">
        <label>Payment Method:</label>
        <select
          className="form-select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="wallet">Wallet</option>
          <option value="razorpay">Razorpay</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      <button
        className="btn btn-success mt-4"
        onClick={handleBuy}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>

      {/* ✅ PlanTermsModal Integration */}
      <PlanTermsModal
        show={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={(metadata) => {
          setAcceptedMetadata(metadata);
          setShowTermsModal(false);
          handleFinalPurchase(metadata);
        }}
        termsText={termsText}
        version="v1"
        planId={selectedPlan._id} // ✅ Add this line
      />
    </div>
  );
};

export default BuyPlanPage;
