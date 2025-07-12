const Otp = require("../models/Otp");
const generateOtp = require("../utils/generateOtp");
const sendSms = require("../utils/sendSms"); // Your custom SMS API integration

exports.sendAppointmentOtp = async (req, res) => {
  const { phone } = req.body;
  const otpCode = generateOtp();

  await Otp.create({ phone, otp: otpCode, purpose: "appointment" });
  await sendSms(phone, `Your OTP for appointment confirmation is ${otpCode}`);

  res.json({ message: "OTP sent" });
};

exports.verifyAppointmentOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const record = await Otp.findOne({ phone, otp, purpose: "appointment" });

  if (!record) return res.status(400).json({ error: "Invalid OTP" });

  await Otp.deleteMany({ phone }); // Clear OTPs
  res.json({ verified: true });
};
