const mongoose = require("mongoose");

const healthPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tier: {
    type: String,
    enum: ["basic", "premium", "super_premium"],
    required: true,
  },
  country: { type: String, required: true },
  city: { type: String, required: true },

  description: String,
  features: [String],

  price: {
    INR: { type: Number, default: 0 },
    AED: { type: Number, default: 0 },
    USD: { type: Number, default: 0 },
  },

  addons: [
    {
      name: String,
      description: String,
      price: Number,
      included: { type: Boolean, default: false },
    },
  ],

  validityInDays: { type: Number, default: 365 },
  isActive: { type: Boolean, default: true },
  isRecommended: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HealthPlan", healthPlanSchema);
