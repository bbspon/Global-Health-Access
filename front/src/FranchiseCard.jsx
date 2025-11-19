import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import QRCode from "react-qr-code";
import logo from "../src/assets/logo.png";
import signatureImg from "../src/assets/logo.png"; // Add signature image in assets

// ✅ Mock data generator for franchises
const generateFranchiseData = () => ({
  name: "Annie Smith",
  address: "123 Green Park, Mumbai",
  franchiseId: "FRAN2025-0002",
  profileImg:
    "https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg",
  franchiseType: "Healthcare Franchise",
  contactNumber: "+91 98765 43210",
  emergencyContact: "+91 91234 56789",
  services: "Blood Donation, Organ Donation Awareness",
  parentCompanyId: "ORG1234",
  parentCompanyName: "HealthCare Plus",
  area: "Andheri",
  city: "Mumbai",
  district: "Mumbai Suburban",
  state: "Maharashtra",
  region: "West Zone",
  franchiseLink: "https://healthcare.example.com/franchise/fran2025-0002",
  parentCompanyLink: "https://parentcompany.example.com/ORG1234",
  companyName: "HealthCare Plus Pvt. Ltd.",
  licenseNumber: "LIC2025-9876",
  dateOfIssue: "2025-01-15",
  expiryDate: "2030-01-14",
  languagesSpoken: "English, Hindi, Marathi",
});

export default function FranchiseCard() {
  const [mockData, setMockData] = useState(generateFranchiseData());

  useEffect(() => {
    const timer = setTimeout(() => {
      setMockData(generateFranchiseData());
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center h-100 bg-light my-5"
      style={{
        background:
          "linear-gradient(135deg, #e0f7fa 0%, #ffffff 50%, #e3f2fd 100%)",
      }}
    >
      <div className="card-flip">
        {/* Front Side */}
        <div className="card-flip-inner">
          <div className="card-flip-front">
            <Card
              className="shadow-lg border-0 p-3"
              style={{
                width: "32rem",
                borderRadius: "25px",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
              }}
            >
              <Card.Header
                className="text-white text-center py-3"
                style={{
                  borderRadius: "20px 20px 0 0",
                  background:
                    "linear-gradient(90deg, #007bff 0%, #00bcd4 100%)",
                }}
              >
                <div className="d-flex align-items-center bg-white p-2 rounded">
                  <Image src={logo} width={70} height={70} className="me-3" />
                  <div className="text-center flex-grow-1">
                    <h4
                      className="fw-bold text-uppercase mb-0"
                      style={{
                        fontSize: "22px",
                        letterSpacing: "1px",
                        background:
                          "linear-gradient(90deg, #007bff 0%, #00bcd4 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      BBS Global Health Access
                    </h4>
                    <small className="text-muted">Digital Identity Card</small>
                  </div>
                </div>
              </Card.Header>

              <Card.Body className="pt-4 pb-2">
                {/* Profile & Basic Info */}
                <Row className="align-items-center">
                  <Col xs={4} className="text-center">
                    <Image
                      src={mockData.profileImg}
                      roundedCircle
                      className="border border-3 border-primary shadow-sm mb-2"
                      style={{
                        height: "110px",
                        width: "110px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="small text-muted fw-semibold">Franchise</div>
                    <div className="badge bg-info mt-2">{mockData.franchiseId}</div>
                  </Col>

                  <Col xs={8}>
                    <Row className="small g-2">
                      <Col xs={5} className="fw-bold mb-2 text-primary fs-5">
                        Name:
                      </Col>
                      <Col xs={7} className="fw-bold mb-2 text-primary fs-5">
                        {mockData.name}
                      </Col>

                      <Col xs={5} className="fw-bold text-secondary">Type:</Col>
                      <Col xs={7}>{mockData.franchiseType}</Col>

                      <Col xs={5} className="fw-bold text-secondary">Address:</Col>
                      <Col xs={7}>{mockData.address}</Col>

                      <Col xs={5} className="fw-bold text-secondary">Contact:</Col>
                      <Col xs={7}>{mockData.contactNumber}</Col>

                      <Col xs={5} className="fw-bold text-secondary">Emergency:</Col>
                      <Col xs={7}>{mockData.emergencyContact}</Col>

                      <Col xs={5} className="fw-bold text-secondary">Services:</Col>
                      <Col xs={7}>{mockData.services}</Col>

                      <Col xs={5} className="fw-bold text-secondary">Area:</Col>
                      <Col xs={7}>{mockData.area}</Col>

                      <Col xs={5} className="fw-bold text-secondary">City:</Col>
                      <Col xs={7}>{mockData.city}</Col>

                      <Col xs={5} className="fw-bold text-secondary">District:</Col>
                      <Col xs={7}>{mockData.district}</Col>

                      <Col xs={5} className="fw-bold text-secondary">State:</Col>
                      <Col xs={7}>{mockData.state}</Col>

                      <Col xs={5} className="fw-bold text-secondary">Region:</Col>
                      <Col xs={7}>{mockData.region}</Col>
                    </Row>
                  </Col>
                </Row>

                <hr className="my-3 border-primary opacity-50" />

                {/* License & Additional Info */}
                <Row className="g-2 mb-3">
                  <Col xs={6} className="fw-bold text-secondary">Company Name:</Col>
                  <Col xs={6}>{mockData.companyName}</Col>

                  <Col xs={6} className="fw-bold text-secondary">License / Registration No:</Col>
                  <Col xs={6}>{mockData.licenseNumber}</Col>

                  <Col xs={6} className="fw-bold text-secondary">Date of Issue:</Col>
                  <Col xs={6}>{mockData.dateOfIssue}</Col>

                  <Col xs={6} className="fw-bold text-secondary">Expiry Date:</Col>
                  <Col xs={6}>{mockData.expiryDate}</Col>

                  <Col xs={6} className="fw-bold text-secondary">Languages Spoken:</Col>
                  <Col xs={6}>{mockData.languagesSpoken}</Col>

                  <Col xs={6} className="fw-bold text-secondary">Signature:</Col>
                  <Col xs={6}>
                    <Image
                      src={signatureImg}
                      style={{ height: "40px", objectFit: "contain" }}
                    />
                  </Col>
                </Row>

                {/* QR Codes */}
                <div className="d-flex justify-content-around py-3">
                  <div
                    className="p-3 rounded-4 shadow-sm bg-white"
                    style={{ border: "2px dashed #007bf4", display: "inline-block" }}
                  >
                    <QRCode value={mockData.franchiseLink} size={110} />
                  </div>

                  <div
                    className="p-3 rounded-4 shadow-sm bg-white"
                    style={{ border: "2px dashed #28a745", display: "inline-block" }}
                  >
                    <QRCode value={mockData.parentCompanyLink} size={110} />
                  </div>
                </div>

                <h5 className="text-center">Franchise Detail</h5>
                <p className="text-center small text-muted mt-2">
                  Scan to view franchise or parent company info
                </p>
              </Card.Body>

              <Card.Footer
                className="text-white py-3"
                style={{
                  background: "linear-gradient(90deg, #007bff 0%, #00bcd4 100%)",
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <h6 className="text-center mb-2 fw-bold">Services & Benefits</h6>
                <ul className="mb-0 small px-4">
                  <li>24x7 Emergency Support</li>
                  <li>Franchise Network Access</li>
                  <li>Healthcare Awareness Programs</li>
                  <li>Priority Supply & Inventory</li>
                  <li>Training & Workshops</li>
                  <li>Digital Record Management</li>
                </ul>
              </Card.Footer>
            </Card>
          </div>

          {/* Back Side */}
          <div className="card-flip-back d-flex flex-column justify-content-center align-items-center text-white p-4">
            <h4 className="fw-bold">{mockData.parentCompanyName}</h4>
            <p className="text-center small">
              This digital identity verifies your registration as a franchise of BBS Health Network.
              Use it to manage operations, access parent company resources, and showcase services.
            </p>
            <QRCode
              value={mockData.franchiseLink}
              size={120}
              className="bg-white p-2 rounded"
            />
            <small className="mt-3 text-light">Scan for Quick Access & Verification</small>
          </div>
        </div>
      </div>

      <style>
        {`
        .card-flip {
          perspective: 1000px;
        }

        .card-flip-inner {
          position: relative;
          width: 32rem;
          transform-style: preserve-3d;
          transition: transform 0.8s;
        }

        .card-flip:hover .card-flip-inner {
          transform: rotateY(180deg);
        }

        .card-flip-front,
        .card-flip-back {
          position: absolute;
          width: 100%;
          backface-visibility: hidden;
          border-radius: 25px;
          overflow: hidden;
        }

        .card-flip-front {
          transform: rotateY(0deg);
        }

        .card-flip-back {
          background: linear-gradient(135deg, #007bff, #00bcd4);
          transform: rotateY(180deg);
        }
        `}
      </style>
    </Container>
  );
}
