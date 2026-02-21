import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  InputGroup,
  Badge,
  Alert,
} from "react-bootstrap";
import { Upload, Search, Download, FileEarmarkPdf } from "react-bootstrap-icons";

const MedicalVault = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const API = import.meta.env.VITE_API_URI || "http://localhost:5000";

  // -----------------------------
  // FETCH RECORDS
  // -----------------------------
  const fetchRecords = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("bbsUser"));

      const res = await axios.get(`${API}/medical-vault`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setRecords(sorted);
    } catch (err) {
      console.error("Failed to load records", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // -----------------------------
  // UPLOAD RECORD
  // -----------------------------
  const uploadRecord = async () => {
    if (!file || !name || !category || !date) {
      alert("Please fill name, category, date and choose a file.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("bbsUser"));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("tags", JSON.stringify([])); // REQUIRED by backend

    try {
      await axios.post(`${API}/medical-vault/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      setFile(null);
      setName("");
      setCategory("");
      setDate("");

      fetchRecords();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console.");
    }
  };

  // -----------------------------
  // FILTER SEARCH
  // -----------------------------
  const filteredRecords = records.filter((r) => {
    const text = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(text) ||
      r.category.toLowerCase().includes(text)
    );
  });

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="mb-5">
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1a3a52" }}>
          📁 My Medical Vault
        </h1>
        <p className="text-muted" style={{ fontSize: "1.05rem" }}>
          Securely store, organize and access all your medical records in one place
        </p>
      </div>

      {/* Upload Card */}
      <Card className="shadow-sm mb-5 border-0">
        <Card.Header className="bg-primary bg-opacity-10 border-0">
          <h5 className="mb-0" style={{ fontWeight: 600 }}>
            <Upload className="me-2" size={20} /> Upload New Medical Record
          </h5>
        </Card.Header>
        <Card.Body className="p-4">
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-600">Record Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Blood Test Report"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control-lg"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-600">Category *</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control-lg"
                  >
                    <option value="">-- Select Category --</option>
                    <option>X-ray Report</option>
                    <option>Prescription</option>
                    <option>Lab Report</option>
                    <option>Discharge Summary</option>
                    <option>Invoice/Bill</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-600">Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control-lg"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label className="fw-600">Choose File *</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control-lg"
                  />
                  <small className="text-muted">PDF, DOC, JPG, PNG - Max 10MB</small>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="lg"
                onClick={uploadRecord}
                className="d-flex align-items-center justify-content-center"
                style={{ fontWeight: 600 }}
              >
                <Upload className="me-2" size={20} /> Upload Record
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Search Section */}
      <div className="mb-4">
        <InputGroup>
          <InputGroup.Text className="bg-white">
            <Search size={20} className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by record name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control-lg"
          />
        </InputGroup>
      </div>

      {/* Records Table */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-light border-bottom">
          <h6 className="mb-0" style={{ fontWeight: 600 }}>
            Medical Records ({filteredRecords.length})
          </h6>
        </Card.Header>
        <Card.Body className="p-0">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-5">
              <FileEarmarkPdf size={48} className="text-muted mb-3" />
              <p className="text-muted fw-500">No records found. Start by uploading your first medical document.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <Table hover responsive className="mb-0">
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                    <th style={{ fontWeight: 600, color: "#333", padding: "16px" }}>Record Name</th>
                    <th style={{ fontWeight: 600, color: "#333", padding: "16px" }}>Category</th>
                    <th style={{ fontWeight: 600, color: "#333", padding: "16px" }}>Date</th>
                    <th style={{ fontWeight: 600, color: "#333", padding: "16px" }}>File Type</th>
                    <th style={{ fontWeight: 600, color: "#333", padding: "16px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((rec) => (
                    <tr
                      key={rec._id}
                      style={{
                        borderBottom: "1px solid #e9ecef",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fbff")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
                    >
                      <td style={{ padding: "16px", fontWeight: 500, color: "#1a3a52" }}>
                        {rec.recordName}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <Badge bg="info" className="text-white">
                          {rec.category}
                        </Badge>
                      </td>
                      <td style={{ padding: "16px", color: "#666" }}>
                        {new Date(rec.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td style={{ padding: "16px", color: "#666" }}>
                        <Badge bg="light" text="dark">
                          {(rec.fileType || "").toUpperCase() || "FILE"}
                        </Badge>
                      </td>
                      <td style={{ padding: "16px", textAlign: "center" }}>
                        <a
                          href={`http://localhost:5000/uploads/medical/${rec.fileName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-2"
                        >
                          <Download size={16} /> View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MedicalVault;
