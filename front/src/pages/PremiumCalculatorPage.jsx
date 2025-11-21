import React, { useState } from "react";
import { calculatePremium } from "../services/pricingAPI";
import DynamicPricingMatrixModal from "../components/DynamicPricingMatrixModal";
import EligibilityCheckModal from "../components/EligibilityCheckModal";
import HospitalClassificationModal from "../components/HospitalClassificationModal";

const PremiumCalculatorPage = () => {
  const [form, setForm] = useState({
    ageBand: "",
    city: "",
    plan: "",
    tier: "",
    billingCycle: "",
    addons: [],
    diseases: [],
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
const [showEligibility, setShowEligibility] = useState(false);
const [showHospitalClassify, setShowHospitalClassify] = useState(false);

  const ageBands = ["18-25", "26-35", "36-45", "46-55", "56-65", "66-75"];

  const addonsList = [
    "OPD",
    "Dental",
    "Vision",
    "Maternity",
    "Chronic Care",
    "Lab",
    "Pharmacy",
  ];

  const diseaseList = [
    "Hypertension",
    "Diabetes",
    "Asthma",
    "Heart Disease",
    "Kidney Disease",
    "None",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleAddon = (addon) => {
    const selected = form.addons.includes(addon)
      ? form.addons.filter((x) => x !== addon)
      : [...form.addons, addon];

    setForm({ ...form, addons: selected });
  };

  const toggleDisease = (d) => {
    const selected = form.diseases.includes(d)
      ? form.diseases.filter((x) => x !== d)
      : [...form.diseases, d];

    setForm({ ...form, diseases: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const payload = { ...form };
      const res = await calculatePremium(payload);

      if (res?.premiumBreakdown) {
        setResult(res.premiumBreakdown);
      } else {
        alert("Invalid response from server");
      }
    } catch (err) {
      console.error("Premium calculation error:", err);
      alert("Failed to calculate premium");
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="mb-3">Premium Calculator</h3>

        <button
          className="btn btn-secondary mb-3"
          onClick={() => setShowMatrix(true)}
        >
          View Pricing Matrix
        </button>
        <button
          className="btn btn-outline-primary ms-2"
          onClick={() => setShowEligibility(true)}
        >
          Check Eligibility
        </button>
        <button
          className="btn btn-outline-warning ms-2"
          onClick={() => setShowHospitalClassify(true)}
        >
          Classify Hospital
        </button>

        {/* FORM START */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Age Band</label>
              <select
                className="form-control"
                name="ageBand"
                value={form.ageBand}
                onChange={handleChange}
                required
              >
                <option value="">Select Age Band</option>
                {ageBands.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Plan</label>
              <select
                className="form-control"
                name="plan"
                value={form.plan}
                onChange={handleChange}
                required
              >
                <option value="">Select Plan</option>
                <option value="Basic">Basic</option>
                <option value="Prime">Prime</option>
                <option value="Elite">Elite</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label fw-semibold">Hospital Tier</label>
              <select
                className="form-control"
                name="tier"
                value={form.tier}
                onChange={handleChange}
                required
              >
                <option value="">Select Tier</option>
                <option value="A">Tier A</option>
                <option value="B">Tier B</option>
                <option value="C">Tier C</option>
              </select>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Billing Cycle</label>
              <select
                className="form-control"
                name="billingCycle"
                value={form.billingCycle}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mt-4">
            <label className="form-label fw-semibold">Add-ons</label>
            <div className="row">
              {addonsList.map((addon) => (
                <div key={addon} className="col-md-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={form.addons.includes(addon)}
                      onChange={() => toggleAddon(addon)}
                    />
                    <label className="form-check-label">{addon}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diseases */}
          <div className="mt-4">
            <label className="form-label fw-semibold">Health Conditions</label>
            <div className="row">
              {diseaseList.map((d) => (
                <div key={d} className="col-md-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={form.diseases.includes(d)}
                      onChange={() => toggleDisease(d)}
                    />
                    <label className="form-check-label">{d}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate Premium"}
            </button>
          </div>
        </form>
      </div>

      {/* PREMIUM RESULT */}
      {result && (
        <div className="card p-4 shadow-sm mt-4">
          <h4 className="mb-3">Premium Result</h4>

          <p>
            <strong>Base Premium:</strong> ₹{result.basePremium}
          </p>
          <p>
            <strong>Risk Adjustment:</strong> ₹{result.riskAdjustment}
          </p>
          <p>
            <strong>Add-on Cost:</strong> ₹{result.addonCost}
          </p>
          <p>
            <strong>Disease Load:</strong> ₹{result.diseaseLoad}
          </p>

          <hr />

          <h5>
            <strong>Total Premium:</strong> ₹{result.totalPremium}
          </h5>
        </div>
      )}

      {/* ✅ ADD THIS MODAL HERE */}
      <DynamicPricingMatrixModal
        show={showMatrix}
        onClose={() => setShowMatrix(false)}
      />
      {showEligibility && (
        <EligibilityCheckModal
          show={showEligibility}
          onClose={() => setShowEligibility(false)}
        />
      )}
      {showHospitalClassify && (
        <HospitalClassificationModal
          show={showHospitalClassify}
          onClose={() => setShowHospitalClassify(false)}
        />
      )}
    </div>
  );
};

export default PremiumCalculatorPage;
