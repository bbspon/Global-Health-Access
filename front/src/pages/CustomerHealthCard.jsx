import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import QRCode from "react-qr-code";
import logo from "../assets/logo.png";

// 🔹 Mock Data (Customer Version)
const generateMockData = () => ({
  name: "Annie Smith",
  address: "123 Green Park, Mumbai",
  age: 32,
  bloodGroup: "O+",
  cardId: "BBS-CUST-2025-0002",
  profileImg:
    "https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg",
  signature:
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/Signature_example.png",
  healthcareLink: "https://healthcare.example.com/profile/patientId",
  emergencyQR: "https://healthcare.example.com/emergency?id=0002",
  contactNumber: "+91 98765 43210",
  emergencyContact: "+91 91234 56789",
  allergies: "None",
  issuedBy: "BBS Global Health Services",
  membershipLevel: "Premium Healthcare Member",
  dateOfIssue: "2023-01-01",
  expiryDate: "2026-12-31",
});

export default function CustomerHealthCard() {
  const [mockData, setMockData] = useState(generateMockData());

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center h-100 bg-light w-100"
        style={{
          background:
            "linear-gradient(135deg, #e0f7fa 0%, #ffffff 50%, #e3f2fd 100%)",
        }}
      >
        <div className="card-flip">
          <div className="card-flip-inner">
            
            {/* ================= FRONT SIDE =============== */}
            <div className="card-flip-front">
              <Card
                className="shadow-lg border-0 p-3"
                style={{
                  width: "36rem",
                  borderRadius: "25px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
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
                        BBS Global Health Network
                      </h4>
                      <small className="text-muted">
                        Customer Health Identity Card
                      </small>
                    </div>
                  </div>
                </Card.Header>

                <Card.Body className="pt-4 pb-2">
                  <Row className="align-items-center">
                    
                    {/* LEFT SIDE IMAGE */}
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
                      <div className="small text-muted fw-semibold">Customer</div>
                      <div className="badge bg-primary mt-2">{mockData.cardId}</div>

                      <Image
                        src={mockData.signature}
                        rounded
                        className="mt-3"
                        style={{
                          height: "50px",
                          width: "120px",
                          objectFit: "contain",
                        }}
                      />
                      <div className="small text-muted">Signature</div>
                    </Col>

                    {/* RIGHT DETAILS */}
                    <Col xs={8}>
                      <Row className="small g-2">
                        <Col xs={5} className="fw-bold text-primary fs-6">
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
                          Phone:
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

                        <Col xs={5} className="fw-bold text-secondary">
                          Membership:
                        </Col>
                        <Col xs={7}>{mockData.membershipLevel}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Issued By:
                        </Col>
                        <Col xs={7}>{mockData.issuedBy}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Valid From:
                        </Col>
                        <Col xs={7}>{mockData.dateOfIssue}</Col>

                        <Col xs={5} className="fw-bold text-secondary">
                          Valid Till:
                        </Col>
                        <Col xs={7}>{mockData.expiryDate}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <hr className="my-3 border-primary opacity-50" />

                  {/* QR CODES */}
                  <Row className="text-center">
                    <Col md={6} className="mb-3">
                      <div
                        className="p-3 rounded-4 shadow-sm bg-white"
                        style={{ border: "2px dashed #007bf4", display: "inline-block" }}
                      >
                        <QRCode value={mockData.healthcareLink} size={110} />
                      </div>
                      <div className="small mt-1">Health Profile QR</div>
                    </Col>

                    <Col md={6} className="mb-3">
                      <div
                        className="p-3 rounded-4 shadow-sm bg-white"
                        style={{ border: "2px dashed #ff4d4d", display: "inline-block" }}
                      >
                        <QRCode value={mockData.emergencyQR} size={110} />
                      </div>
                      <div className="small mt-1">Emergency Access QR</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>

            {/* ================= BACK SIDE ================= */}
            <div className="card-flip-back d-flex flex-column justify-content-center align-items-center text-white p-4">
              <h4 className="fw-bold">Emergency & Health Access</h4>
              <p className="text-center small">
                This card verifies your health membership and enables medical
                access during emergencies. Scan the QR codes to view records
                and contact emergency services.
              </p>

              <Row className="justify-content-center mt-2">
                <Col xs={6} className="text-center">
                  <QRCode
                    value={mockData.healthcareLink}
                    size={100}
                    className="bg-white p-2 rounded"
                  />
                  <div className="small mt-1">Health Record</div>
                </Col>

                <Col xs={6} className="text-center">
                  <QRCode
                    value={mockData.emergencyQR}
                    size={100}
                    className="bg-white p-2 rounded"
                  />
                  <div className="small mt-1">Emergency Support</div>
                </Col>
              </Row>

              <small className="mt-3 text-light">
                Scan for Instant Medical Assistance
              </small>
            </div>
          </div>
        </div>
      </Container>

      {/* ========= CSS ========= */}
      <style>{`
        .card-flip {
          perspective: 1000px;
        }
        .card-flip-inner {
          position: relative;
          width: 36rem;
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
      `}</style>
    </>
  );
}
