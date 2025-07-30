import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Table,
  Form,
  Alert,
  Badge,
} from "react-bootstrap";
import {
  ShieldLock,
  Globe,
  PersonCheck,
  Translate,
  Map,
  WifiOff,
  ExclamationTriangle,
  FileEarmarkSpreadsheet,
  Robot,
} from "react-bootstrap-icons";

const InteropGovHealthSystem = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showPlanStack, setShowPlanStack] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [language, setLanguage] = useState("en");
  const [disasterZone, setDisasterZone] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [syncHistory, setSyncHistory] = useState([]);

  // Load sync history on page load
useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URI}/interop-gov`) // ✅ This is what works in Postman
    .then((res) => {
      console.log("✅ Fetched sync history:", res.data);
      const messages = res.data.data.map(
        (entry) =>
          `${entry.message} at ${new Date(entry.timestamp).toLocaleString()}`
      );
      setSyncHistory(messages);
    })
    .catch((err) => {
      console.error("❌ Error loading sync history", err);
    });
}, []);


  // Generic log sync action
const logSync = async (type, message) => {
  const payload = {
    actionType: type,
    message,
    country: "India", // ✅ dummy or actual value
    complianceLevel: "Full", // ✅ dummy or actual value
  };

  console.log("📤 Sending log sync: ", payload);

  try {
    await axios.post(`${import.meta.env.VITE_API_URI}/interop-gov`, payload);
    setSyncHistory((prev) => [
      `${message} at ${new Date().toLocaleString()}`,
      ...prev,
    ]);
  } catch (error) {
    console.error("❌ Failed to log sync action", error);
  }
};

  const checkEligibility = async () => {
    const result = {
      eligibleFor: "ESI + Ayushman Bharat",
      suggestions: ["Link ABHA ID", "Enable DigiLocker Sync"],
    };
    setEligibilityResult(result);
    setAiSuggestion("Your ESI does not cover OPD. Consider BBSCART Premium+.");
    await logSync("eligibility", "Eligibility checked");
  };

  const handleConsentToggle = async () => {
    const action = !consentGiven ? "Granted" : "Revoked";
    setConsentGiven(!consentGiven);
    await logSync("consent", `${action} consent`);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
    await logSync("upload", `Uploaded NGO CSV file: ${file.name}`);
  };

  const simulateDisasterZone = async () => {
    setDisasterZone(true);
    await logSync("disaster", "Disaster alert simulated");
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col>
          <h3>
            <Globe className="me-2" />
            Government Health Interoperability
          </h3>
          <p className="text-muted">
            Securely link BBSCART with public schemes like PM-JAY, ESI, DHA, and
            more.
          </p>
        </Col>
        <Col className="text-end">
          <Button
            variant={isOffline ? "danger" : "outline-secondary"}
            onClick={() => setIsOffline(!isOffline)}
          >
            <WifiOff className="me-2" />
            {isOffline ? "Offline Mode ON" : "Go Offline"}
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          {/* Eligibility Checker */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <PersonCheck className="me-2" />
                Smart Eligibility Checker
              </Card.Title>
              <Button variant="primary" onClick={checkEligibility}>
                Check My Eligibility
              </Button>
              {eligibilityResult && (
                <Alert variant="success" className="mt-3">
                  <strong>Eligible For:</strong> {eligibilityResult.eligibleFor}
                  <ul className="mb-0">
                    {eligibilityResult.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              {aiSuggestion && (
                <Alert variant="info" className="mt-2">
                  <Robot className="me-2" />
                  AI Suggestion: {aiSuggestion}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Consent Manager */}
          <Card>
            <Card.Body>
              <Card.Title>
                <ShieldLock className="me-2" />
                Consent Manager
              </Card.Title>
              <Button
                variant={consentGiven ? "danger" : "success"}
                onClick={handleConsentToggle}
              >
                {consentGiven ? "Revoke Consent" : "Grant Consent"}
              </Button>
              <p className="mt-2 text-muted">
                You control what’s shared with ABHA, PM-JAY, DigiLocker, etc.
              </p>
              <Button variant="link" onClick={() => setShowConsentModal(true)}>
                View Sync History
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          {/* Scheme Bridge View */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <Map className="me-2" />
                Government Scheme Linking
              </Card.Title>
              <Table size="sm" bordered>
                <thead>
                  <tr>
                    <th>Scheme</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ayushman Bharat</td>
                    <td>
                      <Badge bg="success">Linked</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>ESI</td>
                    <td>
                      <Badge bg="warning">Suggest Enrollment</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>DHA (Dubai)</td>
                    <td>
                      <Badge bg="secondary">Pending</Badge>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="info" onClick={() => setShowPlanStack(true)}>
                View My Linked Plans
              </Button>
            </Card.Body>
          </Card>

          {/* Language Selector */}
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <Translate className="me-2" />
                Language Preference
              </Card.Title>
              <Form.Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
                <option value="ar">العربية</option>
              </Form.Select>
              <Form.Text className="text-muted">
                All synced forms (ABHA/PMJAY) will appear in selected language.
              </Form.Text>
            </Card.Body>
          </Card>

          {/* NGO Bulk Upload */}
          <Card>
            <Card.Body>
              <Card.Title>
                <FileEarmarkSpreadsheet className="me-2" />
                NGO Bulk Patient Upload
              </Card.Title>
              <Form.Group controlId="csvUpload">
                <Form.Label>Upload CSV File</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
                {csvFile && (
                  <Alert variant="success" className="mt-2">
                    Uploaded: {csvFile.name}
                  </Alert>
                )}
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Disaster Sync */}
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>
                <ExclamationTriangle className="me-2 text-danger" />
                Emergency/Disaster Zone
              </Card.Title>
              <Button variant="danger" onClick={simulateDisasterZone}>
                Simulate Disaster Alert
              </Button>
              {disasterZone && (
                <Alert variant="danger" className="mt-2">
                  🚨 User in disaster-affected zone. Alert sent to BBSCART &
                  Authorities.
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sync History Modal */}
      <Modal show={showConsentModal} onHide={() => setShowConsentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>My Sync History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {syncHistory.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>

      {/* Linked Plans Modal */}
      <Modal show={showPlanStack} onHide={() => setShowPlanStack(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Linked Plan Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>🟢 Government Plan:</strong> Ayushman Bharat
          </p>
          <p>
            <strong>🟡 BBSCART Plan:</strong> Basic Plan (OPD + Diagnostics)
          </p>
          <p>
            <strong>🔁 Suggestion:</strong> Upgrade to Premium+ to cover
            surgeries & emergencies
          </p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default InteropGovHealthSystem;
