const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phone: String,
  otp: String,
  purpose: String, // e.g. 'appointment'
  createdAt: { type: Date, default: Date.now, expires: 300 }, // auto delete after 5 mins
});

module.exports = mongoose.model("Otp", otpSchema);
