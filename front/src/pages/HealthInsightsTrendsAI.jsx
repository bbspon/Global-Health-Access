import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Mic, Camera, Calendar2Check, Download } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import axios from "axios";

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

const HealthInsightsTrendsAI = () => {
  const [trends, setTrends] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [mealImage, setMealImage] = useState(null);
  const [voiceInput, setVoiceInput] = useState("");
  const [showBooking, setShowBooking] = useState(false);

  // 🔁 Fetch Trends from API
  const fetchTrends = async () => {
    try {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;
      const res = await axios.get(
        "http://localhost:5000/api/health-insights-trends/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Trends fetched:", res.data);

      setTrends(res.data?.data || []);
    } catch (err) {
      console.error("Error loading trends", err);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("BBSCART Health Summary", 10, 10);
    doc.text("Name: Aarav Sharma", 10, 20);
    doc.text("Trend Sample: ", 10, 30);
    trends.slice(0, 5).forEach((t, i) => {
      doc.text(`${t.month} - ${t.trendType}: ${t.value}`, 10, 40 + i * 10);
    });
    doc.save("health_summary.pdf");
  };

  const exportCSV = () => {
    const headers = ["Month", "Trend Type", "Value"];
    const rows = trends.map((t) => [t.month, t.trendType, t.value]);

    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "health_trends.csv";
    link.click();
  };

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

  // 🔁 Build graph datasets from trends
  const labels = [...new Set(trends.map((t) => t.month))];
  const trendTypes = [...new Set(trends.map((t) => t.trendType))];

  const trendGraphData = {
    labels,
    datasets: trendTypes.map((type, idx) => ({
      label: type,
      data: labels.map(
        (month) =>
          trends.find((t) => t.month === month && t.trendType === type)
            ?.value || 0
      ),
      borderColor: ["#dc3545", "#0d6efd", "#198754", "#ffc107", "#6f42c1"][idx],
      tension: 0.4,
    })),
  };

  return (
    <Container className="p-4 mt-5">
      <h3 className="mb-3 fw-bold">
        🌠 Health Insights Trends (Live from AI Engine)
      </h3>

      {/* Graph */}
      <Card className="mb-4">
        <Card.Header>📊 Monthly Health Trends</Card.Header>
        <Card.Body>
          <Line data={trendGraphData} />
          <Button
            variant="outline-success"
            className="mt-3"
            onClick={exportCSV}
          >
            <Download /> Export CSV
          </Button>
        </Card.Body>
      </Card>

      {/* AI Coach */}
      <Card className="mb-4">
        <Card.Header>🧠 AI Lifestyle Coach</Card.Header>
        <Card.Body>
          <Form.Control
            placeholder="Ask something..."
            className="mt-2"
            value={voiceInput}
            readOnly
          />
          <div className="mt-2 d-flex gap-2">
            <Button variant="info" onClick={handleVoiceInput}>
              <Mic /> Voice
            </Button>
            <Button
              variant="secondary"
              onClick={() => document.getElementById("mealUpload").click()}
            >
              <Camera /> Upload Meal
            </Button>
            <input
              type="file"
              id="mealUpload"
              accept="image/*"
              onChange={handleMealImage}
              style={{ display: "none" }}
            />
            {mealImage && <img src={mealImage} alt="meal" width="80" />}
          </div>
        </Card.Body>
      </Card>

      {/* Booking Modal */}
      {showBooking && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "#00000088" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Book Appointment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBooking(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Booking at ABC Hospital</p>
                <Form.Group>
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Button
                  variant="success"
                  className="mt-2"
                  onClick={() => {
                    alert("Booked ✅");
                    setShowBooking(false);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Summary */}
      <Row>
        <Col>
          <Button
            variant="outline-dark"
            className="mt-4"
            onClick={handleDownloadPDF}
          >
            Download Health Summary PDF
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HealthInsightsTrendsAI;
