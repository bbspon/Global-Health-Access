// src/pages/QRHealthPass.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Alert,
  Badge,
  Row,
  Col,
  ListGroup,
  Modal,
  ToggleButton,
} from "react-bootstrap";
import QRCode from "react-qr-code";

const QRHealthPass = () => {
  const [qrToken, setQrToken] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showGuardianModal, setShowGuardianModal] = useState(false);
  const [showQR, setShowQR] = useState(true);
  const [scanLocation, setScanLocation] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  const mockPlan = {
    userId: "6878cab776dff2304cdb2d72", // ⬅️ Replace with actual logged-in user's ID
    planId: "687890b0e584bcbe2c5442f3", // ⬅️ Replace with actual plan ID
    userName: "Ravi Kumar",
    planName: "Premium Multi-City OPD + IPD",
    planStatus: "Active",
    expiryDate: "2025-12-31",
    usage: { opd: 3, ipd: 1, lab: 2 },
    multiCity: true,
    guardianMode: true,
    walletBalance: 230.5,
    emergencyAccess: true,
    nfcEnabled: false,
    faceIdEnabled: false,
  };

const fetchTokenFromBackend = async () => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/qr/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Add token here
      },
      body: JSON.stringify({
        userId: mockPlan.userId,
        planId: mockPlan.planId,
      }),
    });

    if (res.status === 401) {
      console.warn("🔒 Unauthorized – token might be missing or invalid");
    }

    const data = await res.json();
    setQrToken(data.token);
  } catch (err) {
    console.error("❌ Failed to generate QR token", err);
  }
};


  const saveScanRecord = async ( location) => {
     const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
     const token = bbsUserData?.token;

    try {
      await fetch(`${import.meta.env.VITE_API_URI}/qr/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, location }),
      });
    } catch (err) {
      console.error("❌ Failed to record scan", err);
    }
  };

  const fetchScanHistory = async () => {
    try {
      
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/qr/history/${mockPlan.userId}`
      );
      const data = await res.json();
      setScanHistory(data);
    } catch (err) {
      console.error("❌ Failed to fetch scan history", err);
    }
  };

  useEffect(() => {
    fetchTokenFromBackend();
    fetchScanHistory();

    const interval = setInterval(() => {
      fetchTokenFromBackend();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Expired":
        return "danger";
      case "Near Expiry":
        return "warning";
      default:
        return "secondary";
    }
  };

  const simulateScan = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = `Lat: ${pos.coords.latitude.toFixed(
            3
          )}, Lon: ${pos.coords.longitude.toFixed(3)}`;
          setScanLocation(loc);
          setShowAlert(true);
          saveScanRecord(qrToken, loc);
          setTimeout(() => setShowAlert(false), 5000);
        },
        () => {
          const fallbackLoc = "Location unavailable";
          setScanLocation(fallbackLoc);
          setShowAlert(true);
          saveScanRecord(qrToken, fallbackLoc);
          setTimeout(() => setShowAlert(false), 5000);
        }
      );
    } else {
      const noSupportLoc = "Geolocation not supported";
      setScanLocation(noSupportLoc);
      setShowAlert(true);
      saveScanRecord(qrToken, noSupportLoc);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return (
    <div className="container mt-4">
      <h3>My BBSCART QR Health Pass</h3>

      {showAlert && (
        <Alert variant="info">
          ✅ Scan simulated! You checked in.
          <br />
          📍 {scanLocation}
        </Alert>
      )}

      <Card className="shadow-lg mt-3 p-3 text-center">
        <h5>{mockPlan.userName}</h5>
        <p>
          <Badge bg={getStatusVariant(mockPlan.planStatus)}>
            {mockPlan.planStatus}
          </Badge>{" "}
          — {mockPlan.planName}
        </p>

        <div className="d-flex justify-content-center p-3 bg-light">
          {qrToken ? (
            <QRCode value={qrToken} />
          ) : (
            <p className="text-muted">Loading QR code...</p>
          )}
        </div>
        <p className="text-muted">QR auto-refreshes every 60 seconds</p>

        <ToggleButton
          className="mb-2"
          id="toggle-check"
          type="checkbox"
          variant="outline-secondary"
          checked={showQR}
          value="1"
          onChange={() => setShowQR(!showQR)}
        >
          {showQR ? "Hide QR" : "Show QR"}
        </ToggleButton>

        <ListGroup className="mt-3 text-start">
          <ListGroup.Item>
            <b>Plan Expiry:</b> {mockPlan.expiryDate}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>OPD Left:</b> <Badge bg="info">{mockPlan.usage.opd}</Badge>
          </ListGroup.Item>
          <ListGroup.Item>
            <b>IPD Left:</b> <Badge bg="info">{mockPlan.usage.ipd}</Badge>
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Lab Left:</b> <Badge bg="info">{mockPlan.usage.lab}</Badge>
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Wallet Balance:</b> ₹{mockPlan.walletBalance.toFixed(2)}
          </ListGroup.Item>
          {mockPlan.multiCity && (
            <ListGroup.Item>
              <Badge bg="primary">🌐 Multi-City Access Enabled</Badge>
            </ListGroup.Item>
          )}
          {mockPlan.emergencyAccess && (
            <ListGroup.Item>
              <Badge bg="danger">🆘 Emergency Override Enabled</Badge>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            {mockPlan.nfcEnabled ? "NFC Access: ✅" : "NFC Access: ❌"}
            {" | "}
            {mockPlan.faceIdEnabled ? "Face ID: ✅" : "Face ID: ❌"}
          </ListGroup.Item>
        </ListGroup>

        <Row className="mt-4">
          <Col>
            <Button onClick={simulateScan} variant="success">
              Simulate Hospital Scan
            </Button>
          </Col>
          <Col>
            <Button
              variant="warning"
              onClick={() => setShowGuardianModal(true)}
            >
              Guardian Mode
            </Button>
          </Col>
        </Row>
      </Card>

      <h5 className="mt-5">📜 Recent Scan History</h5>
      <ListGroup>
        {scanHistory.length === 0 && (
          <ListGroup.Item>No scan history found</ListGroup.Item>
        )}
        {scanHistory.map((entry, idx) => (
          <ListGroup.Item key={idx}>
            ✅ {entry.location} — {new Date(entry.scannedAt).toLocaleString()} —{" "}
            <b>{entry.result}</b>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal
        show={showGuardianModal}
        onHide={() => setShowGuardianModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Guardian Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This QR will allow guardian access for:
          <ul>
            <li>Ravi Kumar (Main User)</li>
            <li>Child: Aryan Kumar</li>
            <li>Senior: Meera Devi</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowGuardianModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QRHealthPass;
