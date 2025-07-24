// models/FamilyDashboard.js
const mongoose = require("mongoose");

const familyDashboardSchema = new mongoose.Schema({
  name: String,
  role: String,
  age: Number,
  tier: String,
  permissions: [String],
  healthSummary: String,
  features: [String],
});

module.exports = mongoose.model("FamilyDashboard", familyDashboardSchema);
