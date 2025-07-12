import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const AppointmentOtpPage = ({ phone, appointmentId }) => {
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);

  const sendOtp = async () => {
    await axios.post("/api/otp/send-otp", { phone });
    setSent(true);
  };

  const verify = async () => {
    const res = await axios.post("/api/otp/verify-otp", { phone, otp });
    if (res.data.verified) {
      await axios.post("/api/appointments/confirm", { appointmentId });
      alert("Appointment Confirmed!");
    }
  };

  return (
    <div className="container py-4">
      <h4>OTP Verification</h4>
      {!sent ? (
        <Button onClick={sendOtp}>Send OTP</Button>
      ) : (
        <>
          <Form.Control
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button className="mt-2" onClick={verify}>
            Confirm Appointment
          </Button>
        </>
      )}
    </div>
  );
};

export default AppointmentOtpPage;
