import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Card, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import QRCode from 'react-qr-code';

const fetchPassportData = async () => ({
  name: 'Jane Doe',
  planId: 'BP-3221',
  lang: 'English',
  conditions: ['Diabetes', 'Hypertension'],
  meds: ['Metformin', 'Amlodipine'],
  allergies: ['Penicillin'],
  lastVisit: '2025-06-15',
});

const fetchDocuments = async () => [
  { id: 'd1', name: 'Vaccination.pdf', type: 'Vaccination' },
  { id: 'd2', name: 'LabReport.pdf', type: 'Lab Report' },
];

export default function HealthPassportExportSystem() {
  const [passport, setPassport] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState({
    history: 'all',
    includeSensitive: true,
    country: 'uae'
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      setPassport(await fetchPassportData());
      setDocuments(await fetchDocuments());
    })();
  }, []);

  const handleExport = (type) => {
    alert(`Exporting ${type} for ${filters.country} with filters:\nHistory: ${filters.history}, Sensitive: ${filters.includeSensitive}`);
  };

  if (!passport) return <Container className="mt-4">Loading...</Container>;

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>🌍 BBSCART Health Passport</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => setShowModal(true)}>🧠 View AI Summary</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <h5>QR Code</h5>
            <div id="qr-box" style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
              <QRCode value={`${passport.planId}|${passport.name}`} size={160} />
            </div>
            <p className="mt-2"><strong>ID:</strong> {passport.planId}</p>
            <p><strong>Name:</strong> {passport.name}</p>
          </Col>

          <Col md={8}>
            <h5>Passport Summary</h5>
            <p><strong>Conditions:</strong> {passport.conditions.join(', ')}</p>
            <p><strong>Medications:</strong> {passport.meds.join(', ')}</p>
            <p><strong>Allergies:</strong> {passport.allergies.join(', ')}</p>
            <p><strong>Last Visit:</strong> {passport.lastVisit}</p>

            <hr />
            <h6>Export Filters</h6>
            <Form.Select
              className="mb-2"
              value={filters.history}
              onChange={(e) => setFilters({ ...filters, history: e.target.value })}
            >
              <option value="all">Full History</option>
              <option value="opd">OPD Only</option>
              <option value="emergency">Emergency Only</option>
            </Form.Select>

            <Form.Check
              type="checkbox"
              label="Hide Sensitive Info"
              checked={!filters.includeSensitive}
              onChange={(e) => setFilters({ ...filters, includeSensitive: !e.target.checked })}
            />

            <Form.Label className="mt-2">Country Format</Form.Label>
            <Form.Select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            >
              <option value="uae">🇦🇪 UAE Format</option>
              <option value="canada">🇨🇦 Canada Format</option>
              <option value="india">🇮🇳 India Format</option>
              <option value="usa">🇺🇸 USA Format</option>
              <option value="france">🇫🇷 France Format</option>
            </Form.Select>

            <h6 className="mt-4">Export Options</h6>
            <div className="d-flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => handleExport('PDF')}>Export PDF</Button>
              <Button variant="success" onClick={() => handleExport('FHIR')}>FHIR JSON</Button>
              <Button variant="info" onClick={() => handleExport('ZIP')}>Offline ZIP</Button>
              <Button variant="dark" onClick={() => handleExport('Link')}>Secure Share Link</Button>
            </div>
          </Col>
        </Row>

        <h6 className="mt-4">Attached Medical Documents</h6>
        <Row>
          {documents.map(doc => (
            <Col md={3} key={doc.id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{doc.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{doc.type}</Card.Subtitle>
                  <Button size="sm" variant="outline-info" onClick={() => alert(`Opening ${doc.name}`)}>Preview</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 🧠 AI Summary Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>🧠 One-Page Health Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Conditions:</strong> {passport.conditions.join(', ')}</p>
          <p><strong>Medications:</strong> {passport.meds.join(', ')}</p>
          <p><strong>Allergies:</strong> {passport.allergies.join(', ')}</p>
          <p><strong>Last Visit:</strong> {passport.lastVisit}</p>
          <hr />
          <h6>Smart Use Cases:</h6>
          <ul>
            <li>🛃 <strong>Immigration/Embassy Upload:</strong> Country-wise templates available.</li>
            <li>🚑 <strong>Emergency Room:</strong> QR code provides flash summary.</li>
            <li>💊 <strong>Pharmacy:</strong> QR scan gives prescription & allergies.</li>
            <li>🎓 <strong>Student Visa:</strong> Upload for Canada/UAE universities.</li>
            <li>🛫 <strong>Medical Tourism:</strong> Send ahead to hospitals abroad.</li>
            <li>🧾 <strong>Offline Use:</strong> ZIP export for USB, print, embassy.</li>
            <li>🔐 <strong>Secure Link:</strong> Share-only-with-OTP logic supported.</li>
          </ul>
          <p className="mt-3 text-muted">
            Generated using BBSCART AI. Sensitive Info: <strong>{filters.includeSensitive ? 'Included' : 'Filtered'}</strong>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
