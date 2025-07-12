import React, { useState } from "react";
import {
  Container,
  Nav,
  Tab,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Badge,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  CurrencyDollar,
  GearFill,
  PersonFill,
  Bank,
  GraphUp,
  ShieldLock,
  Robot,
  InfoCircle,
} from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RevenueEngineDashboard = () => {
  const [selectedCity, setSelectedCity] = useState("Chennai");
  const [showAIAdvice, setShowAIAdvice] = useState(false);

  const [region, setRegion] = useState("");
  const [condition, setCondition] = useState("");
  const [cut, setCut] = useState("");

  const [forecastScenario, setForecastScenario] = useState("");

  const handleSaveRule = () => {
    if (!region || !condition || !cut) {
      toast.error("Please fill in all required fields!");
      return;
    }
    toast.success("Commission rule saved successfully!");
    setRegion("");
    setCondition("");
    setCut("");
  };

  const handleGenerateForecast = () => {
    if (!forecastScenario.trim()) {
      toast.error("Please enter a valid forecast scenario.");
      return;
    }

    toast.success("Forecast generated for: " + forecastScenario);
    setForecastScenario("");
  };

  const handleCloseModal = () => {
    setShowAIAdvice(false);
  };

  return (
    <Container fluid className="mt-4">
      <h3 className="my-4 ">
        <CurrencyDollar className="me-2" />
        Revenue Engine & Forecast 
      </h3>

      <Tab.Container defaultActiveKey="admin" >
        <Row className="mx-5" >
          <Col lg={3} md={4} sm={12} className="mb-3 border py-3 text-start " style={{width:'250px',height:'350px'}}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item><Nav.Link eventKey="admin"><GearFill className="me-1" /> Admin Rules</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="agent"><PersonFill className="me-1" /> Agent Commissions</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="hospital"><Bank className="me-1" /> Hospital Earnings</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="forecast"><GraphUp className="me-1" /> Forecasts</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="invoice"><CurrencyDollar className="me-1" /> Invoicing</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="compliance"><ShieldLock className="me-1" /> Compliance</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="ai"><Robot className="me-1" /> AI Revenue Bot</Nav.Link></Nav.Item>
            </Nav>
          </Col>

          <Col lg={9} md={8} sm={12}>
            <Tab.Content>

              {/* Admin */}
              <Tab.Pane eventKey="admin">
                <Card className="shadow-sm ">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <strong>Commission Rule Editor</strong>
                    <OverlayTrigger overlay={<Tooltip>Set region/tier rules</Tooltip>}>
                      <InfoCircle />
                    </OverlayTrigger>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>Region <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="e.g., Dubai"
                              value={region}
                              onChange={(e) => setRegion(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>Condition <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="e.g., Plan = Premium"
                              value={condition}
                              onChange={(e) => setCondition(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group>
                            <Form.Label>BBSCART Cut % <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="e.g., 12"
                              value={cut}
                              onChange={(e) => setCut(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        variant="success"
                        className="mt-3"
                        disabled={!region || !condition || !cut}
                        onClick={handleSaveRule}
                      >
                        Save Rule
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Agent */}
              <Tab.Pane eventKey="agent">
                <Card className="shadow-sm">
                  <Card.Header><strong>Agent Commission Panel</strong></Card.Header>
                  <Card.Body>
                    <Table striped hover responsive>
                      <thead><tr><th>Agent</th><th>Plans</th><th>Commission</th><th>Status</th><th>Region</th></tr></thead>
                      <tbody>
                        <tr><td>A. Mehta</td><td>142</td><td>₹13,400</td><td><Badge bg="success">Paid</Badge></td><td>Chennai</td></tr>
                        <tr><td>S. Khan</td><td>108</td><td>₹10,200</td><td><Badge bg="warning text-dark">Pending</Badge></td><td>Dubai</td></tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Hospital */}
              <Tab.Pane eventKey="hospital">
                <Card className="shadow-sm">
                  <Card.Header><strong>Hospital Earnings</strong></Card.Header>
                  <Card.Body>
                    <Form.Select onChange={(e) => setSelectedCity(e.target.value)} className="mb-3">
                      <option>Chennai</option><option>Dubai</option><option>Delhi</option>
                    </Form.Select>
                    <p><strong>{selectedCity}</strong> Revenue: ₹4.6L | OPD: 74% | Labs: 56% | Dental: <span className="text-danger">12%</span></p>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Forecast */}
              <Tab.Pane eventKey="forecast">
                <Card className="shadow-sm">
                  <Card.Header><strong>Forecast Dashboard</strong></Card.Header>
                  <Card.Body>
                    <p><strong>MRR:</strong> ₹1.42Cr</p>
                    <p><strong>Churn:</strong> 7.8%</p>
                    <Form.Group>
                      <Form.Label>Scenario Builder <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        placeholder="e.g., Add 10K users in Tier-2 cities"
                        value={forecastScenario}
                        onChange={(e) => setForecastScenario(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      className="mt-2"
                      onClick={handleGenerateForecast}
                      disabled={!forecastScenario.trim()}
                    >
                      Generate Forecast
                    </Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Invoicing */}
              <Tab.Pane eventKey="invoice">
                <Card className="shadow-sm">
                  <Card.Header><strong>Invoices & Payouts</strong></Card.Header>
                  <Card.Body>
                    <Table bordered>
                      <thead><tr><th>Partner</th><th>Amount</th><th>Status</th><th>Due</th></tr></thead>
                      <tbody>
                        <tr><td>Apollo Chennai</td><td>₹1,25,000</td><td><Badge bg="danger">Overdue</Badge></td><td>July 5</td></tr>
                        <tr><td>Medeor Dubai</td><td>₹3,60,000</td><td><Badge bg="success">Paid</Badge></td><td>June 30</td></tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Compliance */}
              <Tab.Pane eventKey="compliance">
                <Card className="shadow-sm">
                  <Card.Header><strong>Security & Compliance</strong></Card.Header>
                  <Card.Body>
                    <ul>
                      <li>✅ GDPR / India DPDPA / UAE PDPL Ready</li>
                      <li>🔐 Encrypted Financial Data</li>
                      <li>👨‍⚖️ Role-based Access</li>
                      <li>📜 Auto Audit Logs</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* AI Bot */}
              <Tab.Pane eventKey="ai">
                <Card className="shadow-sm">
                  <Card.Header className="d-flex justify-content-between">
                    <strong>AI Revenue Bot</strong>
                    <Button size="sm" variant="outline-primary" onClick={() => setShowAIAdvice(true)}>Ask Bot</Button>
                  </Card.Header>
                  <Card.Body>
                    <ul>
                      <li>💡 "Raise Premium price in Delhi by ₹50?"</li>
                      <li>⚠️ "Dental not used → 40% downgrade chance"</li>
                      <li>📊 "Top earning hospitals this quarter"</li>
                    </ul>
                  </Card.Body>
                </Card>

                <Modal show={showAIAdvice} onHide={handleCloseModal}>
                  <Modal.Header closeButton><Modal.Title>AI Suggestions</Modal.Title></Modal.Header>
                  <Modal.Body>
                    <p>✅ Try boosting Super Premium in Tier 2 cities</p>
                    <p>⚠️ Alert: Drop in diagnostic usage in Sharjah</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
};

export default RevenueEngineDashboard;
