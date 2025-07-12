const mongoose = require("mongoose");

const planPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "HealthPlan" },
  amountPaid: Number,
  totalAmount: Number,
  paymentMethod: String, // wallet, gateway
  partialPayment: Boolean,
  transactionId: String,
  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PlanPayment", planPaymentSchema);
