const mongoose = require("mongoose");

const insuranceIntegrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    coverageType: String,
    partnerName: String,
    status: { type: String, default: "Pending" },
    syncedOn: { type: Date, default: Date.now },
    remarks: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "InsuranceIntegration",
  insuranceIntegrationSchema
);