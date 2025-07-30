import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const ComplianceDashboard = () => {
  const [complianceData, setComplianceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
    const token = bbsUserData?.token;

    axios
      .get(`${import.meta.env.VITE_API_URI}/compliance`, {
        headers: {
          Authorization: `Bearer ${token}`, // send the token here
        },
      })
      .then((res) => {
        console.log("✅ Fetched compliance data:", res.data.data);

        setComplianceData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Compliance API Error:", err);
        setError("Failed to fetch compliance data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="p-4">
      <h2 className="text-primary mb-4">Compliance Monitoring Dashboard</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Hospital Audit Flags</Card.Title>
              <ul>
                {complianceData?.auditFlags?.map((flag, i) => (
                  <li key={i}>{flag}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Policy Violations</Card.Title>
              <ul>
                {complianceData?.policyViolations?.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Card.Title>Compliance Records</Card.Title>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Country</th>
                <th>Status</th>
                <th>Badge</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {complianceData?.map((rec, idx) => (
                <tr key={idx}>
                  <td>{rec.country}</td>
                  <td>{rec.status}</td>
                  <td>{rec.badge}</td>
                  <td>{new Date(rec.lastUpdated).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ComplianceDashboard;
