import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Badge, Spinner, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const PlanDetailsPage = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/plans/${id}`);
        console.log(res, "rwe");

        setPlan(res.data);
      } catch (err) {
        console.error("Failed to load plan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  const getBadgeColor = (tier) => {
    switch (tier) {
      case "basic":
        return "secondary";
      case "premium":
        return "info";
      case "super_premium":
        return "warning";
      default:
        return "dark";
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  if (!plan) return <p className="text-danger text-center">Plan not found</p>;

  return (
    <Card className="m-4 shadow-sm">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h3>{plan.name}</h3>
        <Badge bg={getBadgeColor(plan.tier)}>
          {(plan.tier || "").toUpperCase()}
        </Badge>
      </Card.Header>
      <Card.Body>
        <p>
          <strong>Description:</strong> {plan.description}
        </p>
        <p>
          <strong>Price:</strong> ₹ {plan.price} / year
        </p>
        <h5>Features:</h5>
        <ul>
          {plan.features && plan.features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <Button variant="success">Buy This Plan</Button>
        <Link to={`/health-access/plan/${id}/records`}>
          View Health Records
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PlanDetailsPage;
