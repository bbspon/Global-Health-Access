import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Card } from 'react-bootstrap';

import PlanBuilder from './PlanBuilder';
import HospitalCMS from './HospitalCMS';
import LabCMS from './LabCMS';
import DoctorCMS from './DoctorCMS';
import HealthCardGenerator from './HealthCardGenerator';
import SOSManager from './EmergencySOSSection';
import PlanComparisonEditor from './PlanComparisonEditor';
import PartnerInquiryForm from './PartnerWithUsForm';
import HealthPlan from './HealthPlanValueCalculator';
import WellnessTrackerWidgets from './WellnessTracker';
const HealthAccessCMS = () => {
  const [activeKey, setActiveKey] = useState('plan');

  return (
  <Container fluid className="pt-4 " style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
  <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
    <Row className="flex-grow-1">
      <Col md={3}>
        <Card className="shadow-sm rounded-3 h-100 p-3 border border-2 border-dark shadow-sm rounded-3">
          <Card.Header className="fw-bold bg-primary text-white p-2 ">BBS Health CMS</Card.Header>
          <Nav variant="pills" className="flex-column p-2 text-start">
            <Nav.Item><Nav.Link eventKey="healthplan">🧱 Health Plan Value Calculator</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="plan">🧱 Plan Builder</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="hospital">🏥 Hospital CMS</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="lab">🧪 Lab Test CMS</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="doctor">🩺 Doctor CMS</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="card">🆔 Health Card Generator</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="sos">🚨 Emergency SOS</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="compare">📊 Plan Comparison Editor</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="partner">🤝 Partner With Us</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="wellnesstracker">🧘 Wellness Tracker Widgets</Nav.Link></Nav.Item>
          </Nav>
        </Card>
      </Col>

      <Col md={9}  className="p-3 border border-2 border-dark shadow-sm rounded-3" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 60px), ' }}>
        <Tab.Content>
          <Tab.Pane eventKey="healthplan"><HealthPlan /></Tab.Pane>
          <Tab.Pane eventKey="plan"><PlanBuilder /></Tab.Pane>
          <Tab.Pane eventKey="hospital"><HospitalCMS /></Tab.Pane>
          <Tab.Pane eventKey="lab"><LabCMS /></Tab.Pane>
          <Tab.Pane eventKey="doctor"><DoctorCMS /></Tab.Pane>
          <Tab.Pane eventKey="card"><HealthCardGenerator /></Tab.Pane>
          <Tab.Pane eventKey="sos"><SOSManager /></Tab.Pane>
          <Tab.Pane eventKey="compare"><PlanComparisonEditor /></Tab.Pane>
          <Tab.Pane eventKey="partner"><PartnerInquiryForm /></Tab.Pane>
          <Tab.Pane eventKey="wellnesstracker"><WellnessTrackerWidgets /></Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
</Container>

  );
};

export default HealthAccessCMS;
