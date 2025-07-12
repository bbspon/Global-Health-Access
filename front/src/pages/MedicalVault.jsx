// 🌐 React (Web) + Bootstrap – Medical Records Vault UI

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { CloudUpload, FileEarmarkMedical, Search, ShieldLock, Download, Funnel } from 'react-bootstrap-icons';

const MedicalVault = () => {
  const [records, setRecords] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = async () => {
    // Replace with API fetch
    setRecords([
      { id: 1, name: 'Lab Report - CBC', category: 'Lab', date: '2025-06-21', tags: ['Blood', 'General'], fileUrl: '#' },
      { id: 2, name: 'Prescription - Dr. Rao', category: 'OPD', date: '2025-07-01', tags: ['Diabetes'], fileUrl: '#' },
    ]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadModal(false);
      fetchRecords();
    }, 2000);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const filteredRecords = records.filter((rec) => rec.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container className="py-4">
      <h3 className="mb-3">🧬 My Medical Vault</h3>
      <Row className="mb-3">
        <Col md={6}><Form.Control placeholder="Search records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setUploadModal(true)}><CloudUpload /> Upload Record</Button>
        </Col>
      </Row>

      {filteredRecords.length ? (
        <Row>
          {filteredRecords.map((rec) => (
            <Col md={6} lg={4} className="mb-4" key={rec.id}>
              <Card>
                <Card.Body>
                  <Card.Title><FileEarmarkMedical /> {rec.name}</Card.Title>
                  <Card.Text>
                    <strong>Type:</strong> {rec.category}<br />
                    <strong>Date:</strong> {rec.date}<br />
                    {rec.tags.map((t, i) => <Badge key={i} className="me-1" bg="info">{t}</Badge>)}
                  </Card.Text>
                  <Button size="sm" variant="success" href={rec.fileUrl} target="_blank"><Download /> View</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : <Alert variant="info">No records found.</Alert>}

      {/* Upload Modal */}
      <Modal show={uploadModal} onHide={() => setUploadModal(false)}>
        <Modal.Header closeButton><Modal.Title>Upload Medical Record</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select File (PDF/Image)</Form.Label>
            <Form.Control type="file" accept="application/pdf,image/*" onChange={(e) => setFile(e.target.files[0])} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUploadModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpload} disabled={uploading}>
            {uploading ? <Spinner size="sm" animation="border" /> : 'Upload'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MedicalVault;
