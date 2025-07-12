import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Aisha Sharma",
    specialty: "Cardiologist",
    experience: "12 yrs",
    hospital: "Sunrise Hospital, Delhi",
    rating: 4.7,
    status: "Verified",
    languages: ["Hindi", "English"],
    slots: "Mon-Fri, 10am–2pm",
    licenseUrl: "#",
    resumeUrl: "#",
  },
  {
    id: 2,
    name: "Dr. Amir Khan",
    specialty: "Dermatologist",
    experience: "8 yrs",
    hospital: "GlobeCare, Dubai",
    rating: 4.4,
    status: "Pending",
    languages: ["English", "Arabic"],
    slots: "Tue-Thu, 2–6pm",
    licenseUrl: "#",
    resumeUrl: "#",
  },
];

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [search, setSearch] = useState("");

  const handleView = (doc) => {
    setSelectedDoc(doc);
    setAdminNote("");
    setShowModal(true);
  };

  const handleAction = (status) => {
    const updated = doctors.map((doc) =>
      doc.id === selectedDoc.id ? { ...doc, status } : doc
    );
    setDoctors(updated);
    setShowModal(false);
  };

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col md={8}>
          <h3>👨‍⚕️ Doctor Management Dashboard</h3>
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      <Card className="shadow">
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Hospital</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Languages</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.specialty}</td>
                  <td>{doc.hospital}</td>
                  <td>
                    <StarFill className="text-warning me-1" />
                    {doc.rating}
                  </td>
                  <td>
                    <Badge
                      bg={
                        doc.status === "Verified"
                          ? "success"
                          : doc.status === "Rejected"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </td>
                  <td>{doc.languages.join(", ")}</td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleView(doc)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* View / Approve / Reject Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Profile Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoc && (
            <>
              <p><strong>Name:</strong> {selectedDoc.name}</p>
              <p><strong>Specialty:</strong> {selectedDoc.specialty}</p>
              <p><strong>Hospital:</strong> {selectedDoc.hospital}</p>
              <p><strong>Experience:</strong> {selectedDoc.experience}</p>
              <p><strong>Languages:</strong> {selectedDoc.languages.join(", ")}</p>
              <p><strong>Rating:</strong> {selectedDoc.rating}</p>
              <p><strong>Slots:</strong> {selectedDoc.slots}</p>

              <Row className="mt-3">
                <Col xs={12} md={6} className="mb-3">
                  <Card className="p-3 shadow-sm h-100">
                    <h6>📄 License Document</h6>
                    <a
                      href={selectedDoc.licenseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary fw-bold"
                    >
                      🔗 View License
                    </a>
                  </Card>
                </Col>
                <Col xs={12} md={6} className="mb-3">
                  <Card className="p-3 shadow-sm h-100">
                    <h6>📂 Resume / CV</h6>
                    <a
                      href={selectedDoc.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="text-primary fw-bold"
                    >
                      📥 Download Resume
                    </a>
                  </Card>
                </Col>
              </Row>

              <Form.Group className="mt-3">
                <Form.Label>📝 Admin Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Reason if rejecting or internal comment"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              </Form.Group>

              <div className="mt-4 d-flex justify-content-between">
                <Button variant="success" onClick={() => handleAction("Verified")}>
                  ✅ Approve
                </Button>
                <Button variant="danger" onClick={() => handleAction("Rejected")}>
                  ❌ Reject
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DoctorManagement;
