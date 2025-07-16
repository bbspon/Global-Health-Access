import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

const LabCMS = () => {
  const [test, setTest] = useState({
    name: '',
    category: '',
    subcategory: '',
    priceINR: '',
    priceAED: '',
    sampleRequired: false,
    fastingRequired: false,
    resultDuration: '',
    cities: [],
    instructions: '',
    instructionPdf: null,
    tags: '',
    insuranceCovered: false,
    claimable: false,
    prescriptionRequired: false,
    riskLevel: '',
    publicVisible: true,
    notes: '',
    status: 'active',
    linkedLabs: [],
  });

  const cityList = ['Delhi', 'Mumbai', 'Chennai', 'Dubai', 'Abu Dhabi'];
  const categoryList = ['Blood', 'Urine', 'Radiology', 'Genetic', 'Pathology'];
  const riskTags = ['General', 'Preventive', 'Critical'];

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setTest(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setTest(prev => {
      const current = new Set(prev[name]);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, [name]: [...current] };
    });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setTest(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Test Submitted:', test);
    alert('Lab test saved successfully!');
  };

  return (
    <Container className="my-4">
      <h3 className="mb-4">🧪 Lab Test CMS</h3>
      <Card className="p-4 shadow-lg rounded-4">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Test Name</Form.Label>
                <Form.Control name="name" value={test.name} onChange={handleInput} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={test.category} onChange={handleInput} required>
                  <option value="">Select Category</option>
                  {categoryList.map(cat => (
                    <option key={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Subcategory</Form.Label>
                <Form.Control name="subcategory" value={test.subcategory} onChange={handleInput} />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Price (INR)</Form.Label>
                <Form.Control type="number" name="priceINR" value={test.priceINR} onChange={handleInput} required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Price (AED)</Form.Label>
                <Form.Control type="number" name="priceAED" value={test.priceAED} onChange={handleInput} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Check label="Sample Required?" name="sampleRequired" checked={test.sampleRequired} onChange={handleInput} />
            </Col>
            <Col md={4}>
              <Form.Check label="Fasting Required?" name="fastingRequired" checked={test.fastingRequired} onChange={handleInput} />
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Result Duration</Form.Label>
                <Form.Control name="resultDuration" value={test.resultDuration} onChange={handleInput} placeholder="e.g., 24 hours" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Available Cities</Form.Label>
            <div className="d-flex flex-wrap">
              {cityList.map(city => (
                <Form.Check
                  key={city}
                  label={city}
                  inline
                  checked={test.cities.includes(city)}
                  onChange={() => handleMultiSelect('cities', city)}
                />
              ))}
            </div>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Patient Instructions</Form.Label>
                <Form.Control as="textarea" rows={2} name="instructions" value={test.instructions} onChange={handleInput} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Upload Instructions PDF</Form.Label>
                <Form.Control type="file" name="instructionPdf" onChange={handleFileUpload} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tags / Keywords</Form.Label>
                <Form.Control name="tags" value={test.tags} onChange={handleInput} placeholder="e.g., diabetes, thyroid, preventive" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Risk Level</Form.Label>
                <Form.Select name="riskLevel" value={test.riskLevel} onChange={handleInput}>
                  <option value="">Select</option>
                  {riskTags.map(tag => (
                    <option key={tag}>{tag}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={test.status} onChange={handleInput}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="internal">Internal Only</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Check label="Covered by Insurance" name="insuranceCovered" checked={test.insuranceCovered} onChange={handleInput} />
            </Col>
            <Col md={3}>
              <Form.Check label="Claimable Test" name="claimable" checked={test.claimable} onChange={handleInput} />
            </Col>
            <Col md={3}>
              <Form.Check label="Requires Prescription" name="prescriptionRequired" checked={test.prescriptionRequired} onChange={handleInput} />
            </Col>
            <Col md={3}>
              <Form.Check label="Visible in Search" name="publicVisible" checked={test.publicVisible} onChange={handleInput} />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Internal Notes</Form.Label>
            <Form.Control as="textarea" rows={2} name="notes" value={test.notes} onChange={handleInput} placeholder="Admin-only notes" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Save Lab Test
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LabCMS;
