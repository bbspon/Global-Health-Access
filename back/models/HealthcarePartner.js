const mongoose = require("mongoose");
const bbslive = require("../config/bbsliveConnection");

const HealthcarePartnerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    aadhaar: { type: String },
    pan: { type: String },
    gender: { type: String },
    dateOfBirth: { type: String },

    clinicName: { type: String, required: true },
    clinicType: { type: String, required: true }, // Hospital, Clinic, Lab etc.
    platform: { type: String, required: true }, // Digital / Physical / Both
    registrationNumber: { type: String, required: true },
    gstin: { type: String },
    clinicAddress: { type: String, required: true },

    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },

    supportedServices: [{ type: String }], // Full master list
    supportedPlanTiers: [{ type: String }], // ["Basic","Prime","Elite"]

    commissionRates: {
      opd: { type: Number, default: 0 },
      ipd: { type: Number, default: 0 },
      labs: { type: Number, default: 0 },
    },

    referralCodeForHospital: { type: String },

    // FILE UPLOADS
    registrationDocumentUrl: { type: String },
    clinicLicenseUrl: { type: String },
    gstCertificateUrl: { type: String },
    aadhaarDocumentUrl: { type: String },
    photos: [{ type: String }],

    // SYSTEM / INTERNAL
    partnerCode: { type: String, required: true },
    status: { type: String, default: "pending" }, // pending/approved/rejected
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    assignedFranchiseId: { type: String, default: null },
    assignedAgentId: { type: String, default: null },

    geoLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = bbslive.model("HealthcarePartner", HealthcarePartnerSchema);
