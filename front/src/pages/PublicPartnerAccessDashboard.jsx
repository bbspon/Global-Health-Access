// File: PublicPartnerAccessDashboard.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Tab,
  Table,
  Form,
  Badge,
  Modal,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  Mic,
  Globe,
  People,
  Building,
  ShieldShaded,
} from "react-bootstrap-icons";
import axios from "axios"; // For real API call

const PublicPartnerAccessDashboard = () => {
  const [activeTab, setActiveTab] = useState("govt");
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const aiExamples = {
    govt: "Show OPD spike zones for govt-sponsored plans.",
    corp: "Which teams have rising absenteeism risk?",
    ngo: "Track usage across rural gig workers this month.",
    mass: "What’s the adoption rate in Tier-3 schools?",
  };

  const tabs = [
    { key: "govt", label: "Government Models", icon: <ShieldShaded /> },
    { key: "corp", label: "Corporate HR Flow", icon: <Building /> },
    { key: "ngo", label: "NGO Health Missions", icon: <People /> },
    { key: "mass", label: "Mass Adoption", icon: <Globe /> },
  ];

  const renderTable = (rows) => (
    <Table striped bordered hover responsive size="sm">
      <thead>
        <tr>
          {Object.keys(rows[0]).map((col, idx) => (
            <th key={idx}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {Object.values(row).map((val, j) => (
              <td key={j}>{val}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const handleAskBot = async () => {
    if (!aiPrompt) return;
    setLoading(true);
    setAIResponse("");

    try {
      const res = await axios.post("https://your-backend.com/api/ask-ai", {
        prompt: aiPrompt,
        context: activeTab,
        user: "admin@example.com",
      });

      const result = res.data.response || "✅ AI processed successfully.";
      setAIResponse(result);

      await axios.post("https://your-backend.com/api/log-ai-query", {
        module: "DropBlock031",
        query: aiPrompt,
        response: result,
        tab: activeTab,
        timestamp: new Date().toISOString(),
      });

      updateDashboardFromAI(activeTab, result);
    } catch (error) {
      console.error(error);
      setAIResponse("❌ AI failed to respond. Please try again.");
    }

    setLoading(false);
  };

  const updateDashboardFromAI = (tab, response) => {
    if (tab === "govt" && response.includes("Bhagalpur")) {
      alert("📍 Alert: OPD surge flagged in Bhagalpur – notify Government Panel");
    } else if (tab === "corp" && response.includes("absenteeism")) {
      alert("📈 Corporate dashboard updated with team absenteeism risk.");
    } else if (tab === "ngo" && response.includes("Chhattisgarh")) {
      alert("🧩 NGO dashboard updated for Chhattisgarh outreach.");
    } else if (tab === "mass" && response.includes("Tamil Nadu")) {
      alert("🏫 School engagement in Tamil Nadu marked as high priority.");
    }
  };

  const handleOpenAI = () => {
    setAIPrompt(aiExamples[activeTab]);
    setAIResponse("");
    setShowAI(true);
  };

  return (
    <Container className="my-4">
      <h3>🌐 BBSCART Public + Corporate Partnerships</h3>
      <p>Manage and monitor scale partnerships across Govt, Corporate, NGO & Mass channels.</p>

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs">
          {tabs.map((t) => (
            <Nav.Item key={t.key}>
              <Nav.Link eventKey={t.key}>
                {t.icon} {t.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content className="mt-4">
          <Tab.Pane eventKey="govt">
            <Card>
              <Card.Body>
                <h5>📜 Government Partnership Models</h5>
                {renderTable([
                  {
                    Model: "Sponsored Care Pass",
                    Impact: "Full cost for vulnerable groups",
                    Admin: "Govt",
                  },
                  {
                    Model: "Co-Pay Hybrid",
                    Impact: "User upgrades allowed",
                    Admin: "Govt + Citizen",
                  },
                  {
                    Model: "Smart Infra Plug-in",
                    Impact: "AI tools for govt hospital",
                    Admin: "Govt + BBSCART",
                  },
                ])}
                <Button variant="outline-primary" onClick={handleOpenAI}>
                  Ask Govt AI Bot <Mic className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="corp">
            <Card>
              <Card.Body>
                <h5>🏢 Corporate + HR Plan Flow</h5>
                {renderTable([
                  {
                    Feature: "Bulk Employee Plans",
                    Description: "Tiered plan per staff type",
                  },
                  {
                    Feature: "Family Add-on",
                    Description: "Add spouse/kids to plan",
                  },
                  {
                    Feature: "Wellness Dashboard",
                    Description: "AI insights per department",
                  },
                ])}
                <Button variant="outline-success" onClick={handleOpenAI}>
                  Ask HR Wellness Bot <Mic className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="ngo">
            <Card>
              <Card.Body>
                <h5>🤝 NGO + Community Health Missions</h5>
                {renderTable([
                  {
                    Step: "Sponsor Plans",
                    Flow: "NGO purchases in-app",
                  },
                  {
                    Step: "Field Onboarding",
                    Flow: "QR + ID link with AI assistant",
                  },
                  {
                    Step: "Impact Dashboards",
                    Flow: "Real-time usage & alerts",
                  },
                ])}
                <Button variant="outline-warning" onClick={handleOpenAI}>
                  Ask NGO Impact Bot <Mic className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Tab.Pane>

          <Tab.Pane eventKey="mass">
            <Card>
              <Card.Body>
                <h5>🌍 Mass Adoption Strategy</h5>
                {renderTable([
                  {
                    Segment: "Urban MSMEs",
                    Strategy: "UPI micro-pay + cashback",
                  },
                  {
                    Segment: "Rural India",
                    Strategy: "PHC QR + offline support",
                  },
                  {
                    Segment: "Tier-2 Schools",
                    Strategy: "Family Bundle Plans",
                  },
                ])}
                <Button variant="outline-dark" onClick={handleOpenAI}>
                  Ask Adoption Bot <Mic className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Modal show={showAI} onHide={() => setShowAI(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🧠 AI Assistant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Type your question:</Form.Label>
          <InputGroup>
            <Form.Control
              placeholder="Ask something..."
              value={aiPrompt}
              onChange={(e) => setAIPrompt(e.target.value)}
            />
            <Button variant="primary" onClick={handleAskBot}>
              Ask
            </Button>
          </InputGroup>

          {loading && (
            <div className="mt-3 d-flex align-items-center">
              <Spinner animation="border" size="sm" className="me-2" />
              <span>Analyzing with AI Assistant...</span>
            </div>
          )}

          {aiResponse && (
            <div className="mt-3 alert alert-success">
              <strong>🧠 Response:</strong> {aiResponse}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PublicPartnerAccessDashboard;
