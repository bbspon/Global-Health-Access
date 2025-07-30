import React, { useState } from "react";
import { Container, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const CarePassScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const simulateScan = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/carepass/simulate",
        {
          userId: "USER987654", // placeholder; QR logic later
          scannedBy: "DemoHospital",
        }
      );
      setScanResult(res.data);
    } catch (err) {
      console.error("Scan failed", err);
      alert("Scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4 text-center">
      <h4>📷 Scan Care Pass QR</h4>

      <Alert variant="info">[QR Scanner Component Placeholder]</Alert>

      <Button variant="dark" onClick={simulateScan} disabled={loading}>
        {loading ? <Spinner size="sm" animation="border" /> : "Simulate Scan"}
      </Button>

      {scanResult && (
        <Alert variant="success" className="mt-4 text-start">
          <strong>User ID:</strong> {scanResult.userId} <br />
          <strong>Plan:</strong> {scanResult.plan} <br />
          <strong>Tier:</strong> {scanResult.tier} <br />
          <strong>Status:</strong> {scanResult.status} <br />
          <strong>Expiry:</strong> {scanResult.expiry}
        </Alert>
      )}
    </Container>
  );
};

export default CarePassScanner;
