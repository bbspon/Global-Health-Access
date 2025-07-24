// models/PaymentTransaction.js
const mongoose = require("mongoose");

const paymentTransactionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthPlan",
      required: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["razorpay", "wallet", "upi"],
      required: true,
    },
    status: {
      type: String,
      enum: ["initiated", "success", "failed"],
      default: "initiated",
    },
    paymentRef: { type: String }, // Razorpay ID or wallet txn ID
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentTransaction", paymentTransactionSchema);
