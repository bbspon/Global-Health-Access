import React, { useState } from "react";
import { classifyHospital } from "../services/classificationAPI";

const HospitalClassificationModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    opdVolume: "",
    ipdVolume: "",
    bedCount: "",
    icuBeds: "",
    specialtyCount: "",
    doctorCount: "",
    staffCount: "",
    infraScore: "",
    techScore: "",
    accreditation: "",
    emergency: "",
    hasLab: "",
    hasPharmacy: "",
    otCount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setResult(null);

      const payload = {
        opdVolume: Number(form.opdVolume),
        ipdVolume: Number(form.ipdVolume),
        bedCount: Number(form.bedCount),
        icuBeds: Number(form.icuBeds),
        specialtyCount: Number(form.specialtyCount),
        doctorCount: Number(form.doctorCount),
        staffCount: Number(form.staffCount),
        infraScore: Number(form.infraScore),
        techScore: Number(form.techScore),
        accreditation: form.accreditation,
        emergency: form.emergency,
        hasLab: form.hasLab,
        hasPharmacy: form.hasPharmacy,
        otCount: Number(form.otCount),
      };

      const response = await classifyHospital(payload);

      if (response?.success) {
        setResult(response);
      } else {
        alert(response?.message || "Classification failed");
      }
    } catch (error) {
      console.error("Classification Modal Error:", error);
      alert("Something went wrong while classifying the hospital.");
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
            <h5 className="fw-bold">Hospital Classification</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    OPD Volume (per day)
                  </label>
                  <input
                    type="number"
                    name="opdVolume"
                    className="form-control"
                    value={form.opdVolume}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    IPD Admissions (per month)
                  </label>
                  <input
                    type="number"
                    name="ipdVolume"
                    className="form-control"
                    value={form.ipdVolume}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Total Beds</label>
                  <input
                    type="number"
                    name="bedCount"
                    className="form-control"
                    value={form.bedCount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">ICU Beds</label>
                  <input
                    type="number"
                    name="icuBeds"
                    className="form-control"
                    value={form.icuBeds}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Specialties</label>
                  <input
                    type="number"
                    name="specialtyCount"
                    className="form-control"
                    value={form.specialtyCount}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Doctors</label>
                  <input
                    type="number"
                    name="doctorCount"
                    className="form-control"
                    value={form.doctorCount}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Staff Count</label>
                  <input
                    type="number"
                    name="staffCount"
                    className="form-control"
                    value={form.staffCount}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Infrastructure Score (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    name="infraScore"
                    className="form-control"
                    value={form.infraScore}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Technology Score (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    name="techScore"
                    className="form-control"
                    value={form.techScore}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Accreditation
                  </label>
                  <select
                    name="accreditation"
                    className="form-select"
                    value={form.accreditation}
                    onChange={handleChange}
                  >
                    <option value="">None</option>
                    <option value="NABH">NABH</option>
                    <option value="JCI">JCI</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Emergency Facility
                  </label>
                  <select
                    className="form-select"
                    name="emergency"
                    value={form.emergency}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Available</option>
                    <option value="no">Not Available</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Lab Onsite</label>
                  <select
                    className="form-select"
                    name="hasLab"
                    value={form.hasLab}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Pharmacy Onsite
                  </label>
                  <select
                    className="form-select"
                    name="hasPharmacy"
                    value={form.hasPharmacy}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">OT Count</label>
                  <input
                    type="number"
                    name="otCount"
                    className="form-control"
                    value={form.otCount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="text-end mt-4">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Classifying..." : "Classify Hospital"}
                </button>
              </div>
            </form>

            {/* RESULTS */}
            {result && (
              <div className="mt-4 p-3 bg-light border rounded">
                <h5 className="fw-bold">Classification Result</h5>

                <p>
                  <strong>Tier:</strong> {result.tier}
                </p>
                <p>
                  <strong>Score:</strong> {result.score}
                </p>

                {result?.strengths?.length > 0 && (
                  <>
                    <strong>Strengths:</strong>
                    <ul>
                      {result.strengths.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </>
                )}

                {result?.weaknesses?.length > 0 && (
                  <>
                    <strong>Weaknesses:</strong>
                    <ul>
                      {result.weaknesses.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </>
                )}

                {result?.warnings?.length > 0 && (
                  <>
                    <strong>Warnings:</strong>
                    <ul>
                      {result.warnings.map((w, idx) => (
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

export default HospitalClassificationModal;
