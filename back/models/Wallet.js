const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  balance: { type: Number, default: 0 },
  transactions: [
    {
      amount: Number,
      method: String, // gateway, upi, card, refund
      type: { type: String, enum: ["credit", "debit"] },
      transactionId: String,
      timestamp: { type: Date, default: Date.now },
      note: String,
    },
  ],
});

module.exports = mongoose.model("Wallet", walletSchema);
