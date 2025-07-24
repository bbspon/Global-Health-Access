const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  method: {
    type: String,
    enum: ["wallet", "razorpay", "UPI", "admin", "other"],
    required: true,
  },
  purpose: {
    type: String,
    enum: [
      "plan_purchase",
      "refund",
      "cashback",
      "top-up",
      "bonus",
      "admin_adjustment",
      "other",
    ],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
});

module.exports = mongoose.model("WalletTransaction", walletTransactionSchema);
