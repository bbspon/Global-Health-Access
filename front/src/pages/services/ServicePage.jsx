import React from "react";
import { useParams, Link } from "react-router-dom";
import { serviceTopics } from "../../data/serviceTopics.jsx";
import {
  BsArrowLeft,
  BsCheckCircle,
  BsClock,
  BsShieldCheck,
  BsArrowRight,
} from "react-icons/bs";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import "./ServicePage.css";

const ServicePage = () => {
  const { slug } = useParams();
  const item = serviceTopics.find((s) => s.slug === slug);
  const relatedServices = serviceTopics.filter((s) => s.slug !== slug);

  if (!item) {
    return (
      <Container className="py-5">
        <div className="error-container text-start">
          <h2 style={{ color: "#dc3545" }}>Service not found</h2>
          <p className="text-muted mb-4">
            The service you are looking for does not exist.
          </p>
          <Link to="/coverage">
            <Button
              variant="primary"
              style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
            >
              <BsArrowLeft className="me-2" />
              Go back to services
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div
      className="service-page-wrapper"
      style={{ backgroundColor: "#f8fbff", minHeight: "100vh", position: "relative" }}
    >
      <Container className="py-5" style={{ paddingTop: "72px" }}>
        {/* Back Navigation */}
        <Link
          to="/coverage"
          className="back-link mb-4 d-inline-flex align-items-center text-decoration-none"
          style={{ position: "absolute", left: 26, top: 16, zIndex: 60 }}
        >
          <BsArrowLeft className="me-2" />
          <span>Back to all services</span>
        </Link>

        {/* Hero Section */}
        <div className="hero-section mb-5 p-5 rounded-4" style={{ backgroundColor: item.bg }}>
          <Row className="align-items-center">
            <Col md={2} className="text-center mb-3 mb-md-0">
              <div className="service-icon-large">{item.icon}</div>
            </Col>
            <Col md={10}>
              <Badge bg="info" className="mb-3">
                {item.title}
              </Badge>
              <h1 className="mb-3" style={{ color: "#1e3a5f", fontWeight: "700" }}>
                {item.title}
              </h1>
              <p className="lead mb-0" style={{ color: "#555", fontSize: "18px" }}>
                {item.desc}
              </p>
            </Col>
          </Row>
        </div>

        {/* Service Details Section */}
        <Row className="mb-5">
          <Col lg={8} className="mb-4 mb-lg-0">
            <Card className="service-detail-card border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h4 className="mb-3" style={{ color: "#1e3a5f" }}>
                  About This Service
                </h4>
                <p className="text-muted lh-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
                  euismod nulla. Curabitur feugiat, tortor non consequat finibus, justo
                  purus auctor massa, nec semper lorem quam in massa. Pellentesque
                  habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas.
                </p>
              </Card.Body>
            </Card>

            {/* Key Benefits */}
            <Card className="service-detail-card border-0 shadow-sm">
              <Card.Body className="p-4">
                <h4 className="mb-4" style={{ color: "#1e3a5f" }}>
                  Key Benefits & Features
                </h4>
                <Row>
                  <Col md={6} className="mb-3">
                    <div className="benefit-item d-flex">
                      <BsCheckCircle className="me-3 mt-1" style={{ color: "#28a745", fontSize: "20px" }} />
                      <div>
                        <h6 className="mb-2">Expert Specialists</h6>
                        <p className="small text-muted mb-0">
                          Highly qualified and experienced medical professionals
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="benefit-item d-flex">
                      <BsCheckCircle className="me-3 mt-1" style={{ color: "#28a745", fontSize: "20px" }} />
                      <div>
                        <h6 className="mb-2">Advanced Technology</h6>
                        <p className="small text-muted mb-0">
                          State-of-the-art medical equipment and facilities
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="benefit-item d-flex">
                      <BsClock className="me-3 mt-1" style={{ color: "#0066cc", fontSize: "20px" }} />
                      <div>
                        <h6 className="mb-2">Flexible Scheduling</h6>
                        <p className="small text-muted mb-0">
                          Book appointments at your convenience
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="benefit-item d-flex">
                      <BsShieldCheck className="me-3 mt-1" style={{ color: "#17a2b8", fontSize: "20px" }} />
                      <div>
                        <h6 className="mb-2">Complete Privacy</h6>
                        <p className="small text-muted mb-0">
                          Your health data is secure and confidential
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar - Quick Info */}
          <Col lg={4}>
            <Card className="service-info-card border-0 shadow-sm ">
              <Card.Body className="p-4">
                <h5 className="mb-4" style={{ color: "#1e3a5f" }}>
                  Quick Information
                </h5>
                <div className="info-item mb-4 pb-3 border-bottom">
                  <small className="text-muted d-block mb-2">Service Category</small>
                  <h6 className="mb-0">{item.title}</h6>
                </div>
                <div className="info-item mb-4 pb-3 border-bottom">
                  <small className="text-muted d-block mb-2">Availability</small>
                  <h6 className="mb-0">24/7 Available</h6>
                </div>
                <div className="info-item mb-4">
                  <small className="text-muted d-block mb-2">Consultation Fee</small>
                  <h6 className="mb-0">₹500 - ₹2000</h6>
                </div>
                <Button variant="primary" className="w-100 mb-3 rounded-3" size="lg">
                  Book Appointment
                </Button>
                <Button variant="outline-primary" className="w-100 rounded-3">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      

        {/* CTA Section */}
        <div className="cta-section mt-5 p-5 rounded-4" style={{ backgroundColor: "#e6f2ff", border: "2px solid #0066cc" }}>
          <Row className="align-items-center">
            <Col md={8}>
              <h4 className="mb-2" style={{ color: "#1e3a5f" }}>
                Ready to get started?
              </h4>
              <p className="text-muted mb-0">
                Schedule your appointment today and experience world-class healthcare services.
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button variant="primary" size="lg" className="rounded-3 px-4">
                Book Now
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ServicePage;
