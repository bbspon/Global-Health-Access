import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const PlanUsagePage = () => {
  const { id } = useParams();
  const [usageData, setUsageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
        const token = bbsUserData?.token;

        const res = await axios.get(
          `http://localhost:5000/api/user/plan-usage/details/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsageData(res.data);
      } catch (err) {
        console.error("Error fetching plan usage details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" /> Loading...
      </Container>
    );
  }

  if (!usageData) {
    return (
      <Container className="text-center mt-5">
        <p>No plan usage data found.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3>🧾 Plan Usage Details</h3>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>{usageData.plan} Plan</Card.Title>
          <p>
            User: <strong>{usageData.user}</strong>
          </p>
          <ListGroup variant="flush">
            <ListGroup.Item>
              OPD:{" "}
              <Badge bg="primary">
                {usageData.opdUsed}/{usageData.opdCap}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              IPD:{" "}
              <Badge bg="secondary">
                {usageData.ipdUsed}/{usageData.ipdCap}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              Lab:{" "}
              <Badge bg="info">
                {usageData.labUsed}/{usageData.labCap}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item>
              Mental Health:{" "}
              <Badge bg="warning">
                {usageData.mentalHealthUsed}/{usageData.mentalHealthCap}
              </Badge>
            </ListGroup.Item>
            {usageData.family?.length > 0 && (
              <ListGroup.Item>
                Family:{" "}
                {usageData.family.map((member, i) => (
                  <Badge key={i} bg="success" className="me-1">
                    {member}
                  </Badge>
                ))}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PlanUsagePage;
