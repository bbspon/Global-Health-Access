import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Badge,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { getMyActivePlan } from "../services/healthPlanAPI";
import { useNavigate } from "react-router-dom";

const MyHealthPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await getMyActivePlan();
        setPlan(data.plan);
      } catch {
        setPlan(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  const badgeColor = {
    basic: "secondary",
    premium: "info",
    super_premium: "warning",
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  if (!plan) {
    return (
      <Container className="py-4 text-center">
        <Alert variant="info">You don't have an active health plan yet.</Alert>
        <Button onClick={() => navigate("/health-access/plans")}>
          Browse Plans
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center">My Active Health Plan</h3>
      <Card className="shadow-sm mb-3">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <h5>
                {plan.name}{" "}
                <Badge bg={badgeColor[plan.tier] || "dark"} className="ms-2">
                  {plan.tier.toUpperCase()}
                </Badge>
              </h5>
              <p className="mb-1">
                <strong>Valid from:</strong>{" "}
                {new Date(plan.startDate).toLocaleDateString()}
              </p>
              <p className="mb-1">
                <strong>Valid till:</strong>{" "}
                {new Date(plan.endDate).toLocaleDateString()}
              </p>
              <p className="mb-1">
                <strong>Status:</strong> {plan.status}
              </p>
              <p className="mb-1">
                <strong>Payment:</strong> {plan.paymentMethod.toUpperCase()}
              </p>
              <p className="mb-1">
                <strong>Wallet Used:</strong> ₹{plan.usedWalletAmount}
              </p>
              <p className="mb-1">
                <strong>Txn ID:</strong> {plan.transactionId}
              </p>
            </Col>
            <Col md={4}>
              <h6>Plan Features</h6>
              <ul className="small">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyHealthPlan;
