const express = require("express");
const {
  sendAppointmentOtp,
  verifyAppointmentOtp,
} = require("../controllers/otpController");

const router = express.Router();
router.post("/send-otp", sendAppointmentOtp);
router.post("/verify-otp", verifyAppointmentOtp);

module.exports = router;
