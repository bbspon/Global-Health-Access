// UnifiedAPIAdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  Button,
  Modal,
  Alert,
  Spinner,
  Badge,
} from 'react-bootstrap';

const mockPartners = [
  {
    id: 1,
    name: 'Apollo Hospitals',
    type: 'Hospital',
    status: 'Live',
    lastCall: '5 mins ago',
    country: 'India',
    version: 'v1.2',
    endpoint: '/api/hospital/v1',
  },
  {
    id: 2,
    name: 'SRL Diagnostics',
    type: 'Lab',
    status: 'Pending',
    lastCall: 'N/A',
    country: 'India',
    version: 'v1.0',
    endpoint: '/api/lab/v1',
  },
  {
    id: 3,
    name: '1mg Pharmacy',
    type: 'Pharmacy',
    status: 'Live',
    lastCall: '2 mins ago',
    country: 'UAE',
    version: 'v1.1',
    endpoint: '/api/pharmacy/v1',
  },
];

export default function UnifiedAPIAdminDashboard() {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPartners(mockPartners);
      setLoading(false);
    }, 1000);
  }, []);

  const handleView = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const handleApprove = () => {
    if (!selectedPartner) return;
    const updated = partners.map((p) =>
      p.id === selectedPartner.id
        ? { ...p, status: 'Live', lastCall: 'Just now' }
        : p
    );
    setPartners(updated);
    setAlert({ type: 'success', message: `${selectedPartner.name} activated.` });
    setShowModal(false);
  };

  return (
    <Container className="p-4">
      <h2 className="mb-4">🧩 Unified API Admin Dashboard</h2>

      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Last API Call</th>
              <th>Country</th>
              <th>API Version</th>
              <th>Endpoint</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td>{partner.name}</td>
                <td>{partner.type}</td>
                <td>
                  <Badge bg={partner.status === 'Live' ? 'success' : 'secondary'}>
                    {partner.status}
                  </Badge>
                </td>
                <td>{partner.lastCall}</td>
                <td>{partner.country}</td>
                <td>{partner.version}</td>
                <td>{partner.endpoint}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => handleView(partner)}>
                    View / Manage
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Partner Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPartner && (
            <>
              <p><strong>Name:</strong> {selectedPartner.name}</p>
              <p><strong>Type:</strong> {selectedPartner.type}</p>
              <p><strong>Status:</strong> {selectedPartner.status}</p>
              <p><strong>Last API Call:</strong> {selectedPartner.lastCall}</p>
              <p><strong>Country:</strong> {selectedPartner.country}</p>
              <p><strong>API Version:</strong> {selectedPartner.version}</p>
              <p><strong>Endpoint:</strong> {selectedPartner.endpoint}</p>
              {selectedPartner.status !== 'Live' && (
                <Button variant="success" onClick={handleApprove}>
                  Approve & Activate
                </Button>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
