// ✅ FINAL FULL FRONTEND CODE — DATA FLOW PAGE

// ✅ React + Bootstrap Web Version (DataFlowPage.jsx)

import React from "react";
import { Container, Row, Col, Card, Badge, Image } from "react-bootstrap";
import {
  CashStack,
  ClipboardCheck,
  PersonCheck,
  Hospital,
  ClipboardData,
  ArrowRepeat,
  CurrencyExchange,
  CpuFill,
  ShieldLock,
  BellFill,
  PeopleFill,
  Gear,
} from "react-bootstrap-icons";

const dataFlowSteps = [
  {
    icon: <PersonCheck size={24} />,
    title: "1. User Selects Plan",
    desc: "Chooses a BBSCART Health Membership plan via the user portal.",
    image: "https://wallpaperaccess.com/full/4433982.jpg",
  },
  {
    icon: <CashStack size={24} />,
    title: "2. Makes Payment",
    desc: "Pays via UPI, Card, Wallet, Sponsor Code or Referral.",
    image: "https://c0.wallpaperflare.com/preview/360/533/202/health-medical-healthcare-health.jpg",
  },
  {
    icon: <ClipboardCheck size={24} />,
    title: "3. Care Pass Generated",
    desc: "User receives QR-based Care Pass with service entitlements.",
    image: "https://wallpaperaccess.com/full/4433982.jpg",
  },
  {
    icon: <Hospital size={24} />,
    title: "4. Services Used",
    desc: "Visits hospital/lab/pharmacy. Care Pass scanned & verified.",
    image: "https://c0.wallpaperflare.com/preview/360/533/202/health-medical-healthcare-health.jpg",
  },
  {
    icon: <ClipboardData size={24} />,
    title: "5. Usage Logged",
    desc: "Partners log services and billing in real-time via dashboard.",
    image: "https://wallpaperaccess.com/full/4433982.jpg",
  },
  {
    icon: <CurrencyExchange size={24} />,
    title: "6. Partner Settlement",
    desc: "BBSCART calculates and releases payments to partners.",
    image: "https://c0.wallpaperflare.com/preview/360/533/202/health-medical-healthcare-health.jpg",
  },
  {
    icon: <ArrowRepeat size={24} />,
    title: "7. Dashboards Sync",
    desc: "User, Hospital & Admin dashboards reflect live updates.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/020/173/259/small_2x/digital-health-care-concept-medicine-doctor-touching-electronic-medical-record-on-virtual-screen-brain-analysis-dna-digital-healthcare-and-network-connection-on-modern-interface-photo.jpg",
  },
  {
    icon: <CpuFill size={24} />,
    title: "8. AI Insights Triggered",
    desc: "AI recommends plan upgrades, alerts, health nudges.",
    image: "https://c0.wallpaperflare.com/preview/360/533/202/health-medical-healthcare-health.jpg",
  },
  {
    icon: <ShieldLock size={24} />,
    title: "9. Compliance Logs",
    desc: "Terms, location, e-signature and geo-rules enforced.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/020/173/259/small_2x/digital-health-care-concept-medicine-doctor-touching-electronic-medical-record-on-virtual-screen-brain-analysis-dna-digital-healthcare-and-network-connection-on-modern-interface-photo.jpg",
  },
  {
    icon: <BellFill size={24} />,
    title: "10. Notifications & Actions",
    desc: "User receives SMS/Email reminders, bonuses, offers.",
    image: "https://c0.wallpaperflare.com/preview/360/533/202/health-medical-healthcare-health.jpg",
  },
  {
    icon: <PeopleFill size={24} />,
    title: "11. Sponsor / NGO Reporting",
    desc: "Impact reports generated for sponsors or partners.",
    image: "https://wallpaperaccess.com/full/4433982.jpg",
  },
  {
    icon: <Gear size={24} />,
    title: "12. Advanced Features",
    desc:
      "Risk alerts, offline sync, fraud detection, QR emergency access, partner ratings, smart upgrades, and more.",
    image: "https://c0.wallpaperflare.com/preview/360/533/202/health-medical-healthcare-health.jpg",
  },
];

const DataFlowPage = () => {
  return (
    <Container className="py-5">
      <div style={{ marginBottom: "50px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.8rem",
            fontWeight: 800,
            color: "#1a3a52",
            marginBottom: "16px",
            letterSpacing: "-0.5px",
          }}
        >
           BBS Global Health Access Data Flow
        </h1>
        <p
          style={{
            fontSize: "1.15rem",
            color: "#666",
            fontWeight: 500,
            lineHeight: 1.6,
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          A step-by-step journey of how your health plan powers the entire ecosystem.
        </p>
      </div>

      <Row>
        {dataFlowSteps.map((step, idx) => (
          <Col md={6} lg={4} className="mb-4" key={idx}>
            <Card className="shadow-sm h-100 border-0" style={{ transition: "all 0.3s ease" }}>
              <Card.Img
                variant="top"
                src={step.image}
                alt={step.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body style={{ padding: "24px" }}>
                <div className="d-flex align-items-flex-start mb-3" style={{ gap: "12px" }}>
                  <Badge
                    pill
                    bg="primary"
                    style={{
                      padding: "10px 14px",
                      fontSize: "18px",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {step.icon}
                  </Badge>
                  <h5
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#1a3a52",
                      marginBottom: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {step.title}
                  </h5>
                </div>
                <Card.Text
                  style={{
                    fontSize: "0.95rem",
                    color: "#555",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {step.desc}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DataFlowPage;