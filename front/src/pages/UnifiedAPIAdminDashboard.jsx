// UnifiedAPIAdminDashboard.jsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";

const mockPartners = [
  {
    id: 1,
    name: "Apollo Hospitals",
    type: "Hospital",
    status: "Live",
    lastCall: "5 mins ago",
    country: "India",
    version: "v1.2",
    endpoint: "/api/hospital/v1",
  },
  {
    id: 2,
    name: "SRL Diagnostics",
    type: "Lab",
    status: "Pending",
    lastCall: "N/A",
    country: "India",
    version: "v1.0",
    endpoint: "/api/lab/v1",
  },
  {
    id: 3,
    name: "1mg Pharmacy",
    type: "Pharmacy",
    status: "Live",
    lastCall: "2 mins ago",
    country: "UAE",
    version: "v1.1",
    endpoint: "/api/pharmacy/v1",
  },
];

export default function UnifiedAPIAdminDashboard() {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/unified-api");
        const data = await res.json();
        setPartners(data);
      } catch (err) {
        setAlert({ type: "danger", message: "Failed to load API partners." });
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const handleView = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const handleApprove = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/unified-api/activate/${selectedPartner._id}`,
        {
          method: "PUT",
        }
      );
      const updatedPartner = await res.json();
      const updated = partners.map((p) =>
        p._id === updatedPartner._id ? updatedPartner : p
      );
      setPartners(updated);
      setAlert({
        type: "success",
        message: `${updatedPartner.name} activated.`,
      });
      setShowModal(false);
    } catch (err) {
      setAlert({ type: "danger", message: "Activation failed." });
    }
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
              <tr key={partner._id || partner.id}>
                <td>{partner.name}</td>
                <td>{partner.type}</td>
                <td>
                  <span
                    className={`badge ${
                      partner.status === "Live" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {partner.status}
                  </span>
                </td>
                <td>{partner.lastCall}</td>
                <td>{partner.country}</td>
                <td>{partner.version}</td>
                <td>{partner.endpoint}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => {
                      setSelectedPartner(partner);
                      setShowModal(true);
                    }}
                  >
                    View / Manage
                  </button>
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
              <p>
                <strong>Name:</strong> {selectedPartner.name}
              </p>
              <p>
                <strong>Type:</strong> {selectedPartner.type}
              </p>
              <p>
                <strong>Status:</strong> {selectedPartner.status}
              </p>
              <p>
                <strong>Last API Call:</strong> {selectedPartner.lastCall}
              </p>
              <p>
                <strong>Country:</strong> {selectedPartner.country}
              </p>
              <p>
                <strong>API Version:</strong> {selectedPartner.version}
              </p>
              <p>
                <strong>Endpoint:</strong> {selectedPartner.endpoint}
              </p>
              {selectedPartner.status !== "Live" && (
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
