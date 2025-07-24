// models/InsurancePolicy.js
const mongoose = require("mongoose");

const InsurancePolicySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  provider: { type: String, required: true },
  planName: { type: String, required: true },
  coverageAmount: { type: Number, required: true },
  premium: { type: Number, required: true },
  isAutoRenewal: { type: Boolean, default: false },
  nextRenewalDate: { type: Date },
  status: { type: String, enum: ["Active", "Expired"], default: "Active" },
  purchaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InsurancePolicy", InsurancePolicySchema);
