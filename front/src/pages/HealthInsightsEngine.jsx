import React, { useState, useEffect } from "react";
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

function simulateFetchData(filter) {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        planUsage: Math.random() * 100,
        diseasePrevalence: Math.floor(Math.random() * 1000),
        csrOpportunityScore: Math.random() * 100,
        hospitalLoad: Math.floor(Math.random() * 100),
        emergencyBottleneck: Math.random() > 0.7,
        nextIntervention: "Mobile Clinic Deployment",
        seasonalTrend: [
          { month: "Jan", value: 20 },
          { month: "Feb", value: 35 },
          { month: "Mar", value: 40 },
          { month: "Apr", value: 25 },
          { month: "May", value: 30 },
          { month: "Jun", value: 45 },
          { month: "Jul", value: 50 },
          { month: "Aug", value: 48 },
          { month: "Sep", value: 42 },
          { month: "Oct", value: 38 },
          { month: "Nov", value: 33 },
          { month: "Dec", value: 25 },
        ],
      });
    }, 1000);
  });
}

const renderTooltip = (text) => (props) => (
  <Tooltip {...props}>{text}</Tooltip>
);

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
    setLoading(true);
    simulateFetchData({ region: selectedRegion, disease: selectedDisease }).then(
      (res) => {
        setData(res);
        setLoading(false);
      }
    );
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
              <option key={r} value={r}>
                {r}
              </option>
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
              <option key={d} value={d}>
                {d}
              </option>
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
              <option key={role} value={role}>
                {role}
              </option>
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
                  <Card.Title>
                    Plan Usage (%){" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        "Percentage of users enrolled in health plans."
                      )}
                    >
                      <i className="bi bi-info-circle-fill"></i>
                    </OverlayTrigger>
                  </Card.Title>
                  <Card.Text>{data.planUsage.toFixed(1)}%</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="warning" text="dark" className="mb-3">
                <Card.Body>
                  <Card.Title>
                    Disease Prevalence{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        "Number of reported disease cases in selected region."
                      )}
                    >
                      <i className="bi bi-info-circle-fill"></i>
                    </OverlayTrigger>
                  </Card.Title>
                  <Card.Text>{data.diseasePrevalence} cases</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="info" text="white" className="mb-3">
                <Card.Body>
                  <Card.Title>
                    CSR Opportunity Score{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        "Potential impact score for CSR interventions."
                      )}
                    >
                      <i className="bi bi-info-circle-fill"></i>
                    </OverlayTrigger>
                  </Card.Title>
                  <Card.Text>{data.csrOpportunityScore.toFixed(1)}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card bg="secondary" text="white" className="mb-3">
                <Card.Body>
                  <Card.Title>
                    Seasonal Trend{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={renderTooltip(
                        "Seasonal variation in disease cases throughout the year."
                      )}
                    >
                      <i className="bi bi-info-circle-fill"></i>
                    </OverlayTrigger>
                  </Card.Title>
                  {/* Simple text summary - placeholder for chart */}
                  <Card.Text>
                    Peak in{" "}
                    {data.seasonalTrend.reduce((prev, current) =>
                      prev.value > current.value ? prev : current
                    ).month}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Card>
                <Card.Header>Hospital Load & Emergency Bottleneck</Card.Header>
                <Card.Body>
                  <p>Hospital Load: {data.hospitalLoad} % capacity</p>
                  <p>
                    Emergency Bottleneck:{" "}
                    {data.emergencyBottleneck ? (
                      <span className="text-danger fw-bold">Yes</span>
                    ) : (
                      <span className="text-success fw-bold">No</span>
                    )}
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setShowMapModal(true)}
                    className="me-2"
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
                  <p>{data.nextIntervention}</p>
                  <Button variant="success" onClick={() => setShowImpactModal(true)}>
                    Simulate Impact
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-3">
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

      {/* Detailed Map Modal */}
      <Modal
        show={showMapModal}
        onHide={() => setShowMapModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detailed Geo Health Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {/* Placeholder content: Ideally integrate interactive maps (e.g., Leaflet, Mapbox) */}
            [Interactive Geo Heatmap showing disease prevalence, hospital load,
            and healthcare access overlays.]
          </p>
          <div
            style={{
              height: "300px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#6c757d",
              border: "1px solid #ced4da",
              fontSize: "1rem",
              userSelect: "none",
            }}
          >
            Map visualization coming soon...
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMapModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Simulate Impact Modal */}
      <Modal
        show={showImpactModal}
        onHide={() => setShowImpactModal(false)}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Simulate Intervention Impact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Using AI models to forecast health outcomes and ROI of deploying{" "}
            <b>{data?.nextIntervention}</b> in the selected region.
          </p>
          <div
            style={{
              height: "200px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#6c757d",
              fontStyle: "italic",
              fontSize: "1rem",
              userSelect: "none",
            }}
          >
            Impact simulation charts coming soon...
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImpactModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Privacy Modal */}
      <Modal show={showPrivacyModal} onHide={() => setShowPrivacyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Data Ethics & Privacy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>All data anonymized with tokenized IDs</li>
            <li>Full compliance with DPDP, GDPR, UAE Data Laws</li>
            <li>User consent and opt-out enforced</li>
            <li>Transparent use with audit logs and reports</li>
            <li>Secure API access with authentication</li>
          </ul>
          <p>
            We prioritize user privacy and data security while enabling
            impactful health insights for public good.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrivacyModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
