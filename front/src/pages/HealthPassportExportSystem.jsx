import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import QRCode from "react-qr-code";
import axios from "axios";

export default function HealthPassportExportSystem() {
  const [passport, setPassport] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState({
    history: "all",
    includeSensitive: true,
    country: "uae",
  });
  const [showModal, setShowModal] = useState(false);
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));

  const userId = bbsUserData?.user?.id; // ✅ use `id`, not `_id`
  console.log(userId, "userId");

  useEffect(() => {
    // Load passport from backend
    const fetchPassport = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/health-passport/${userId}`
        );
        setPassport(res.data);
        setDocuments(res.data.documents || []);
      } catch (err) {
        console.error("Failed to fetch passport:", err.message);
      }
    };
    fetchPassport();
  }, []);

  const handleExport = async (type) => {
    try {
      let res;
      switch (type) {
        case "PDF":
          res = await axios.post(
            `${import.meta.env.VITE_API_URI}/health-passport/export/pdf`
          );
          break;
        case "FHIR":
          res = await axios.post(
            `${import.meta.env.VITE_API_URI}/health-passport/export/fhir`
          );
          break;
        case "ZIP":
          res = await axios.post(
            `${import.meta.env.VITE_API_URI}/health-passport/export/zip`
          );
          break;
        case "Link":
          res = await axios.post(
            `${import.meta.env.VITE_API_URI}/health-passport/export/secure-link`
          );
          break;
        default:
          return;
      }
      alert(res.data.message || res.data.link);
    } catch (err) {
      console.error("Export failed:", err.message);
      alert("Failed to export. Try again.");
    }
  };

  if (!passport) return <Container className="mt-4">Loading...</Container>;

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>🌍 BBSCART Health Passport</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => setShowModal(true)}>
              🧠 View AI Summary
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <h5>QR Code</h5>
            <div
              style={{
                background: "white",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <QRCode
                value={
                  passport.qrValue || `${passport.planId}|${passport.name}`
                }
                size={160}
              />
            </div>
            <p className="mt-2">
              <strong>ID:</strong> {passport.planId}
            </p>
            <p>
              <strong>Name:</strong> {passport.name}
            </p>
          </Col>

          <Col md={8}>
            <h5>Passport Summary</h5>
            <p>
              <strong>Conditions:</strong> {passport.conditions.join(", ")}
            </p>
            <p>
              <strong>Medications:</strong> {passport.medications.join(", ")}
            </p>
            <p>
              <strong>Allergies:</strong> {passport.allergies.join(", ")}
            </p>
            <p>
              <strong>Last Visit:</strong>{" "}
              {new Date(passport.lastVisit).toLocaleDateString()}
            </p>

            <hr />
            <h6>Export Filters</h6>
            <Form.Select
              className="mb-2"
              value={filters.history}
              onChange={(e) =>
                setFilters({ ...filters, history: e.target.value })
              }
            >
              <option value="all">Full History</option>
              <option value="opd">OPD Only</option>
              <option value="emergency">Emergency Only</option>
            </Form.Select>

            <Form.Check
              type="checkbox"
              label="Hide Sensitive Info"
              checked={!filters.includeSensitive}
              onChange={(e) =>
                setFilters({ ...filters, includeSensitive: !e.target.checked })
              }
            />

            <Form.Label className="mt-2">Country Format</Form.Label>
            <Form.Select
              value={filters.country}
              onChange={(e) =>
                setFilters({ ...filters, country: e.target.value })
              }
            >
              <option value="uae">🇦🇪 UAE Format</option>
              <option value="canada">🇨🇦 Canada Format</option>
              <option value="india">🇮🇳 India Format</option>
              <option value="usa">🇺🇸 USA Format</option>
              <option value="france">🇫🇷 France Format</option>
            </Form.Select>

            <h6 className="mt-4">Export Options</h6>
            <div className="d-flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => handleExport("PDF")}>
                Export PDF
              </Button>
              <Button variant="success" onClick={() => handleExport("FHIR")}>
                FHIR JSON
              </Button>
              <Button variant="info" onClick={() => handleExport("ZIP")}>
                Offline ZIP
              </Button>
              <Button variant="dark" onClick={() => handleExport("Link")}>
                Secure Share Link
              </Button>
            </div>
          </Col>
        </Row>

        <h6 className="mt-4">Attached Medical Documents</h6>
        <Row>
          {documents.map((doc) => (
            <Col md={3} key={doc._id || doc.name}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{doc.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {doc.type}
                  </Card.Subtitle>
                  <Button
                    size="sm"
                    variant="outline-info"
                    onClick={() => window.open(doc.url || "#", "_blank")}
                  >
                    Preview
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🧠 One-Page Health Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Conditions:</strong> {passport.conditions.join(", ")}
          </p>
          <p>
            <strong>Medications:</strong> {passport.medications.join(", ")}
          </p>
          <p>
            <strong>Allergies:</strong> {passport.allergies.join(", ")}
          </p>
          <p>
            <strong>Last Visit:</strong>{" "}
            {new Date(passport.lastVisit).toLocaleDateString()}
          </p>
          <hr />
          <h6>Smart Use Cases:</h6>
          <ul>
            <li>🛃 Immigration Upload</li>
            <li>🚑 Emergency Room Access</li>
            <li>💊 Pharmacy Lookup</li>
            <li>🎓 Student Visa</li>
            <li>🛫 Medical Tourism</li>
            <li>🧾 Offline Use</li>
            <li>🔐 Secure Share</li>
          </ul>
          <p className="text-muted">
            Generated using BBSCART AI. Sensitive Info:{" "}
            <strong>
              {filters.includeSensitive ? "Included" : "Filtered"}
            </strong>
            .
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
