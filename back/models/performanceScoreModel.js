const mongoose = require("mongoose");

const performanceScoreSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ["doctor", "hospital"], required: true },
  specialty: String,
  rating: Number,
  empathyScore: Number,
  consultationTimeliness: String,
  prescriptionAccuracy: Number,
  outcomeScore: Number,
  followUpCompliance: Number,
  communicationClarity: Number,
  bedAvailability: Number,
  hygieneRating: Number,
  equipmentReadiness: Number,
  staffBehavior: Number,
  queueManagement: String,
  billingTransparency: String,
  emergencyResponseTime: String,
  patientSafetyIndex: Number,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PerformanceScore", performanceScoreSchema);
