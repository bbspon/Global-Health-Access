import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Modal,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const planColors = {
  Basic: "secondary",
  Silver: "info",
  Gold: "warning",
  Premium: "success",
  Corporate: "primary",
};

const PlanUsageDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfModal, setPdfModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;

      try {
        const [usageRes, plansRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URI}/user/plan-usage`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URI}/plans`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const usageData = usageRes.data;
        const plans = plansRes.data;

        const merged = usageData.map((u) => {
          const planDetails = plans.find((p) => p._id === u.planId);
          return {
            ...u,
            plan: planDetails?.name || "Unknown Plan",
            tier: planDetails?.tier || "basic",
            description: planDetails?.description || "",
            price: planDetails?.price || 0,
          };
        });

        setData(merged);
      } catch (err) {
        console.error("Error loading data", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePDFDownload = () => {
    setPdfModal(true);
    setTimeout(() => setPdfModal(false), 3000);
  };

  const handleManualReset = async () => {
    try {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;

      await axios.post(
        `${import.meta.env.VITE_API_URI}/user/plan-usage/reset`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResetModal(true);
      setTimeout(() => {
        setResetModal(false);
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Reset failed", err);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" /> Loading Plan Usage Dashboard...
      </Container>
    );
  }

  if (!data.length) {
    return (
      <Container className="text-center mt-5">
        <h5>No plan usage data found.</h5>
      </Container>
    );
  }

  return (
    <Container fluid>
      <h2 className="my-4">📊 Plan Usage Dashboard</h2>

      <Row>
        {data.map((user, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>
                  {user.user}{" "}
                  <Badge bg={planColors[user.tier] || "secondary"}>
                    {user.plan} Plan
                  </Badge>
                </Card.Title>

                {user.family.length > 0 && (
                  <Card.Subtitle className="mb-2 text-muted">
                    Family: {user.family.join(", ")}
                  </Card.Subtitle>
                )}
                <hr />

                {["opd", "ipd", "lab", "mentalHealth"].map((type) => {
                  const used =
                    (user[`${type}Used`] || 0) + (user.addOns?.[type] || 0);
                  const cap = user[`${type}Cap`] || 1;
                  const percent = Math.round((used / cap) * 100);
                  const alert = user.alerts?.find((a) =>
                    a.toLowerCase().includes(type)
                  );

                  return (
                    <div className="mb-3" key={type}>
                      <strong>
                        {type.toUpperCase()} Usage{" "}
                        {alert && <Badge bg="danger">{alert}</Badge>}
                      </strong>
                      <ProgressBar
                        now={percent > 100 ? 100 : percent}
                        label={`${used}/${cap}`}
                        variant={
                          percent < 70
                            ? "success"
                            : percent < 90
                            ? "warning"
                            : "danger"
                        }
                        className="mt-1"
                      />
                    </div>
                  );
                })}

                <div className="d-flex mt-4 justify-content-between">
                  <Button variant="success" onClick={handlePDFDownload}>
                    📥 Download PDF
                  </Button>
                  <Button variant="outline-danger" onClick={handleManualReset}>
                    ♻️ Manual Reset
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/health-access/renew-plan")}
                  >
                    🔁 Renew My Plan
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* PDF Modal */}
      <Modal show={pdfModal} onHide={() => setPdfModal(false)} centered>
        <Modal.Body className="text-center">
          <h5>✅ PDF Generated</h5>
          <p>Your usage summary is ready for download.</p>
        </Modal.Body>
      </Modal>

      {/* Reset Modal */}
      <Modal show={resetModal} onHide={() => setResetModal(false)} centered>
        <Modal.Body className="text-center">
          <h5>♻️ Plan Counters Reset</h5>
          <p>This user’s usage counters will now reset.</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PlanUsageDashboard;
