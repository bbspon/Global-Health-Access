import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const PlanCard = ({ plan }) => {
  const navigate = useNavigate();

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

  const handleBuyClick = () => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan)); // ✅ Save selected plan
    navigate("/health-access/buy-plan", { state: { plan } }); // ✅ Navigate with state
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title>{plan.name}</Card.Title>
          <Badge bg={getBadgeColor(plan.tier)}>
            {(plan.tier || "N/A").toUpperCase()}
          </Badge>
        </div>
        <Card.Text>{plan.description}</Card.Text>

        <ul className="small text-muted flex-grow-1">
          {Array.isArray(plan.features) &&
            plan.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
        </ul>

        <h5 className="mt-3">
          ₹ {plan.price?.INR}
          <small className="text-muted">/ year</small>
        </h5>

        {/* ✅ Buttons Section - aligned */}
        <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
          <Button variant="outline-primary" size="sm" disabled>
            Compare
          </Button>
          <Button variant="success" size="sm" onClick={handleBuyClick}>
            Buy Now
          </Button>
          <Link to={`/health-access/plan/${plan._id}`}>
            <Button variant="info" size="sm">
              View Details
            </Button>
          </Link>
          <Link
            to={`/plan-terms-modal/${plan._id}`}
            className="d-block text-center small"
          >
            <Button variant="info" size="sm">
              Plan Terms
            </Button>
          </Link>
          <Link to={`/coverage-status`}>
            <Button variant="info" size="sm">
              Coverage Status
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlanCard;
