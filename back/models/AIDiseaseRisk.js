const mongoose = require("mongoose");

const AIDiseaseRiskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: Number,
  gender: { type: String, enum: ['male', 'female'], required: true },
  height: Number,
  weight: Number,
  smoking: Boolean,
  alcohol: Boolean,
  activityLevel: { type: String },
  symptoms: [String],
  existingConditions: [String],
  riskScore: Number,
  riskLevel: { type: String, enum: ["low", "medium", "high"] },
  predictedDiseases: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AIDiseaseRisk", AIDiseaseRiskSchema);
