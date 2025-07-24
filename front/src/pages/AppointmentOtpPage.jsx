import React, { useState } from "react";
import axios from "axios";

const AppointmentOtpPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [stage, setStage] = useState("send"); // send or verify
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/otp/send-otp", {
        phoneNumber,
      });
      setMessage(res.data.message);
      setStage("verify");
    } catch (err) {
      setMessage("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/otp/verify-otp", {
        phoneNumber,
        otpCode,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Invalid or expired OTP");
    }
  };

  return (
    <div className="container mt-5">
      <h2>OTP Verification</h2>
      <p>{message}</p>
      {stage === "send" ? (
        <div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="btn btn-primary" onClick={sendOtp}>
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter OTP"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          />
          <button className="btn btn-success" onClick={verifyOtp}>
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentOtpPage;
