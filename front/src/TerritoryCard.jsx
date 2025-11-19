import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import QRCode from "react-qr-code";
import logo from "../src/assets/logo.png";
// ✅ Mock data generator with extended employee/vendor/license fields
const generateMockData = () => ({
  // Personal & vendor info
  name: "Annie Smith",
  address: "123 Green Park, Mumbai",
  age: 32,
  bloodGroup: "O+",
  donorId: "BBS2025-0002",
  profileImg:
    "https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg",
  volunteerdonor: "Blood Donor",
  contactNumber: "+91 98765 43210",
  emergencyContact: "+91 91234 56789",
  allergies: "None",
  vendorId: "VEND1234",
  vendorName: "HealthCare Plus",
  services: "Blood Donation, Organ Donation Awareness",
  healthcareLink: "https://healthcare.example.com/patient/john-doe",
  vendorLink: "https://vendor.example.com/profile/VEND1234",
  // Territory fields
  area: "Green Park",
  city: "Mumbai",
  district: "Mumbai Suburban",
  state: "Maharashtra",
  region: "West Zone",

  // ✅ New company/license/employee fields
  companyName: "BBS Global Health",
  licenseNumber: "IRDAI-AG-2025-001",
  licenseIssueDate: "2025-01-01",
  licenseExpiryDate: "2030-01-01",
  languagesSpoken: ["English", "Hindi", "Marathi"],
  employeeName: "Annie Smith",
  role: "Territory Manager",
  territoryCode: "MUM-CENTRAL",
  geoCode: "MUMC01",
  vendorEmployeeID: "EMP-2025-0123",
  validityFrom: "2025-01-01",
  validityUntil: "2030-01-01",
  employeeStatus: "Active",
  assignedManager: "John Doe",
  authorizedProducts: ["Health", "Life"],
  lastBackgroundCheck: "2025-08-15",
  badgeVersion: "v1.0",
  nfcCode: "NFC-2025-089",
  shortVerificationURL: "https://bbs.health/verify/EMP-2025-0123",
  languagePreference: "English",
  geoBoundRules: ["Mumbai Suburban", "Mumbai Central"],
  issuingAuthority: "BBS Global Health Authority",
  signatureImg:
    "https://cdn.pixabay.com/photo/2016/03/31/19/56/signature-1296036_960_720.png", // placeholder
});

export default function VendorIdentityCard() {
  const [formData, setFormData] = useState(generateMockData());

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormData(generateMockData());
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
                  {/* Left Image */}
                  <Col xs={4} className="text-center">
                    <Image
                      src={formData.profileImg}
                      roundedCircle
                      className="border border-3 border-primary shadow-sm mb-2"
                      style={{
                        height: "110px",
                        width: "110px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="small text-muted fw-semibold">
                      {formData.role}
                    </div>
                    <div className="badge bg-info mt-2">
                      {formData.vendorEmployeeID}
                    </div>
                  </Col>

                  {/* Right Info */}
                  <Col xs={8}>
                    <Row className="small g-2">
                      <Col xs={5} className="fw-bold mb-2 text-primary fs-6">
                        Employee:
                      </Col>
                      <Col xs={7} className="mb-2">
                        {formData.employeeName}
                      </Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Title / Role:
                      </Col>
                      <Col xs={7}>{formData.role}</Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        License #:
                      </Col>
                      <Col xs={7}>{formData.licenseNumber}</Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Validity:
                      </Col>
                      <Col xs={7}>
                        {formData.validityFrom} — {formData.validityUntil}
                      </Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Languages:
                      </Col>
                      <Col xs={7}>{formData.languagesSpoken.join(", ")}</Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Territory:
                      </Col>
                      <Col xs={7}>
                        {formData.territoryCode} / {formData.geoCode}
                      </Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Manager:
                      </Col>
                      <Col xs={7}>{formData.assignedManager}</Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Products:
                      </Col>
                      <Col xs={7}>{formData.authorizedProducts.join(", ")}</Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Status:
                      </Col>
                      <Col xs={7}>{formData.employeeStatus}</Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Emergency:
                      </Col>
                      <Col xs={7}>{formData.emergencyContact}</Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Last BG Check:
                      </Col>
                      <Col xs={7}>{formData.lastBackgroundCheck}</Col>

                      <Col xs={5} className="fw-bold text-secondary">
                        Badge / Version:
                      </Col>
                      <Col xs={7}>{formData.badgeVersion}</Col>
                    </Row>
                  </Col>
                </Row>

                <hr className="my-3 border-primary opacity-50" />

                {/* QR Codes */}
                <Row className="text-center">
                  <Col md={6} className="mb-3">
                    <div
                      className="p-3 rounded-4 shadow-sm bg-white"
                      style={{
                        border: "2px dashed #007bf4",
                        display: "inline-block",
                      }}
                    >
                      <QRCode
                        value={`${formData.shortVerificationURL}?id=${formData.vendorEmployeeID}`}
                        size={110}
                      />
                    </div>
                    <div className="small mt-1">Verification QR</div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div
                      className="p-3 rounded-4 shadow-sm bg-white"
                      style={{
                        border: "2px dashed #28a745",
                        display: "inline-block",
                      }}
                    >
                      <QRCode value={formData.nfcCode} size={110} />
                    </div>
                    <div className="small mt-1">NFC / Branch QR</div>
                  </Col>
                </Row>
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
                {/* Signature Section */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h6 className="mb-0 fw-bold">{formData.issuingAuthority}</h6>
                    <small>Authorized Signature</small>
                  </div>
                  <Image
                    src={formData.signatureImg}
                    alt="Signature"
                    style={{ height: "40px", objectFit: "contain" }}
                  />
                </div>

                <h6 className="text-center mb-2 fw-bold">
                  Employee & Vendor Benefits
                </h6>
                <ul className="mb-0 small px-4">
                  <li>24x7 Emergency Access</li>
                  <li>Free Annual Health Checkup</li>
                  <li>Priority Hospital Admission</li>
                  <li>Vendor Services Verification</li>
                  <li>Lifetime Digital Health Record</li>
                  <li>Authorized Product Lines</li>
                </ul>
              </Card.Footer>
            </Card>
          </div>

          {/* Back Side */}
          <div className="card-flip-back d-flex flex-column justify-content-center align-items-center text-white p-4">
            <h4 className="fw-bold">BBS Global Health & Vendor Access</h4>
            <p className="text-center small">
              Digital identity verifies registration as a beneficiary and vendor/
              employee in BBS Health Network.
            </p>
            <Row className="justify-content-center mt-2">
              <Col xs={6} className="text-center">
                <QRCode
                  value={formData.shortVerificationURL}
                  size={100}
                  className="bg-white p-2 rounded"
                />
                <div className="small mt-1">Verification QR</div>
              </Col>
              <Col xs={6} className="text-center">
                <QRCode
                  value={formData.nfcCode}
                  size={100}
                  className="bg-white p-2 rounded"
                />
                <div className="small mt-1">NFC / Branch QR</div>
              </Col>
            </Row>
            <small className="mt-3 text-light">
              Scan for Verification or Field Access
            </small>
          </div>
        </div>
      </div>

      <style>{`
        .card-flip { perspective: 1000px; }
        .card-flip-inner {
          position: relative;
          width: 36rem;
          transform-style: preserve-3d;
          transition: transform 0.8s;
        }
        .card-flip:hover .card-flip-inner { transform: rotateY(180deg); }
        .card-flip-front, .card-flip-back {
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
    </Container>
  );
}
