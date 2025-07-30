import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Badge,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const InsuranceIntegration = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [autoRenew, setAutoRenew] = useState(true);
  const [showHelpBot, setShowHelpBot] = useState(false);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/insurance`);
      console.log("✅ Insurance data:", res.data);
      setPolicies(res.data.data || []);
    } catch (error) {
      setErr("Failed to fetch insurance partners");
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = (plan) => {
    setSelectedPolicy(plan);
    setShowCompare(true);
  };

  return (
    <Container className="mt-4 mb-5">
      <h3>🛡️ Insurance Add-On: Catastrophic Coverage</h3>
      <Alert variant="info">
        BBSCART covers OPD, diagnostics, and wellness. For hospitalizations, add
        insurance from IRDAI/DHA-approved partners.
      </Alert>

      <Card className="mb-3">
        <Card.Body>
          <h5>Your Current Insurance</h5>
          {loading ? (
            <Spinner animation="border" />
          ) : err ? (
            <Alert variant="danger">{err}</Alert>
          ) : policies.length === 0 ? (
            <p>No active policies found.</p>
          ) : (
            <>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Coverage Type</th>
                    <th>Partner</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th>Synced On</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((p) => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.coverageType}</td>
                      <td>{p.partnerName}</td>
                      <td>
                        <Badge
                          bg={p.status === "Active" ? "success" : "secondary"}
                        >
                          {p.status}
                        </Badge>
                      </td>
                      <td>{p.remarks}</td>
                      <td>{new Date(p.syncedOn).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Form.Check
                type="switch"
                id="auto-renew"
                label="Auto-Renew Insurance Yearly"
                checked={autoRenew}
                onChange={() => setAutoRenew(!autoRenew)}
              />
            </>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <h5>Compare & Add New Insurance</h5>
          <Row>
            <Col md={4}>
              <Card className="mb-3 p-3 shadow-sm">
                <h6>Star Health</h6>
                <p>₹10L cover • ₹299/month</p>
                <Button
                  variant="primary"
                  onClick={() => handleBuy("Star Health")}
                >
                  Select
                </Button>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3 p-3 shadow-sm">
                <h6>Niva Bupa</h6>
                <p>₹20L cover • ₹459/month</p>
                <Button
                  variant="outline-primary"
                  onClick={() => handleBuy("Niva Bupa")}
                >
                  Select
                </Button>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3 p-3 shadow-sm">
                <h6>Care Health</h6>
                <p>₹30L cover • ₹699/month</p>
                <Button
                  variant="outline-primary"
                  onClick={() => handleBuy("Care Health")}
                >
                  Select
                </Button>
              </Card>
            </Col>
          </Row>
          <Form.Check
            className="mt-2"
            type="checkbox"
            label="I consent to share my details with the selected insurer."
          />
        </Card.Body>
      </Card>

      <Button variant="outline-secondary" onClick={() => setShowHelpBot(true)}>
        💬 Ask Insurance Coach
      </Button>

      <Modal show={showCompare} onHide={() => setShowCompare(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Buy Insurance from {selectedPolicy}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You're being redirected to {selectedPolicy}'s secure portal to
            complete your purchase.
          </p>
          <Button variant="success" onClick={() => setShowCompare(false)}>
            Continue to Insurer
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showHelpBot} onHide={() => setShowHelpBot(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Insurance Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Q:</strong> Why do I need IPD insurance if I have a Care
            Pass?
          </p>
          <p>
            <strong>A:</strong> Care Pass only covers outpatient visits. For
            hospitalizations, ICU, or surgeries, you need extra protection
            through insurance.
          </p>
          <p>
            <strong>Q:</strong> What if my claim is rejected?
          </p>
          <p>
            <strong>A:</strong> The insurer handles claims directly, but we
            provide support and escalation if required.
          </p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default InsuranceIntegration;
