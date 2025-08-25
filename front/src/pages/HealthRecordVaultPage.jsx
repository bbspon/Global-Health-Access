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
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;

      console.log("Fetching for PlanID:", id);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URI}/user-plan/${id}/records`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", res.data); // 👈 ADD THIS LINE

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
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;
      await axios.post(
        `${import.meta.env.VITE_API_URI}/user-plan/${id}/records`,
        {
          ...newRecord,
          tags: newRecord.tags.split(",").map((t) => t.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error uploading record", err);
    }
  };

  const filteredRecords = records.filter((rec) =>
    rec.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h3 className="mb-3">📁 Digital Health Record Vault</h3>

      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder='Search (e.g., "diabetes test from April")'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={4} className="text-md-end mt-2 mt-md-0">
          <Button variant="primary" onClick={() => setUploadModal(true)}>
            <Upload className="me-2" />
            Upload Document
          </Button>
          <Button variant="danger" onClick={() => setShowEmergencyCard(true)}>
            <ExclamationTriangle className="me-2" />
            Emergency Card
          </Button>
        </Col>
      </Row>

      {/* Display Records */}
      <Row>
        {filteredRecords.map((rec, idx) => (
          <Col md={6} lg={4} key={idx} className="mb-4">
            <Card>
              <Card.Body>
                <Badge bg="secondary" className="mb-2">
                  {rec.type}
                </Badge>
                <Card.Title>{rec.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {rec.hospital || rec.addedBy}
                </Card.Subtitle>
                <Card.Text>
                  📅 {new Date(rec.date).toLocaleDateString()}
                  <br />
                  🏷️ Tags:{" "}
                  {Array.isArray(rec.tags) &&
                    rec.tags.map((tag, i) => (
                      <Badge key={i} bg="light" text="dark" className="me-1">
                        {tag}
                      </Badge>
                    ))}
                </Card.Text>
                <a
                  href={rec.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  <CloudArrowDown /> Download
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {filteredRecords.length === 0 && (
          <Col>
            <p className="text-muted">No records match your search.</p>
          </Col>
        )}
      </Row>

      {/* Smart Reminders */}
      <Row className="mt-4">
        <Col>
          <h5>📅 Smart Reminders & Suggestions</h5>
          <div className="mb-2">
            🧪 <strong>Next HBA1C test due:</strong> August 2025
          </div>
          <div className="mb-2">
            💊 <strong>Prescription refill reminder:</strong> BP meds by July 10
          </div>
          <div className="mb-2">
            🏥 <strong>New reports pending sync</strong>{" "}
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => alert("Syncing...")}
            >
              <ArrowRepeat className="me-1" /> Sync Now
            </Button>
          </div>
        </Col>
      </Row>

      {/* Emergency Modal */}
      <Modal
        show={showEmergencyCard}
        onHide={() => setShowEmergencyCard(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>🚨 Emergency Card (Doctor View)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <tbody>
              <tr>
                <th>Blood Group</th>
                <td>O+ve</td>
                <th>Chronic Conditions</th>
                <td>Diabetes, Hypertension</td>
              </tr>
              <tr>
                <th>Allergies</th>
                <td>Penicillin</td>
                <th>Organ Donor</th>
                <td>Yes</td>
              </tr>
              <tr>
                <th>Medications</th>
                <td>Metformin, Amlodipine</td>
                <th>Emergency Contact</th>
                <td>+91-9876543210</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEmergencyCard(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => alert("Shared with doctor")}>
            <Clipboard2Pulse className="me-2" /> Share with Doctor
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
        <Modal.Header closeButton>
          <Modal.Title>📤 Upload Health Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Document Title</Form.Label>
              <Form.Control
                type="text"
                value={newRecord.title}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={newRecord.type}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, type: e.target.value })
                }
              >
                <option>Lab Report</option>
                <option>Prescription</option>
                <option>Invoice/Bill</option>
                <option>Scan Report</option>
                <option>Discharge Summary</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., blood, diabetes"
                value={newRecord.tags}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, tags: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>File URL (Paste link)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., https://example.com/report.pdf"
                value={newRecord.fileUrl}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, fileUrl: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUploadModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveRecord}>
            <Upload className="me-2" /> Save Record
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HealthRecordVaultPage;
