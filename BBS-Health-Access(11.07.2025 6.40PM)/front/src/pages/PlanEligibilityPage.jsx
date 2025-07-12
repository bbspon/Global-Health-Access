import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const PlanEligibilityPage = () => {
  const [form, setForm] = useState({ age: "", city: "", income: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const checkEligibility = () => {
    setLoading(true);
    axios
      .post("/api/health-plans/check-eligibility", form)
      .then((res) => setResult(res.data))
      .catch(() =>
        setResult({ eligible: false, reason: "Something went wrong" })
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="container py-4">
      <h4>Check Plan Eligibility</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={form.age}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={form.city}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Monthly Income</Form.Label>
          <Form.Control
            type="number"
            name="income"
            value={form.income}
            onChange={handleInput}
          />
        </Form.Group>

        <Button onClick={checkEligibility} disabled={loading}>
          {loading ? "Checking..." : "Check Eligibility"}
        </Button>
      </Form>

      {result && (
        <Alert
          variant={result.eligible ? "success" : "danger"}
          className="mt-3"
        >
          {result.eligible
            ? "✅ You're eligible for this plan!"
            : `❌ Not eligible. Reason: ${result.reason}`}
        </Alert>
      )}
    </div>
  );
};

export default PlanEligibilityPage;
