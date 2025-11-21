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

    // Main clinic details
    clinicName: { type: String, required: true },
    name: { type: String }, // auto-filled from clinicName

    clinicType: { type: String, required: true },

    platform: { type: String, default: "" }, // made optional

    registrationNumber: { type: String, required: true },
    gstin: { type: String },

    clinicAddress: { type: String, default: "" }, // made optional
    address: { type: String }, // auto-filled from clinicAddress

    country: { type: String, default: "" }, // made optional
    state: { type: String, default: "" },
    district: { type: String, default: "" },
    city: { type: String, default: "" },
    pincode: { type: String, default: "" },

    supportedServices: [{ type: String }],
    supportedPlanTiers: [{ type: String }],

    commissionRates: {
      opd: { type: Number, default: 0 },
      ipd: { type: Number, default: 0 },
      labs: { type: Number, default: 0 },
    },

    referralCodeForHospital: { type: String },

    // File uploads
    registrationDocumentUrl: { type: String },
    clinicLicenseUrl: { type: String },
    gstCertificateUrl: { type: String },
    aadhaarDocumentUrl: { type: String },
    photos: [{ type: String }],

    // System
    partnerCode: { type: String, required: true },
    status: { type: String, default: "pending" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    assignedFranchiseId: { type: String, default: null },
    assignedAgentId: { type: String, default: null },

    geoLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },

    contactPerson: { type: String, default: "" }, // optional

    departments: {
      type: [String],
      default: [],
    },

    classificationScore: { type: Number, default: 0 },

    tier: {
      type: String,
      enum: ["A", "B", "C"],
      default: "C",
    },

    payoutSettings: {
      opdShare: { type: Number, default: 0.1 },
      labShare: { type: Number, default: 0.12 },
      pharmacyShare: { type: Number, default: 0.08 },
    },
  },
  { timestamps: true }
);

// Auto-map name & address
HealthcarePartnerSchema.pre("save", function (next) {
  if (!this.name) this.name = this.clinicName;
  if (!this.address) this.address = this.clinicAddress;
  next();
});

module.exports = bbslive.model("HealthcarePartner", HealthcarePartnerSchema);
