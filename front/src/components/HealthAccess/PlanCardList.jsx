import React from "react";
import PlanCard from "./PlanCard";
import { Row, Col } from "react-bootstrap";

const PlanCardList = ({ plans, onBuyClick }) => {
  if (!plans || plans.length === 0) {
    return <p>No plans available.</p>;
  }

  return (
    <Row>
      {plans.map((plan) => (
        <Col key={plan._id} xs={12} md={6} lg={4} className="mb-4">
          <PlanCard plan={plan} onBuyClick={onBuyClick} />
        </Col>
      ))}
    </Row>
  );
};

export default PlanCardList;
