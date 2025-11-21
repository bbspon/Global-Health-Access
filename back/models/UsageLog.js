const mongoose = require("mongoose");

const usageLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      required: true,
    },

    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthCarePartner",
      required: true,
    },

    serviceType: {
      type: String,
      enum: ["OPD", "LAB", "PHARMACY", "ADDON"],
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
    },

    discountApplied: {
      type: Number, // ex: 0.20 for 20% discount
      default: 0,
    },

    addonPayout: {
      type: Number,
      default: 0,
    },

    tier: {
      type: String,
      required: true,
    },

    month: {
      type: String, // "2025-11"
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UsageLog", usageLogSchema);
