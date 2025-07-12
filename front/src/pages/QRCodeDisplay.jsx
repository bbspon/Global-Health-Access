import React, { useEffect, useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import QRCode from "qrcode.react";
import axios from "axios";

const QRCodeDisplay = () => {
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    // Simulate or replace with actual API
    axios
      .get("/api/user-qr")
      .then((res) => setQrData(res.data.qrCode))
      .catch(() => {});
  }, []);

  const handleDownload = () => {
    const canvas = document.getElementById("user-qr");
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "health-card-qr.png";
    link.href = pngUrl;
    link.click();
  };

  return (
    <div className="container py-4">
      <h3>Your Health QR Code</h3>
      {qrData ? (
        <Card className="p-4 text-center shadow-sm">
          <QRCode id="user-qr" value={qrData} size={180} />
          <p className="mt-3 text-muted">
            Show this QR at partnered hospitals, labs, and pharmacy.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="primary" onClick={handleDownload}>
              Download QR
            </Button>
            <Button variant="secondary">Share</Button>
            <Button variant="outline-danger">Refresh</Button>
          </div>
        </Card>
      ) : (
        <Alert variant="warning">
          QR not available. Please activate your plan.
        </Alert>
      )}
    </div>
  );
};

export default QRCodeDisplay;
