// HealthIntelligenceDashboard.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Alert
} from "react-bootstrap";
import { Line, Bar, Radar } from "react-chartjs-2";
import {
  Cpu,
  Bell,
  Globe,
  ShieldLock,
  Download
} from "react-bootstrap-icons";
import jsPDF from "jspdf";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  BarController,
  RadarController,
  Tooltip,
  Legend
} from "chart.js";
import { MapContainer, TileLayer, Circle, Tooltip as LeafletTooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LineController,
  BarController,
  RadarController,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const HealthIntelligenceDashboard = () => {
  const [role, setRole] = useState("admin");

  const mockAlerts = [
    { message: "Spike in pediatric OPD in Zone 3 — alert hospital admin.", type: "hospital" },
    { message: "Your sugar trend is rising — book a diabetic consult?", type: "user" },
    { message: "Fever cases rising near Hospital A — possible outbreak zone.", type: "govt" }
  ];

  const mockDistrictIndex = [
    { district: "Delhi Central", index: 73 },
    { district: "Bengaluru North", index: 81 },
    { district: "Hyderabad South", index: 67 }
  ];

  const mockNationalTrends = [
    { label: "Jan", value: 71 },
    { label: "Feb", value: 74 },
    { label: "Mar", value: 78 },
    { label: "Apr", value: 82 },
    { label: "May", value: 77 },
    { label: "Jun", value: 85 }
  ];

  const getFilteredAlerts = () => {
    if (role === "admin") return mockAlerts;
    if (role === "hospital") return mockAlerts.filter(a => a.type === "hospital");
    if (role === "govt") return mockAlerts.filter(a => a.type === "govt");
    return [];
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("BBSCART Health Intelligence Report", 10, 15);
    doc.setFontSize(10);
    doc.text(`Role: ${role}`, 10, 25);
    doc.text("Alerts:", 10, 35);
    getFilteredAlerts().forEach((a, i) => {
      doc.text(`- ${a.message}`, 12, 45 + i * 10);
    });
    doc.save("Health_Intelligence_Report.pdf");
  };

  return (
    <div className="m-4 border p-4 bg-body rounded-3">
      <Container fluid className="p-3">
        <Row className="mb-3">
          <Col><h4><Cpu /> Health Intelligence Dashboard</h4></Col>
          <Col className="text-end">
            <Dropdown>
              <Dropdown.Toggle size="sm" variant="outline-secondary">
                Role: {role}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setRole("admin")}>Admin</Dropdown.Item>
                <Dropdown.Item onClick={() => setRole("hospital")}>Hospital</Dropdown.Item>
                <Dropdown.Item onClick={() => setRole("govt")}>Govt</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {/* Alerts Section */}
        <Row>
          <Col md={4}>
            <Card className="mb-3 h-100">
              <Card.Header><Bell /> Smart Alerts</Card.Header>
              <Card.Body>
                {getFilteredAlerts().length > 0 ? (
                  getFilteredAlerts().map((a, idx) => (
                    <Alert key={idx} variant="warning">{a.message}</Alert>
                  ))
                ) : (
                  <Alert variant="light">No alerts for selected role.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* National Trends */}
          <Col md={4}>
            <Card className="mb-3 h-100">
              <Card.Header><Globe /> National Trends</Card.Header>
              <Card.Body>
                {(role === "admin" || role === "govt") ? (
                  <Line
                    data={{
                      labels: mockNationalTrends.map(t => t.label),
                      datasets: [{
                        label: "National Risk Score",
                        data: mockNationalTrends.map(t => t.value),
                        fill: true,
                        backgroundColor: "rgba(0, 123, 255, 0.1)",
                        borderColor: "#007bff",
                        tension: 0.3
                      }]
                    }}
                  />
                ) : (
                  <Alert variant="secondary">Restricted to government view.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* District Index */}
          <Col md={4}>
            <Card className="mb-3 h-100">
              <Card.Header><ShieldLock /> District Health Index</Card.Header>
              <Card.Body>
                {(role !== "user") ? (
                  <Bar
                    data={{
                      labels: mockDistrictIndex.map(d => d.district),
                      datasets: [{
                        label: "Health Index",
                        data: mockDistrictIndex.map(d => d.index),
                        backgroundColor: "#28a745"
                      }]
                    }}
                  />
                ) : (
                  <Alert variant="secondary">Not available for user role.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

     <Col md={12} className="mt-5">
        {/* Heatmap & Sentiment Section */}
        <Row className="mt-5">
          <Col md={6}>
            <Card className="mb-3 h-100">
              <Card.Header><Globe /> Outbreak Heatmap</Card.Header>
              <Card.Body style={{ height: '400px' }}>
                {(role === "admin" || role === "govt") ? (
                  <MapContainer center={[28.6139, 77.2090]} zoom={5} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      attribution='&copy; OpenStreetMap'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle center={[28.6139, 77.2090]} radius={30000} color="red" fillOpacity={0.5}>
                      <LeafletTooltip>Delhi: Fever Spike</LeafletTooltip>
                    </Circle>
                    <Circle center={[17.3850, 78.4867]} radius={20000} color="orange" fillOpacity={0.4}>
                      <LeafletTooltip>Hyderabad: BP Surge</LeafletTooltip>
                    </Circle>
                    <Circle center={[12.9716, 77.5946]} radius={25000} color="green" fillOpacity={0.4}>
                      <LeafletTooltip>Bangalore: Normal</LeafletTooltip>
                    </Circle>
                  </MapContainer>
                ) : (
                  <Alert variant="light">Heatmap restricted to Admin or Govt role.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-3 h-100" >
              <Card.Header><Cpu /> AI Sentiment Radar</Card.Header>
              <Card.Body>
                {(role !== "user") ? (
                  <Radar
                    data={{
                      labels: ["Wait Time", "Doctor Review", "Facility", "Staff", "Digital App"],
                      datasets: [{
                        label: "Sentiment Score",
                        data: [60, 80, 70, 75, 65],
                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                        borderColor: "#007bff"
                      }]
                    }}
                    options={{
                      scales: {
                        r: {
                          suggestedMin: 0,
                          suggestedMax: 100,
                          ticks: { stepSize: 20 }
                        }
                      }
                    }}
                  />
                ) : (
                  <Alert variant="light">Sentiment chart not available for user role.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Export */}
        <Row className="mt-5">
          <Col>
            <Button variant="outline-primary" onClick={generatePDF}>
              <Download className="me-2" />
              Download PDF Report
            </Button>
          </Col>
        </Row>
     </Col>
      </Container>
    </div>
  );
};

export default HealthIntelligenceDashboard;
