import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

const DoctorCMS = () => {
  const [doctor, setDoctor] = useState({
    name: '',
    specialization: '',
    subspecialty: '',
    education: '',
    experience: '',
    license: '',
    cities: [],
    hospitals: [],
    consultationTypes: { physical: false, tele: false, video: false },
    languages: [],
    tags: '',
    profilePic: null,
    verified: false,
    verifiedStatus: 'pending',
    publicVisible: true,
    geoVisible: true,
    status: 'active',
    priority: '',
    rating: 4.6, // Readonly placeholder
    notes: '',
  });

  const cityList = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Dubai'];
  const hospitalList = ['Apollo Hospital', 'Fortis', 'AIIMS', 'Zulekha'];
  const specializationList = ['Cardiologist', 'Neurologist', 'Orthopedic', 'Pediatrician'];
  const languageList = ['English', 'Hindi', 'Tamil', 'Arabic'];
  const verifiedStatuses = ['pending', 'verified', 'suspended'];

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setDoctor(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMultiSelect = (name, value) => {
    setDoctor(prev => {
      const current = new Set(prev[name]);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, [name]: [...current] };
    });
  };

  const handleConsultToggle = (type) => {
    setDoctor(prev => ({
      ...prev,
      consultationTypes: {
        ...prev.consultationTypes,
        [type]: !prev.consultationTypes[type],
      },
    }));
  };

  const handleFileUpload = (e) => {
    setDoctor(prev => ({ ...prev, profilePic: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Doctor Profile:', doctor);
    alert('Doctor profile saved successfully!');
  };

  return (
    <Container className="my-4">
      <h3 className="mb-4">👨‍⚕️ Doctor CMS</h3>
      <Card className="p-4 shadow-lg rounded-4">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Doctor Name</Form.Label>
                <Form.Control name="name" value={doctor.name} onChange={handleInput} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Specialization</Form.Label>
                <Form.Select name="specialization" value={doctor.specialization} onChange={handleInput} required>
                  <option value="">Select Specialization</option>
                  {specializationList.map(spec => (
                    <option key={spec}>{spec}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Subspecialty</Form.Label>
                <Form.Control name="subspecialty" value={doctor.subspecialty} onChange={handleInput} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Education / Qualification</Form.Label>
                <Form.Control name="education" value={doctor.education} onChange={handleInput} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Experience (Years)</Form.Label>
                <Form.Control type="number" name="experience" value={doctor.experience} onChange={handleInput} />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>License No</Form.Label>
                <Form.Control name="license" value={doctor.license} onChange={handleInput} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Priority Rank (for featured list)</Form.Label>
                <Form.Control type="number" name="priority" value={doctor.priority} onChange={handleInput} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Available Cities</Form.Label>
            <div className="d-flex flex-wrap">
              {cityList.map(city => (
                <Form.Check
                  key={city}
                  inline
                  label={city}
                  checked={doctor.cities.includes(city)}
                  onChange={() => handleMultiSelect('cities', city)}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assigned Hospitals</Form.Label>
            <div className="d-flex flex-wrap">
              {hospitalList.map(hospital => (
                <Form.Check
                  key={hospital}
                  inline
                  label={hospital}
                  checked={doctor.hospitals.includes(hospital)}
                  onChange={() => handleMultiSelect('hospitals', hospital)}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Consultation Types</Form.Label>
            <div className="d-flex flex-wrap">
              {['physical', 'tele', 'video'].map(type => (
                <Form.Check
                  key={type}
                  inline
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  checked={doctor.consultationTypes[type]}
                  onChange={() => handleConsultToggle(type)}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Languages Spoken</Form.Label>
            <div className="d-flex flex-wrap">
              {languageList.map(lang => (
                <Form.Check
                  key={lang}
                  inline
                  label={lang}
                  checked={doctor.languages.includes(lang)}
                  onChange={() => handleMultiSelect('languages', lang)}
                />
              ))}
            </div>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tags / Keywords</Form.Label>
                <Form.Control name="tags" value={doctor.tags} onChange={handleInput} placeholder="e.g., maternity, senior, diabetes" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={doctor.status} onChange={handleInput}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Verification Status</Form.Label>
                <Form.Select name="verifiedStatus" value={doctor.verifiedStatus} onChange={handleInput}>
                  {verifiedStatuses.map(v => (
                    <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Check label="Verified Doctor Badge" name="verified" checked={doctor.verified} onChange={handleInput} />
            </Col>
            <Col md={3}>
              <Form.Check label="Public Visible" name="publicVisible" checked={doctor.publicVisible} onChange={handleInput} />
            </Col>
            <Col md={3}>
              <Form.Check label="Geo Visible" name="geoVisible" checked={doctor.geoVisible} onChange={handleInput} />
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>⭐ Patient Rating (Read-only)</Form.Label>
                <Form.Control readOnly value={doctor.rating + ' / 5'} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Internal Notes</Form.Label>
            <Form.Control as="textarea" rows={2} name="notes" value={doctor.notes} onChange={handleInput} />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Save Doctor Profile
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default DoctorCMS;
