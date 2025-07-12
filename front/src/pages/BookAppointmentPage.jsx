import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { deductWalletAmount } from "../services/walletAPI";

const BookAppointmentPage = () => {
  const [form, setForm] = useState({
    type: "doctor",
    providerName: "",
    doctorName: "",
    specialization: "",
    appointmentDate: "",
    slot: "",
    notes: "",
  });

  // Need To check Any Booking Page:
  const handleDoctorBooking = async () => {
    try {
      await deductWalletAmount({
        amount: 500,
        usageType: "appointment",
        referenceId: "APT123",
        note: "Doctor Booking Fee",
      });
      alert("Wallet deducted successfully");
    } catch (err) {
      alert("Insufficient wallet balance or error");
    }
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await axios.post("/api/appointments/book", form);
    alert("Appointment Booked");
  };

  return (
    <div className="container py-4">
      <h4>Book Appointment</h4>
      <Form>
        <Form.Select name="type" value={form.type} onChange={handleChange}>
          <option value="doctor">Doctor Consultation</option>
          <option value="video">Video Call</option>
          <option value="lab">Lab Test</option>
        </Form.Select>
        <Form.Control
          name="providerName"
          placeholder="Hospital/Lab Name"
          onChange={handleChange}
        />
        <Form.Control
          name="doctorName"
          placeholder="Doctor Name (optional)"
          onChange={handleChange}
        />
        <Form.Control
          name="specialization"
          placeholder="Specialization"
          onChange={handleChange}
        />
        <Form.Control
          type="date"
          name="appointmentDate"
          onChange={handleChange}
        />
        <Form.Control
          name="slot"
          placeholder="Preferred Time Slot"
          onChange={handleChange}
        />
        <Form.Control
          as="textarea"
          name="notes"
          placeholder="Reason or Notes"
          onChange={handleChange}
        />
        <Button className="mt-3" onClick={submit}>
          Book Now
        </Button>
      </Form>
    </div>
  );
};

export default BookAppointmentPage;
