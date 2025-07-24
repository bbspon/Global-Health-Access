import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PlanComparison = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/plans")
      .then((res) => {
        setPlans(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (plans.length < 2) return <p>Need at least 2 plans to compare.</p>;

  const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features)));

  return (
    <Container className="mt-4">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Feature</th>
            {plans.map((p) => (
              <th key={p._id}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, i) => (
            <tr key={i}>
              <td>{feature}</td>
              {plans.map((plan) => (
                <td key={plan._id + i}>
                  {plan.features.includes(feature) ? "✅" : "❌"}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td>Price</td>
            {plans.map((p) => (
              <td key={p._id}>₹ {p.price}</td>
            ))}
          </tr>
        </tbody>
      </Table>

      <div className="text-center">
        <Button
          variant="outline-secondary"
          size="sm"
          className="mt-4"
          onClick={() => navigate("/plans")}
        >
          ← Back to Plans
        </Button>
      </div>
    </Container>
  );
};

export default PlanComparison;
