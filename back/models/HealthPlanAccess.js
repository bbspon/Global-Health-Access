// models/HealthPlan.js
const mongoose = require("mongoose");

const healthPlanSchema = new mongoose.Schema({
  tier: { type: String, required: true },
  features: [{ type: String }],
  color: { type: String, default: "primary" },
});

module.exports = mongoose.model("HealthPlanAccess", healthPlanSchema);
