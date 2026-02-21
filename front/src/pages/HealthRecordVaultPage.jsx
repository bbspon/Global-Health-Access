import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
  Badge,
  Table,
} from "react-bootstrap";
import {
  Upload,
  Search,
  Clipboard2Pulse,
  CloudArrowDown,
  FileEarmarkMedical,
  ExclamationTriangle,
  Share,
  ArrowRepeat,
} from "react-bootstrap-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const HealthRecordVaultPage = () => {
  const { id } = useParams();

  console.log(id, "id");

  const [searchQuery, setSearchQuery] = useState("");
  const [showEmergencyCard, setShowEmergencyCard] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    title: "",
    type: "Lab Report",
    file: "",
    tags: "",
    date: new Date().toISOString().slice(0, 10),
    hospital: "User Upload",
    addedBy: "Self",
    notes: "",
    fileUrl: "",
  });

  // ✅ Fetch records from API
  const fetchRecords = async () => {
    try {

      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser")) || null;
      const token = bbsUserData?.token || localStorage.getItem("token");

      console.log("Fetching for PlanID:", id);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URI}/user-plan/${id}/records`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", res.data);

      setRecords(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching health records:", error);
    }
  };

  useEffect(() => {
    if (id) fetchRecords();
  }, [id]);

  // ✅ Upload new record
  const handleSaveRecord = async () => {
    try {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser")) || null;
      const token = bbsUserData?.token || localStorage.getItem("token");

      if (!token) throw new Error("Not authenticated");

      const payload = {
        ...newRecord,
        tags: newRecord.tags ? newRecord.tags.split(",").map((t) => t.trim()) : [],
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/user-plan/${id}/records`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Record save response:", res.data);

      // Refresh list and close modal
      setUploadModal(false);
      setNewRecord({
        title: "",
        type: "Lab Report",
        file: "",
        tags: "",
        date: new Date().toISOString().slice(0, 10),
        hospital: "User Upload",
        addedBy: "Self",
        notes: "",
        fileUrl: "",
      });

      // refetch
      fetchRecords();
    } catch (err) {
      console.error("Error uploading record", err);
    }
  };

  const filteredRecords = records.filter((rec) =>
    rec.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="py-5">
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontWeight: 700, color: "#333", marginBottom: "8px" }}>
          📁 Digital Health Record Vault
        </h2>
        <p className="text-muted">Organize, secure, and access all your health documents in one place</p>
      </div>

      {/* Search & Action Buttons */}
      <Card className="mb-4 p-3 border-0 shadow-sm">
        <Row className="align-items-center">
          <Col md={7} className="mb-3 mb-md-0">
            <Form.Control
              type="text"
              placeholder='🔍 Search records (e.g., "diabetes test", "April report")'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control-lg"
            />
          </Col>
          <Col md={5} className="d-flex gap-2 justify-content-md-end">
            <Button 
              variant="primary" 
              onClick={() => setUploadModal(true)}
              className="d-flex align-items-center"
            >
              <Upload className="me-2" />
              Upload
            </Button>
            <Button 
              variant="danger" 
              onClick={() => setShowEmergencyCard(true)}
              className="d-flex align-items-center"
            >
              <ExclamationTriangle className="me-2" />
              Emergency Card
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Records Grid */}
      <div style={{ marginBottom: "50px" }}>
        <h5 style={{ fontWeight: 600, marginBottom: "20px" }}>Your Records</h5>
        {filteredRecords.length > 0 ? (
          <Row>
            {filteredRecords.map((rec, idx) => (
              <Col md={6} lg={4} key={idx} className="mb-4">
                <Card className="h-100 shadow-sm hover-shadow" style={{ transition: "all 0.3s ease" }}>
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-3">
                      <Badge bg="primary" className="me-2">
                        {rec.type}
                      </Badge>
                      <Badge bg="light" text="dark">
                        {rec.hospital || rec.addedBy}
                      </Badge>
                    </div>
                    <Card.Title style={{ fontSize: "18px", fontWeight: 600 }}>
                      {rec.title}
                    </Card.Title>
                    <Card.Text className="text-muted small mt-2">
                      <strong>📅 Date:</strong> {new Date(rec.date).toLocaleDateString()}
                    </Card.Text>
                    {Array.isArray(rec.tags) && rec.tags.length > 0 && (
                      <div className="mb-3">
                        <small className="text-muted"><strong>Tags:</strong></small>
                        <div>
                          {rec.tags.map((tag, i) => (
                            <Badge key={i} bg="light" text="dark" className="me-1 mt-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-auto pt-3">
                      <a
                        href={rec.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-primary w-100"
                      >
                        <CloudArrowDown className="me-1" /> Download
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <FileEarmarkMedical size={48} className="text-muted mb-3" />
            <p className="text-muted">No records match your search. Start uploading your health documents.</p>
          </div>
        )}
      </div>

      {/* Smart Reminders */}
      <Card className="shadow-sm border-0" style={{ backgroundColor: "#f8f9fa" }}>
        <Card.Body>
          <h5 style={{ fontWeight: 600, marginBottom: "20px" }}>
            📅 Smart Reminders & Suggestions
          </h5>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <div className="p-3 bg-white rounded mb-2" style={{ borderLeft: "4px solid #17a2b8" }}>
                <div><strong>🧪 Next HBA1C test due</strong></div>
                <small className="text-muted">August 2025</small>
              </div>
              <div className="p-3 bg-white rounded" style={{ borderLeft: "4px solid #dc3545" }}>
                <div><strong>💊 Prescription refill reminder</strong></div>
                <small className="text-muted">BP meds by July 10</small>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 bg-white rounded" style={{ borderLeft: "4px solid #28a745" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>🏥 New reports pending sync</strong>
                    <div><small className="text-muted">2 documents waiting</small></div>
                  </div>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => alert("Syncing...")}
                    className="ms-2"
                  >
                    <ArrowRepeat size={16} className="me-1" /> Sync
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Emergency Modal */}
      <Modal
        show={showEmergencyCard}
        onHide={() => setShowEmergencyCard(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-danger bg-opacity-10">
          <Modal.Title>🚨 Emergency Card (Instant Doctor Access)</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row className="mb-3">
            <Col md={6}>
              <div className="p-3 bg-light rounded">
                <h6>Blood Group</h6>
                <p className="h5 fw-bold">O+ve</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 bg-light rounded">
                <h6>Organ Donor</h6>
                <p className="h5 fw-bold">Yes ✓</p>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <div className="p-3 bg-light rounded">
                <h6>Chronic Conditions</h6>
                <p className="text-muted small">Diabetes, Hypertension</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 bg-light rounded">
                <h6>Allergies</h6>
                <p className="text-danger small fw-bold">⚠️ Penicillin</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="p-3 bg-light rounded">
                <h6>Current Medications</h6>
                <p className="text-muted small">Metformin, Amlodipine</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="p-3 bg-light rounded">
                <h6>Emergency Contact</h6>
                <p className="text-muted small">+91-9876543210</p>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmergencyCard(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => alert("Shared with attending doctor")}>
            <Share className="me-2" /> Share with Doctor
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Upload Modal */}
      <Modal
        show={uploadModal}
        onHide={() => setUploadModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton className="bg-primary bg-opacity-10">
          <Modal.Title>📤 Upload Health Record</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-600">Document Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Blood Test Report"
                value={newRecord.title}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, title: e.target.value })
                }
                className="form-control-lg"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-600">Document Type *</Form.Label>
              <Form.Select
                value={newRecord.type}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, type: e.target.value })
                }
                className="form-control-lg"
              >
                <option>Lab Report</option>
                <option>Prescription</option>
                <option>Invoice/Bill</option>
                <option>Scan Report</option>
                <option>Discharge Summary</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-600">Tags (Optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., blood, diabetes, cardio"
                value={newRecord.tags}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, tags: e.target.value })
                }
                className="form-control-lg"
              />
              <small className="text-muted">Separate multiple tags with commas</small>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-600">File URL / Document Link *</Form.Label>
              <Form.Control
                type="url"
                placeholder="e.g., https://example.com/report.pdf"
                value={newRecord.fileUrl}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, fileUrl: e.target.value })
                }
                className="form-control-lg"
              />
              <small className="text-muted">Paste the link to your uploaded document</small>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUploadModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleSaveRecord}
            className="d-flex align-items-center"
          >
            <Upload className="me-2" /> Save Record
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HealthRecordVaultPage;
