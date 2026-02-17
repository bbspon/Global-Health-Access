import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";
import QRCode from "react-qr-code";
import {
  Download,
  GeoAltFill,
  ShieldCheck,
  Calendar2Check,
  QrCode,
  UpcScan,
} from "react-bootstrap-icons";
import axios from "axios";
// add with the other imports
import { Link } from "react-router-dom";

const DigitalHealthCard = () => {
  const [qrData, setQrData] = useState("");
  const [refreshed, setRefreshed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const baseUri =
          import.meta.env.VITE_API_URI ||
          `${window.location.protocol}//${window.location.host}/api`;
        // ensure no trailing slash
        const url = `${baseUri.replace(/\/$/, "")}/card/digital-card`;

        const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
        const token = bbsUserData?.token;
        if (!token) {
          throw new Error("No auth token found");
        }

        console.log("Fetching digital card from", url, "with token", token);

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(res.data);
        setQrData(res.data.qrToken);
      } catch (err) {
        console.error("Error loading digital health card", err);
        if (err.response && err.response.status === 404) {
          setError("No digital health card found for your account.");
        } else {
          setError("Failed to load digital health card. " +
            (err.response ? `status ${err.response.status}` : err.message));
        }
      }
    };

    fetchCard();
  }, []);

  const handleRefreshQR = async () => {
    try {
      const baseUri =
        import.meta.env.VITE_API_URI ||
        `${window.location.protocol}//${window.location.host}/api`;
      const url = `${baseUri.replace(/\/$/, "")}/card/digital-card/refresh`;

      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;
      if (!token) throw new Error("No auth token");

      console.log("Refreshing QR via", url);

      const res = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQrData(res.data.qrToken);
      setRefreshed(true);
    } catch (err) {
      console.error("QR refresh error", err);
      alert("QR refresh failed. " + (err.response ? `status ${err.response.status}` : err.message));
    }
  };

  const handleDownloadPDF = () => {
    window.print(); // Replace with PDF download lib if needed
  };

  return (
    <Container className="my-4">
      <h2 className="mb-3">🩺 Your Digital Health Access Card</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {userInfo ? (
        <Card className="shadow-lg border-primary p-3">
          <Row>
            <Col
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <QRCode value={qrData} size={200} />
            </Col>
            <Col md={6}>
              <h4>{userInfo.name}</h4>
              <Badge bg="success" className="mb-2">
                {userInfo.status}
              </Badge>
              <p>
                <ShieldCheck /> Plan: <strong>{userInfo.planTier}</strong>
              </p>
              <p>
                <Calendar2Check /> Valid Till:{" "}
                <strong>{userInfo.planExpiry}</strong>
              </p>
              <p>🧾 Coverage:</p>
              <ul>
                <ul>
                  <li>OPD Visits: {userInfo.coverage?.opd ?? "N/A"}</li>
                  <li>IPD Stays: {userInfo.coverage?.ipd ?? "N/A"}</li>
                  <li>Lab Tests: {userInfo.coverage?.labs ?? "N/A"}</li>
                </ul>
              </ul>
              <p>
                <GeoAltFill /> {userInfo.city}, {userInfo.state}
              </p>
              <div className="d-flex gap-2">
                <Button variant="outline-primary" onClick={handleDownloadPDF}>
                  <Download /> Download as PDF
                </Button>
                <Button variant="outline-info" onClick={handleRefreshQR}>
                  🔄 Refresh QR
                </Button>
              </div>
              <div className="d-flex gap-3 mt-3">
                <Link
                  to="/qr-pass"
                  className="btn btn-outline-success d-flex align-items-center gap-2"
                >
                  <QrCode size={18} /> QR Pass
                </Link>
                <Link
                  to="/qr"
                  className="btn btn-outline-secondary d-flex align-items-center gap-2"
                >
                  <UpcScan size={18} /> Raw QR
                </Link>
              </div>
            </Col>
          </Row>
        </Card>
      ) : (
        <Alert variant="warning" className="mt-3">
          Loading your digital health card...
        </Alert>
      )}

      {refreshed && (
        <Alert variant="info" className="mt-3">
          🔁 QR refreshed. Valid for next 48 hours. Show this at any partner
          hospital.
        </Alert>
      )}
    </Container>
  );
};

export default DigitalHealthCard;
