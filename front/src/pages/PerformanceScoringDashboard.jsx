import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function PerformanceScoringDashboard() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareHospitals, setCompareHospitals] = useState([]);
  const [userSymptoms, setUserSymptoms] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/performance-scores`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const doctors = res.data.data.filter((item) => item.role === "doctor");
        const hospitals = res.data.data.filter(
          (item) => item.role === "hospital"
        );

        setDoctorList(doctors);
        setHospitalList(hospitals);
        setSearchResults(doctors); // default view
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

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
    const filtered = doctorList.filter((doc) =>
      keywords.some((kw) => doc.specialty?.toLowerCase().includes(kw))
    );
    setSearchResults(filtered.length ? filtered : doctorList);
  };

  const toggleCompareHospital = (hospital) => {
    if (compareHospitals.some((h) => h._id === hospital._id)) {
      setCompareHospitals(
        compareHospitals.filter((h) => h._id !== hospital._id)
      );
    } else {
      setCompareHospitals([...compareHospitals, hospital].slice(0, 3)); // Max 3
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4 text-primary">
        Hospital & Doctor Performance Scoring Engine
      </h2>

      {/* Symptom Input */}
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

      {/* Doctor Matches */}
      <h4>Doctor Matches</h4>
      {searchResults.length === 0 ? (
        <p>No doctor matches found.</p>
      ) : (
        <Row>
          {searchResults.map((doc) => (
            <Col md={4} key={doc._id} className="mb-3">
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
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => openDoctorModal(doc)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Doctor Detail Modal */}
      <Modal
        show={showDoctorModal}
        onHide={closeDoctorModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedDoctor?.name} - Performance Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <Table bordered striped>
              <tbody>
                <tr>
                  <td>Specialty</td>
                  <td>{selectedDoctor.specialty}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{selectedDoctor.rating} ⭐</td>
                </tr>
                <tr>
                  <td>Empathy</td>
                  <td>{selectedDoctor.empathyScore}</td>
                </tr>
                <tr>
                  <td>Timeliness</td>
                  <td>{selectedDoctor.consultationTimeliness}</td>
                </tr>
                <tr>
                  <td>Prescription Accuracy</td>
                  <td>{selectedDoctor.prescriptionAccuracy}%</td>
                </tr>
                <tr>
                  <td>Outcome</td>
                  <td>{selectedDoctor.outcomeScore}</td>
                </tr>
                <tr>
                  <td>Follow-Up</td>
                  <td>{selectedDoctor.followUpCompliance}%</td>
                </tr>
                <tr>
                  <td>Communication</td>
                  <td>{selectedDoctor.communicationClarity}</td>
                </tr>
              </tbody>
            </Table>
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
        {hospitalList.map((hosp) => (
          <Col md={4} key={hosp._id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{hosp.name}</Card.Title>
                <Card.Text>
                  <strong>Bed Availability:</strong> {hosp.bedAvailability}%{" "}
                  <br />
                  <strong>Hygiene:</strong> {hosp.hygieneRating} ⭐ <br />
                  <strong>Equipment:</strong> {hosp.equipmentReadiness}% <br />
                  <strong>Staff:</strong> {hosp.staffBehavior} ⭐ <br />
                  <strong>Queue:</strong> {hosp.queueManagement} <br />
                  <strong>Billing:</strong> {hosp.billingTransparency} <br />
                  <strong>Response Time:</strong> {hosp.emergencyResponseTime}{" "}
                  <br />
                  <strong>Safety:</strong> {hosp.patientSafetyIndex}%
                </Card.Text>
                <Form.Check
                  type="checkbox"
                  label="Select to Compare"
                  onChange={() => toggleCompareHospital(hosp)}
                  checked={compareHospitals.some((h) => h._id === hosp._id)}
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

      {/* Comparison Modal */}
      <Modal
        show={showCompareModal}
        onHide={closeCompareModal}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hospital Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Metric</th>
                {compareHospitals.map((h) => (
                  <th key={h._id}>{h.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                "bedAvailability",
                "hygieneRating",
                "equipmentReadiness",
                "staffBehavior",
                "queueManagement",
                "billingTransparency",
                "emergencyResponseTime",
                "patientSafetyIndex",
              ].map((metric) => (
                <tr key={metric}>
                  <td>{metric.replace(/([A-Z])/g, " $1")}</td>
                  {compareHospitals.map((h) => (
                    <td key={h._id}>{h[metric]}</td>
                  ))}
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
    </Container>
  );
}
