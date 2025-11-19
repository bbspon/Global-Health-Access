import React, { useState } from "react";
import { Card, Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; 
import logo from "../src/assets/logo.png";

export default function VendorIdentityCardForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Annie Smith",
    address: "123 Green Park, Mumbai",
    age: 32,
    bloodGroup: "O+",
    donorId: "BBS2025-0002",
    profileImg:
      "https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg",
    volunteerdonor: "Blood Donor",
    contactNumber: "+91 98765 43210",
    emergencyContact: "none",
    allergies: "none",
    vendorId: "VEND1234",
    vendorName: "HealthCare Plus",
    services: "Blood Donation, Organ Donation Awareness",
    companyName: "HealthCare Pvt Ltd",
    licenseNumber: "IRDAI/AGT/54872/MH/2025",
    dateOfIssue: "2023-01-01",
    expiryDate: "2026-12-31",
    languages: "English, Hindi",
    regionalCode: "MH-01",
    signature: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profileImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, signature: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Identity card info updated successfully!",
      confirmButtonColor: "#0dcaf0",
    }).then(() => {
      navigate("/vendorcard");
    });
  };

  return (
    <Container
      fluid
      className="p-3"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 50%, #b2ebf2 100%)",
      }}
    >
      <Row className="justify-content-center align-items-end m-2">
        <Col md={8}>
          <Card
            className="p-5 shadow-sm border-0"
            style={{
              borderRadius: "15px",
              background: "#ffffff",
              boxShadow: "0 8px 20px rgba(0, 123, 255, 0.1)",
            }}
          >
            {/* Header */}
            <div className="d-flex align-items-center justify-content-center gap-3 mb-4 border-bottom pb-3">
              <Image src={logo} width={70} height={70} />
              <h2
                className="fw-bold text-uppercase text-center"
                style={{
                  fontSize: "22px",
                  letterSpacing: "1px",
                  background: "linear-gradient(to right, #5462e0, #20c997)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                BBS GLOBAL HEALTH ACCESS
              </h2>
            </div>

            {/* Profile */}
            <div className="text-center mb-3">
              <Image
                src={formData.profileImg}
                roundedCircle
                width={100}
                height={100}
                className="shadow-sm"
                style={{ border: "3px solid #0dcaf0" }}
              />
              <h5 className="mt-2 fw-bold" style={{ color: "#0d6efd" }}>
                Update Identity Card
              </h5>
              <p className="text-muted small">Keep your details up to date</p>
            </div>

            <Form onSubmit={handleSubmit}>
              {/* Personal Info */}
              <Row className="g-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control-sm"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Group>

              <Row className="g-2 mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Blood Group</Form.Label>
                    <Form.Control
                      type="text"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Donor Type</Form.Label>
                    <Form.Select
                      name="volunteerdonor"
                      value={formData.volunteerdonor}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    >
                      <option>Blood Donor</option>
                      <option>Organ Donor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Contact Info */}
              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="form-control-sm"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Emergency Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="form-control-sm"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Allergies</Form.Label>
                <Form.Control
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="form-control-sm"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Group>

              {/* Vendor Info */}
              <Row className="g-2 mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Vendor ID / License Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="vendorId"
                      value={formData.vendorId}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Vendor Name / Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Services</Form.Label>
                <Form.Control
                  type="text"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  className="form-control-sm"
                  style={{ borderRadius: "8px" }}
                />
              </Form.Group>

              {/* License / Registration Details */}
              <Row className="g-2 mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>License / Registration Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Date of Issue</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfIssue"
                      value={formData.dateOfIssue}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Expiry Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-2 mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Languages Spoken</Form.Label>
                    <Form.Control
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Regional Code / License Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="regionalCode"
                      value={formData.regionalCode}
                      onChange={handleChange}
                      className="form-control-sm"
                      style={{ borderRadius: "8px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Upload Photo and Signature */}
              <Row className="g-2 mt-3">
                <Col md={6}>
                  <Form.Group className="mb-2 text-start">
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Upload Photo</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="form-control-sm mt-1"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2 text-start">
                    <Form.Label className="fw-semibold small" style={{ color: "#0d6efd" }}>Upload Signature</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureChange}
                      className="form-control-sm mt-1"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid mt-3">
                <Button
                  type="submit"
                  className="py-1 fw-bold small"
                  style={{
                    borderRadius: "10px",
                    background: "linear-gradient(to right, #0dcaf0, #198754)",
                    border: "none",
                  }}
                >
                  Update Info
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
