import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Badge, Spinner, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const PlanDetailsPage = () => {
    const navigate = useNavigate();
  
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URI}/plans/${id}`);
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

  const formattedPrice = () => {
    if (!plan?.price) return "—";
    if (plan.price.INR) return `₹ ${plan.price.INR} / year`;
    const firstKey = Object.keys(plan.price)[0];
    return `${firstKey.toUpperCase()}: ${plan.price[firstKey]}`;
  };

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Header>
          <Row className="align-items-center">
            <Col>
              <h3 className="mb-0">{plan.name}</h3>
              <small className="text-muted">{plan.shortDescription || (plan.description || "").slice(0, 120)}</small>
            </Col>
            <Col xs="auto" className="text-end">
              <Badge bg={getBadgeColor(plan.tier)} className="p-2" style={{ fontSize: "0.9rem" }}>
                {(plan.tier || "").toUpperCase()}
              </Badge>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Row>
            <Col md={8}>
              <h5>Description</h5>
              <p className="text-muted">{plan.description}</p>

              <h5>Features</h5>
              <ul>
                {plan.features && plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </Col>

            <Col md={4}>
              <Card className="p-3 text-center">
                <h6 className="text-muted">Price</h6>
                <div style={{ fontSize: 28, fontWeight: 700, margin: "8px 0" }}>{formattedPrice()}</div>

                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => navigate("/health-access/buy-plan", { state: { plan } })}
                  >
                    Buy Now
                  </Button>

                  <Button as={Link} to={`/health-access/plan/${id}/records`} variant="outline-primary">
                    View Health Records
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PlanDetailsPage;
