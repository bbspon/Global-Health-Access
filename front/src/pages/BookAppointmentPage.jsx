import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookAppointmentPage = () => {
  const [form, setForm] = useState({
    type: "Doctor",
    providerName: "",
    doctorName: "",
    specialization: "",
    appointmentDate: "",
    slot: "",
    notes: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
    const token = bbsUserData?.token;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/appointments/book`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Appointment Booked Successfully");
    } catch (error) {
      console.error("Booking failed", error);
      alert("Error booking appointment");
    }
  };

  return (
    <div className="container py-5 vh-100">
      <h4>Book Appointment</h4>
      <Form>
        <Form.Select
          name="type"
          className="mb-3"
          value={form.type}
          onChange={handleChange}
        >
          <option value="doctor">Doctor Consultation</option>
          <option value="video">Video Call</option>
          <option value="lab">Lab Test</option>
        </Form.Select>
        <Form.Control
          name="providerName"
          placeholder="Hospital/Lab Name"
          onChange={handleChange}
          className="mb-3"
        />
        <Form.Control
          name="doctorName"
          placeholder="Doctor Name (optional)"
          onChange={handleChange}
          className="mb-3"
        />
        <Form.Control
          name="specialization"
          placeholder="Specialization"
          onChange={handleChange}
          className="mb-3"
        />
        <Form.Control
          type="date"
          name="appointmentDate"
          onChange={handleChange}
          className="mb-3"
        />
        <Form.Control
          name="slot"
          placeholder="Preferred Time Slot"
          onChange={handleChange}
          className="mb-3"
        />
        <Form.Control
          as="textarea"
          name="notes"
          placeholder="Reason or Notes"
          onChange={handleChange}
          className="mb-3"
        />
      </Form>
      <div className="d-flex gap-2 justify-content-end">
        <Button className="mt-3 bg-info" onClick={handleSubmit}>
          Book Now
        </Button>
        <Button
          className="mt-3"
          variant="outline-info"
          onClick={() => navigate("/appointment-otp")}
        >
          Appointment OTP
        </Button>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
