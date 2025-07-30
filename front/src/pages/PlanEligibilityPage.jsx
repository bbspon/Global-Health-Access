// Web → src/pages/PlanEligibilityPage.jsx
import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

const PlanEligibilityPage = () => {
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [planType, setPlanType] = useState("basic");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheckEligibility = async () => {
    const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/plan/check-eligibility`,
        { age, city, planType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResult(res.data);
    } catch (err) {
      setResult(null);
      setError(
        "❌ " + (err.response?.data?.message || "Something went wrong.")
      );
    }
  };

  return (
    <Container style={{ maxWidth: 600 }} className="mt-5">
      <h3>🔍 Check Plan Eligibility</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {result && (
        <Alert variant={result.eligible ? "success" : "warning"}>
          {result.message}
        </Alert>
      )}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Plan Type</Form.Label>
          <Form.Select
            value={planType}
            onChange={(e) => setPlanType(e.target.value)}
          >
            <option value="basic">Basic</option>
            <option value="prime">Prime</option>
            <option value="elite">Elite</option>
          </Form.Select>
        </Form.Group>

        <Button onClick={handleCheckEligibility}>Check Eligibility</Button>
      </Form>

      {result?.eligible && (
        <Card className="mt-4 p-3">
          <h5>🎯 You're eligible!</h5>
          <p>Next Step: Go to Buy Plan Page</p>
          <Button href="/health-access/buy-plan">Buy a Plan</Button>
        </Card>
      )}
    </Container>
  );
};

export default PlanEligibilityPage;
