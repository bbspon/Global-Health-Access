import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  PersonPlus,
  ClipboardCheck,
  CalendarCheck,
  QrCodeScan,
  FileEarmarkMedical,
  BarChartLine,
  QuestionCircle,
  Bell,
  People,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const HospitalDashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Hospital Onboarding",
      description: "Register or update hospital details & documents",
      icon: <PersonPlus size={28} />,
      link: "/hospital/onboarding",
      color: "primary",
      bgImage: "/health.png",
    },
    {
      title: "Create Custom Plan Tier",
      description: "Configure hospital-specific health plans",
      icon: <ClipboardCheck size={28} />,
      link: "/hospital/plan-tiers",
      color: "success",
      bgImage: "/health.png",
    },
    {
      title: "Manage Service Availability",
      description: "Set OPD/IPD/Dental/Lab slots & timings",
      icon: <CalendarCheck size={28} />,
      link: "/hospital/availability",
      color: "info",
      bgImage: "/health.png",
    },
    {
      title: "Care Pass QR Scanner",
      description: "Scan patient’s Care Pass & check plan",
      icon: <QrCodeScan size={28} />,
      link: "/hospital/carepass-scan",
      color: "dark",
      bgImage: "/health.png",
    },
       {
      title: "Staff Access Manager",
      description: "Manage staff roles & permissions",
      icon: <People size={28} />,
      link: "/hospital/staff",
      color: "dark",
      bgImage: "/health.png",
    },
    {
      title: "Enter Bill & Reimbursement",
      description: "Submit bills & track reimbursement status",
      icon: <FileEarmarkMedical size={28} />,
      link: "/hospital/billing",
      color: "warning",
      bgImage: "/health.png",
    },
    
    {
      title: "Analytics & Reports",
      description: "Track service usage, earnings, feedback",
      icon: <BarChartLine size={28} />,
      link: "/hospital/analytics",
      color: "secondary",
      bgImage: "/health.png",
    },
    {
      title: "Support & Escalations",
      description: "Raise tickets for billing or tech issues",
      icon: <QuestionCircle size={28} />,
      link: "/hospital/support",
      color: "danger",
      bgImage: "/health.png",
    },
 
    {
      title: "Alerts & Notifications",
      description: "View important hospital updates & alerts",
      icon: <Bell size={28} />,
      link: "/hospital/notifications",
      color: "primary",
      bgImage: "/health.png",
    },
  ];

  return (
    <Container className="p-5 my-4  rounded-3">
      <h3 className="mb-4 text-center">🏥 Hospital Partner Dashboard</h3>
      <Row xs={1} sm={2} md={3} className="g-4">
        {modules.map((mod, idx) => (
          <Col key={idx}>
            <Card
              className="h-100 shadow-sm border-0 text-white "
              style={{
                backgroundImage: `url(${mod.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor:
                    mod.color === "light" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)",
                  zIndex: 1,
                  border : "2px solid #ccc",
                  borderRadius: "10px",
                }}
              ></div>
              <Card.Body style={{ position: "relative", zIndex: 2 }}>
                <Card.Title className="d-flex align-items-center justify-content-between ">
                  {mod.title}
                  <Badge pill bg="white" text="dark">
                    {mod.icon}
                  </Badge>
                </Card.Title>
                <Card.Text style={{ minHeight: "60px" }}>
                  {mod.description}
                </Card.Text>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Go to {mod.title}</Tooltip>}
                >
                  <Button
                    variant={mod.color === "light" ? "dark" : "light"}
                    size="sm"
                    onClick={() => navigate(mod.link)}
                  >
                    Open
                  </Button>
                </OverlayTrigger>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HospitalDashboard;
