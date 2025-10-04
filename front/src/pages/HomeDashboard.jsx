import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import {
  HeartPulse,
  CalendarCheck,
  CreditCard2Front,
  PersonBadge,
  FileEarmarkText,
  GeoAltFill,
  Robot,
  Shop,
  Bell,
  Globe,
  MoonStarsFill,
  PersonCircle,
  QrCode,
  ExclamationTriangle,
  BarChartLine,
  Capsule,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <HeartPulse size={32} />,
    title: "Health Access Plans",
    path: "/plans",
  },
  {
    icon: <CalendarCheck size={32} />,
    title: "Book Doctor / Lab",
    path: "/booking-manager",
  },
  {
    icon: <PersonBadge size={32} />,
    title: "Health Data Flow",
    path: "/data-flow",
  },
  {
    icon: <FileEarmarkText size={32} />,
    title: "Medical Records",
    path: "/medical-records",
  },
  {
    icon: <GeoAltFill size={32} />,
    title: "Nearby Hospitals",
    path: "/hospitals",
  },
  {
    icon: <Robot size={32} />,
    title: "Plan Usage Dashboard",
    path: "/plan-usage",
  },
  {
    icon: <CreditCard2Front size={32} />,
    title: "My Wallet",
    path: "/payments-wallet",
  },
  {
    icon: <Shop size={32} />,
    title: "BBSCART Offers",
    path: "/loyalty-reward",
  },
  {
    icon: <QrCode size={32} />,
    title: "Digital Health Card",
    path: "/digital-health-card",
  },
  {
    icon: <Capsule size={32} />,
    title: "Pharmacy & Labs",
    path: "/pharmacy-integration",
  },
  {
    icon: <BarChartLine size={32} />,
    title: "Health Insights",
    path: "/health-insights",
  },
  {
    icon: <ExclamationTriangle size={32} />,
    title: "AI Risk & Early Warning",
    path: "/ai-risk-engine",
  },
  {
    icon: <ExclamationTriangle size={32} />,
    title: "Feedback & Support",
    path: "/feedback-engine",
  },
];

const HomeDashboard = () => {
  const navigate = useNavigate();

  // Optional: Handle quick button clicks
  const handleQuickAction = (action) => {
    alert(`Action triggered: ${action}`);
    // You can use navigate() here too if needed
  };

  return (
    <>
      <Container fluid className="home-dashboard-container p-5">
        {/* Header */}
        <Row className="align-items-center mb-4 ">
          <Col md={6} className="d-flex flex-column align-items-start">
            <h4 className="text-light ">
              Welcome to <strong>BBSCART Health</strong>
            </h4>
            <p className="text-secondary ">
              Futuristic Health Access Dashboard
            </p>
          </Col>
          {/* <Col md={6} className="d-flex justify-content-end gap-2 flex-wrap">
            <Dropdown as={ButtonGroup}>
              <Button variant="outline-light">
                <Globe /> UAE
              </Button>
              <Dropdown.Toggle split variant="outline-light" />
              <Dropdown.Menu>
                <Dropdown.Item>India 🇮🇳</Dropdown.Item>
                <Dropdown.Item>UAE 🇦🇪</Dropdown.Item>
                <Dropdown.Item>Global 🌐</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="outline-light">
                <PersonCircle /> Language
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Arabic</Dropdown.Item>
                <Dropdown.Item>Hindi</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="outline-warning">
              <MoonStarsFill /> Dark Mode
            </Button>
            <Button variant="outline-info">
              <Bell /> Alerts
            </Button>
          </Col> */}
        </Row>

        {/* Tiles Grid */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {features.map((item, idx) => (
            <Col key={idx}>
              <Card
                className="feature-card h-100 text-center"
                onClick={() => navigate(item.path)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="feature-icon mb-3">{item.icon}</div>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick Actions Section */}
        <Row className="mt-5">
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="p-4 text-center quick-actions">
              <h5 className="text-light mb-3">⚡ Quick Actions</h5>
              <div className="quick-actions d-flex gap-2 mt-3">
                {/* Switch User stays as an action */}
                <Button
                  variant="success"
                  onClick={() => console.log("Switch User")}
                >
                  Switch User
                </Button>

                {/* Emergency → /emergency */}
                <Button variant="danger" onClick={() => navigate("/emergency")}>
                  Emergency Mode
                </Button>

                {/* Health Tips → /health-insights */}
                <Button
                  variant="info"
                  onClick={() => navigate("/health-insights")}
                >
                  Health Tips
                </Button>

                {/* Profile → /my-health/prescription-loop */}
                <Button
                  variant="dark"
                  onClick={() => navigate("/my-health/prescription-loop")}
                >
                  Profile
                </Button>
                <Button
                  variant="danger"
                  onClick={() => navigate("/emergencySOSPage")}
                >
                  Emergency SOS
                </Button>
                <Button
                  variant="info"
                  onClick={() => navigate("/emergencySOSSection")}
                >
                  Emergency SOS Section
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Styling */}
      <style>
        {`
        .home-dashboard-container {
          background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
          min-height: 100vh;
          color: white;
        }

        .feature-card {
          background-color: #ffffff10;
          border: 1px solid #ffffff22;
          transition: all 0.3s ease;
          color: #fff;
        }

        .feature-card:hover {
          background-color: #1e90ff33;
          transform: scale(1.03);
          box-shadow: 0 0 10px rgba(0, 123, 255, 0.6);
        }

        .feature-icon {
          font-size: 2rem;
          color: #0d6efd;
        }

        .quick-actions {
          background-color: #ffffff10;
          border: 1px solid #ffffff22;
        }

        button, .btn {
          font-weight: 500;
        }
        `}
      </style>
    </>
  );
};

export default HomeDashboard;
