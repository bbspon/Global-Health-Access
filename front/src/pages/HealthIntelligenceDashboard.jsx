import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Alert,
} from "react-bootstrap";
import { Line, Bar, Radar } from "react-chartjs-2";
import { Cpu, Bell, Globe, ShieldLock, Download } from "react-bootstrap-icons";
import jsPDF from "jspdf";
import axios from "axios";
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
  Legend,
} from "chart.js";
import {
  MapContainer,
  TileLayer,
  Circle,
  Tooltip as LeafletTooltip,
} from "react-leaflet";
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
  const [intelligenceData, setIntelligenceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
        const token = bbsUserData?.token;

        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/health/intelligence/${role}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIntelligenceData(res.data.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchData();
  }, [role]);

  const getFilteredAlerts = () => {
    return intelligenceData?.alertMessages || [];
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("BBSCART Health Intelligence Report", 10, 15);
    doc.setFontSize(10);
    doc.text(`Role: ${role}`, 10, 25);

    doc.text("Alerts:", 10, 35);
    getFilteredAlerts().forEach((a, i) => {
      doc.text(`- ${a}`, 12, 45 + i * 10);
    });

    doc.autoTable({
      head: [["District", "Index"]],
      body: (intelligenceData?.districtIndex || []).map((d) => [
        d.district,
        d.index,
      ]),
      startY: 65,
    });

    doc.save("Health_Intelligence_Report.pdf");
  };

  return (
    <div className="m-4 border p-4 bg-body rounded-3">
      <Container fluid className="p-3">
        <Row className="mb-3">
          <Col>
            <h4>
              <Cpu /> Health Intelligence Dashboard
            </h4>
          </Col>
          <Col className="text-end">
            <Dropdown>
              <Dropdown.Toggle size="sm" variant="outline-secondary">
                Role: {role}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setRole("admin")}>
                  Admin
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRole("hospital")}>
                  Hospital
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRole("govt")}>
                  Govt
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card className="mb-3 h-100">
              <Card.Header>
                <Bell /> Smart Alerts
              </Card.Header>
              <Card.Body>
                {getFilteredAlerts().length > 0 ? (
                  getFilteredAlerts().map((msg, idx) => (
                    <Alert key={idx} variant="warning">
                      {msg}
                    </Alert>
                  ))
                ) : (
                  <Alert variant="light">No alerts for selected role.</Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-3 h-100">
              <Card.Header>
                <Globe /> National Trends
              </Card.Header>
              <Card.Body>
                {(role === "admin" || role === "govt") &&
                intelligenceData?.nationalTrends ? (
                  <Line
                    data={{
                      labels: intelligenceData.nationalTrends.map(
                        (t) => t.label
                      ),
                      datasets: [
                        {
                          label: "National Risk Score",
                          data: intelligenceData.nationalTrends.map(
                            (t) => t.value
                          ),
                          fill: true,
                          backgroundColor: "rgba(0, 123, 255, 0.1)",
                          borderColor: "#007bff",
                          tension: 0.3,
                        },
                      ],
                    }}
                  />
                ) : (
                  <Alert variant="secondary">
                    Restricted to government view.
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="mb-3 h-100">
              <Card.Header>
                <ShieldLock /> District Health Index
              </Card.Header>
              <Card.Body>
                {role !== "user" && intelligenceData?.districtIndex ? (
                  <Bar
                    data={{
                      labels: intelligenceData.districtIndex.map(
                        (d) => d.district
                      ),
                      datasets: [
                        {
                          label: "Health Index",
                          data: intelligenceData.districtIndex.map(
                            (d) => d.index
                          ),
                          backgroundColor: "#28a745",
                        },
                      ],
                    }}
                  />
                ) : (
                  <Alert variant="secondary">
                    Not available for user role.
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6}>
            <Card className="mb-3 h-100">
              <Card.Header>
                <Globe /> Outbreak Heatmap
              </Card.Header>
              <Card.Body style={{ height: "400px" }}>
                {role === "admin" || role === "govt" ? (
                  <MapContainer
                    center={[28.6139, 77.209]}
                    zoom={5}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution="&copy; OpenStreetMap"
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle
                      center={[28.6139, 77.209]}
                      radius={30000}
                      color="red"
                      fillOpacity={0.5}
                    >
                      <LeafletTooltip>Delhi: Fever Spike</LeafletTooltip>
                    </Circle>
                    <Circle
                      center={[17.385, 78.4867]}
                      radius={20000}
                      color="orange"
                      fillOpacity={0.4}
                    >
                      <LeafletTooltip>Hyderabad: BP Surge</LeafletTooltip>
                    </Circle>
                    <Circle
                      center={[12.9716, 77.5946]}
                      radius={25000}
                      color="green"
                      fillOpacity={0.4}
                    >
                      <LeafletTooltip>Bangalore: Normal</LeafletTooltip>
                    </Circle>
                  </MapContainer>
                ) : (
                  <Alert variant="light">
                    Heatmap restricted to Admin or Govt role.
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-3 h-100">
              <Card.Header>
                <Cpu /> AI Sentiment Radar
              </Card.Header>
              <Card.Body>
                {role !== "user" ? (
                  <Radar
                    data={{
                      labels: [
                        "Wait Time",
                        "Doctor Review",
                        "Facility",
                        "Staff",
                        "Digital App",
                      ],
                      datasets: [
                        {
                          label: "Sentiment Score",
                          data: [60, 80, 70, 75, 65],
                          backgroundColor: "rgba(0, 123, 255, 0.2)",
                          borderColor: "#007bff",
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        r: {
                          suggestedMin: 0,
                          suggestedMax: 100,
                          ticks: { stepSize: 20 },
                        },
                      },
                    }}
                  />
                ) : (
                  <Alert variant="light">
                    Sentiment chart not available for user role.
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Button variant="outline-primary" onClick={generatePDF}>
              <Download className="me-2" />
              Download PDF Report
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HealthIntelligenceDashboard;
