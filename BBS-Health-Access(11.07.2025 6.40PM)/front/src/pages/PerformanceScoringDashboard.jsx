// PerformanceScoringDashboard.jsx

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Carousel,
} from "react-bootstrap";

const doctorsSample = [
  {
    id: 1,
    name: "Dr. Asha Kumar",
    specialty: "Pediatrics",
    rating: 4.7,
    empathyScore: 4.8,
    consultationTimeliness: "On time",
    prescriptionAccuracy: 99,
    outcomeScore: 4.5,
    followUpCompliance: 90,
    communicationClarity: 4.7,
  },
  {
    id: 2,
    name: "Dr. Rajesh Mehta",
    specialty: "Cardiology",
    rating: 4.3,
    empathyScore: 4.0,
    consultationTimeliness: "Delayed 10 min",
    prescriptionAccuracy: 95,
    outcomeScore: 4.2,
    followUpCompliance: 85,
    communicationClarity: 4.4,
  },
  // Add more doctors as needed
];

const hospitalsSample = [
  {
    id: 1,
    name: "ABC City Hospital",
    bedAvailability: 85,
    hygieneRating: 4.5,
    equipmentReadiness: 97,
    staffBehavior: 4.6,
    queueManagement: "Excellent",
    billingTransparency: "Clear",
    emergencyResponseTime: "5 mins",
    patientSafetyIndex: 98,
  },
  {
    id: 2,
    name: "Sunrise Medical Center",
    bedAvailability: 65,
    hygieneRating: 4.0,
    equipmentReadiness: 90,
    staffBehavior: 4.2,
    queueManagement: "Good",
    billingTransparency: "Mostly Clear",
    emergencyResponseTime: "7 mins",
    patientSafetyIndex: 95,
  },
  // Add more hospitals as needed
];

export default function PerformanceScoringDashboard() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareHospitals, setCompareHospitals] = useState([]);
  const [userSymptoms, setUserSymptoms] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const closeDoctorModal = () => {
    setShowDoctorModal(false);
    setSelectedDoctor(null);
  };

  const openCompareModal = () => setShowCompareModal(true);
  const closeCompareModal = () => setShowCompareModal(false);

  const handleSymptomSearch = () => {
    const keywords = userSymptoms.toLowerCase().split(" ");
    const filtered = doctorsSample.filter((doc) =>
      keywords.some((kw) => doc.specialty.toLowerCase().includes(kw))
    );
    setSearchResults(filtered.length ? filtered : doctorsSample);
  };

  const toggleCompareHospital = (hospital) => {
    if (compareHospitals.some((h) => h.id === hospital.id)) {
      setCompareHospitals(compareHospitals.filter((h) => h.id !== hospital.id));
    } else {
      setCompareHospitals([...compareHospitals, hospital].slice(0, 3)); // max 3
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4 text-primary">
        Hospital & Doctor Performance Scoring Engine
      </h2>

      {/* Symptom Input & Search */}
      <Card className="mb-4">
        <Card.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSymptomSearch();
            }}
          >
            <Form.Group controlId="symptomsInput">
              <Form.Label>Enter your symptoms or care need</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. pediatric fever, chest pain"
                value={userSymptoms}
                onChange={(e) => setUserSymptoms(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" className="mt-2" type="submit">
              Find Best Doctors
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Search Results */}
      <h4>Doctor Matches</h4>
      {searchResults.length === 0 && (
        <p>No matches yet. Enter symptoms above and search.</p>
      )}
      <Row>
        {searchResults.map((doc) => (
          <Col md={4} key={doc.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{doc.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {doc.specialty}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Rating:</strong> {doc.rating} ⭐ <br />
                  <strong>Empathy Score:</strong> {doc.empathyScore} <br />
                  <strong>Consultation Timeliness:</strong>{" "}
                  {doc.consultationTimeliness} <br />
                  <strong>Outcome Score:</strong> {doc.outcomeScore} <br />
                </Card.Text>
                <Button variant="info" size="sm" onClick={() => openDoctorModal(doc)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Doctor Detail Modal */}
      <Modal show={showDoctorModal} onHide={closeDoctorModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDoctor?.name} - Performance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <>
              <Table bordered striped>
                <tbody>
                  <tr>
                    <td>Specialty</td>
                    <td>{selectedDoctor.specialty}</td>
                  </tr>
                  <tr>
                    <td>Patient Rating Avg.</td>
                    <td>{selectedDoctor.rating} ⭐</td>
                  </tr>
                  <tr>
                    <td>Empathy Score</td>
                    <td>{selectedDoctor.empathyScore}</td>
                  </tr>
                  <tr>
                    <td>Consultation Timeliness</td>
                    <td>{selectedDoctor.consultationTimeliness}</td>
                  </tr>
                  <tr>
                    <td>Prescription Accuracy (%)</td>
                    <td>{selectedDoctor.prescriptionAccuracy}%</td>
                  </tr>
                  <tr>
                    <td>Outcome-Based Score</td>
                    <td>{selectedDoctor.outcomeScore}</td>
                  </tr>
                  <tr>
                    <td>Follow-Up Compliance (%)</td>
                    <td>{selectedDoctor.followUpCompliance}%</td>
                  </tr>
                  <tr>
                    <td>Communication Clarity</td>
                    <td>{selectedDoctor.communicationClarity}</td>
                  </tr>
                </tbody>
              </Table>

              {/* Coming Soon / Disabled Buttons */}
              <Button variant="secondary" className="me-2" disabled>
                Voice Feedback (Coming Soon)
              </Button>
              <Button variant="secondary" disabled>
                Download Performance Report (Coming Soon)
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDoctorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Hospitals Section */}
      <h4 className="mt-5">Hospitals & Facilities</h4>
      <Row>
        {hospitalsSample.map((hosp) => (
          <Col md={4} key={hosp.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{hosp.name}</Card.Title>
                <Card.Text>
                  <strong>Bed Availability:</strong> {hosp.bedAvailability}% <br />
                  <strong>Hygiene Rating:</strong> {hosp.hygieneRating} ⭐ <br />
                  <strong>Equipment Readiness:</strong> {hosp.equipmentReadiness}% <br />
                  <strong>Staff Behavior:</strong> {hosp.staffBehavior} ⭐ <br />
                  <strong>Queue Management:</strong> {hosp.queueManagement} <br />
                  <strong>Billing Transparency:</strong> {hosp.billingTransparency} <br />
                  <strong>Emergency Response Time:</strong> {hosp.emergencyResponseTime}{" "}
                  <br />
                  <strong>Patient Safety Index:</strong> {hosp.patientSafetyIndex}%
                </Card.Text>
                <Form.Check
                  type="checkbox"
                  label="Select to Compare"
                  onChange={() => toggleCompareHospital(hosp)}
                  checked={compareHospitals.some((h) => h.id === hosp.id)}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button
        variant="primary"
        onClick={openCompareModal}
        disabled={compareHospitals.length < 2}
      >
        Compare Selected Hospitals
      </Button>

      {/* Compare Hospitals Modal */}
      <Modal show={showCompareModal} onHide={closeCompareModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Hospital Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Metric</th>
                {compareHospitals.map((h) => (
                  <th key={h.id}>{h.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                "Bed Availability",
                "Hygiene Rating",
                "Equipment Readiness",
                "Staff Behavior",
                "Queue Management",
                "Billing Transparency",
                "Emergency Response Time",
                "Patient Safety Index",
              ].map((metric) => (
                <tr key={metric}>
                  <td>{metric}</td>
                  {compareHospitals.map((h) => {
                    if (metric === "Emergency Response Time") {
                      return <td key={h.id}>{h.emergencyResponseTime}</td>;
                    }
                    if (metric === "Queue Management") {
                      return <td key={h.id}>{h.queueManagement}</td>;
                    }
                    if (metric === "Billing Transparency") {
                      return <td key={h.id}>{h.billingTransparency}</td>;
                    }
                    switch (metric) {
                      case "Bed Availability":
                        return <td key={h.id}>{h.bedAvailability}%</td>;
                      case "Hygiene Rating":
                        return (
                          <td key={h.id}>{h.hygieneRating} ⭐</td>
                        );
                      case "Equipment Readiness":
                        return <td key={h.id}>{h.equipmentReadiness}%</td>;
                      case "Staff Behavior":
                        return <td key={h.id}>{h.staffBehavior} ⭐</td>;
                      case "Patient Safety Index":
                        return <td key={h.id}>{h.patientSafetyIndex}%</td>;
                      default:
                        return <td key={h.id}>N/A</td>;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeCompareModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Public Transparency: Top Rated Doctors Carousel */}
      <h4 className="mt-5">Top Rated Doctors</h4>
      <Carousel>
        {doctorsSample.map((doc) => (
          <Carousel.Item key={doc.id}>
            <Card className="text-center p-3 bg-light">
              <Card.Body>
                <Card.Title>{doc.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {doc.specialty}
                </Card.Subtitle>
                <Card.Text>
                  ⭐ Rating: {doc.rating} <br />
                  Empathy Score: {doc.empathyScore}
                </Card.Text>
                <Button variant="outline-primary" onClick={() => openDoctorModal(doc)}>
                  View Profile
                </Button>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Admin Compliance Dashboard (Simplified) */}
      <h4 className="mt-5">Admin & Compliance Monitoring</h4>
      <Card>
        <Card.Body>
          <p>
            <strong>Feedback Review Board:</strong> Review flagged reviews,
            moderate content.
          </p>
          <p>
            <strong>Risk Hospitals List:</strong> Hospitals flagged for audit/intervention.
          </p>
          <p>
            <strong>AI Score Override Tool:</strong> Manually adjust scores if AI
            misclassifies.
          </p>
          <p>
            <strong>Escalation Routing:</strong> Auto-route complaints to
            authorities.
          </p>
          <Button variant="secondary" disabled>
            Open Admin Panel (Coming Soon)
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
