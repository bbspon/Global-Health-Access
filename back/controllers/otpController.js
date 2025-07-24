const Otp = require("../models/Otp");
const generateOtp = require("../utils/generateOtp");

exports.sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber)
    return res.status(400).json({ message: "Phone number required" });

  const otpCode = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

  await Otp.create({ phoneNumber, otpCode, expiresAt });

  console.log("🔐 OTP sent to", phoneNumber, "=>", otpCode); // Replace with SMS/WhatsApp API
  res.status(200).json({ message: "OTP sent" });
};

exports.verifyOtp = async (req, res) => {
  const { phoneNumber, otpCode } = req.body;

  const record = await Otp.findOne({ phoneNumber, otpCode });
  if (!record) return res.status(400).json({ message: "Invalid OTP" });
  if (record.expiresAt < new Date())
    return res.status(400).json({ message: "OTP expired" });

  record.verified = true;
  await record.save();
  res.status(200).json({ message: "OTP verified" });
};
