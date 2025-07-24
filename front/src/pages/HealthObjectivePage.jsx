import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  Hospital,
  Clipboard2Heart,
  Globe,
  InfoCircle,
} from "react-bootstrap-icons";
import HomeDashboard from "./HomeDashboard";

const HealthObjectivePage = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/health-objective")
      .then((res) => setContent(res.data))
      .catch((err) => console.error("Failed to load health content", err));
  }, []);

  return (
    <Container fluid className="my-4 p-5">
      {/* 🔥 Header Section with Carousel Background */}
      <Card
        className="text-center mb-4 shadow-sm border-0 text-white position-relative overflow-hidden"
        style={{ height: "400px" }}
      >
        <Carousel
          controls={false}
          indicators={false}
          fade
          interval={2000}
          className="position-absolute top-0 start-0 w-100%"
          style={{ zIndex: 0, height: "200px", width: "100%" }}
        >
          {["/health1.jpg", "/health2.jpg", "/health3.jpg", "/health4.jpg"].map(
            (img, i) => (
              <Carousel.Item key={i}>
                <div
                  style={{
                    backgroundImage: `url('${img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.4,
                    height: "600px",
                    width: "100%",
                  }}
                />
              </Carousel.Item>
            )
          )}
        </Carousel>

        {/* 🌟 Foreground Text Content */}
        <Card.Body
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            position: "relative",
            bottom: "-130px",
            left: "0px",
            zIndex: 1,
            height: "800px",
          }}
        >
          <h2 className="fw-bold text-danger fs-5">🎯 {content?.heading}</h2>
          <p className="p-2 px-4 text-dark fs-6">{content?.subheading}</p>
          <Link to="/plans-landing">
            <Button variant="success" size="sm">
              {content?.ctaText}
            </Button>
          </Link>
        </Card.Body>
      </Card>

      <HomeDashboard />

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
                {(content?.citizenBenefits || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
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
                {(content?.hospitalBenefits || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 📸 Banner Image */}
      <Image
        src="https://www.novotel-visakhapatnam.com/wp-content/uploads/sites/24/2022/12/unnamed.jpg"
        className="mb-4 shadow-sm  d-block mx-auto mt-5"
        style={{
          maxWidth: "50%",
          height: "400px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
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
                {(content?.coverage || []).map((item, i) => (
                  <li key={i}>✔️ {item}</li>
                ))}
              </ul>
            </Col>
            <Col md={6}>
              <ul>
                {(content?.exclusions || []).map((item, i) => (
                  <li key={i}>❌ {item}</li>
                ))}
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

      {/* 👥 Testimonials */}
      <Card className="mb-4 p-3 bg-light border-0">
        <h5 className="fw-bold mb-3">👥 What People Say</h5>
        {(content?.testimonials || []).map((t, i) => (
          <p className="fst-italic" key={i}>
            “{t}”
          </p>
        ))}
      </Card>

      {/* 💬 FAQ Section */}
      <Accordion className="mb-4">
        {(content?.faq || []).map((item, i) => (
          <Accordion.Item eventKey={i.toString()} key={i}>
            <Accordion.Header>
              <InfoCircle className="me-2 text-primary" />
              {item.question}
            </Accordion.Header>
            <Accordion.Body>{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* 🔗 Quick Navigation CTAs */}
      <Row className="text-center g-3 py-5">
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
