import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URI; // e.g. http://localhost:5000/api

const HospitalOnboarding = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    hospitalName: "", // <-- renamed
    registrationNumber: "",
    license: null, // File
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "license") {
      setForm((p) => ({ ...p, license: files?.[0] || null }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!form.hospitalName.trim() || !form.registrationNumber.trim()) {
      setErrorMsg("Please enter hospital name and registration number.");
      return;
    }

    try {
      setSubmitting(true);

      const raw = localStorage.getItem("bbsUser");
      const token = raw ? JSON.parse(raw).token : null;
      if (!token) {
        setErrorMsg("You are not logged in. Please log in and try again.");
        setSubmitting(false);
        return;
      }

      const fd = new FormData();
      fd.append("hospitalName", form.hospitalName.trim()); // <-- matches backend
      fd.append("registrationNumber", form.registrationNumber.trim());
      if (form.license) fd.append("license", form.license);

      const { data } = await axios.post(`${API}/hospitals/onboarding`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // backend returns { record: {...} }
      setSuccessMsg(`Onboarding submitted. Ref: ${data?.record?._id || ""}`);
      setForm({ hospitalName: "", registrationNumber: "", license: null });
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to submit.";
      setErrorMsg(apiMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <h4 className="mb-3">🏥 Hospital Onboarding</h4>

      <Button
        variant="outline-info"
        size="sm"
        className="mb-3"
        onClick={() => navigate("/hospital-admin")}
      >
        Hospital Admin
      </Button>

      <Card body>
        {successMsg ? <Alert variant="success">{successMsg}</Alert> : null}
        {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : null}

        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Label>Hospital Name</Form.Label>
            <Form.Control
              name="hospitalName" // <-- matches backend/model
              type="text"
              placeholder="Enter hospital name"
              value={form.hospitalName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Registration Number</Form.Label>
            <Form.Control
              name="registrationNumber"
              type="text"
              placeholder="Enter registration number"
              value={form.registrationNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload License Document</Form.Label>
            <Form.Control
              name="license"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              Accepted: PDF or image (JPG/PNG/WebP)
            </Form.Text>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default HospitalOnboarding;
