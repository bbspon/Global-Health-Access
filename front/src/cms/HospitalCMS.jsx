import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';

const HospitalCMS = () => {
  const [hospital, setHospital] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    tier: '',
    services: [],
    accreditations: [],
    logo: null,
    latitude: '',
    longitude: '',
    contactPhone: '',
    contactEmail: '',
    operationalHours: '',
    isEmergency: false,
    specialties: [],
    isFeatured: false,
    isPartnered: false,
    tags: '',
    status: 'active',
    notes: '',
    documents: null
  });

  const servicesList = ['OPD', 'IPD', 'Maternity', 'Surgery', 'ICU', 'Pediatrics', 'Dental', 'Diagnostics', 'Emergency'];
  const accreditationsList = ['NABH', 'JCI', 'ISO Certified', 'Empaneled'];
  const specialtiesList = ['Cardiology', 'Orthopedics', 'Oncology', 'Neurology', 'ENT', 'General Medicine'];

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setHospital(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxGroup = (name, value) => {
    setHospital(prev => {
      const current = new Set(prev[name]);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [name]: [...current] };
    });
  };

  const handleFile = (e) => {
    const { name, files } = e.target;
    setHospital(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hospital Submitted:', hospital);
    alert('Hospital saved successfully!');
  };

  return (
    <Container className="my-4">
      <h3 className="mb-4">🏥 Hospital CMS</h3>
      <Card className="p-4 shadow rounded-4">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Hospital Name</Form.Label>
                <Form.Control name="name" value={hospital.name} onChange={handleInput} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="tier">
                <Form.Label>Tier</Form.Label>
                <Form.Select name="tier" value={hospital.tier} onChange={handleInput} required>
                  <option value="">Select Tier</option>
                  <option value="1">Tier 1</option>
                  <option value="2">Tier 2</option>
                  <option value="3">Tier 3</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Full Address</Form.Label>
            <Form.Control name="address" value={hospital.address} onChange={handleInput} required />
          </Form.Group>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control name="city" value={hospital.city} onChange={handleInput} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control name="state" value={hospital.state} onChange={handleInput} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control name="country" value={hospital.country} onChange={handleInput} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Services Offered</Form.Label>
              {servicesList.map(service => (
                <Form.Check key={service}
                  label={service}
                  checked={hospital.services.includes(service)}
                  onChange={() => handleCheckboxGroup('services', service)}
                />
              ))}
            </Col>
            <Col md={6}>
              <Form.Label>Specialties</Form.Label>
              {specialtiesList.map(specialty => (
                <Form.Check key={specialty}
                  label={specialty}
                  checked={hospital.specialties.includes(specialty)}
                  onChange={() => handleCheckboxGroup('specialties', specialty)}
                />
              ))}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Accreditation Tags</Form.Label>
              {accreditationsList.map(acc => (
                <Form.Check key={acc}
                  label={acc}
                  checked={hospital.accreditations.includes(acc)}
                  onChange={() => handleCheckboxGroup('accreditations', acc)}
                />
              ))}
            </Col>
            <Col md={6}>
              <Form.Group controlId="logo">
                <Form.Label>Upload Hospital Logo</Form.Label>
                <Form.Control type="file" name="logo" onChange={handleFile} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="latitude">
                <Form.Label>Latitude</Form.Label>
                <Form.Control name="latitude" value={hospital.latitude} onChange={handleInput} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="longitude">
                <Form.Label>Longitude</Form.Label>
                <Form.Control name="longitude" value={hospital.longitude} onChange={handleInput} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="contactPhone">
                <Form.Label>Contact Phone</Form.Label>
                <Form.Control name="contactPhone" value={hospital.contactPhone} onChange={handleInput} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="contactEmail">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control name="contactEmail" value={hospital.contactEmail} onChange={handleInput} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="operationalHours">
            <Form.Label>Operational Hours</Form.Label>
            <Form.Control name="operationalHours" value={hospital.operationalHours} onChange={handleInput} placeholder="e.g., Mon–Sat 9AM–9PM" />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Check
                label="Emergency Availability"
                name="isEmergency"
                checked={hospital.isEmergency}
                onChange={handleInput}
              />
            </Col>
            <Col md={4}>
              <Form.Check
                label="Featured Hospital"
                name="isFeatured"
                checked={hospital.isFeatured}
                onChange={handleInput}
              />
            </Col>
            <Col md={4}>
              <Form.Check
                label="Partnered with BBS"
                name="isPartnered"
                checked={hospital.isPartnered}
                onChange={handleInput}
              />
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col md={6}>
              <Form.Group controlId="tags">
                <Form.Label>Tags / Keywords</Form.Label>
                <Form.Control name="tags" value={hospital.tags} onChange={handleInput} placeholder="e.g., cancer care, emergency, Delhi" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={hospital.status} onChange={handleInput}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="notes">
            <Form.Label>Internal Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={hospital.notes}
              onChange={handleInput}
              placeholder="Notes for admin reference only"
            />
          </Form.Group>

          <Form.Group controlId="documents" className="mb-4">
            <Form.Label>Upload Accreditation / MOU Documents</Form.Label>
            <Form.Control type="file" name="documents" onChange={handleFile} />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Save Hospital
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default HospitalCMS;
