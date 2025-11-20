import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/logo.png";

export default function FormCardForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    bloodGroup: "",
    volunteerdonor: "",
    contactNumber: "",
    emergencyContact: "",
    allergies: "",
    email: "",
    companyName: "",
    licenseNumber: "",
    issueDate: "",
    expiryDate: "",
    languagesSpoken: "",
    issuingAuthority: "",
    customerServicePhone: "",
    customerServiceEmail: "",
    profileImgFile: null,
  });

  // FIXED: Normal text handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // FIXED: Remove FileReader & base64 completely
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImgFile: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formToSend = new FormData();

    // Append all text fields
    for (let key in formData) {
      if (key !== "profileImgFile") {
        formToSend.append(key, formData[key]);
      }
    }

    // Append file if selected
    if (formData.profileImgFile) {
      formToSend.append("profileImg", formData.profileImgFile);
    }

    const response = await fetch("http://localhost:5000/api/beneficiary", {
      method: "POST",
      body: formToSend,
    });

    const res = await response.json();

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Identity Card Info Updated Successfully!",
      }).then(() => {
        navigate(`/card/${res.data._id}`);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: res.error,
      });
    }
  };

  return (
    <Container
      fluid
      className="p-3"
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #e0f7fa 0%, #ffffff 50%, #b2ebf2 100%)",
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
                }}
              >
                BBS GLOBAL HEALTH ACCESS
              </h2>
            </div>

            {/* Profile Preview Always Blank (No Base64 Preview) */}
            <div className="text-center mb-3">
              <Image
                src={
                  formData.profileImgFile
                    ? URL.createObjectURL(formData.profileImgFile)
                    : "https://via.placeholder.com/100"
                }
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
              {/* All your existing UI kept unchanged */}
              {/* ---------------- TEXT INPUTS ---------------- */}

              <Row className="g-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      Age
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small text-primary">
                  Address
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control-sm"
                />
              </Form.Group>

              <Row className="g-2 mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      Blood Group
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      Donor Type
                    </Form.Label>
                    <Form.Select
                      name="volunteerdonor"
                      value={formData.volunteerdonor}
                      onChange={handleChange}
                      className="form-control-sm"
                    >
                      <option>Blood Donor</option>
                      <option>Organ Donor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Email */}
              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small text-primary">
                  Email
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control-sm"
                />
              </Form.Group>

              {/* Contact Number */}
              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small text-primary">
                  Contact Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="form-control-sm"
                />
              </Form.Group>

              {/* Emergency Contact */}
              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small text-primary">
                  Emergency Contact
                </Form.Label>
                <Form.Control
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="form-control-sm"
                />
              </Form.Group>

              {/* Allergies */}
              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small text-primary">
                  Allergies
                </Form.Label>
                <Form.Control
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="form-control-sm"
                />
              </Form.Group>

              <hr className="my-3" />

              {/* Hospital Information */}
              <h2 className="fw-bold text-primary mb-2">
                Network Hospital Information
              </h2>

              <Form.Group className="mb-2">
                <Form.Label className="fw-semibold small text-primary">
                  Hospital Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="form-control-sm"
                />
              </Form.Group>

              <Row className="g-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      License Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      Issue Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      Expiry Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small text-primary">
                  Languages Spoken
                </Form.Label>
                <Form.Control
                  type="text"
                  name="languagesSpoken"
                  value={formData.languagesSpoken}
                  onChange={handleChange}
                  className="form-control-sm"
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label className="fw-semibold small text-primary">
                  Issuing Authority
                </Form.Label>
                <Form.Control
                  type="text"
                  name="issuingAuthority"
                  value={formData.issuingAuthority}
                  onChange={handleChange}
                  className="form-control-sm"
                />
              </Form.Group>

              <Row className="g-2 mt-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      Customer Service (Phone)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="customerServicePhone"
                      value={formData.customerServicePhone}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold small text-primary">
                      Customer Service (Email)
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="customerServiceEmail"
                      value={formData.customerServiceEmail}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Photo Upload */}
              <Form.Group className="mb-2 text-start mt-3">
                <Form.Label
                  className="fw-semibold small"
                  style={{ color: "#0d6efd" }}
                >
                  Upload Photo
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="form-control-sm mt-1"
                />
              </Form.Group>

              {/* Submit */}
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
