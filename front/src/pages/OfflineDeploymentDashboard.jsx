import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Badge,
  Modal,
  Card,
  Alert,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import {
  FaSync,
  FaPrint,
  FaSatellite,
  FaQrcode,
  FaPowerOff,
  FaExclamationTriangle,
  FaUsb,
  FaBatteryFull,
  FaCheckCircle,
} from "react-icons/fa";

const OfflineDeploymentDashboard = () => {
  const [syncStatus, setSyncStatus] = useState("offline");
  const [showEmergency, setShowEmergency] = useState(false);
  const [cachedCard, setCachedCard] = useState(true);
  const [showSOS, setShowSOS] = useState(false);
  const [showToast, setShowToast] = useState({
    type: "",
    message: "",
    visible: false,
  });

  // Deployment Data
  const [deployments, setDeployments] = useState([]);
  const [form, setForm] = useState({
    locationName: "",
    address: "",
    region: "",
    deploymentType: "Kiosk",
    status: "Active",
    uptimeHours: 0,
    notes: "",
  });
  const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;

  useEffect(() => {
    if (!navigator.onLine) {
      setSyncStatus("offline");
      setShowEmergency(true);
    } else {
      setSyncStatus("online");
    }
    fetchDeployments();
  }, []);

  const showNotification = (type, message) => {
    setShowToast({ type, message, visible: true });
    setTimeout(() => setShowToast({ ...showToast, visible: false }), 3000);
  };

  const simulateSync = () => {
    setSyncStatus("syncing");
    showNotification("info", "Attempting to sync...");
    setTimeout(() => {
      setSyncStatus("online");
      showNotification("success", "Data synced successfully.");
    }, 3000);
  };

  const simulateQRScan = () => {
    showNotification("success", "QR Code Verified: John Doe / ID 1020");
  };

  const simulateTokenPrint = () => {
    showNotification("info", "Token Printed: OPD #045");
  };

  const simulateUsbSync = () => {
    showNotification("info", "USB Sync Started...");
    setTimeout(() => {
      showNotification("success", "USB Data Sync Completed.");
    }, 2500);
  };

  const fetchDeployments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/offline-deployment/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDeployments(res.data);
    } catch (error) {
      console.error("Failed to load deployments", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/offline-deployment/create",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Deployment added");
      setForm({
        locationName: "",
        address: "",
        region: "",
        deploymentType: "Kiosk",
        status: "Active",
        uptimeHours: 0,
        notes: "",
      });
      fetchDeployments();
    } catch (err) {
      alert("Create failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>🛰️ BBSCART Offline & Emergency Deployment Toolkit</h2>

      {showEmergency && (
        <Alert variant="danger" className="mt-3">
          <FaExclamationTriangle /> No Internet — App is in Emergency Mode.
        </Alert>
      )}

      <div className="row mt-4">
        <div className="col-md-6">
          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title>
                <FaQrcode /> Offline QR Check-In
              </Card.Title>
              <Card.Text>Scan patient health card without internet.</Card.Text>
              <Button variant="dark" onClick={simulateQRScan}>
                Simulate Scan
              </Button>
            </Card.Body>
          </Card>

          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title>
                <FaPrint /> Print Patient Token
              </Card.Title>
              <Card.Text>
                OPD token will print via local printer (offline).
              </Card.Text>
              <Button variant="secondary" onClick={simulateTokenPrint}>
                Print Token
              </Button>
            </Card.Body>
          </Card>

          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title>
                <FaUsb /> USB Manual Sync
              </Card.Title>
              <Card.Text>
                Transfer hospital data manually via USB stick.
              </Card.Text>
              <Button variant="warning" onClick={simulateUsbSync}>
                Start USB Sync
              </Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title>
                <FaPowerOff /> Emergency Health Card
              </Card.Title>
              <Card.Text>
                {cachedCard
                  ? "Card cached successfully."
                  : "Card unavailable offline."}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => alert("Digital Card: John Doe / ID 1020")}
              >
                Show Health Card
              </Button>
            </Card.Body>
          </Card>

          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title>
                <FaExclamationTriangle /> SOS Mode
              </Card.Title>
              <Card.Text>Tap to cache location + timestamp.</Card.Text>
              <Button variant="danger" onClick={() => setShowSOS(true)}>
                Activate SOS
              </Button>
            </Card.Body>
          </Card>

          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title>
                <FaSync /> Sync Status
              </Card.Title>
              <Badge
                bg={
                  syncStatus === "online"
                    ? "success"
                    : syncStatus === "syncing"
                    ? "warning"
                    : "secondary"
                }
              >
                {syncStatus}
              </Badge>
              <Button
                className="ms-2"
                variant="outline-primary"
                onClick={simulateSync}
              >
                Force Sync
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Deployment Form */}
      <div className="card p-3 my-4">
        <h5>Add Offline Deployment</h5>
        <input
          className="form-control mb-2"
          placeholder="Location Name"
          value={form.locationName}
          onChange={(e) => setForm({ ...form, locationName: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Region"
          value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
        />
        <select
          className="form-select mb-2"
          value={form.deploymentType}
          onChange={(e) => setForm({ ...form, deploymentType: e.target.value })}
        >
          {["Kiosk", "Mobile Unit", "Community Center", "Other"].map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <select
          className="form-select mb-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          {["Active", "Inactive", "Maintenance"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Uptime (Hours)"
          value={form.uptimeHours}
          onChange={(e) =>
            setForm({ ...form, uptimeHours: Number(e.target.value) })
          }
        />
        <textarea
          className="form-control mb-2"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <Button variant="primary" onClick={handleSubmit}>
          Submit Deployment
        </Button>
      </div>

      {/* Deployment List */}
      <h5 className="mt-4">Deployed Locations</h5>
      {deployments.map((d) => (
        <Card className="mb-2 p-2" key={d._id}>
          <strong>{d.locationName}</strong> ({d.region})<br />
          Type: {d.deploymentType} | Status: {d.status} | Uptime:{" "}
          {d.uptimeHours}h<p className="text-muted">{d.notes}</p>
        </Card>
      ))}

      {/* SOS Modal */}
      <Modal show={showSOS} onHide={() => setShowSOS(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🚨 SOS Triggered</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Location & timestamp saved. Will auto-send when online.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowSOS(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast.visible}
          bg={showToast.type}
          onClose={() => setShowToast({ ...showToast, visible: false })}
        >
          <Toast.Header>
            {showToast.type === "success" && (
              <FaCheckCircle className="me-2 text-success" />
            )}
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{showToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default OfflineDeploymentDashboard;
