const mongoose = require("mongoose");

const ComplianceStatusSchema = new mongoose.Schema({
  country: { type: String, required: true },
  status: { type: String, required: true }, // e.g. 'Compliant', 'Pending', etc.
  badge: { type: String, required: true }, // e.g. 'success', 'danger'
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ComplianceStatus", ComplianceStatusSchema);
