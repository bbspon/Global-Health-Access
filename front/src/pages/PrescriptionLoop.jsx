import React, { useState } from "react";
import { Container, Card, Button, Alert } from "react-bootstrap";

const PrescriptionLoop = () => {
  const [message, setMessage] = useState("");

  const handleOrderMedicine = () => {
    // Simulate redirect or API trigger
    setMessage("🛒 Redirecting to medicine ordering page...");
    // Future: Navigate to pharmacy module or open medicine list
  };

  const handleBookLabTest = () => {
    setMessage("🧪 Redirecting to lab test booking...");
    // Future: Navigate to lab booking module
  };

  return (
    <Container className="p-4">
      <h4>💊 Prescription & Follow-up Loop</h4>

      {message && <Alert variant="info">{message}</Alert>}

      <Card className="mb-3">
        <Card.Body>
          <h6>📄 Your Prescription</h6>
          <p>Tab Cetirizine 10mg - Once daily</p>
          <Button variant="success" onClick={handleOrderMedicine}>
            Order Medicine
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h6>🧪 Recommended Tests</h6>
          <ul>
            <li>Complete Allergy Panel</li>
          </ul>
          <Button variant="warning" onClick={handleBookLabTest}>
            Book Lab Test
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrescriptionLoop;
