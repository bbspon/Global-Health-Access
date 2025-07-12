import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, ListGroup, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const PlanDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/health-plans/${id}`)
      .then((res) => setPlan(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="container py-4">
      {plan ? (
        <>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>{plan.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {plan.tier} Tier
              </Card.Subtitle>
              <h4>₹{plan.price}</h4>
              <p>Validity: {plan.validity}</p>

              <ListGroup className="mb-3">
                {plan.benefits?.map((item, idx) => (
                  <ListGroup.Item key={idx}>✅ {item}</ListGroup.Item>
                ))}
              </ListGroup>

              {plan.extras?.length > 0 && (
                <>
                  <h6>Additional Features:</h6>
                  <ul>
                    {plan.extras.map((e, idx) => (
                      <li key={idx}>{e}</li>
                    ))}
                  </ul>
                </>
              )}

              <Button
                variant="success"
                onClick={() => navigate("/buy-plan", { state: { plan } })}
              >
                Buy This Plan
              </Button>
            </Card.Body>
          </Card>
        </>
      ) : (
        <p>Plan not found</p>
      )}
    </div>
  );
};

export default PlanDetailsPage;
