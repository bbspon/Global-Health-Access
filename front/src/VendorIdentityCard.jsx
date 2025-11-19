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
  signature:
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/Signature_example.png",
  companyName: "HealthCare Pvt Ltd",
  licenseNumber: "IRDAI/AGT/54872/MH/2025",
  dateOfIssue: "2023-01-01",
  expiryDate: "2026-12-31",
  languages: "English, Hindi",
  vendorId: "VEND1234",
  vendorName: "HealthCare Plus",
  regionalCode: "MH-01",
  healthcareLink: "https://healthcare.example.com/patient/john-doe",
  vendorLink: "https://vendor.example.com/profile/VEND1234",
  volunteerdonor: "Blood Donor",
  contactNumber: "+91 98765 43210",
  emergencyContact: "+91 91234 56789",
  allergies: "None",
  services: "Blood Donation, Organ Donation Awareness",
});

export default function VendorIdentityCard() {
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
            {/* Front Side */}
            <div className="card-flip-front">
              <Card
                className="shadow-lg border-0 p-3"
                style={{
                  width: "36rem",
                  borderRadius: "25px",
                  background: "rgba(255, 255, 255, 0.95)",
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
                    {/* Left Image & Signature */}
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
                      <div className="small text-muted fw-semibold">Beneficiary</div>
                      <div className="badge bg-info mt-2">{mockData.donorId}</div>
                      <Image
                        src={mockData.signature}
                        rounded
                        className="mt-3"
                        style={{ height: "50px", width: "120px", objectFit: "contain" }}
                      />
                      <div className="small text-muted">Signature</div>
                    </Col>

                    {/* Right Info */}
                    <Col xs={8}>
                      <Row className="small g-2">
                        <Col xs={5} className="fw-bold text-primary fs-6">Name:</Col>
                        <Col xs={7}>{mockData.name}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Address:</Col>
                        <Col xs={7}>{mockData.address}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Age:</Col>
                        <Col xs={7}>{mockData.age}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Blood Group:</Col>
                        <Col xs={7}>{mockData.bloodGroup}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Donor:</Col>
                        <Col xs={7}>{mockData.volunteerdonor}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Contact:</Col>
                        <Col xs={7}>{mockData.contactNumber}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Emergency:</Col>
                        <Col xs={7}>{mockData.emergencyContact}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Allergies:</Col>
                        <Col xs={7}>{mockData.allergies}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Vendor Name:</Col>
                        <Col xs={7}>{mockData.vendorName}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Vendor ID:</Col>
                        <Col xs={7}>{mockData.vendorId}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Services:</Col>
                        <Col xs={7}>{mockData.services}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Company:</Col>
                        <Col xs={7}>{mockData.companyName}</Col>

                        <Col xs={5} className="fw-bold text-secondary">License No:</Col>
                        <Col xs={7}>{mockData.licenseNumber}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Date of Issue:</Col>
                        <Col xs={7}>{mockData.dateOfIssue}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Expiry Date:</Col>
                        <Col xs={7}>{mockData.expiryDate}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Languages:</Col>
                        <Col xs={7}>{mockData.languages}</Col>

                        <Col xs={5} className="fw-bold text-secondary">Regional Code:</Col>
                        <Col xs={7}>{mockData.regionalCode}</Col>
                      </Row>
                    </Col>
                  </Row>

                  <hr className="my-3 border-primary opacity-50" />

                  {/* QR Codes */}
                  <Row className="text-center">
                    <Col md={6} className="mb-3">
                      <div
                        className="p-3 rounded-4 shadow-sm bg-white"
                        style={{ border: "2px dashed #007bf4", display: "inline-block" }}
                      >
                        <QRCode
                          value={`${mockData.healthcareLink}?donor=${donorType}`}
                          size={110}
                        />
                      </div>
                      <div className="small mt-1">Personal Health QR</div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div
                        className="p-3 rounded-4 shadow-sm bg-white"
                        style={{ border: "2px dashed #28a745", display: "inline-block" }}
                      >
                        <QRCode
                          value={`${mockData.vendorLink}?vendor=${mockData.vendorId}`}
                          size={110}
                        />
                      </div>
                      <div className="small mt-1">Vendor QR</div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>

            {/* Back Side */}
            <div className="card-flip-back d-flex flex-column justify-content-center align-items-center text-white p-4">
              <h4 className="fw-bold">BBS Global Health & Vendor Access</h4>
              <p className="text-center small">
                This digital identity verifies your registration as a beneficiary
                and vendor in BBS Health Network. Scan the QR codes for access to
                medical records, vendor services, and hospital privileges.
              </p>
              <Row className="justify-content-center mt-2">
                <Col xs={6} className="text-center">
                  <QRCode
                    value={mockData.healthcareLink}
                    size={100}
                    className="bg-white p-2 rounded"
                  />
                  <div className="small mt-1">Health QR</div>
                </Col>
                <Col xs={6} className="text-center">
                  <QRCode
                    value={mockData.vendorLink}
                    size={100}
                    className="bg-white p-2 rounded"
                  />
                  <div className="small mt-1">Vendor QR</div>
                </Col>
              </Row>
              <small className="mt-3 text-light">
                Scan for Emergency or Vendor Verification
              </small>
            </div>
          </div>
        </div>
      </Container>

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
        .card-flip-front { transform: rotateY(0deg); }
        .card-flip-back {
          background: linear-gradient(135deg, #007bff, #00bcd4);
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
}
