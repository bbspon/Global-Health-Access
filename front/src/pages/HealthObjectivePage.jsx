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
import PannerAd from "./PannerAd";
import ServicesGrid from "../components/Layout/ServicesGrid";
import VisionPoints from "./VisionPoints";
import Coverage from "./Coverage";
import HealthcareSection from "./HealthcareSection";

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
        <PannerAd />

        <HomeDashboard />
        <ServicesGrid />

        {/* 🧭 Vision Points */}
        <VisionPoints />

        {/* 🧬 Coverage & Scope */}
        <div className="py-5 px-2">
          <Coverage />
        </div>

        {/* 👥 Testimonials */}

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
        <HealthcareSection />
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
