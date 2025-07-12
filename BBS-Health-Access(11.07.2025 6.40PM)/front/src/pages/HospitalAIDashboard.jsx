import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import {
  BarChart,
  Gear,
  PersonCheck,
  Globe,
  FileEarmarkArrowDown,
  ShieldLock,
  Robot,
  GraphUp,
  FileEarmarkBarGraph,
  Map,
  Mic,
  CloudLightningRain,
  ExclamationCircle,
  Activity,
  Search,
  ClipboardPlus,
  BoxArrowUpRight,
  Flag,
  CurrencyExchange,
  People,
  Clipboard2Heart,
  ClipboardCheck,
} from "react-bootstrap-icons";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HospitalAIDashboard = () => {
  const [key, setKey] = useState("hospital");

  const PanelCard = ({ title, icon, children }) => (
    <Card className="mb-4 shadow-sm rounded-3">
      <Card.Header className="bg-light fw-bold d-flex align-items-center">
        {icon} <span className="ms-2">{title}</span>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );

  const usageData = {
    labels: ["OPD", "IPD", "Labs", "Dental", "Pharmacy"],
    datasets: [
      {
        label: "Care Pass Usage",
        backgroundColor: "#0d6efd",
        borderColor: "#0d6efd",
        borderWidth: 1,
        data: [340, 123, 285, 78, 190],
      },
    ],
  };

  const doctorPerformance = [
    { name: "Dr. A Sharma", avgTime: "12 min", satisfaction: "92%", followUp: "18%" },
    { name: "Dr. M Singh", avgTime: "15 min", satisfaction: "85%", followUp: "25%" },
    { name: "Dr. R Patel", avgTime: "10 min", satisfaction: "96%", followUp: "10%" },
  ];

  return (
    <Container className="py-4">
      <h2 className="mb-4">🧠 AI Tools & Dashboards</h2>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        {/* HOSPITAL */}
        <Tab eventKey="hospital" title="🏥 Hospital">
          <Row>
            <Col md={6}>
              <PanelCard title="Usage Analytics Bot" icon={<BarChart />}>
                <ul>
                  <li>Track OPD/IPD/Labs/Dental usage in real-time</li>
                  <li>Spike predictions (e.g., flu surges)</li>
                  <li>Trendline charts per department</li>
                </ul>
              </PanelCard>

              <PanelCard title="Pharmacy & Lab Revenue Predictor" icon={<Gear />}>
                <ul>
                  <li>Restocking suggestions via AI</li>
                  <li>Revenue trends by plan tier</li>
                </ul>
              </PanelCard>

              <PanelCard title="Care Pass Usage Analytics" icon={<GraphUp />}>
                <Bar data={usageData} />
              </PanelCard>

              <PanelCard title="Emergency Load Predictor" icon={<CloudLightningRain />}>
                <ul>
                  <li>Predicts patient spikes based on weather, festivals, or outbreaks</li>
                  <li>Triggers alert for staffing adjustments</li>
                </ul>
              </PanelCard>

              <PanelCard title="Queue Optimization Engine" icon={<Activity />}>
                <ul>
                  <li>Predicts wait time by department</li>
                  <li>Auto-adjusts slot allocations</li>
                </ul>
              </PanelCard>

              <PanelCard title="Triage Automation Assistant" icon={<ClipboardPlus />}>
                <ul>
                  <li>AI-assisted patient routing based on symptoms</li>
                  <li>Minimizes incorrect department referrals</li>
                </ul>
              </PanelCard>
            </Col>

            <Col md={6}>
              <PanelCard title="Doctor Performance Insight" icon={<PersonCheck />}>
                <ul>
                  <li>Consultation time, follow-ups, NPS</li>
                  <li>Suggests OPD rebalancing</li>
                </ul>
              </PanelCard>

              <PanelCard title="Inpatient Bed Forecast AI" icon={<Gear />}>
                <ul>
                  <li>Predicts IPD loads by season</li>
                  <li>Surgery forecasting engine</li>
                </ul>
              </PanelCard>

              <PanelCard title="Performance Table" icon={<FileEarmarkBarGraph />}>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Avg Time</th>
                      <th>Satisfaction</th>
                      <th>Follow-Up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorPerformance.map((doc, idx) => (
                      <tr key={idx}>
                        <td>{doc.name}</td>
                        <td>{doc.avgTime}</td>
                        <td><Badge bg="success">{doc.satisfaction}</Badge></td>
                        <td>{doc.followUp}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </PanelCard>

              <PanelCard title="Clinical Anomaly Detector" icon={<ExclamationCircle />}>
                <ul>
                  <li>Flags over-prescription or abnormal lab usage trends</li>
                </ul>
              </PanelCard>

              <PanelCard title="Digital Twin: Bed Management" icon={<Search />}>
                <ul>
                  <li>Simulates occupancy scenarios for IPD/ICU</li>
                </ul>
              </PanelCard>

              <PanelCard title="Voice-to-EHR AI (Coming Soon)" icon={<Mic />}>
                <p className="text-muted">Automatically converts consultation audio into structured notes.</p>
              </PanelCard>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <PanelCard title="Geo Heatmap Snapshot" icon={<Map />}>
                <p>📍 Regional Usage Density: <Badge bg="info">High in South Chennai</Badge></p>
                <p>🚨 Suggestion: Add lab partner in North Chennai</p>
                <Button variant="outline-primary" size="sm">View Full Map</Button>
              </PanelCard>
            </Col>
            <Col md={6}>
              <PanelCard title="Predictive Service Demand" icon={<GraphUp />}>
                <p>📈 Dermatology usage rising in Hyderabad.</p>
                <p>🦷 Dental OPD up 17% this week.</p>
                <Button variant="outline-success" size="sm">Optimize Schedule</Button>
              </PanelCard>
            </Col>
          </Row>
        </Tab>

        {/* CITY ADMIN */}
        <Tab eventKey="city" title="🌆 City Admin">
          <Row>
            <Col md={6}>
              <PanelCard title="Geo Heatmap Engine" icon={<Globe />}>
                <ul>
                  <li>Visual map overlays of active users</li>
                  <li>Detects care gaps & saturation zones</li>
                </ul>
              </PanelCard>

              <PanelCard title="Churn Risk Detector" icon={<BarChart />}>
                <ul>
                  <li>Flags inactivity clusters</li>
                  <li>Suggests re-engagement nudges</li>
                </ul>
              </PanelCard>

              <PanelCard title="Disease Spread Mapper" icon={<ClipboardCheck />}>
                <ul>
                  <li>Tracks cluster-based infection spikes</li>
                  <li>Heat zones + prediction overlay</li>
                </ul>
              </PanelCard>

              <PanelCard title="Smart Expansion Planner" icon={<BoxArrowUpRight />}>
                <ul>
                  <li>Detects underserved zones and suggests onboarding opportunities</li>
                </ul>
              </PanelCard>
            </Col>

            <Col md={6}>
              <PanelCard title="Growth Estimator Bot" icon={<Robot />}>
                <ul>
                  <li>Simulates ROI from new partners/agents</li>
                  <li>Predicts impact by location</li>
                </ul>
              </PanelCard>

              <PanelCard title="Agent Optimizer + Migration Heat Tool" icon={<PersonCheck />}>
                <ul>
                  <li>Agent conversion insights</li>
                  <li>User migration trends (inter-city usage)</li>
                </ul>
              </PanelCard>

              <PanelCard title="Public Health Alert AI" icon={<Flag />}>
                <ul>
                  <li>Sends alerts when health activity spikes in a city/zone</li>
                </ul>
              </PanelCard>

              <PanelCard title="Zone Saturation Predictor" icon={<Clipboard2Heart />}>
                <ul>
                  <li>Prevents overcrowding of services in one area</li>
                </ul>
              </PanelCard>
            </Col>
          </Row>
        </Tab>

        {/* BBSCART ADMIN */}
        <Tab eventKey="admin" title="🛠️ BBS Health Admin">
          <Row>
            <Col md={6}>
              <PanelCard title="Smart Report Generator" icon={<FileEarmarkArrowDown />}>
                <ul>
                  <li>Auto-reports for KPIs, revenue, NPS</li>
                  <li>Govt, CSR, investor templates</li>
                </ul>
              </PanelCard>

              <PanelCard title="AI Strategy Simulator Bot" icon={<Robot />}>
                <ul>
                  <li>Run pricing and feature what-if scenarios</li>
                </ul>
              </PanelCard>

              <PanelCard title="Plan Performance Predictor" icon={<GraphUp />}>
                <ul>
                  <li>Estimates plan adoption, revenue, and renewal %</li>
                </ul>
              </PanelCard>

              <PanelCard title="AI Toggle + Rollout Manager" icon={<Gear />}>
                <ul>
                  <li>Region-wise activation of AI modules</li>
                </ul>
              </PanelCard>
            </Col>

            <Col md={6}>
              <PanelCard title="Security & Role Control" icon={<ShieldLock />}>
                <ul>
                  <li>Role-based visibility (agent/hospital/admin)</li>
                  <li>Consent controls & alert thresholds</li>
                </ul>
              </PanelCard>

              <PanelCard title="Fraud Risk Detector" icon={<ExclamationCircle />}>
                <ul>
                  <li>Detects abnormal user behaviors (e.g., overuse)</li>
                </ul>
              </PanelCard>

              <PanelCard title="AI Audit Log + Explainability" icon={<Search />}>
                <ul>
                  <li>Why a recommendation was made</li>
                  <li>Track AI decision trail</li>
                </ul>
              </PanelCard>

              <PanelCard title="Support Ticket Sentiment Analyzer (Coming Soon)" icon={<Mic />}>
                <p className="text-muted">Reads tone of messages to prioritize frustrated users.</p>
              </PanelCard>
            </Col>
          </Row>
        </Tab>

        {/* INVESTOR */}
        <Tab eventKey="investor" title="💼 Investor View">
          <PanelCard title="Investor Dashboard" icon={<BarChart />}>
            <ul>
              <li>Stickiness rates: % using 2+ services in 60 days</li>
              <li>Plan engagement + revenue performance</li>
              <li>Pitch-ready report export</li>
            </ul>
          </PanelCard>

          <PanelCard title="Cohort Analysis AI" icon={<People />}>
            <ul>
              <li>Tracks long-term behavior of user groups</li>
              <li>Identifies high-retention cohorts</li>
            </ul>
          </PanelCard>

          <PanelCard title="CLTV Estimator + ROI Simulator" icon={<CurrencyExchange />}>
            <ul>
              <li>Projects customer lifetime value by region</li>
              <li>Simulates investor impact</li>
            </ul>
          </PanelCard>

          <PanelCard title="Impact Score for CSR/ESG" icon={<Clipboard2Heart />}>
            <ul>
              <li>Calculates social health impact for sponsored users</li>
            </ul>
          </PanelCard>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default HospitalAIDashboard;
