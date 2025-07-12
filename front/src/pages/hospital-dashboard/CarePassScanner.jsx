import React from "react";
import { Container, Button, Alert } from "react-bootstrap";

const CarePassScanner = () => {
  return (
    <Container className="py-4 text-center">
      <h4>📷 Scan Care Pass QR</h4>
      <Alert variant="info">[QR Scanner Component Placeholder]</Alert>
      <Button variant="dark">Simulate Scan</Button>
    </Container>
  );
};

export default CarePassScanner;
