import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Badge, Spinner, Alert } from 'react-bootstrap';

// Mock partner data function
const getMockPartners = async () => {
  return [
    {
      id: 'p1',
      name: 'City Hospital',
      type: 'Hospital',
      kyc: 'Complete',
      verified: true,
      risk: 'Low',
      syncStatus: 'Healthy',
      docs: [
        { name: 'License.pdf', url: '/docs/License.pdf' },
        { name: 'TaxCert.pdf', url: '/docs/TaxCert.pdf' },
      ],
    },
    {
      id: 'p2',
      name: 'LabX Diagnostics',
      type: 'Lab',
      kyc: 'Pending',
      verified: false,
      risk: 'High',
      syncStatus: 'Offline',
      docs: [],
    },
  ];
};

const riskColor = (risk) => {
  if (risk === 'High') return 'danger';
  if (risk === 'Medium') return 'warning';
  return 'success';
};

export default function ComplianceDashboard() {
  const [partners, setPartners] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null); // currently previewed document

  useEffect(() => {
    fetchMockPartners();
  }, []);

  const fetchMockPartners = async () => {
    setLoading(true);
    try {
      const data = await getMockPartners();
      setPartners(data);
    } catch (err) {
      setError('Failed to load mock data');
      setPartners([]);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛡️ Compliance Dashboard (Mock)</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Partner</th>
              <th>Type</th>
              <th>KYC</th>
              <th>Verified</th>
              <th>Risk</th>
              <th>Docs</th>
              <th>Sync</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>
                  <Badge bg={p.kyc === 'Complete' ? 'success' : 'danger'}>
                    {p.kyc}
                  </Badge>
                </td>
                <td>{p.verified ? '✅' : '❌'}</td>
                <td>
                  <Badge bg={riskColor(p.risk)}>{p.risk}</Badge>
                </td>
                <td>{p.docs?.length || 0} files</td>
                <td>{p.syncStatus || 'Unknown'}</td>
                <td>
                  <Button variant="primary" size="sm" onClick={() => {
                    setSelected(p);
                    setPreviewDoc(null); // Reset doc preview
                  }}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Partner Modal */}
      <Modal show={!!selected} onHide={() => setSelected(null)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Partner Compliance Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Type:</strong> {selected.type}</p>
              <p><strong>KYC:</strong> {selected.kyc}</p>
              <p><strong>Risk:</strong> <Badge bg={riskColor(selected.risk)}>{selected.risk}</Badge></p>
              <p><strong>Verified:</strong> {selected.verified ? '✅' : '❌'}</p>
              <p><strong>Sync:</strong> {selected.syncStatus}</p>

              <h5 className="mt-3">📄 Documents</h5>
              {selected.docs?.length > 0 ? (
                <ul>
                  {selected.docs.map((doc, i) => (
                    <li key={i}>
                      <Button
                        variant="link"
                        onClick={() => setPreviewDoc(doc)}
                        style={{ padding: 0 }}
                      >
                        🔍 Preview {doc.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No documents uploaded.</p>
              )}

              {/* In-page PDF preview */}
              {previewDoc && (
                <div className="mt-4">
                  <h6>Preview: {previewDoc.name}</h6>
                  <iframe
                    src={previewDoc.url}
                    width="100%"
                    height="500px"
                    style={{ border: '1px solid #ccc' }}
                    title={previewDoc.name}
                  />
                  <a
                    href={previewDoc.url}
                    download={previewDoc.name}
                    className="btn btn-outline-primary mt-2"
                  >
                    ⬇️ Download {previewDoc.name}
                  </a>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
