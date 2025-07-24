const mongoose = require("mongoose");

const UserPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthPlan",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    selectedPlan: { type: String, required: true },
    enrolledAt: { type: Date, default: Date.now },

    status: {
      type: String,
      enum: ["active", "expired", "upcoming"],
      default: "active",
    },
    paymentMethod: { type: String },
    usedWalletAmount: { type: Number },
    transactionId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserPlan", UserPlanSchema);
