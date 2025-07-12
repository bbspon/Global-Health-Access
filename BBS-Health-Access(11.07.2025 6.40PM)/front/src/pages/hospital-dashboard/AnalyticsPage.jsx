import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AnalyticsPage = () => {
  return (
    <Container className="py-4">
      <h4>📊 Hospital Analytics & Reports</h4>
      <Row>
        <Col md={4}>
          <Card body className="mb-3 bg-light">
            <h5>Total Consultations</h5>
            <p>120</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="mb-3 bg-light">
            <h5>Total Reimbursements</h5>
            <p>₹ 85,000</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="mb-3 bg-light">
            <h5>Feedback Score</h5>
            <p>4.5 ★</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsPage;
