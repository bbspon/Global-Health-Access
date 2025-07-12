import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  ProgressBar,
  Form,
  Alert
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Mic, Camera, Calendar2Check, Download } from "react-bootstrap-icons";
import jsPDF from "jspdf";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// 🔁 Mock Data
const mockTrends = {
  bp: [120, 125, 130, 140, 145],
  sugar: [92, 96, 102, 109, 122],
  weight: [70, 71, 72, 72, 73],
};

const mockRisks = {
  diabetes: 72,
  cardiac: 56,
  mental: 40,
};

const mockCoachTips = [
  "⚠️ High sodium intake detected. Try fruits or grilled veggies.",
  "😴 You slept 18% less last week. Aim for 10PM bedtime.",
  "💧 Drink 1L more water to reach your hydration goal.",
];

const mockBenchmark = {
  stepsPercentile: 78,
  sugarUser: 122,
  sugarAvg: 94,
};

const mockAlerts = [
  { type: "danger", msg: "Sugar level 122 mg/dL exceeds community average" },
  { type: "warning", msg: "You skipped 3 hydration days this week" },
  { type: "info", msg: "Free heart screening at XYZ hospital this Sunday" },
];

const mockHistory = [
  { date: "2025-06-10", action: "Logged 8 hours sleep" },
  { date: "2025-06-12", action: "Completed lipid profile test" },
  { date: "2025-06-15", action: "Joined mental wellness challenge" },
];

const HealthInsightsTrendsAI = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [voiceInput, setVoiceInput] = useState("");
  const [mealImage, setMealImage] = useState(null);

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      setVoiceInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  const handleMealImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMealImage(URL.createObjectURL(file));
      alert("Meal image uploaded successfully ✅");
    }
  };

  const handleBooking = () => {
    setShowBooking(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("BBSCART Health Summary", 10, 10);
    doc.text("Name: Aarav Sharma", 10, 20);
    doc.text("BP Trend: 120 → 145", 10, 30);
    doc.text("Sugar: 92 → 122 mg/dL", 10, 40);
    doc.text("Weight: 70 → 73 kg", 10, 50);
    doc.text("Risk Level: Diabetes - 72%", 10, 60);
    doc.save("health_summary.pdf");
  };

  const exportCSV = () => {
    const headers = ["Month", "BP", "Sugar", "Weight"];
    const rows = ["Mar", "Apr", "May", "Jun", "Jul"].map((month, i) => [
      month,
      mockTrends.bp[i],
      mockTrends.sugar[i],
      mockTrends.weight[i],
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "health_trends.csv";
    link.click();
  };

  const trendGraphData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "BP (mmHg)",
        data: mockTrends.bp,
        borderColor: "#dc3545",
        tension: 0.4,
      },
      {
        label: "Sugar (mg/dL)",
        data: mockTrends.sugar,
        borderColor: "#0d6efd",
        tension: 0.4,
      },
      {
        label: "Weight (kg)",
        data: mockTrends.weight,
        borderColor: "#198754",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="mt-5">
      <Container className="p-4">
        <Row className="mb-3">
          <Col>
            <h3 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              🌠 Health Insights + Lifestyle Coach + Risk Engine
            </h3>
          </Col>
        </Row>

        {/* Alerts */}
        <Row className="mb-3">
          {mockAlerts.map((alert, idx) => (
            <Col md={4} key={idx}>
              <Alert variant={alert.type}>{alert.msg}</Alert>
            </Col>
          ))}
        </Row>

        {/* Trend Graph */}
        <Row className="mb-4">
          <Col md={8}>
            <Card>
              <Card.Header>📊 Monthly Health Trends</Card.Header>
              <Card.Body>
                <Line data={trendGraphData} />
                <div className="mt-3">
                  <Badge bg="warning">🟡 BP Rising</Badge>{" "}
                  <Badge bg="danger">🔴 Sugar Elevated</Badge>{" "}
                  <Badge bg="info">⚖️ Weight Stable</Badge>
                </div>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="mt-3"
                  onClick={exportCSV}
                >
                  <Download /> Export as CSV
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100"> 
              <Card.Header>🧭 Health Radar</Card.Header>
              <Card.Body>
                <Table borderless size="sm" className="mb-0">
                  <tbody>
                    <tr><td>💓 Heart Health</td><td><Badge bg="success">GOOD</Badge></td></tr>
                    <tr><td>🧠 Mental Wellness</td><td><Badge bg="warning">AVERAGE</Badge></td></tr>
                    <tr><td>🍔 Diet Balance</td><td><Badge bg="danger">POOR</Badge></td></tr>
                    <tr><td>🧬 Genetic Risk</td><td><Badge bg="secondary">NOT FLAGGED</Badge></td></tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* AI Coach */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>🧠 AI Lifestyle Coach</Card.Header>
              <Card.Body>
                <ul>{mockCoachTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
                <Form.Control placeholder="Ask the Coach..." value={voiceInput} readOnly className="mt-3" />
                <div className="mt-2 d-flex gap-2 flex-wrap">
                  <Button variant="info" onClick={handleVoiceInput}><Mic /> Voice</Button>
                  <Button variant="secondary" onClick={() => document.getElementById('mealUpload').click()}><Camera /> Meal Image</Button>
                  <input type="file" id="mealUpload" accept="image/*" onChange={handleMealImage} style={{ display: "none" }} />
                  {mealImage && <img src={mealImage} alt="Meal" width="100" className="mt-2" />}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Risk Engine */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>🚨 Preventive Risk Prediction</Card.Header>
              <Card.Body>
                <Table striped>
                  <thead><tr><th>Risk Type</th><th>Score</th><th>Status</th></tr></thead>
                  <tbody>
                    {Object.entries(mockRisks).map(([type, val]) => (
                      <tr key={type}>
                        <td>{type.toUpperCase()}</td>
                        <td><ProgressBar now={val} label={`${val}%`} /></td>
                        <td>
                          {val >= 70 ? <Badge bg="danger">Critical</Badge> :
                          val >= 50 ? <Badge bg="warning">Moderate</Badge> :
                          <Badge bg="success">Low</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Smart Test & Benchmark */}
        <Row className="mb-4">
          <Col md={6}>
            <Card className="h-100">
              <Card.Header>🧪 Smart Test Suggestion</Card.Header>
              <Card.Body>
                <p>Lipid profile overdue by 14 months</p>
                <Badge bg="success">Covered in your Super Premium Plan</Badge>
                <Button variant="primary" className="mt-2" onClick={handleBooking}>
                  <Calendar2Check /> Book at ABC Hospital
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header>📉 Community Benchmark</Card.Header>
              <Card.Body>
                <p>🏃 You walk more than {mockBenchmark.stepsPercentile}% of users</p>
                <p>Your Sugar: {mockBenchmark.sugarUser} mg/dL</p>
                <p>Average: {mockBenchmark.sugarAvg} mg/dL</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* History Log */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>🧾 Health Action History</Card.Header>
              <Card.Body>
                <ul>{mockHistory.map((entry, i) => (
                  <li key={i}><strong>{entry.date}:</strong> {entry.action}</li>
                ))}</ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Privacy */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>🔐 Data Privacy & Sharing</Card.Header>
              <Card.Body>
                <p>All health data is secure and private unless shared.</p>
                <p>Used for public health insights only in anonymized form.</p>
                <Button variant="outline-dark" onClick={handleDownloadPDF}>
                  Download Health Summary (PDF)
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Booking Modal */}
        {showBooking && (
          <div className="modal show d-block" tabIndex="-1" style={{ background: "#00000088" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Book Appointment</h5>
                  <button type="button" className="btn-close" onClick={() => setShowBooking(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Booking with ABC Hospital on your Care Plan</p>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                  <Button variant="success" onClick={() => { alert("Booked successfully ✅"); setShowBooking(false); }}>
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HealthInsightsTrendsAI;
