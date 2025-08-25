import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const AnalyticsPage = () => {
  const [data, setData] = useState({
    totalConsultations: 0,
    totalReimbursements: 0,
    feedbackScore: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalId = "64ffabc0123abc456789de01"; // Replace with actual
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/analytics/hospital?hospitalId=${hospitalId}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="py-4">
      <h4>📊 Hospital Analytics & Reports</h4>
      <Row>
        <Col md={4}>
          <Card body className="mb-3 bg-light">
            <h5>Total Consultations</h5>
            <p>{data.totalConsultations}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="mb-3 bg-light">
            <h5>Total Reimbursements</h5>
            <p>₹ {data.totalReimbursements.toLocaleString()}</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card body className="mb-3 bg-light">
            <h5>Feedback Score</h5>
            <p>{data.feedbackScore} ★</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsPage;
