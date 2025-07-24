import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Badge,
  Modal,
  Nav,
  Tab,
  Alert,
  Spinner,
} from 'react-bootstrap';
import {
  Gear,
  FileEarmarkCode,
  Terminal,
  CloudUpload,
  ShieldLock,
  Cpu,
  Upload,
} from 'react-bootstrap-icons';

const HealthAccessAPIEcosystem = () => {
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [apiKey, setApiKey] = useState("**************");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const apiCategories = [
    { name: 'Hospital Access API', desc: 'Verify plans, sync visits, admissions' },
    { name: 'Plan Management API', desc: 'Retrieve tiers, simulate upgrades' },
    { name: 'AI Assistant API', desc: 'Plan advisor, interpreter, multilingual' },
    { name: 'Payment API', desc: 'Wallet, co-pay, refund logic' },
    { name: 'Records API (FHIR)', desc: 'Push/pull secure records' },
    { name: 'Eligibility API', desc: 'Live coverage checks for any patient' },
    { name: 'Add-on API', desc: 'Mental/dental bundles for plans' },
    { name: 'Risk Engine API', desc: 'Get diabetes/cardiac risk score' },
    { name: 'Consent API', desc: 'Manage digital consent lifecycle' },
    { name: 'NGO Onboarding API', desc: 'Bulk upload CSV for mass plan distribution' },
  ];

const handleSendRequest = async () => {
  setLoading(true);
  try {
    const res = await fetch(
      "http://localhost:5000/api/health-access/check-eligibility",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "123", hospitalId: "ABC" }),
      }
    );
    const data = await res.json();
    setApiResponse(data);
  } catch (err) {
    console.error("Eligibility API Error", err);
  }
  setLoading(false);
};

  const handleWhiteLabelGenerate = () => {
    alert("✅ Branded app successfully generated and deployed!");
  };

  const handleUploadCSV = () => {
    setUploadStatus("Processing...");
    setTimeout(() => {
      setUploadStatus("✅ Upload successful. 52 beneficiaries issued plans.");
    }, 1200);
  };

  const handleAskAI = () => {
    setAiResponse("🤖 BBSCART AI: To connect FHIR, use `/records/pushFHIR` with proper patient auth token and metadata.");
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-3">🌍 Health Access API Ecosystem – Developer & Partner Dashboard</h2>

      <Alert variant="info">
        <strong>Welcome!</strong> Use this dashboard to test APIs, deploy white-label solutions, manage usage, and access developer resources.
      </Alert>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header><Gear className="me-2" />API Dashboard</Card.Header>
            <Card.Body>
              <p><strong>API Key:</strong> <Badge bg="secondary">{apiKey}</Badge></p>
              <Button variant="outline-primary" onClick={() => setShowAPIKeyModal(true)}>Regenerate Key</Button>
              <hr />
              <p><strong>Usage:</strong> 33,500 calls/month</p>
              <p><strong>Latency:</strong> Avg. 88ms</p>
              <p><strong>Geo:</strong> India, UAE, Kenya</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header><FileEarmarkCode className="me-2" />Available APIs</Card.Header>
            <Card.Body>
              <ul>
                {apiCategories.map((api, idx) => (
                  <li key={idx}><strong>{api.name}:</strong> {api.desc}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tab.Container defaultActiveKey="sandbox">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item><Nav.Link eventKey="sandbox">🚀 API Explorer</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="docs">📚 Docs & SDKs</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="whitelabel">🏷️ White-Label Setup</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="logs">📊 Logs & Health</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="bulk">📥 NGO CSV Upload</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="admin">🔐 Admin Access</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="ai">🤖 Ask BBSCART AI</Nav.Link></Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {/* Live Sandbox */}
              <Tab.Pane eventKey="sandbox">
                <Card><Card.Body>
                  <h5>Live API Sandbox</h5>
                  <Form>
                    <Form.Group>
                      <Form.Label>Endpoint</Form.Label>
                      <Form.Control defaultValue="/checkEligibility" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Payload</Form.Label>
                      <Form.Control as="textarea" rows={3} defaultValue={`{ "userId": "123", "hospitalId": "ABC" }`} />
                    </Form.Group>
                    <Button onClick={handleSendRequest} className="mt-2" variant="success">Send Request</Button>
                  </Form>
                  {loading && <Spinner animation="border" className="mt-2" />}
                  {apiResponse && (
                    <Alert variant="success" className="mt-3">
                      <strong>Status:</strong> {apiResponse.status}<br />
                      <strong>Message:</strong> {apiResponse.message}<br />
                      <strong>Plan:</strong> {apiResponse.plan}<br />
                      <strong>Valid Till:</strong> {apiResponse.validTill}
                    </Alert>
                  )}
                </Card.Body></Card>
              </Tab.Pane>

              {/* Docs */}
              <Tab.Pane eventKey="docs">
                <Card><Card.Body>
                  <h5>SDKs & Developer Resources</h5>
                  <ul>
                    <li><a href="#">📘 Node.js SDK</a></li>
                    <li><a href="#">📘 Python SDK</a></li>
                    <li><a href="#">📘 Flutter SDK</a></li>
                    <li><a href="#">📘 PHP SDK</a></li>
                    <li><a href="#">🧪 Postman Collection</a></li>
                    <li>🧠 AI API Examples + Curl Scripts</li>
                  </ul>
                </Card.Body></Card>
              </Tab.Pane>

              {/* White-Label */}
              <Tab.Pane eventKey="whitelabel">
                <Card><Card.Body>
                  <h5>White-Label App Setup</h5>
                  <Form>
                    <Form.Group>
                      <Form.Label>Brand Name</Form.Label>
                      <Form.Control placeholder="e.g., LifeCare+" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Logo</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Primary Theme Color</Form.Label>
                      <Form.Control type="color" />
                    </Form.Group>
                    <Button onClick={handleWhiteLabelGenerate} className="mt-3">Generate Branded App</Button>
                  </Form>
                </Card.Body></Card>
              </Tab.Pane>

              {/* Logs */}
              <Tab.Pane eventKey="logs">
                <Card><Card.Body>
                  <h5>API Logs</h5>
                  <Table striped>
                    <thead><tr><th>API</th><th>Status</th><th>Time</th><th>Latency</th></tr></thead>
                    <tbody>
                      <tr><td>/riskScore</td><td><Badge bg="success">200 OK</Badge></td><td>2025-07-10</td><td>90ms</td></tr>
                      <tr><td>/pushRecord</td><td><Badge bg="danger">401</Badge></td><td>2025-07-10</td><td>120ms</td></tr>
                    </tbody>
                  </Table>
                </Card.Body></Card>
              </Tab.Pane>

              {/* CSV Upload */}
              <Tab.Pane eventKey="bulk">
                <Card><Card.Body>
                  <h5>Bulk Beneficiary Upload (NGO/HR)</h5>
                  <Form.Group>
                    <Form.Label>Upload CSV File</Form.Label>
                    <Form.Control type="file" />
                    <Form.Text>Format: Name, ID, Age, PlanCode</Form.Text>
                  </Form.Group>
                  <Button className="mt-2" onClick={handleUploadCSV}><Upload className="me-2" />Upload & Issue</Button>
                  {uploadStatus && <Alert variant="success" className="mt-2">{uploadStatus}</Alert>}
                </Card.Body></Card>
              </Tab.Pane>

              {/* Admin Panel */}
              <Tab.Pane eventKey="admin">
                <Card><Card.Body>
                  <h5>Admin Controls</h5>
                  <Button onClick={() => setShowAdminPanel(true)} variant="dark">Open Admin Panel</Button>
                </Card.Body></Card>
              </Tab.Pane>

              {/* AI Assistant */}
              <Tab.Pane eventKey="ai">
                <Card><Card.Body>
                  <h5>Ask BBSCART AI Assistant</h5>
                  <Form>
                    <Form.Control as="textarea" rows={2} placeholder="Ask about APIs..." value={aiInput} onChange={e => setAiInput(e.target.value)} />
                    <Button className="mt-2" variant="info" onClick={handleAskAI}><Cpu className="me-2" />Ask AI</Button>
                  </Form>
                  {aiResponse && <Alert variant="primary" className="mt-3">{aiResponse}</Alert>}
                </Card.Body></Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* API Key Modal */}
      <Modal show={showAPIKeyModal} onHide={() => setShowAPIKeyModal(false)}>
        <Modal.Header closeButton><Modal.Title>Regenerate API Key</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure? This will disable the current key immediately.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAPIKeyModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => { setApiKey('NEW-KEY-998877'); setShowAPIKeyModal(false); }}>Regenerate</Button>
        </Modal.Footer>
      </Modal>

      {/* Admin Modal */}
      <Modal show={showAdminPanel} onHide={() => setShowAdminPanel(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>Admin Panel</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>🛡️ Configure rate limits, view consent logs, and audit partner behavior here.</p>
          <ul>
            <li>🔒 Consent Ledger Viewer</li>
            <li>📊 Usage Audit Trail</li>
            <li>⚙️ Partner Throttle Controls</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdminPanel(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HealthAccessAPIEcosystem;
