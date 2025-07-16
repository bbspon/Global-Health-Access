import React, { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Card, Button, Alert, ListGroup, Form } from 'react-bootstrap';

const AdminDashboardUtilities = () => {
  const [activeKey, setActiveKey] = useState('search');

  const handleAction = (msg) => alert(`✅ Action Successful: ${msg}`);

  return (
    <Container fluid className="py-4">
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Row>
          <Col md={3}>
            <Card className="shadow-sm">
              <Card.Header className="fw-bold bg-dark text-white">🛠️ Admin Utilities</Card.Header>
              <Nav variant="pills" className="flex-column p-2">
                <Nav.Item><Nav.Link eventKey="search">🔍 Smart Search</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="quickactions">📤 Quick Actions</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="validation">🚨 Validation Queue</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="analytics">📊 Content Analytics</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="sessionlock">🔒 Session Lock</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="backup">📁 Data Backup</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="inlineedit">✏️ Inline Editor</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="inbox">📥 Inbox</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="auditlog">🧾 Audit Log</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="calendar">📅 Calendar Sync</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="alerts">⚠️ Alert Center</Nav.Link></Nav.Item>
              </Nav>
            </Card>
          </Col>

          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="search">
                <Card className="p-4 shadow-sm">
                  <h5>🔍 Smart Search</h5>
                  <input type="text" className="form-control mb-3" placeholder="Search plans, doctors, hospitals..." />
                  <Button onClick={() => handleAction('Search Triggered')}>Search</Button>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="quickactions">
                <Card className="p-4 shadow-sm">
                  <h5>📤 Quick Actions</h5>
                  <Button variant="primary" className="m-1" onClick={() => handleAction('Plan Added')}>+ Add Plan</Button>
                  <Button variant="secondary" className="m-1" onClick={() => handleAction('Hospital Added')}>+ Add Hospital</Button>
                  <Button variant="success" className="m-1" onClick={() => handleAction('Banner Uploaded')}>+ Upload Banner</Button>
                  <Button variant="warning" className="m-1" onClick={() => handleAction('Lab Test Added')}>+ Add Lab Test</Button>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="validation">
                <Card className="p-4 shadow-sm">
                  <h5>🚨 Validation Queue</h5>
                  <ListGroup>
                    <ListGroup.Item>Plan Draft: SecureCare Elite – <Button variant="outline-success" size="sm" onClick={() => handleAction('Plan Approved')}>Approve</Button></ListGroup.Item>
                    <ListGroup.Item>Hospital Draft: Sunrise Multispeciality – <Button variant="outline-success" size="sm" onClick={() => handleAction('Hospital Approved')}>Approve</Button></ListGroup.Item>
                  </ListGroup>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="analytics">
                <Card className="p-4 shadow-sm">
                  <h5>📊 Content Analytics</h5>
                  <Alert variant="light">
                    <strong>Plan:</strong> PrimePlus Care – 820 views, 3m avg time, 12% CTR
                  </Alert>
                  <Alert variant="light">
                    <strong>Hospital:</strong> Apollo Chennai – 1200 views, 5m avg time, 22% CTR
                  </Alert>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="sessionlock">
                <Card className="p-4 shadow-sm">
                  <h5>🔒 Session Lock</h5>
                  <Form.Select className="mb-3">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>60 minutes</option>
                  </Form.Select>
                  <Button variant="outline-danger" onClick={() => handleAction('Session Lock Updated')}>Update</Button>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="backup">
                <Card className="p-4 shadow-sm">
                  <h5>📁 Data Backup Tool</h5>
                  <p>Export your CMS data (JSON + media links)</p>
                  <Button variant="success" onClick={() => handleAction('Backup Download Started')}>Download Backup</Button>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="inlineedit">
                <Card className="p-4 shadow-sm">
                  <h5>✏️ Inline Editor Shortcut</h5>
                  <Alert variant="info">Clicking on a live site section will redirect here in future CMS version.</Alert>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="inbox">
                <Card className="p-4 shadow-sm">
                  <h5>📥 Leads & Enquiries Inbox</h5>
                  <ListGroup>
                    <ListGroup.Item>🔔 New Franchise Request from Delhi</ListGroup.Item>
                    <ListGroup.Item>📧 Partner With Us – Lab Inquiry</ListGroup.Item>
                    <ListGroup.Item>📥 Health Card Quote Request</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="auditlog">
                <Card className="p-4 shadow-sm">
                  <h5>🧾 Audit Log</h5>
                  <ListGroup>
                    <ListGroup.Item>[07:55] Admin approved "SecureCare Elite" Plan</ListGroup.Item>
                    <ListGroup.Item>[07:30] Editor submitted Hospital CMS draft</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="calendar">
                <Card className="p-4 shadow-sm">
                  <h5>📅 Calendar Sync</h5>
                  <p>Feature to sync CMS tasks with Google Calendar coming soon.</p>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="alerts">
                <Card className="p-4 shadow-sm">
                  <h5>⚠️ Alert Center</h5>
                  <Alert variant="warning">🕒 Pending validation: 3 items overdue</Alert>
                  <Alert variant="danger">❗ Broken image found in "Plan Benefits" block</Alert>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AdminDashboardUtilities;