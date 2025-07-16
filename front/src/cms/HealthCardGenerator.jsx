import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import QRCode from 'react-qr-code';

const HealthCardGenerator = () => {
  const [cardData, setCardData] = useState({
    name: '',
    userId: '',
    photo: null,
    planName: '',
    planTier: '',
    validFrom: '',
    validTo: '',
    assignedHospital: '',
    assignedDoctor: '',
    supportContact: '',
    language: 'English',
    publicVisible: true,
    watermark: false,
    coBranded: false,
    cardId: 'BBS-HC-' + Math.floor(Math.random() * 1000000),
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setCardData(prev => ({ ...prev, photo: URL.createObjectURL(files[0]) }));
    } else {
      setCardData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const downloadAsImage = () => {
    alert('🖼️ Export to image - Placeholder. Use html2canvas or dom-to-image in production.');
  };

  const downloadAsPDF = () => {
    alert('📄 Export to PDF - Placeholder. Use jsPDF in production.');
  };

  return (
    <Container className="my-4">
      <h3 className="mb-4">💳 Health Card Generator</h3>

      <Card className="p-4 shadow-lg rounded-4 mb-4">
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>User Name</Form.Label>
              <Form.Control name="name" value={cardData.name} onChange={handleChange} />
            </Col>
            <Col md={6}>
              <Form.Label>User ID / Ref</Form.Label>
              <Form.Control name="userId" value={cardData.userId} onChange={handleChange} />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Plan Name</Form.Label>
              <Form.Control name="planName" value={cardData.planName} onChange={handleChange} />
            </Col>
            <Col md={4}>
              <Form.Label>Plan Tier</Form.Label>
              <Form.Select name="planTier" value={cardData.planTier} onChange={handleChange}>
                <option value="">Select</option>
                <option>Basic</option>
                <option>Prime</option>
                <option>Elite</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>User Photo</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleChange} />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Valid From</Form.Label>
              <Form.Control type="date" name="validFrom" value={cardData.validFrom} onChange={handleChange} />
            </Col>
            <Col md={6}>
              <Form.Label>Valid To</Form.Label>
              <Form.Control type="date" name="validTo" value={cardData.validTo} onChange={handleChange} />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Assigned Hospital</Form.Label>
              <Form.Control name="assignedHospital" value={cardData.assignedHospital} onChange={handleChange} />
            </Col>
            <Col md={6}>
              <Form.Label>Assigned Doctor</Form.Label>
              <Form.Control name="assignedDoctor" value={cardData.assignedDoctor} onChange={handleChange} />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Support Contact</Form.Label>
              <Form.Control name="supportContact" value={cardData.supportContact} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <Form.Label>Language</Form.Label>
              <Form.Select name="language" value={cardData.language} onChange={handleChange}>
                <option>English</option>
                <option>Hindi</option>
                <option>Arabic</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Card ID</Form.Label>
              <Form.Control value={cardData.cardId} readOnly />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Check label="Public Visible" name="publicVisible" checked={cardData.publicVisible} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <Form.Check label="Watermark on Expiry" name="watermark" checked={cardData.watermark} onChange={handleChange} />
            </Col>
            <Col md={3}>
              <Form.Check label="Co-Branded Logo" name="coBranded" checked={cardData.coBranded} onChange={handleChange} />
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="p-4 shadow border-dashed rounded-4 text-center mb-3" style={{ background: '#f9f9f9' }}>
        <h5 className="mb-3">🎫 Health Card Preview</h5>
        <div className="p-3 border rounded bg-white" style={{ maxWidth: '350px', margin: '0 auto' }}>
          <div className="text-start">
            {cardData.photo && <Image src={cardData.photo} roundedCircle width={60} height={60} />}
            <h6 className="mt-2">{cardData.name}</h6>
            <p className="mb-1">Plan: <strong>{cardData.planName} ({cardData.planTier})</strong></p>
            <p className="mb-1">Valid: {cardData.validFrom} → {cardData.validTo}</p>
            <p className="mb-1">Hospital: {cardData.assignedHospital}</p>
            <p className="mb-1">Doctor: {cardData.assignedDoctor}</p>
            <p className="mb-1">Support: {cardData.supportContact}</p>
            <p className="mb-1">Lang: {cardData.language}</p>
          </div>
          <div className="mx-auto mt-3 mb-2" style={{ background: 'white', padding: '8px', display: 'inline-block' }}>
            <QRCode value={JSON.stringify({
              userId: cardData.userId,
              cardId: cardData.cardId,
              plan: cardData.planName,
              tier: cardData.planTier,
            })} size={128} />
          </div>
          {cardData.watermark && (
            <div className="position-absolute text-danger" style={{ top: 10, right: 10, fontSize: '0.9rem' }}>
              <strong>EXPIRED</strong>
            </div>
          )}
        </div>
      </Card>

      <div className="d-flex justify-content-center gap-3">
        <Button variant="success" onClick={downloadAsPDF}>📄 Export as PDF</Button>
        <Button variant="info" onClick={downloadAsImage}>🖼️ Export as Image</Button>
      </div>
    </Container>
  );
};

export default HealthCardGenerator;
