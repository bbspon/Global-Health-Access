import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import PlanCard from "../components/HealthAccess/PlanCard";
import { getHealthPlans } from "../services/healthPlanAPI";
import BuyPlanModal from "../components/HealthAccess/BuyPlanModal";
import {  useNavigate } from "react-router-dom";

const HealthPlansLandingPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleBuyClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };
  const handleConfirmPurchase = (plan) => {
    setShowModal(false);
    // Navigate to BuyPlanPage or trigger API (future block)
  };
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getHealthPlans();
        setPlans(data?.plans || []);
      } catch (err) {
        setError("Failed to load health plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Choose Your Health Access Plan</h2>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && plans.length === 0 && (
        <Alert variant="info">No health plans available at the moment.</Alert>
      )}

      <Row>
        {plans.map((plan) => (
          <Col key={plan._id} xs={12} md={6} lg={4} className="mb-4">
            <PlanCard plan={plan} onBuyClick={handleBuyClick} />
          </Col>
        ))}
      </Row>
      <BuyPlanModal
        show={showModal}
        onClose={() => setShowModal(false)}
        plan={selectedPlan}
        onConfirm={handleConfirmPurchase}
      />
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => navigate("/compare")}
      >
        Compare All Plans
      </Button>
    </Container>
  );
};

export default HealthPlansLandingPage;
