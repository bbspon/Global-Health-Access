import React, { useState, useEffect } from "react";
import {
  Container, Card, Row, Col, Button, Badge, Alert
} from "react-bootstrap";
import QRCode from 'react-qr-code';
import { Download, GeoAltFill, ShieldCheck, Calendar2Check } from "react-bootstrap-icons";

const DigitalHealthCard = () => {
  const [qrData, setQrData] = useState("");
  const [refreshed, setRefreshed] = useState(false);
  const [userInfo] = useState({
    name: "Rajesh Kumar",
    tier: "Premium",
    planExpiry: "2025-12-31",
    coverage: { opd: 6, ipd: 2, labs: 4 },
    city: "Chennai",
    state: "Tamil Nadu",
    status: "Active"
  });

  useEffect(() => {
    // Simulated secure QR token
    const generateQR = () => {
      const token = `${userInfo.name}-${userInfo.tier}-${new Date().getTime()}`;
      setQrData(token);
      setRefreshed(true);
    };
    generateQR();
    const refreshInterval = setInterval(generateQR, 1000 * 60 * 60 * 48); // 48h refresh
    return () => clearInterval(refreshInterval);
  }, []);

  const handleDownloadPDF = () => {
    window.print(); // Or use pdf-lib / react-pdf for real PDF
  };

  return (
    <Container className="my-4">
      <h2 className="mb-3">🩺 Your Digital Health Access Card</h2>

      <Card className="shadow-lg border-primary p-3">
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <QRCode value={qrData} size={200} />
          </Col>
          <Col md={6}>
            <h4>{userInfo.name}</h4>
            <Badge bg="success" className="mb-2">{userInfo.status}</Badge>
            <p><ShieldCheck /> Plan: <strong>{userInfo.tier}</strong></p>
            <p><Calendar2Check /> Valid Till: <strong>{userInfo.planExpiry}</strong></p>
            <p>🧾 Coverage:</p>
            <ul>
              <li>OPD Visits: {userInfo.coverage.opd}</li>
              <li>IPD Stays: {userInfo.coverage.ipd}</li>
              <li>Lab Tests: {userInfo.coverage.labs}</li>
            </ul>
            <p><GeoAltFill /> {userInfo.city}, {userInfo.state}</p>
            <Button variant="outline-primary" onClick={handleDownloadPDF}>
              <Download /> Download as PDF
            </Button>
          </Col>
        </Row>
      </Card>

      {refreshed && (
        <Alert variant="info" className="mt-3">
          🔁 QR refreshed. Valid for next 48 hours. Show this at any partner hospital.
        </Alert>
      )}
    </Container>
  );
};

export default DigitalHealthCard;
