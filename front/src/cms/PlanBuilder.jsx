import React, { useState } from 'react';
import {
  Container, Row, Col, Form, Button, Card
} from 'react-bootstrap';

const initialAddOns = {
  dental: false,
  mentalHealth: false,
  maternity: false,
  physiotherapy: false,
  vision: false,
  wellnessCoaching: false,
};

const PlanBuilder = () => {
  const [formData, setFormData] = useState({
    planName: '',
    tier: '',
    validity: '',
    opdVisits: '',
    labTests: '',
    telemedicine: false,
    emergencyBenefits: false,
    specialistAccess: '',
    priceINR: '',
    priceAED: '',
    availability: {
      city: '',
      state: '',
      country: ''
    },
    isFamilyPlan: false,
    familyMembers: '',
    brochure: null,
    termsFile: null,
    description: '',
    internalNotes: '',
    tags: '',
    status: 'Draft',
  });

  const [addOns, setAddOns] = useState(initialAddOns);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('availability')) {
      setFormData(prev => ({
        ...prev,
        availability: { ...prev.availability, [name.split('.')[1]]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleAddOnChange = (e) => {
    const { name, checked } = e.target;
    setAddOns(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      addOns
    };
    console.log('Submitting Plan:', finalData);
    alert('Plan submitted successfully!');
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">🛠️ Plan Builder</h2>
      <Card className="p-4 shadow rounded-4">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="planName">
                <Form.Label>Plan Name</Form.Label>
                <Form.Control
                  type="text"
                  name="planName"
                  value={formData.planName}
                  onChange={handleInputChange}
                  placeholder="e.g., Prime Care+"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="tier">
                <Form.Label>Plan Tier</Form.Label>
                <Form.Select name="tier" value={formData.tier} onChange={handleInputChange}>
                  <option value="">Select Tier</option>
                  <option value="Basic">Basic</option>
                  <option value="Prime">Prime</option>
                  <option value="Elite">Elite</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4">Add-Ons</h5>
          <Row>
            {Object.keys(addOns).map(key => (
              <Col xs={6} md={4} key={key}>
                <Form.Check
                  label={key.replace(/([A-Z])/g, ' $1')}
                  name={key}
                  type="checkbox"
                  checked={addOns[key]}
                  onChange={handleAddOnChange}
                />
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col md={4}>
              <Form.Group controlId="validity">
                <Form.Label>Validity</Form.Label>
                <Form.Select name="validity" value={formData.validity} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                  <option value="Custom">Custom</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="opdVisits">
                <Form.Label>OPD Visits</Form.Label>
                <Form.Control
                  type="number"
                  name="opdVisits"
                  value={formData.opdVisits}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="labTests">
                <Form.Label>Lab Tests Included</Form.Label>
                <Form.Control
                  type="text"
                  name="labTests"
                  value={formData.labTests}
                  onChange={handleInputChange}
                  placeholder="e.g., CBC, Thyroid, etc."
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              <Form.Group>
                <Form.Check
                  label="Telemedicine Access"
                  name="telemedicine"
                  checked={formData.telemedicine}
                  onChange={handleInputChange}
                />
                <Form.Check
                  label="Emergency Benefits"
                  name="emergencyBenefits"
                  checked={formData.emergencyBenefits}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="specialistAccess">
                <Form.Label>Specialist Access</Form.Label>
                <Form.Select name="specialistAccess" value={formData.specialistAccess} onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="Included">Included</option>
                  <option value="Limited">Limited</option>
                  <option value="Directory Only">Directory Only</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4">Pricing</h5>
          <Row>
            <Col md={6}>
              <Form.Group controlId="priceINR">
                <Form.Label>Price (INR)</Form.Label>
                <Form.Control
                  type="number"
                  name="priceINR"
                  value={formData.priceINR}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="priceAED">
                <Form.Label>Price (AED)</Form.Label>
                <Form.Control
                  type="number"
                  name="priceAED"
                  value={formData.priceAED}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="mt-4">Availability</h5>
          <Row>
            <Col md={4}>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="availability.city"
                  value={formData.availability.city}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="availability.state"
                  value={formData.availability.state}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="availability.country"
                  value={formData.availability.country}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Check
            className="mt-4"
            type="switch"
            label="Enable Family Plan"
            name="isFamilyPlan"
            checked={formData.isFamilyPlan}
            onChange={handleInputChange}
          />

          {formData.isFamilyPlan && (
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="familyMembers">
                  <Form.Label>No. of Family Members</Form.Label>
                  <Form.Control
                    type="number"
                    name="familyMembers"
                    value={formData.familyMembers}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          <Row className="mt-4">
            <Col md={6}>
              <Form.Group controlId="brochure">
                <Form.Label>Upload Brochure</Form.Label>
                <Form.Control type="file" name="brochure" onChange={handleFileChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="termsFile">
                <Form.Label>Upload Terms & Conditions</Form.Label>
                <Form.Control type="file" name="termsFile" onChange={handleFileChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label>Plan Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="tags">
                <Form.Label>Tags / Keywords</Form.Label>
                <Form.Control
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., wellness, diabetes"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="internalNotes" className="mt-3">
            <Form.Label>Internal Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="internalNotes"
              value={formData.internalNotes}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Save & Publish Plan
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default PlanBuilder;
