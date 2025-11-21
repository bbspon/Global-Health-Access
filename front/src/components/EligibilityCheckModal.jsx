import React, { useState } from "react";
import { checkEligibility } from "../services/eligibilityAPI";

const EligibilityCheckModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    city: "",
    hospitalTier: "",
    chronicConditions: [],
    preExisting: "",
    isSmoker: "",
    bmi: "",
    familyMembers: "",
    addons: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e) => {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm({ ...form, [e.target.name]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setResults(null);

      const payload = {
        age: Number(form.age),
        gender: form.gender,
        city: form.city,
        hospitalTier: form.hospitalTier,
        chronicConditions: form.chronicConditions,
        preExisting: form.preExisting,
        isSmoker: form.isSmoker,
        bmi: Number(form.bmi),
        familyMembers: Number(form.familyMembers),
        addons: form.addons,
      };

      const res = await checkEligibility(payload);

      if (res?.success) {
        setResults(res);
      } else {
        alert(res?.message || "Eligibility check failed");
      }
    } catch (error) {
      console.error("Eligibility Error:", error);
      alert("Failed to check eligibility");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="fw-bold">Eligibility Check</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="col-md-4">
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

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Hospital Tier
                  </label>
                  <select
                    className="form-select"
                    name="hospitalTier"
                    value={form.hospitalTier}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Tier</option>
                    <option value="A">Tier A</option>
                    <option value="B">Tier B</option>
                    <option value="C">Tier C</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Chronic Conditions
                  </label>
                  <select
                    multiple
                    className="form-select"
                    name="chronicConditions"
                    onChange={handleMultiSelect}
                  >
                    <option value="diabetes">Diabetes</option>
                    <option value="hypertension">Hypertension</option>
                    <option value="thyroid">Thyroid</option>
                    <option value="heart">Heart Issues</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Pre-Existing Diseases
                  </label>
                  <input
                    type="text"
                    name="preExisting"
                    className="form-control"
                    value={form.preExisting}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Smoker?</label>
                  <select
                    className="form-select"
                    name="isSmoker"
                    value={form.isSmoker}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">BMI</label>
                  <input
                    type="number"
                    className="form-control"
                    name="bmi"
                    value={form.bmi}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Family Members
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="familyMembers"
                    value={form.familyMembers}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Add-ons</label>
                  <select
                    multiple
                    className="form-select"
                    name="addons"
                    onChange={handleMultiSelect}
                  >
                    <option value="maternity">Maternity</option>
                    <option value="dental">Dental</option>
                    <option value="vision">Vision</option>
                    <option value="wellness">Wellness</option>
                    <option value="mental">Mental Health</option>
                  </select>
                </div>
              </div>

              <div className="text-end mt-4">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Checking..." : "Check Eligibility"}
                </button>
              </div>
            </form>

            {/* RESULTS */}
            {results && (
              <div className="mt-4 p-3 border rounded bg-light">
                <h5 className="fw-bold">Eligibility Result</h5>
                <p>
                  <strong>Status:</strong>{" "}
                  {results?.eligible ? "Eligible" : "Not Eligible"}
                </p>

                <p>
                  <strong>Eligibility Score:</strong> {results?.score}
                </p>

                <p>
                  <strong>Risk Score:</strong> {results?.riskScore}
                </p>

                <p>
                  <strong>Recommended Tier:</strong> {results?.recommendedTier}
                </p>

                {results?.reasons?.length > 0 && (
                  <>
                    <strong>Reasons:</strong>
                    <ul>
                      {results.reasons.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </>
                )}

                {results?.warnings?.length > 0 && (
                  <>
                    <strong>Warnings:</strong>
                    <ul>
                      {results.warnings.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityCheckModal;
