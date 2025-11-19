import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import QRCode from "react-qr-code";
import logo from "../src/assets/logo.png";
// ✅ Mock data generator
const generateMockData = () => ({
  name: "Annie Smith",
  address: "123 Green Park, Mumbai",
  age: 32,
  bloodGroup: "O+",
  donorId: "BBS2025-0002",
  profileImg:
    "https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg",
  healthcareLink: "https://healthcare.example.com/patient/john-doe",
  volunteerdonor: "Blood Donor",
  contactNumber: "+91 98765 43210",
  emergencyContact: "+91 91234 56789",
  allergies: "None",

  // ✅ New fields
  companyName: "BBS Global Health Access Pvt. Ltd.",
  licenseNumber: "IRDAI/HEALTH/BBS/2025-0009",
  issueDate: "2025-01-01",
  expiryDate: "2030-01-01",
  languagesSpoken: "English, Hindi, Marathi",
  issuingAuthority: "Dr. R. K. Menon (Director, BBS Health)",
  customerService: {
    phone: "+91 1800 123 4567",
    email: "support@bbsglobalhealth.com",
    website: "https://www.bbsglobalhealth.com",
  },
});

export default function IdentityCard() {
  const [donorType, setDonorType] = useState("all");
  const [mockData, setMockData] = useState(generateMockData());

  useEffect(() => {
    const timer = setTimeout(() => {
      setMockData(generateMockData());
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center h-100 bg-light my-5"
        style={{
          background:
            "linear-gradient(135deg, #e0f7fa 0%, #ffffff 50%, #e3f2fd 100%)",
        }}
      >
        <div className="card-flip">
          <div className="card-flip-inner">
            {/* ✅ Front Side */}
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
                  className="text-white text-center p-3 "
                  style={{
                    borderRadius: "20px 20px 0 0",
                    background:
                      "linear-gradient(90deg, #007bff 0%, #00bcd4 100%)",
                  }}
                >
                  <div className="d-flex align-items-center bg-white p-2 rounded">
                    {/* Logo on the left */}
                    <Image src={logo} width={70} height={70} className="me-3" />

                    {/* Title and subtitle vertically aligned */}
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
                      <small className="text-muted">
                        Digital Identity Card
                      </small>
                    </div>
                  </div>
                </Card.Header>

                <Card.Body className="pt-4 pb-2">
                  <Row className="align-items-center">
                    {/* Left Side - Profile */}
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
                      <div className="small text-muted fw-semibold">
                        Beneficiary
                      </div>
                      <div className="badge bg-info mt-2">
                        {mockData.donorId}
                      </div>
                    </Col>

                    {/* Right Info */}
                    <Col xs={8}>
                      <Row className="small g-2">
                        <Col xs={5} className="fw-bold text-secondary">
                          Name:
                        </Col>
                        <Col xs={7}>{mockData.name}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Address:
                        </Col>
                        <Col xs={7}>{mockData.address}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Age:
                        </Col>
                        <Col xs={7}>{mockData.age}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Blood Group:
                        </Col>
                        <Col xs={7}>{mockData.bloodGroup}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Donor:
                        </Col>
                        <Col xs={7}>{mockData.volunteerdonor}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Contact:
                        </Col>
                        <Col xs={7}>{mockData.contactNumber}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Emergency:
                        </Col>
                        <Col xs={7}>{mockData.emergencyContact}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Allergies:
                        </Col>
                        <Col xs={7}>{mockData.allergies}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <hr className="my-3 border-primary opacity-50" />

                  <div className="d-flex justify-content-around py-3">
                    <div
                      className="p-3 rounded-4 shadow-sm bg-white"
                      style={{
                        border: "2px dashed #007bf4",
                        display: "inline-block",
                      }}
                    >
                      <QRCode
                        value={`${mockData.healthcareLink}?donor=${donorType}`}
                        size={110}
                      />
                    </div>
                  </div>
                  <h6 className="text-center fw-bold">Beneficiary Details</h6>
                  <p className="text-center small text-muted mt-2">
                    Scan to view digital health record
                  </p>
                </Card.Body>

                <Card.Footer
                  className="text-white py-3"
                  style={{
                    background:
                      "linear-gradient(90deg, #007bff 0%, #00bcd4 100%)",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  <h6 className="text-center mb-2 fw-bold">
                    Health Benefits & Services
                  </h6>
                  <ul className="mb-0 small px-4">
                    <li>24x7 Emergency Access</li>
                    <li>Free Annual Health Checkup</li>
                    <li>10% Discount on Medicines</li>
                    <li>Priority Hospital Admission</li>
                    <li>Organ & Blood Donation Support</li>
                    <li>Lifetime Digital Health Record</li>
                  </ul>
                </Card.Footer>
              </Card>
            </div>

            {/* ✅ Back Side */}
            <div className="card-flip-back d-flex flex-column justify-content-center align-items-center text-white p-4">
              <h4 className="fw-bold mb-1">{mockData.companyName}</h4>
              <p className="small text-center mb-4">
                License / Registration No: <b>{mockData.licenseNumber}</b>
              </p>

              <Row className="small text-light w-100 px-4">
                <Col xs={6}>
                  <p>
                    <b>Date of Issue:</b> {mockData.issueDate}
                    <br />
                    <b>Expiry Date:</b> {mockData.expiryDate}
                  </p>
                </Col>
                <Col xs={6}>
                  <p>
                    <b>Languages:</b> <br />
                    {mockData.languagesSpoken}
                  </p>
                </Col>
              </Row>

              <div className="bg-white p-3 rounded-4 my-2">
                <QRCode value={mockData.healthcareLink} size={100} />
              </div>
              <p className="text-center small text-light mt-2 mb-3">
                Scan for Verification / Digital Health Access
              </p>

              <div
                className="bg-white text-dark p-2 rounded shadow-sm text-center small w-100 mx-3"
                style={{ maxWidth: "90%" }}
              >
                <p className="mb-1">
                  <b>Issuing Authority:</b> <br />
                  {mockData.issuingAuthority}
                </p>
                <p className="mb-0">
                  <b>Digital Signature Verified ✔️</b>
                </p>
              </div>

              <div className="mt-4 text-center small text-light">
                <p className="mb-1">
                  ☎️ {mockData.customerService.phone} | ✉️{" "}
                  {mockData.customerService.email}
                </p>
                <a
                  href={mockData.customerService.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-underline"
                >
                  {mockData.customerService.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ✅ Flip Animation Styles */}
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
    </>
  );
}
