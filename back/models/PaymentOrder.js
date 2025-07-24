const mongoose = require("mongoose");

const paymentOrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  razorpayOrderId: { type: String },
  status: { type: String, default: "created" }, // created, paid, failed
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PaymentOrder", paymentOrderSchema);
