const mongoose = require("mongoose");

const interopGovSchema = new mongoose.Schema({
  country: { type: String, required: true, default: "India" },
  complianceLevel: { type: String, required: true, default: "Partial" },
  governingBody: { type: String },
  healthIDSystem: { type: String },
  apiIntegration: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InteropGovEntry", interopGovSchema);
