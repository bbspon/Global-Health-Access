const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthCarePartner",
      required: true,
    },

    month: {
      type: String, // "2025-11"
      required: true,
    },

    totalPayout: {
      type: Number,
      default: 0,
    },

    totalVisits: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payout", payoutSchema);
