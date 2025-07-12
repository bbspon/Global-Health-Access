import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Accordion,
  Image,
} from "react-bootstrap";
import {
  PersonFill,
  Hospital,
  Clipboard2Pulse,
  Capsule,
  GearFill,
  PersonPlusFill,
  GlobeAmericas,
  InfoCircle,
  ChatQuote,
  StarFill,
} from "react-bootstrap-icons";

const stakeholders = [
  {
    role: "User (Patient)",
    icon: <PersonFill size={28} />,
    description:
      "Customer who buys and benefits from Care Pass. Accesses hospitals, labs, pharmacies at low cost.",
    action: "Explore Membership",
    link: "/health-membership",
  },
  {
    role: "Hospital",
    icon: <Hospital size={28} />,
    description:
      "Healthcare provider offering consultations, treatments, or health packages via the BBSCART ecosystem.",
    action: "Join as Hospital",
    link: "/partner-onboarding",
  },
  {
    role: "Lab / Scan Center",
    icon: <Clipboard2Pulse size={28} />,
    description:
      "Diagnostic partner offering tests, scans, reports integrated with the patient journey.",
    action: "Join as Lab Partner",
    link: "/partner-onboarding",
  },
  {
    role: "Pharmacy",
    icon: <Capsule size={28} />,
    description:
      "Medicine fulfillment partner that delivers prescriptions generated through hospitals.",
    action: "Join Pharmacy Network",
    link: "/partner-onboarding",
  },
  {
    role: "BBSCART Admin",
    icon: <GearFill size={28} />,
    description:
      "Platform administrator managing onboarding, wallet, pricing, commissions, and all interactions.",
    action: "Go to Admin Panel",
    link: "/admin-dashboard",
  },
  {
    role: "Referral Agent / Business Partner",
    icon: <PersonPlusFill size={28} />,
    description:
      "Earn commission by referring users, hospitals, or labs into the BBSCART platform.",
    action: "Refer & Earn",
    link: "/referral-portal",
  },
  {
    role: "Government / NGO (Sponsor)",
    icon: <GlobeAmericas size={28} />,
    description:
      "Sponsor health coverage for low-income individuals via BBSCART. See your impact in dashboards.",
    action: "Become a Sponsor",
    link: "/csr-sponsorship",
  },
];

const testimonials = [
  {
    quote: "Thanks to BBSCART Care Pass, I got affordable tests done without hassle!",
    name: "Aarti, Mumbai",
    role: "User",
  },
  {
    quote: "Joining the BBSCART network helped grow our diagnostic business quickly.",
    name: "Dr. Patel",
    role: "Lab Partner",
  },
  {
    quote: "We've onboarded 100+ users via referrals. Great earnings!",
    name: "Rajesh",
    role: "Referral Agent",
  },
];

const StakeholdersPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalRole, setModalRole] = useState(null);

  const handleShowModal = (role) => {
    setModalRole(role);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">👥 Stakeholders in the BBSCART Care Ecosystem</h2>
      <p className="text-center text-muted mb-5">
        These key contributors make affordable healthcare possible.
      </p>

      {/* Stakeholder Cards */}
      <Row className="g-4">
        {stakeholders.map((item, idx) => (
          <Col md={6} lg={4} key={idx}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3 text-primary">{item.icon}</div>
                  <Card.Title className="mb-0">{item.role}</Card.Title>
                </div>
                <Card.Text className="text-muted">{item.description}</Card.Text>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleShowModal(item)}
                >
                  {item.action}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Onboarding Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalRole?.role}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalRole?.description}</p>
          <Button variant="primary" href={modalRole?.link} className="mt-3" block="true">
            Continue to {modalRole?.action}
          </Button>
        </Modal.Body>
      </Modal>

      {/* Ecosystem Flow Section */}
      <div className="my-5 text-center">
        <h4>
          <InfoCircle className="me-2" />
          How the Ecosystem Works
        </h4>
        <p className="text-muted">From sponsor to service, here’s how the flow connects:</p>
        <Image
          src="https://www.researchgate.net/profile/Roberto-Moro-Visconti/publication/341549427/figure/fig2/AS:893645062410241@1590072994517/The-Healthcare-Ecosystem.png" // Replace with your actual image
          alt="Ecosystem Diagram"
          fluid
          className="rounded shadow-sm my-4 border p-5 rounded-4 "
          style={{ minWidth: "800px", height: "500px" }}
        />
        <p className="mt-2 text-muted small">
          Diagram: Sponsor → User → Hospital → Lab/Pharmacy → Admin → Referral Agent
        </p>
      </div>

      {/* Testimonials */}
      <div className="my-5">
        <h4 className="text-center mb-4">
          <ChatQuote className="me-2" />
          What Our Stakeholders Say
        </h4>
        <Row className="g-4">
          {testimonials.map((t, idx) => (
            <Col md={4} key={idx}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>“{t.quote}”</p>
                    <footer className="blockquote-footer mt-2">
                      {t.name}, <cite title="Source Title">{t.role}</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* FAQ Accordion */}
      <div className="mt-5">
        <h4>
          <InfoCircle className="me-2" />
          Common Questions
        </h4>
        <Accordion className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>How are stakeholders connected?</Accordion.Header>
            <Accordion.Body>
              User purchases Care Pass → chooses service providers (Hospital, Lab, Pharmacy) →
              Admin verifies and coordinates → Agents refer others → Sponsors fund users if needed.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can one party take multiple roles?</Accordion.Header>
            <Accordion.Body>
              Yes. For example, a hospital may also operate a lab or pharmacy, or a sponsor may refer.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </Container>
  );
};

export default StakeholdersPage;
