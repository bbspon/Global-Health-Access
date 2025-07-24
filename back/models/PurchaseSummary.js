const mongoose = require("mongoose");

const purchaseSummarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthPlan",
    required: true,
  },
  addons: [{ name: String, price: Number }],
  paymentMethod: {
    type: String,
    enum: ["wallet", "razorpay", "upi"],
    required: true,
  },
  amountPaid: { type: Number, required: true },
  referralCode: { type: String },
  signatureMetadata: {
    signature: String,
    version: String,
    timestamp: Date,
    ipAddress: String,
    device: String,
  },
  purchasedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PurchaseSummary", purchaseSummarySchema);
