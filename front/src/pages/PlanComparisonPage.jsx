import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Dropdown,
  Button,
} from "react-bootstrap";
import { getComparisonPlans } from "../services/healthPlanAPI";
import { useNavigate } from "react-router-dom";

const PlanComparisonPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("INR");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       const data = await getComparisonPlans(country);
  //       setPlans(data.plans);
  //     } catch (err) {
  //       setError("Failed to load plan comparison data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPlans();
  // }, [country]);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // TEMPORARY dummy fallback
        const dummyPlans = [
          {
            _id: "p1",
            name: "Basic Plan",
            tier: "basic",
            price: 299,
            validityInDays: 365,
            isRecommended: false,
            features: ["OPD", "Diagnostics", "Emergency"],
          },
          {
            _id: "p2",
            name: "Premium Plan",
            tier: "premium",
            price: 699,
            validityInDays: 365,
            isRecommended: true,
            features: ["OPD", "Diagnostics", "Dental", "Vision"],
          },
          {
            _id: "p3",
            name: "Super Premium Plan",
            tier: "super_premium",
            price: 999,
            validityInDays: 365,
            isRecommended: true,
            features: ["Everything", "Hospitalization", "Cashless Claims"],
          },
        ];

        // Simulate loading
        await new Promise((res) => setTimeout(res, 500));

        // Set dummy data instead of real API
        setPlans(dummyPlans);
      } catch (err) {
        setError("Failed to load plan comparison data");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [country]);
  
  const tiers = ["basic", "premium", "super_premium"];

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Compare Health Plans</h3>
        <Dropdown onSelect={(val) => setCountry(val)}>
          <Dropdown.Toggle variant="outline-primary" size="sm">
            Currency: {country}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="INR">INR</Dropdown.Item>
            <Dropdown.Item eventKey="AED">AED</Dropdown.Item>
            <Dropdown.Item eventKey="USD">USD</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && plans.length === 0 && (
        <Alert variant="info">No plans available to compare.</Alert>
      )}

      {!loading && plans.length > 0 && (
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Feature</th>
                {plans.map((p) => (
                  <th key={p._id}>
                    {p.name} <br />
                    <small className="text-muted">{p.tier.toUpperCase()}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price</td>
                {plans.map((p) => (
                  <td key={p._id}>₹ {p.price}</td>
                ))}
              </tr>
              <tr>
                <td>Validity</td>
                {plans.map((p) => (
                  <td key={p._id}>{p.validityInDays} Days</td>
                ))}
              </tr>
              <tr>
                <td>Recommended</td>
                {plans.map((p) => (
                  <td key={p._id}>{p.isRecommended ? "✅" : "—"}</td>
                ))}
              </tr>
              {plans[0].features.map((_, index) => (
                <tr key={index}>
                  <td>Feature #{index + 1}</td>
                  {plans.map((p) => (
                    <td key={p._id + "_f" + index}>
                      {p.features[index] ? p.features[index] : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Button
        variant="outline-secondary"
        size="sm"
        className="mt-4"
        onClick={() => navigate("/")}
      >
        ← Back to Plans
      </Button>
    </Container>
  );
};

export default PlanComparisonPage;
