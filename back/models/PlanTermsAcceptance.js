// models/PlanTermsAcceptance.js
const mongoose = require("mongoose");

const PlanTermsAcceptanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  signature: { type: String, required: true },
  version: { type: String, required: true },
  device: { type: String, required: true },
  acceptedAt: { type: Date, default: Date.now },
});

// ✅ Correct export
module.exports = mongoose.model(
  "PlanTermsAcceptance",
  PlanTermsAcceptanceSchema
);
