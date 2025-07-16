import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Accordion,
  Badge,
  Image,
  Carousel,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import {
  HeartPulse,
  Hospital,
  Clipboard2Heart,
  Globe,
  InfoCircle,
  PeopleFill,
  GeoAltFill,
} from "react-bootstrap-icons";
import HomeDashboard from "./HomeDashboard";

const HealthObjectivePage = () => {
  return (
    <Container fluid className="my-4 p-5">
      {/* 🔥 Header Section with Carousel Background */}
    <Card
  className="text-center mb-4 shadow-sm border-0 text-white position-relative overflow-hidden"
  style={{ height: "400px" }} // Card height
>
  {/* 🎞️ Background Carousel */}
  <Carousel
    controls={false}
    indicators={false}
    fade
    interval={2000}
    className="position-absolute top-0 start-0 w-100% h-500px"
    style={{ zIndex: 0, height: "200px", width: "100%" }} // Carousel height
  >
    <Carousel.Item>
      <div
        style={{
         backgroundImage: `url('/health1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          height: "400px",
          width: "100%",
          height: "600px",
        }}
      />
    </Carousel.Item>

    <Carousel.Item>
      <div
        style={{
         backgroundImage: `url('/health2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          height: "400px",
          width: "100%",
        }}
      />
    </Carousel.Item>

    <Carousel.Item>
      <div
        style={{
         backgroundImage: `url('/health3.jpg')`,        
           backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          height: "400px",
          width: "100%",
        }}
      />
    </Carousel.Item>

        <Carousel.Item>
      <div
        style={{
         backgroundImage: `url('/health4.jpg')`,        
           backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          height: "400px",
          width: "100%",
        }}
      />
    </Carousel.Item>
  </Carousel>

 

  {/* 🌟 Foreground Text Content */}
  <Card.Body
  className="d-flex flex-column justify-content-center align-items-center"
  style={{
    position: "relative",
    bottom: "-130px",
    left: "0px",
    zIndex: 1,
    height: "800px"
  }}
>
  <h2 className="fw-bold text-danger fs-5"> {/* Smaller heading */}
    🎯 Affordable Health Membership for All
  </h2>
  <p className="p-2 px-4 text-dark fs-6"> {/* Smaller paragraph */}
    Access OPD, diagnostics, dental, accident care — no insurance needed.
  </p>
  <Link to="/plans-landing">
    <Button variant="success" size="sm"> {/* Smaller button */}
      Explore Plans & Pricing
    </Button>
  </Link>
</Card.Body>

</Card>


   <HomeDashboard/>

      {/* 🧭 Vision Points */}
      <Row className="g-4 my-2">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h5 className="text-success fw-bold">
                <Clipboard2Heart className="me-2" />
                Citizen Benefits
              </h5>
              <ul className="mt-3">
                <li>Affordable prepaid plans</li>
                <li>Predictable monthly cost</li>
                <li>Easy OPD/IPD/Diagnostic access</li>
                <li>No claims, approvals or waiting</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <h5 className="text-primary fw-bold">
                <Hospital className="me-2" />
                Hospital Benefits
              </h5>
              <ul className="mt-3">
                <li>Monthly recurring revenue</li>
                <li>Better patient footfall</li>
                <li>No insurance dependency</li>
                <li>Higher utilization of resources</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
   
      </Row>

             {/* 📸 Banner Image */}
      <Image
        src="https://www.novotel-visakhapatnam.com/wp-content/uploads/sites/24/2022/12/unnamed.jpg"   
        className="mb-4 shadow-sm  d-block mx-auto mt-5 "
        style={{ maxWidth: "50%", height: "400px",  border: "1px solid #ccc", borderRadius: "10px" }}
        alt="Affordable Health for All"
      />
    
      {/* 🧬 Coverage & Scope */}
      <Card className="my-4 shadow-sm">
        <Card.Body>
          <h5 className="fw-bold text-danger mb-3">
            <HeartPulse className="me-2" />
            Services Covered
          </h5>
          <Row>
            <Col md={6}>
              <ul>
                <li>✔️ OPD consultations</li>
                <li>✔️ Diagnostics & blood tests</li>
                <li>✔️ Basic dental care</li>
              </ul>
            </Col>
            <Col md={6}>
              <ul>
                <li>✔️ Partial IPD room discount</li>
                <li>✔️ Minor accidental care</li>
                <li>❌ No claim insurance model</li>
              </ul>
            </Col>
          </Row>
          <p className="text-muted small mt-3">
            *This is a prepaid health plan, not an insurance policy.
          </p>
        </Card.Body>
      </Card>

      {/* 🌍 Expansion */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="text-dark fw-bold">
            <Globe className="me-2" />
            Designed for India, UAE — and beyond
          </h5>
          <p>
            Our model is built to scale. With offline + online integration and
            non-insurance legal compliance, we're ready to expand across
            emerging markets.
          </p>
        </Card.Body>
      </Card>

      {/* 👥 Testimonial Slider Placeholder */}
      <Card className="mb-4 p-3 bg-light border-0">
        <h5 className="fw-bold mb-3">👥 What People Say</h5>
        <p className="fst-italic">
          "This health membership helped my family save ₹10,000 last year!"
        </p>
        <p className="fst-italic">
          "Super convenient — booked an OPD appointment in 2 clicks."
        </p>
      </Card>

      {/* 💬 FAQ Section */}
      <Accordion className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <InfoCircle className="me-2 text-primary" />
            Is this a health insurance plan?
          </Accordion.Header>
          <Accordion.Body>
            No. This is a prepaid membership model with fixed benefits. There
            are no claim forms, approvals, or reimbursement hassles.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <InfoCircle className="me-2 text-primary" />
            What happens if I don't use it?
          </Accordion.Header>
          <Accordion.Body>
            Your benefits reset monthly. If unused, the next month starts fresh.
            You can cancel anytime.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <InfoCircle className="me-2 text-primary" />
            Can I use this with my family?
          </Accordion.Header>
          <Accordion.Body>
            Yes! We offer family packs at discounted pricing. See the plans
            section.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* 🔗 Quick Navigation CTAs */}
      <Row className="text-center g-3   py-5">
        <Col md={4}>
          <Link to="/health-membership">
            <Button variant="outline-primary" className="w-100">
              🛒 View Membership Plans
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/hospital-directory">
            <Button variant="outline-success" className="w-100">
              🏥 Find Partner Hospitals
            </Button>
          </Link>
        </Col>
        <Col md={4}>
          <Link to="/book-appointment">
            <Button variant="outline-warning" className="w-100">
              📅 Book a Health Visit
            </Button>
          </Link>
        </Col>
      </Row>

    
    </Container>
  );
};

export default HealthObjectivePage;
