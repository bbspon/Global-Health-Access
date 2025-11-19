// src/components/healthcarePartner/AddHealthcareModal.jsx

import React, { useState } from "react";
import axios from "axios";
import { registerHealthcarePartner } from "../../services/healthPartnerAPI";

const supportedServicesOptions = [
  "OPD",
  "IPD",
  "Emergency",
  "ICU",
  "NICU",
  "PICU",
  "Radiology",
  "Laboratory",
  "Pathology",
  "MRI",
  "CT Scan",
  "X-Ray",
  "Ultrasound",
  "Pharmacy",
  "Teleconsultation",
  "Physiotherapy",
  "Dialysis",
  "Blood Bank",
  "Ambulance",
  "Day Care",
  "General Surgery",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Oncology",
  "Gastroenterology",
  "Dermatology",
  "ENT",
  "Pulmonology",
  "Psychiatry",
  "Ophthalmology",
  "Urology",
  "Nephrology",
  "General Medicine",
  "Dental",
  "Rehab & Wellness",
];

const planTierOptions = ["Basic", "Prime", "Elite"];

const AddHealthcareModal = ({ show, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    // Personal Information
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    aadhaar: "",
    pan: "",

    // Hospital / Clinic Details
    clinicName: "",
    clinicType: "",
    platform: "",
    registrationNumber: "",
    gstin: "",
    clinicAddress: "",

    // Location Details
    country: "India",
    state: "",
    district: "",
    city: "",
    pincode: "",
    address: "",

    // Clinical Capabilities
    supportedServices: [], // array of strings
    supportedPlanTiers: [], // array of strings

    // Commission Rates
    commissionOPD: "",
    commissionIPD: "",
    commissionLabs: "",

    // Referral & Hierarchy
    referralCodeHospital: "",
    assignedFranchiseId: "",
    assignedAgentId: "",

    // Documents (single)
    registrationDoc: null,
    clinicLicense: null,
    gstCertificate: null,
    aadhaarDocument: null,
    // Documents (multiple)
    clinicPhotos: [],
  });

  // generic text / select handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // file inputs (single)
  const handleFile = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // multiple photos
  const handleMultiFile = (e) => {
    const { files } = e.target;
    const arr = Array.from(files || []);
    setForm((prev) => ({
      ...prev,
      clinicPhotos: arr,
    }));
  };

  // checkbox arrays (supportedServices, supportedPlanTiers)
  const handleCheckboxArray = (fieldName, value) => {
    setForm((prev) => {
      const set = new Set(prev[fieldName]);
      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
      return {
        ...prev,
        [fieldName]: Array.from(set),
      };
    });
  };

const handleSubmit = async () => {
  try {
    setLoading(true);

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (
        key === "registrationDoc" ||
        key === "clinicLicense" ||
        key === "gstCertificate" ||
        key === "aadhaarDocument" ||
        key === "clinicPhotos"
      ) {
        return;
      }

      const value = form[key];

      if (Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else {
        formData.append(key, value);
      }
    });

    if (form.registrationDoc)
      formData.append("registrationDoc", form.registrationDoc);
    if (form.clinicLicense)
      formData.append("clinicLicense", form.clinicLicense);
    if (form.gstCertificate)
      formData.append("gstCertificate", form.gstCertificate);
    if (form.aadhaarDocument)
      formData.append("aadhaarDocument", form.aadhaarDocument);

    if (form.clinicPhotos?.length > 0) {
      form.clinicPhotos.forEach((file) => {
        formData.append("clinicPhotos", file);
      });
    }

    // ✔ Use your API service instead of axios
    const res = await registerHealthcarePartner(formData);

    if (res.success) {
      alert("Healthcare Partner added successfully!");
      onSuccess();
    } else {
      alert(res.error || "Failed to save");
    }
  } catch (err) {
    console.error("Healthcare Save Error:", err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  if (!show) return null;

  return (
    <>
      {/* backdrop */}
      <div className="modal-backdrop fade show" />

      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content rounded-4">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Add Healthcare Partner</h5>
              <button
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div
              className="modal-body bg-light"
              style={{ maxHeight: "75vh", overflowY: "auto" }}
            >
              {/* PERSONAL INFO */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-2">
                  <h6 className="mb-0 fw-semibold text-primary">
                    Personal Information
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input
                        name="fullName"
                        type="text"
                        className="form-control"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Phone *</label>
                      <input
                        name="phone"
                        type="text"
                        className="form-control"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Gender</label>
                      <select
                        name="gender"
                        className="form-select"
                        value={form.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">DOB</label>
                      <input
                        name="dob"
                        type="date"
                        className="form-control"
                        value={form.dob}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Aadhaar</label>
                      <input
                        name="aadhaar"
                        type="text"
                        className="form-control"
                        value={form.aadhaar}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">PAN</label>
                      <input
                        name="pan"
                        type="text"
                        className="form-control"
                        value={form.pan}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* HOSPITAL / CLINIC DETAILS */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-2">
                  <h6 className="mb-0 fw-semibold text-primary">
                    Hospital / Clinic Details
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Clinic / Hospital Name *
                      </label>
                      <input
                        name="clinicName"
                        type="text"
                        className="form-control"
                        value={form.clinicName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Clinic Type *</label>
                      <select
                        name="clinicType"
                        className="form-select"
                        value={form.clinicType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option>Hospital</option>
                        <option>Clinic</option>
                        <option>Lab</option>
                        <option>Diagnostics</option>
                        <option>Specialist Center</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Platform *</label>
                      <select
                        name="platform"
                        className="form-select"
                        value={form.platform}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option>Online</option>
                        <option>Offline</option>
                        <option>Both</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Registration Number</label>
                      <input
                        name="registrationNumber"
                        type="text"
                        className="form-control"
                        value={form.registrationNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">GSTIN</label>
                      <input
                        name="gstin"
                        type="text"
                        className="form-control"
                        value={form.gstin}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Clinic Address</label>
                      <textarea
                        name="clinicAddress"
                        className="form-control"
                        rows={2}
                        value={form.clinicAddress}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* LOCATION DETAILS */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-2">
                  <h6 className="mb-0 fw-semibold text-primary">
                    Location Details
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-12">
                      <label className="form-label">Address</label>
                      <textarea
                        name="address"
                        className="form-control"
                        rows={2}
                        value={form.address}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Country</label>
                      <input
                        name="country"
                        type="text"
                        className="form-control"
                        value={form.country}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">State</label>
                      <input
                        name="state"
                        type="text"
                        className="form-control"
                        value={form.state}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">District</label>
                      <input
                        name="district"
                        type="text"
                        className="form-control"
                        value={form.district}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">City</label>
                      <input
                        name="city"
                        type="text"
                        className="form-control"
                        value={form.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-1">
                      <label className="form-label">Pincode</label>
                      <input
                        name="pincode"
                        type="text"
                        className="form-control"
                        value={form.pincode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CLINICAL CAPABILITIES */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-2">
                  <h6 className="mb-0 fw-semibold text-primary">
                    Clinical Capabilities
                  </h6>
                </div>
                <div className="card-body">
                  <label className="form-label fw-semibold">
                    Supported Services
                  </label>
                  <div className="row g-2 mb-3">
                    {supportedServicesOptions.map((svc) => (
                      <div className="col-md-4 col-lg-3" key={svc}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`svc-${svc}`}
                            checked={form.supportedServices.includes(svc)}
                            onChange={() =>
                              handleCheckboxArray("supportedServices", svc)
                            }
                          />
                          <label
                            className="form-check-label small"
                            htmlFor={`svc-${svc}`}
                          >
                            {svc}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* <label className="form-label fw-semibold">
                    Supported Plan Tiers
                  </label>
                  <div className="d-flex flex-wrap gap-3">
                    {planTierOptions.map((tier) => (
                      <div className="form-check" key={tier}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`tier-${tier}`}
                          checked={form.supportedPlanTiers.includes(tier)}
                          onChange={() =>
                            handleCheckboxArray("supportedPlanTiers", tier)
                          }
                        />
                        <label
                          className="form-check-label small"
                          htmlFor={`tier-${tier}`}
                        >
                          {tier}
                        </label>
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>

              {/* COMMISSION RATES */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-2">
                  <h6 className="mb-0 fw-semibold text-primary">
                    Commission Rates (%)
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">OPD</label>
                      <input
                        name="commissionOPD"
                        type="number"
                        className="form-control"
                        value={form.commissionOPD}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">IPD</label>
                      <input
                        name="commissionIPD"
                        type="number"
                        className="form-control"
                        value={form.commissionIPD}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Labs</label>
                      <input
                        name="commissionLabs"
                        type="number"
                        className="form-control"
                        value={form.commissionLabs}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* REFERRAL & HIERARCHY */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-0 py-2">
                  <h6 className="mb-0 fw-semibold text-primary">
                    Referral & Hierarchy Mapping
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">
                        Referral Code for Hospital
                      </label>
                      <input
                        name="referralCodeHospital"
                        type="text"
                        className="form-control"
                        value={form.referralCodeHospital}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">
                        Assigned Franchise ID
                      </label>
                      <input
                        name="assignedFranchiseId"
                        type="text"
                        className="form-control"
                        value={form.assignedFranchiseId}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Assigned Agent ID</label>
                      <input
                        name="assignedAgentId"
                        type="text"
                        className="form-control"
                        value={form.assignedAgentId}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* DOCUMENTS */}
              <div className="card border-0 shadow-sm mb-2">
                <div className="card-header bg-white border-0 py-2">
                  <h6 className="mb-0 fw-semibold text-primary">Documents</h6>
                  <small className="text-muted">
                    Registration document is mandatory.
                  </small>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Registration Document (Required)
                      </label>
                      <input
                        name="registrationDoc"
                        type="file"
                        className="form-control"
                        onChange={handleFile}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Clinic License</label>
                      <input
                        name="clinicLicense"
                        type="file"
                        className="form-control"
                        onChange={handleFile}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">GST Certificate</label>
                      <input
                        name="gstCertificate"
                        type="file"
                        className="form-control"
                        onChange={handleFile}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Aadhaar Document</label>
                      <input
                        name="aadhaarDocument"
                        type="file"
                        className="form-control"
                        onChange={handleFile}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">
                        Clinic Photos (Multiple)
                      </label>
                      <input
                        name="clinicPhotos"
                        type="file"
                        className="form-control"
                        multiple
                        onChange={handleMultiFile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer bg-white">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-dark"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Partner"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHealthcareModal;
