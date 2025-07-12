const mongoose = require("mongoose");

const userPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthPlan",
    required: true,
  },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  paymentMethod: {
    type: String,
    enum: ["wallet", "card", "upi"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active",
  },
  usedWalletAmount: { type: Number, default: 0 },
  transactionId: { type: String },
});

module.exports = mongoose.model("UserPlan", userPlanSchema);
