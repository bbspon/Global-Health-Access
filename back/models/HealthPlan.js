const mongoose = require("mongoose");

const healthPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tier: {
    type: String,
    enum: ["basic", "premium", "super_premium"],
    required: true,
  },
  description: String,
  features: [String],
  price: {
    INR: Number,
    AED: Number,
    USD: Number,
  },
  validityInDays: { type: Number, default: 365 },
  isActive: { type: Boolean, default: true },
  isRecommended: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HealthPlan", healthPlanSchema);
