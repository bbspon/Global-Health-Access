const mongoose = require("mongoose");

const PlanRenewalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  selectedPlan: {
    type: String,
    enum: ["Basic", "Premium", "Super Premium"],
    required: true,
  },
  selectedAddOns: [String],
  paymentMethod: {
    type: String,
    enum: ["Wallet", "UPI", "Card", "EMI"],
    required: true,
  },
  coupon: { type: String, default: "" },
  autoRenew: { type: Boolean, default: false },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PlanRenewal", PlanRenewalSchema);
