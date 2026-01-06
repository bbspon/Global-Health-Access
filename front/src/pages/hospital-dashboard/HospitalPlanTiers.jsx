import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { PeopleFill, Clipboard2Check } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const HospitalPlanTiers = () => {
  const [planName, setPlanName] = useState("");
  const [coverageDetails, setCoverageDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;

      await axios.post(
        `${import.meta.env.VITE_API_URI}/hospital/plan-tiers`,
        { planName, coverageDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Plan tier created successfully");

      setPlanName("");
      setCoverageDetails("");
    } catch (err) {
      console.error(err);
      alert("Failed to create plan tier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h4>🛠 Create Custom Plan Tier</h4>

      <div className="mb-3 d-flex gap-3">
        <Link to="/doctor-management" className="btn btn-outline-primary">
          <PeopleFill size={18} /> Doctor Management
        </Link>
        <Link to="/doctor-scorecard" className="btn btn-outline-success">
          <Clipboard2Check size={18} /> Doctor Scorecard
        </Link>
      </div>

      <Card body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Plan Name</Form.Label>
            <Form.Control
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Enter plan name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Coverage Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={coverageDetails}
              onChange={(e) => setCoverageDetails(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Plan"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default HospitalPlanTiers;
