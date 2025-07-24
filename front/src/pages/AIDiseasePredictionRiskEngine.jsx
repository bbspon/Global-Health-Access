import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  ProgressBar,
  Modal,
  Table,
  Badge,
  Form,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Download,
  Mic,
  InfoCircle,
  Calendar2Check,
  Smartwatch,
  People,
} from "react-bootstrap-icons";
import jsPDF from "jspdf";
import axios from "axios";

const AIDiseasePredictionRiskEngine = () => {
  const [showExplain, setShowExplain] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [showSync, setShowSync] = useState(false);
  const [showAskAI, setShowAskAI] = useState(false);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    smoking: false,
    alcohol: false,
    activityLevel: "",
    symptoms: "",
    existingConditions: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
      const res = await axios.post(
        "http://localhost:5000/api/ai-risk/predict",
        {
          ...form,
          symptoms: form.symptoms.split(",").map((s) => s.trim()),
          existingConditions: form.existingConditions
            .split(",")
            .map((c) => c.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResult(res.data.data);
    } catch (err) {
      alert("Error: " + (err?.response?.data?.message || err.message));
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("AI Risk Prediction Report", 10, 10);
    if (result) {
      doc.text(`Risk Score: ${result.riskScore}`, 10, 20);
      doc.text(`Risk Level: ${result.riskLevel}`, 10, 30);
      doc.text(
        `Predicted Diseases: ${result.predictedDiseases.join(", ")}`,
        10,
        40
      );
    }
    doc.save("BBSCART_AIRiskReport.pdf");
  };

  const handleBookNow = () => {
    window.open("/hospital-booking", "_blank");
  };

  const riskChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Diabetes Risk %",
        data: [55, 58, 61, 65, 68],
        fill: false,
        borderColor: "#e74c3c",
        tension: 0.3,
      },
    ],
  };

  const mockRiskData = {
    diabetes: 68,
    cardiac: 44,
    mental: 22,
    ortho: 15,
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f9fbfd" }}>
      <h3 className="mb-4 fw-bold text-primary">
        🧠 AI Disease Risk & Early Warning
      </h3>

      {/* Form to predict */}
      <Form
        onSubmit={handleSubmit}
        className="mb-4 bg-light p-4 rounded shadow-sm"
      >
        <Row>
          <Col md={3}>
            <Form.Control
              placeholder="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              name="gender"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option>male</option>
              <option>female</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Height (cm)"
              name="height"
              value={form.height}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Weight (kg)"
              name="weight"
              value={form.weight}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={3}>
            <Form.Check
              label="Smoking?"
              name="smoking"
              checked={form.smoking}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Check
              label="Alcohol?"
              name="alcohol"
              checked={form.alcohol}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="Activity Level"
              name="activityLevel"
              value={form.activityLevel}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6}>
            <Form.Control
              placeholder="Symptoms (comma separated)"
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="Existing Conditions"
              name="existingConditions"
              value={form.existingConditions}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Button type="submit" variant="primary" className="mt-3">
          Predict Risk
        </Button>
      </Form>

      {result && (
        <Card className="mb-4 shadow-sm rounded-4 border-0">
          <Card.Body>
            <h5 className="text-success">✅ Prediction Results</h5>
            <p>
              <strong>Risk Score:</strong> {result.riskScore}
            </p>
            <p>
              <strong>Risk Level:</strong> {result.riskLevel}
            </p>
            <p>
              <strong>Predicted Diseases:</strong>{" "}
              {result.predictedDiseases.join(", ")}
            </p>
          </Card.Body>
        </Card>
      )}

      {/* Risk Summary */}
      <Row>
        {Object.entries(mockRiskData).map(([label, percent]) => (
          <Col md={3} key={label}>
            <Card className="mb-4 shadow-sm rounded-4 border-0">
              <Card.Body>
                <h6 className="text-muted text-uppercase">{label}</h6>
                <ProgressBar
                  variant={percent > 60 ? "danger" : "warning"}
                  now={percent}
                  label={`${percent}%`}
                  className="rounded-pill"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* AI Tips */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="text-info fw-bold">
            🧬 Smart AI Suggestions
          </Card.Title>
          <ul>
            <li>🚶 Walk 6,000+ steps/day</li>
            <li>🥣 High-fiber morning meals</li>
            <li>🛌 Sleep 7.5+ hours to reduce cortisol</li>
          </ul>
        </Card.Body>
      </Card>

      <Alert variant="danger" className="rounded-4 shadow-sm">
        ⚠️ You're entering the red zone for Diabetes. Act within 7 days.
      </Alert>

      {/* Plan Suggestion */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="text-primary fw-bold">
            📦 Smart Plan Suggestion
          </Card.Title>
          <p>
            Upgrade to <strong>Metabolic Care Plan</strong> for free tests,
            dietician consults, and more.
          </p>
          <Button variant="outline-primary" onClick={() => setShowPlans(true)}>
            Explore Plan Options
          </Button>
        </Card.Body>
      </Card>

      {/* Risk Chart */}
      <Card className="mb-4 shadow-sm rounded-4 border-0">
        <Card.Body>
          <Card.Title className="text-danger fw-bold">
            📉 Risk Timeline Forecast
          </Card.Title>
          <Line data={riskChartData} />
        </Card.Body>
      </Card>

      {/* Export & Explain */}
      <Row className="mb-5">
        <Col>
          <Button variant="outline-info" onClick={() => setShowExplain(true)}>
            <InfoCircle className="me-2" /> Why This Prediction?
          </Button>{" "}
          <Button variant="danger" onClick={generatePDF}>
            <Download className="me-2" /> Download PDF
          </Button>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={showExplain} onHide={() => setShowExplain(false)}>
        <Modal.Header closeButton>
          <Modal.Title>AI Explanation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Based on recent glucose, activity, and lipid patterns, your diabetes
          risk rose 12%.
        </Modal.Body>
      </Modal>

      <Modal show={showPlans} onHide={() => setShowPlans(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Explore Health Plans</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>
              <strong>Basic Plan:</strong> Annual checkups + doctor calls
            </li>
            <li>
              <strong>Metabolic Care:</strong> Free HbA1c + dietician + wellness
              rewards
            </li>
            <li>
              <strong>Complete Health:</strong> Includes cardiac + liver +
              lifestyle coaching
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AIDiseasePredictionRiskEngine;
