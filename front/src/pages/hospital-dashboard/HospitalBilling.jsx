import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URI; // e.g. http://localhost:5000/api

const HospitalBilling = () => {
  const [form, setForm] = useState({
    patientId: "",
    serviceProvided: "",
    amount: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // basic required fields
    if (
      !form.patientId.trim() ||
      !form.serviceProvided.trim() ||
      form.amount === ""
    ) {
      setErrorMsg("Please fill patient ID, service provided, and amount.");
      return;
    }

    // cast amount
    const payload = {
      patientId: form.patientId.trim(),
      serviceProvided: form.serviceProvided.trim(),
      amount: Number(form.amount),
      notes: form.notes?.trim() || undefined,
    };

    if (Number.isNaN(payload.amount) || payload.amount < 0) {
      setErrorMsg("Amount must be a valid number.");
      return;
    }

    try {
      setSubmitting(true);

      // read token
      const raw = localStorage.getItem("bbsUser");
      const token = raw ? JSON.parse(raw).token : null;
      if (!token) {
        setErrorMsg("You are not logged in. Please log in and try again.");
        setSubmitting(false);
        return;
      }

      const { data } = await axios.post(`${API}/hospital-bills`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMsg(`Bill submitted. Ref: ${data?.bill?._id || ""}`);
      // reset form
      setForm({ patientId: "", serviceProvided: "", amount: "", notes: "" });
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to submit bill.";
      setErrorMsg(apiMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <h4 className="mb-3">💳 Enter Bill &amp; Reimbursement</h4>

      <Card body>
        {successMsg ? <Alert variant="success">{successMsg}</Alert> : null}
        {errorMsg ? <Alert variant="danger">{errorMsg}</Alert> : null}

        <Form onSubmit={handleSubmit} autoComplete="off">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="patientId">
                <Form.Label>Patient ID</Form.Label>
                <Form.Control
                  name="patientId"
                  type="text"
                  value={form.patientId}
                  onChange={handleChange}
                  placeholder="e.g., BBH-000123"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount (₹)</Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="e.g., 750"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="serviceProvided">
            <Form.Label>Service Provided</Form.Label>
            <Form.Control
              name="serviceProvided"
              type="text"
              value={form.serviceProvided}
              onChange={handleChange}
              placeholder="e.g., OPD Consultation - General Medicine"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="notes">
            <Form.Label>Notes (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any remarks for billing or reimbursement"
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="warning" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Bill"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={submitting}
              onClick={() =>
                setForm({
                  patientId: "",
                  serviceProvided: "",
                  amount: "",
                  notes: "",
                })
              }
            >
              Clear
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default HospitalBilling;
