import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Card,
  Row,
  Col,
  Form,
  Container,
} from "react-bootstrap";
import axios from "axios";

const EmergencySOSSection = () => {
  const [location, setLocation] = useState({
    city: "Unknown",
    state: "",
    country: "",
  });
  const [showSOS, setShowSOS] = useState(true);
  const [showPanicModal, setShowPanicModal] = useState(false);
  const [guardianContact, setGuardianContact] = useState("9112345678"); // from user profile (placeholder)

  // Mocked API call (use real location API in production)
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Simulated region assignment
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          let city = "Unknown";
          if (lat < 23) city = "Bengaluru";
          else if (lat > 28) city = "Delhi";
          else city = "Pune";
          setLocation({ city, state: "Maharashtra", country: "India" });
        },
        () => {
          setLocation({
            city: "Fallback City",
            state: "Maharashtra",
            country: "India",
          });
        }
      );
    } else {
      setLocation({ city: "Location Not Available" });
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

const triggerPanic = async () => {
  setShowPanicModal(false);

  try {
    const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
    const token = bbsUserData?.token;

    if (!token) {
      alert("User not authenticated. Please login.");
      return;
    }

    const response = await axios.post(
      "http://localhost:5000/api/emergency/trigger",
      {
        location,
        guardianContact,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("🚨 SOS Triggered! Emergency contact alerted.");
  } catch (err) {
    console.error("Failed to trigger SOS:", err.response?.data || err.message);
    alert("❌ Error triggering SOS. Please try again.");
  }
};


  if (!showSOS) return null;

  return (
    <>
      {/* Floating SOS Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "30px",
          zIndex: 1000,
        }}
      >
        <Button
          variant="danger"
          className="rounded-circle shadow pulse"
          style={{ width: "60px", height: "60px", fontSize: "24px" }}
          onClick={() => setShowPanicModal(true)}
          title="Emergency SOS"
        >
          🚨
        </Button>
      </div>

      {/* Footer SOS Block */}
      <div className="bg-dark text-white py-3 text-center mt-5">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="text-start">
              <h6 className="mb-1">🆘 Emergency Services ({location.city})</h6>
              <p className="mb-0 small">
                Ambulance:{" "}
                <a href="tel:102" className="text-info">
                  102
                </a>{" "}
                | Police:{" "}
                <a href="tel:100" className="text-info">
                  100
                </a>{" "}
                | Guardian:{" "}
                <a href={`tel:${guardianContact}`} className="text-info">
                  {guardianContact}
                </a>
              </p>
            </Col>
            <Col md={4} className="text-end">
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => setShowPanicModal(true)}
              >
                🚨 Panic Button
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Panic Modal */}
      <Modal
        show={showPanicModal}
        onHide={() => setShowPanicModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>🚨 Confirm SOS Trigger</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="border-danger p-3">
            <h5 className="text-danger">Emergency Action</h5>
            <p>You are about to trigger an emergency SOS alert. This will:</p>
            <ul>
              <li>📞 Call ambulance and notify police</li>
              <li>📨 Alert your saved guardian ({guardianContact})</li>
              <li>📝 Log this incident in your emergency history</li>
            </ul>
            <Form.Check
              type="checkbox"
              label="Also alert my guardian via SMS"
              defaultChecked
            />
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPanicModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={triggerPanic}>
            Yes, Trigger SOS
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmergencySOSSection;
