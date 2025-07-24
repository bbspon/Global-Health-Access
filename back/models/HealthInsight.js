const mongoose = require("mongoose");

const HealthInsightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  source: { type: String }, // e.g. 'lab', 'riskPrediction', 'manualInput'
  insightText: { type: String, required: true },
  tags: [String], // e.g. ['cholesterol', 'lifestyle', 'stress']
  riskLevel: { type: String, enum: ["low", "medium", "high"], default: "low" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HealthInsight", HealthInsightSchema);
