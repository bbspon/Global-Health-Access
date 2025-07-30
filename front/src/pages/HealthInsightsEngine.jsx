import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

const regions = ["All India", "Delhi", "Maharashtra", "Tamil Nadu", "UAE"];
const diseases = [
  "Diabetes",
  "Maternal Care",
  "Respiratory Infections",
  "Cardiovascular",
  "Malaria",
];
const roles = ["Government", "CSR Head", "Researcher"];
const renderTooltip = (text) => (props) => <Tooltip {...props}>{text}</Tooltip>;

// Format helper to avoid crashes
const formatNumber = (val, decimals = 1) =>
  typeof val === "number" ? val.toFixed(decimals) : "N/A";

export default function HealthInsightsEngine() {
  const [selectedRegion, setSelectedRegion] = useState("All India");
  const [selectedDisease, setSelectedDisease] = useState("Diabetes");
  const [selectedRole, setSelectedRole] = useState("Government");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showImpactModal, setShowImpactModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
        const token = bbsUserData?.token;
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/health-insights/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(res.data.data?.[0]?.data?.[0]);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedRegion, selectedDisease]);

  function resetFilters() {
    setSelectedRegion("All India");
    setSelectedDisease("Diabetes");
    setSelectedRole("Government");
  }

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <h2 className="mb-4 text-primary">
        National & State-Level Health Insights Engine
      </h2>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Label>Filter by Region</Form.Label>
          <Form.Select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Filter by Disease/Condition</Form.Label>
          <Form.Select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
          >
            {diseases.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>User Role</Form.Label>
          <Form.Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3} className="d-flex align-items-end">
          <Button variant="secondary" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Col>
      </Row>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <div>Loading data...</div>
        </div>
      )}

      {!loading && data && (
        <>
          <Row className="mb-4">
            <Col md={3}>
              <Card bg="success" text="white" className="mb-3">
                <Card.Body>
                  <Card.Title>Plan Usage (%)</Card.Title>
                  <Card.Text>
                    {data?.planUsage !== undefined
                      ? `${data.planUsage.toFixed(1)}%`
                      : "N/A"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="warning" text="dark" className="mb-3">
                <Card.Body>
                  <Card.Title>Disease Prevalence</Card.Title>
                  <Card.Text>{data.diseasePrevalence || "N/A"} cases</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="info" text="white" className="mb-3">
                <Card.Body>
                  <Card.Title>CSR Opportunity Score</Card.Title>
                  <Card.Text>
                    {formatNumber(data.csrOpportunityScore)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="secondary" text="white" className="mb-3">
                <Card.Body>
                  <Card.Title>Seasonal Trend</Card.Title>
                  <Card.Text>
                    Peak in{" "}
                    {Array.isArray(data.seasonalTrend) &&
                    data.seasonalTrend.length > 0
                      ? data.seasonalTrend.reduce((prev, curr) =>
                          prev.value > curr.value ? prev : curr
                        ).month
                      : "N/A"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card>
                <Card.Header>Hospital Load & Emergency Bottleneck</Card.Header>
                <Card.Body>
                  <p>Hospital Load: {data.hospitalLoad || "N/A"} %</p>
                  <p>
                    Emergency Bottleneck:{" "}
                    <span
                      className={
                        data.emergencyBottleneck
                          ? "text-danger fw-bold"
                          : "text-success fw-bold"
                      }
                    >
                      {data.emergencyBottleneck === true
                        ? "Yes"
                        : data.emergencyBottleneck === false
                        ? "No"
                        : "N/A"}
                    </span>
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setShowMapModal(true)}
                  >
                    View Detailed Map
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Header>AI-Driven Next Best Intervention</Card.Header>
                <Card.Body>
                  <p>{data.nextIntervention || "N/A"}</p>
                  <Button
                    variant="success"
                    onClick={() => setShowImpactModal(true)}
                  >
                    Simulate Impact
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button
                variant="link"
                onClick={() => setShowPrivacyModal(true)}
                className="text-decoration-none"
              >
                Data Ethics, Privacy & Transparency
              </Button>
            </Col>
          </Row>
        </>
      )}

      {/* Modals */}
      <Modal show={showMapModal} onHide={() => setShowMapModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detailed Geo Health Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>[Interactive heatmap coming soon...]</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowMapModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showImpactModal}
        onHide={() => setShowImpactModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Simulate Impact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Impact of deploying{" "}
            <strong>{data?.nextIntervention || "..."}</strong>...
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowImpactModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPrivacyModal}
        onHide={() => setShowPrivacyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Data Ethics & Privacy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Complies with GDPR/DPDP/UAE Data Laws</li>
            <li>Tokenized IDs & audit logs</li>
            <li>User consent and transparency</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowPrivacyModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
