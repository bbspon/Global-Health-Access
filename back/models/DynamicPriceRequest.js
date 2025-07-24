// models/DynamicPriceRequest.js
const mongoose = require("mongoose");

const dynamicPriceRequestSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    hospitalTier: {
      type: String,
      enum: ["Tier 1", "Tier 2", "Tier 3"],
      required: true,
    },
    selectedModules: { type: [String], default: [] },
    durationMonths: { type: Number, required: true },
    referralCode: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    calculatedPrice: { type: Number }, // Final price result
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "DynamicPriceRequest",
  dynamicPriceRequestSchema
);
