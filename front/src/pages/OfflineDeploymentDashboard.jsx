// File: OfflineDeploymentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Button, Badge, Modal, Card, Spinner, Alert, ToastContainer, Toast } from 'react-bootstrap';
import {
  FaSync,
  FaPrint,
  FaSatellite,
  FaQrcode,
  FaPowerOff,
  FaExclamationTriangle,
  FaUsb,
  FaBatteryFull,
  FaCheckCircle
} from 'react-icons/fa';

const OfflineDeploymentDashboard = () => {
  const [syncStatus, setSyncStatus] = useState('offline');
  const [showEmergency, setShowEmergency] = useState(false);
  const [cachedCard, setCachedCard] = useState(true);
  const [showSOS, setShowSOS] = useState(false);
  const [showToast, setShowToast] = useState({ type: '', message: '', visible: false });

  useEffect(() => {
    if (!navigator.onLine) {
      setSyncStatus('offline');
      setShowEmergency(true);
    } else {
      setSyncStatus('online');
    }
  }, []);

  const showNotification = (type, message) => {
    setShowToast({ type, message, visible: true });
    setTimeout(() => setShowToast({ ...showToast, visible: false }), 3000);
  };

  const simulateSync = () => {
    setSyncStatus('syncing');
    showNotification('info', 'Attempting to sync...');
    setTimeout(() => {
      setSyncStatus('online');
      showNotification('success', 'Data synced successfully.');
    }, 3000);
  };

  const simulateQRScan = () => {
    showNotification('success', 'QR Code Verified: John Doe / ID 1020');
  };

  const simulateTokenPrint = () => {
    showNotification('info', 'Token Printed: OPD #045');
  };

  const simulateUsbSync = () => {
    showNotification('info', 'USB Sync Started...');
    setTimeout(() => {
      showNotification('success', 'USB Data Sync Completed.');
    }, 2500);
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
        {/* Column 1 */}
        <div className="col-md-6">
          {/* QR Scan */}
          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title><FaQrcode /> Offline QR Check-In</Card.Title>
              <Card.Text>
                Scan patient health card without internet.
              </Card.Text>
              <Button variant="dark" onClick={simulateQRScan}>Simulate Scan</Button>
            </Card.Body>
          </Card>

          {/* Print Token */}
          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title><FaPrint /> Print Patient Token</Card.Title>
              <Card.Text>OPD token will print via local printer (offline).</Card.Text>
              <Button variant="secondary" onClick={simulateTokenPrint}>
                <FaPrint /> Print Token
              </Button>
            </Card.Body>
          </Card>

          {/* USB Manual Sync */}
          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title><FaUsb /> USB Manual Sync</Card.Title>
              <Card.Text>Transfer hospital data manually via USB stick.</Card.Text>
              <Button variant="warning" onClick={simulateUsbSync}>Start USB Sync</Button>
            </Card.Body>
          </Card>
        </div>

        {/* Column 2 */}
        <div className="col-md-6">
          {/* Digital Health Card */}
          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title><FaPowerOff /> Emergency Health Card</Card.Title>
              <Card.Text>
                {cachedCard ? 'Card cached successfully.' : 'Card unavailable offline.'}
              </Card.Text>
              <Button variant="primary" onClick={() => alert("Digital Card: John Doe / ID 1020")}>
                Show Health Card
              </Button>
            </Card.Body>
          </Card>

          {/* SOS */}
          <Card bg="light" className="mb-3">
            <Card.Body>
              <Card.Title><FaExclamationTriangle /> SOS Mode</Card.Title>
              <Card.Text>Tap to cache location + timestamp.</Card.Text>
              <Button variant="danger" onClick={() => setShowSOS(true)}>Activate SOS</Button>
            </Card.Body>
          </Card>

          {/* Sync Status */}
          <Card bg="light" className="mb-3 ">
            <Card.Body>
              <Card.Title><FaSync /> Sync Status</Card.Title>
              <Badge bg={
                syncStatus === 'online' ? 'success' :
                syncStatus === 'syncing' ? 'warning' : 'secondary'
              }>
                {syncStatus}
              </Badge>
              <Button className="ms-2" variant="outline-primary" onClick={simulateSync}>
                Force Sync
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>

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

      {/* Notification Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast.visible} bg={showToast.type} onClose={() => setShowToast({ ...showToast, visible: false })}>
          <Toast.Header>
            {showToast.type === 'success' && <FaCheckCircle className="me-2 text-success" />}
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{showToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default OfflineDeploymentDashboard;
