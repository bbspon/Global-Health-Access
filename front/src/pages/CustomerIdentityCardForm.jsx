import React, { useState, useEffect } from "react";
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
import logo from "../assets/logo.png";
import axios from "axios";

// NEW — IMPORT FROM UPDATED authAPI
import { getUserId } from "../services/authAPI";

export default function CustomerIdentityCardForm() {
  const navigate = useNavigate();

  // ALWAYS GET VALID USER ID
  const userId = getUserId();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    bloodGroup: "",
    contactNumber: "",
    emergencyContact: "",
    allergies: "",
    medicalHistory: "",
    insuranceProvider: "",
    insuranceNumber: "",
    dateOfIssue: "",
    expiryDate: "",
    profileImg: "",
    signature: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  // LOAD EXISTING DATA
  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/customer-identity/${userId}`
        );

        if (res.data.success && res.data.identity) {
          setFormData({
            ...formData,
            name: res.data.identity.fullName || "",
            age: res.data.identity.age || "",
            bloodGroup: res.data.identity.bloodGroup || "",
            address: res.data.identity.address || "",
            contactNumber: res.data.identity.contactNumber || "",
            emergencyContact: res.data.identity.emergencyContact || "",
            allergies: res.data.identity.allergies || "",
            medicalHistory: res.data.identity.medicalHistory || "",
            insuranceProvider: res.data.identity.insuranceProvider || "",
            insuranceNumber: res.data.identity.insuranceNumber || "",
            dateOfIssue: res.data.identity.dateOfIssue || "",
            expiryDate: res.data.identity.expiryDate || "",
            profileImg: res.data.identity.photo
              ? `http://localhost:5000/uploads/customeridentity/${res.data.identity.photo}`
              : "",
            signature: res.data.identity.signature
              ? `http://localhost:5000/uploads/customeridentity/${res.data.identity.signature}`
              : "",
          });
        }
      } catch (error) {
        console.log("Fetch Identity Error:", error);
      }
    }

    fetchData();
  }, [userId]);

  // FORM INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (!e.target.files[0]) return;
    setPhotoFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, profileImg: reader.result }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSignatureChange = (e) => {
    if (!e.target.files[0]) return;
    setSignatureFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, signature: reader.result }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      Swal.fire("Error", "User not logged in", "error");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("userId", userId);

      fd.append("fullName", formData.name);
      fd.append("age", formData.age);
      fd.append("bloodGroup", formData.bloodGroup);
      fd.append("address", formData.address);
      fd.append("contactNumber", formData.contactNumber);
      fd.append("emergencyContact", formData.emergencyContact);
      fd.append("allergies", formData.allergies);
      fd.append("medicalHistory", formData.medicalHistory);
      fd.append("insuranceProvider", formData.insuranceProvider);
      fd.append("insuranceNumber", formData.insuranceNumber);
      fd.append("dateOfIssue", formData.dateOfIssue);
      fd.append("expiryDate", formData.expiryDate);

      if (photoFile) fd.append("photo", photoFile);
      if (signatureFile) fd.append("signature", signatureFile);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/customer-identity/save`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated Successfully!",
          text: "Customer identity details saved!",
          confirmButtonColor: "#0dcaf0",
        }).then(() => navigate(`/customerIdcard/${userId}`));
      }
    } catch (error) {
      console.log("Update Error:", error);
      Swal.fire("Error", "Failed to update details", "error");
    }
  };

  return (
    <Container
      fluid
      className="p-3"
      style={{
        minHeight: "100vh",
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

            <div className="text-center mb-3">
              <Image
                src={formData.profileImg}
                roundedCircle
                width={100}
                height={100}
                style={{ border: "3px solid #0dcaf0" }}
                className="shadow-sm"
              />
              <h5 className="mt-2 fw-bold" style={{ color: "#0d6efd" }}>
                Customer Identity Form
              </h5>
              <p className="text-muted small">Update your health ID details</p>
            </div>

            <Form onSubmit={handleSubmit}>
              {/* PERSONAL DETAILS */}
              <Row className="g-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      className="fw-semibold small"
                      style={{ color: "#0d6efd" }}
                    >
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

                <Col md={3}>
                  <Form.Group>
                    <Form.Label
                      className="fw-semibold small"
                      style={{ color: "#0d6efd" }}
                    >
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

                <Col md={3}>
                  <Form.Group>
                    <Form.Label
                      className="fw-semibold small"
                      style={{ color: "#0d6efd" }}
                    >
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
              </Row>

              {/* Address */}
              <Form.Group className="mt-2">
                <Form.Label
                  className="fw-semibold small"
                  style={{ color: "#0d6efd" }}
                >
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

              {/* Contact */}
              <Form.Group className="mt-2">
                <Form.Label
                  className="fw-semibold small"
                  style={{ color: "#0d6efd" }}
                >
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

              <Form.Group className="mt-2">
                <Form.Label
                  style={{ color: "#0d6efd" }}
                  className="fw-semibold small"
                >
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

              {/* Medical Info */}
              <Row className="g-2 mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ color: "#0d6efd" }}
                      className="fw-semibold small"
                    >
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
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ color: "#0d6efd" }}
                      className="fw-semibold small"
                    >
                      Medical History
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Insurance */}
              <Row className="g-2 mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ color: "#0d6efd" }}
                      className="fw-semibold small"
                    >
                      Insurance Provider
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ color: "#0d6efd" }}
                      className="fw-semibold small"
                    >
                      Insurance Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="insuranceNumber"
                      value={formData.insuranceNumber}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Dates */}
              <Row className="g-2 mt-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ color: "#0d6efd" }}
                      className="fw-semibold small"
                    >
                      Date of Issue
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfIssue"
                      value={formData.dateOfIssue}
                      onChange={handleChange}
                      className="form-control-sm"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ color: "#0d6efd" }}
                      className="fw-semibold small"
                    >
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

              {/* Uploads */}
              <Row className="g-2 mt-3">
                <Col md={6}>
                  <Form.Group>
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
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      className="fw-semibold small"
                      style={{ color: "#0d6efd" }}
                    >
                      Upload Signature
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleSignatureChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

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
                  Save Details
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
