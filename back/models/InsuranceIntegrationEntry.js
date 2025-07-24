const mongoose = require("mongoose");

const insuranceEntrySchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    policyType: { type: String },
    region: { type: String },
    regulator: { type: String },
    complianceStatus: { type: String, default: "Pending" },
    integrationStatus: { type: String, default: "Not Connected" },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "InsuranceIntegrationEntry",
  insuranceEntrySchema
);
