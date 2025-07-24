// models/InsurancePlan.js
const mongoose = require("mongoose");

const InsurancePlanSchema = new mongoose.Schema({
  provider: String,
  planName: String,
  premium: Number,
  coverageAmount: Number,
  benefits: [String],
  region: String,
});

module.exports = mongoose.model("InsurancePlan", InsurancePlanSchema);
