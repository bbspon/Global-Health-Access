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
import thia from "../assets/thia.png";
import bbscart from "../assets/bbscart.png";

const HealthObjectivePage = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/health-objective`)
      .then((res) => setContent(res.data))
      .catch((err) => console.error("Failed to load health content", err));
  }, []);

  return (
    <>
      <Container fluid className="my-2 px-3">
        {/* 🔥 Header Section with Carousel Background */}
        <Row className="mb-3">
          <Col className="d-flex justify-content-center gap-3  p-2">
            <Button
              variant="outline-success"
              size="sm"
              style={{ color: "black" }}
              className="border-0 flex gap-2 rounded-3"
              onClick={() =>
                (window.location.href = "https://thiaworld.bbscart.com/")
              }
            >
              <img
                src={thia}
                alt="Thiaworld"
                style={{ height: "40px", objectFit: "contain" }}
              />
              <span
                style={{ transition: "color 0.3s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "initial")}
              >
                Thiaworld Jewellery
              </span>
            </Button>
            <Button
              variant="outline-warning"
              size="sm"
              style={{ color: "black" }}
              className="border-0 flex gap-2 rounded-3 bg-yellow"
              onClick={() => (window.location.href = "https://bbscart.com/")}
            >
              <img
                src={bbscart}
                alt="BBSCart"
                style={{ height: "35px", objectFit: "contain" }}
              />
              <span
                style={{ transition: "color 0.3s", cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "green")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "initial")}
              >
                BBSCart Online Shopping
              </span>
            </Button>
          </Col>
        </Row>

        <Card
          className="text-center mb-4 shadow-sm border-0 text-white position-relative overflow-hidden "
          style={{ height: "400px" }}
        >
          <Carousel
            controls={false}
            indicators={false}
            fade
            interval={2000}
            className="position-absolute top-0 start-0 w-100%"
            style={{
              zIndex: 0,
              height: "400px",
              width: "100%",
              borderRadius: "15px",
              border: "2px outset #161615ff", // Example: dashed yellow border, 3px thick
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // optional shadow
            }}
          >
            {[
              "/health1.jpg",
              "/health2.jpg",
              "/health3.jpg",
              "/health4.jpg",
            ].map((img, i) => (
              <Carousel.Item key={i}>
                <div
                  style={{
                    backgroundImage: `url('${img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.4,
                    height: "600px",
                    width: "100%",
                    borderRadius: "15px",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {/* 🌟 Foreground Text Content */}
          <Card.Body
            className="d-flex flex-column justify-content-center  align-items-center border-0 "
            style={{
              position: "relative",
              bottom: "-80px",
              left: "0px",
              zIndex: 1,
              height: "20%",
            }}
          >
            <div
              style={{
                borderRadius: "50px", // smooth corners
                padding: "20px 40px",
                maxWidth: "900px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              className="hover-effect"
            >
              <h2 className="fw-bold text-dark fs-1">{content?.heading}</h2>
              <p className="p-2 px-4 text-dark fs-6">{content?.subheading}</p>
              <Link to="/plans-landing">
                <Button
                  variant="none"
                  className=" text-dark  custom-yellow-btn"
                  size="sm"
                >
                  {content?.ctaText}
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>

        <HomeDashboard />

        {/* 🧭 Vision Points */}
        <Row className="g-4 my-2">
          <Col md={6}>
            <Card
              className="p-4 text-center h-100 shadow-sm"
              style={{
                borderRadius: "20px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                background: "linear-gradient(135deg, #E0F7FA, #7ddce9ff)", // soft hospital blue gradient
              }}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <h5 className="d-flex flex-column align-items-center text-dark gap-2 fw-bold">
                  <Clipboard2Heart className="me-2" size={30} />
                  Citizen Benefits
                </h5>
                <ul className="mt-3 text-dark list-unstyled text-start">
                  {(content?.citizenBenefits || []).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card
              className="p-4 text-center quick-actions h-100 shadow-sm"
              style={{
                borderRadius: "20px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                background: "linear-gradient(135deg, #E0F7FA, #7ddce9ff)", // soft hospital blue gradient
              }}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <h5 className="d-flex flex-column align-items-center text-dark gap-2 fw-bold">
                  <Hospital className="me-2" size={30} />
                  Hospital Benefits
                </h5>
                <ul className="mt-3 text-dark list-unstyled text-start">
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
        <Card
          className="mb-4 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)", // hospital soft blue gradient
            border: "1px solid #B2DFDB", // subtle teal border
            borderRadius: "15px",
          }}
        >
          <Card.Body>
            <h5 className="fw-bold text-danger mb-5">
              <HeartPulse className="me-2" size={45} />
              Services Covered
            </h5>
            <Row>
              <Col md={6}>
                <ul className="list-unstyled text-start px-5">
                  {(content?.coverage || []).map((item, i) => (
                    <li key={i}>✔️ {item}</li>
                  ))}
                </ul>
              </Col>
              <Col md={6}>
                <ul className="list-unstyled">
                  {(content?.exclusions || []).map((item, i) => (
                    <li key={i}>❌ {item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
            <p className="text-muted small mt-3">
              This is a prepaid health plan, not an insurance policy.
            </p>
          </Card.Body>
        </Card>

        {/* 🌍 Expansion */}
        <Card
          className="mb-4 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)", // hospital soft blue gradient
            border: "1px solid #B2DFDB", // subtle teal border
            borderRadius: "15px",
          }}
        >
          <Card.Body>
            <h5 className="fw-bold text-[#fff] d-flex align-items-center justify-content-center mb-3">
              <Globe className="me-2 text-info" size={35} />
              Designed for India, UAE — and beyond
            </h5>
            <p className="text-dark mt-2 mb-0">
              Our model is built to scale. With offline + online integration and
              non-insurance legal compliance, we're ready to expand across
              emerging markets.
            </p>
          </Card.Body>
        </Card>

        {/* 👥 Testimonials */}
        <Card
          className="mb-4 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)", // hospital soft blue gradient
            border: "1px solid #B2DFDB", // subtle teal border
            borderRadius: "15px",
          }}
        >
          <h5 className="fw-bold mb-3">👥 What People Say</h5>
          {(content?.testimonials || []).map((t, i) => (
            <p className="fst-italic" key={i}>
              “{t}”
            </p>
          ))}
        </Card>

        {/* 💬 FAQ Section */}
        <Accordion className="mb-4 hospital-accordion">
          {(content?.faq || []).map((item, i) => (
            <Accordion.Item eventKey={i.toString()} key={i}>
              <Accordion.Header>
                <InfoCircle className="me-2 text-dark" />
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
              <Button variant="outline-dark" className="w-100">
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
      <style>
        {`
        .hospital-accordion .accordion-item {
  background: linear-gradient(135deg, #E0F7FA, #B2EBF2); /* soft hospital blue */
  border: 1px solid #B2DFDB;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
}

.hospital-accordion .accordion-header {
  background: transparent;
  color: #004D40; /* deep teal text */
  font-weight: 600;
}

.hospital-accordion .accordion-button {
  background: transparent;
  color: #00695C; /* hospital teal */
  font-weight: 500;
  box-shadow: none;
}

.hospital-accordion .accordion-button:not(.collapsed) {
  background: #B2DFDB; /* highlighted open state */
  color: #004D40;
}

.hospital-accordion .accordion-body {
  background: #E0F2F1; /* light mint background for content */
  color: #212121;
  border-radius: 0 0 12px 12px;
}
.custom-yellow-btn {
  background: linear-gradient(135deg, #bce2f1ff, #3b88e0ff); /* yellow gradient */
  border-radius: 12px;
  padding: 6px 16px;
  border: none;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  cursor: pointer;
}

.custom-yellow-btn:hover {
  color: black; /* text turns black */
  background: linear-gradient(135deg, #9b933fff, #20f30cff); /* slightly brighter yellow */
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.2);
}

.custom-yellow-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
`}
      </style>
    </>
  );
};

export default HealthObjectivePage;
