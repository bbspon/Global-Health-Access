import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

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
        <Button className="mt-3" onClick={handleSubmit}>
          Book Now
        </Button>
      </Form>
    </div>
  );
};

export default BookAppointmentPage;
