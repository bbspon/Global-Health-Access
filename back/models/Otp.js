const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, required: true },
    otpCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", otpSchema);
