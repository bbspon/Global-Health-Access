import React, { useState } from "react";
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

const HealthRecordVaultPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmergencyCard, setShowEmergencyCard] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [records, setRecords] = useState([
    {
      id: 1,
      type: "Lab Report",
      title: "HbA1C - April 2025",
      hospital: "Apollo Labs",
      date: "2025-04-12",
      tags: ["diabetes", "blood test"],
      file: null,
    },
    {
      id: 2,
      type: "Prescription",
      title: "BP Medication - May",
      hospital: "BBSCART Clinic",
      date: "2025-05-03",
      tags: ["bp", "meds"],
      file: null,
    },
  ]);

  const [newRecord, setNewRecord] = useState({
    title: "",
    type: "Lab Report",
    file: null,
    tags: "",
    date: new Date().toISOString().slice(0, 10),
    hospital: "User Upload",
  });

  const handleSaveRecord = () => {
    const newId = records.length + 1;
    const tagList = newRecord.tags.split(",").map((t) => t.trim());

    setRecords([
      ...records,
      {
        id: newId,
        type: newRecord.type,
        title: newRecord.title,
        hospital: newRecord.hospital,
        date: newRecord.date,
        tags: tagList,
        file: newRecord.file,
      },
    ]);

    setUploadModal(false);
    setNewRecord({
      title: "",
      type: "Lab Report",
      file: null,
      tags: "",
      date: new Date().toISOString().slice(0, 10),
      hospital: "User Upload",
    });
  };

  const filteredRecords = records.filter((rec) =>
    rec.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h3 className="mb-3">📁 Digital Health Record Vault</h3>

      {/* Search and Upload Row */}
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
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => setShowEmergencyCard(true)}
            title="Generate Emergency Summary"
          >
            <ExclamationTriangle className="me-2" />
            Emergency Card
          </Button>
        </Col>
      </Row>

      {/* Health Records List */}
      <Row>
        {filteredRecords.map((rec) => (
          <Col md={6} lg={4} key={rec.id} className="mb-4">
            <Card>
              <Card.Body>
                <Badge bg="secondary" className="mb-2">
                  {rec.type}
                </Badge>
                <Card.Title>{rec.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {rec.hospital}
                </Card.Subtitle>
                <Card.Text>
                  📅 {rec.date}
                  <br />
                  🏷️ Tags:{" "}
                  {rec.tags.map((tag, idx) => (
                    <Badge key={idx} bg="light" text="dark" className="me-1">
                      {tag}
                    </Badge>
                  ))}
                </Card.Text>

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    if (rec.file) {
                      const url = URL.createObjectURL(rec.file);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = rec.title || "record";
                      a.click();
                      URL.revokeObjectURL(url);
                    } else {
                      alert("No file attached to this record.");
                    }
                  }}
                >
                  <CloudArrowDown /> Download
                </Button>

                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => {
                    if (navigator.share && rec.file) {
                      const url = URL.createObjectURL(rec.file);
                      navigator
                        .share({
                          title: rec.title,
                          text: `Sharing your record: ${rec.title}`,
                          url: url,
                        })
                        .catch((err) => console.log("Sharing failed:", err));
                    } else {
                      alert("Sharing not supported or file missing.");
                    }
                  }}
                >
                  <Share /> Share
                </Button>
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
            🏥 <strong>New reports from BBSCART Hospital pending sync</strong>{" "}
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => alert("Syncing from hospital...")}
            >
              <ArrowRepeat className="me-1" />
              Sync Now
            </Button>
          </div>
        </Col>
      </Row>

      {/* Emergency Card Modal */}
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
          <p>This card summarizes your critical health info.</p>
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
          <Button variant="secondary" onClick={() => setShowEmergencyCard(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => alert("Emergency card shared with doctor.")}
          >
            <Clipboard2Pulse className="me-2" />
            Share with Doctor
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
                placeholder="e.g., Thyroid Report - Jan"
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
              <Form.Label>Upload File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setNewRecord({ ...newRecord, file: e.target.files[0] })
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
            <Upload className="me-2" />
            Save Record
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HealthRecordVaultPage;
