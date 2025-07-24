// models/UnifiedAPI.js
const mongoose = require("mongoose");

const unifiedAPISchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Hospital", "Lab", "Pharmacy"], required: true },
  status: { type: String, enum: ["Live", "Pending"], default: "Pending" },
  lastCall: { type: String, default: "N/A" },
  country: { type: String, required: true },
  version: { type: String, required: true },
  endpoint: { type: String, required: true },
});

module.exports = mongoose.model("UnifiedAPI", unifiedAPISchema);
