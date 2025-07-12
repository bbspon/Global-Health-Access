import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Nav,
  Tab,
  Button,
  Table,
  Form,
  Badge,
  Alert,
} from "react-bootstrap";
import {
  PersonFill,
  GearFill,
  Globe,
  PieChartFill,
  ClipboardData,
  Robot,
  Envelope,
  Hospital,
  ClipboardHeart,
  Building,
  PersonWorkspace,
  People,
} from "react-bootstrap-icons";

const AdminDashboardsPartnerControl = () => {
  const [key, setKey] = useState("superadmin");

  return (
   <>
    <Container fluid >
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Row>
          {/* Sidebar */}
          <Col md={2} className=" p-5 ">
            <h5 className="text-center">🧠 Admin Panel</h5>
            <Nav variant="pills" className="flex-column text-start  ">
              <Nav.Item><Nav.Link eventKey="superadmin"><PersonFill /> Super Admin</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="hospital"><Hospital /> Hospital Admin</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="doctor"><ClipboardHeart /> Doctor Panel</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="lab"><ClipboardData /> Lab Admin</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="employer"><Building /> Employer</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="compliance"><Globe /> Compliance Officer</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="agent"><People /> Commission Partner</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="support"><Envelope /> Support</Nav.Link></Nav.Item>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={10} className="p-5">
            <Tab.Content>
              {/* SUPER ADMIN */}
              <Tab.Pane eventKey="superadmin">
                <h4>👤 Super Admin – Global Control</h4>
                <Row className="mt-3">
                  <Col md={4}>
                    <Card>
                      <Card.Body>
                        <Card.Title>Total Users</Card.Title>
                        <h3>1,20,430</h3>
                        <Badge bg="success">+12%</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card>
                      <Card.Body>
                        <Card.Title>New Signups</Card.Title>
                        <h3>5,230</h3>
                        <Badge bg="info">+8%</Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card>
                      <Card.Body>
                        <Card.Title>Plan Split</Card.Title>
                        <Table size="sm" className="mb-0">
                          <tbody>
                            <tr><td>Basic</td><td>45%</td></tr>
                            <tr><td>Premium</td><td>35%</td></tr>
                            <tr><td>Gold</td><td>20%</td></tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <hr />
                <h5>💳 Plan Management</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Plan Name</Form.Label>
                    <Form.Control type="text" placeholder="Gold+" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Pricing</Form.Label>
                    <Form.Control type="number" placeholder="499" />
                  </Form.Group>
                  <Button variant="primary">Save Plan</Button>
                </Form>
                <hr />
                <h5>📊 Revenue</h5>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Date</th><th>Revenue</th><th>Hospital</th><th>BBSCART</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>July 9</td><td>₹90,000</td><td>₹54,000</td><td>₹36,000</td></tr>
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* HOSPITAL ADMIN */}
              <Tab.Pane eventKey="hospital">
                <h4>🏥 Hospital Admin Panel</h4>
                <Alert variant="info">Scan logs, revenue breakdown, upload sync to vault, documents, and OPD tracker will show here.</Alert>
                <ul>
                  <li>📅 Appointment Calendar</li>
                  <li>📊 Plan Usage per Patient</li>
                  <li>💸 Hospital Revenue + BBSCART Split</li>
                  <li>✅ Upload Billing + Availability</li>
                </ul>
              </Tab.Pane>

              {/* DOCTOR PANEL */}
              <Tab.Pane eventKey="doctor">
                <h4>👨‍⚕️ Doctor Panel</h4>
                <Alert variant="info">Manage consults, upload notes, view patient records.</Alert>
                <ul>
                  <li>📅 Upcoming Appointments</li>
                  <li>📁 Patient File (QR-based)</li>
                  <li>📝 Upload Diagnosis & Notes</li>
                  <li>📈 History View</li>
                </ul>
              </Tab.Pane>

              {/* LAB ADMIN */}
              <Tab.Pane eventKey="lab">
                <h4>🔬 Lab Admin Panel</h4>
                <Alert variant="info">Add test slots, upload results, manage rates.</Alert>
                <ul>
                  <li>🧪 Test Types</li>
                  <li>📅 Lab Booking Schedule</li>
                  <li>📤 Upload PDF Reports</li>
                  <li>💸 Revenue per Test</li>
                </ul>
              </Tab.Pane>

              {/* EMPLOYER DASHBOARD */}
              <Tab.Pane eventKey="employer">
                <h4>🏢 Employer Dashboard</h4>
                <Alert variant="info">Corporate wellness stats, HR controls, bulk renewals.</Alert>
                <ul>
                  <li>👥 Employee Enrollment</li>
                  <li>📊 Health Usage Summary</li>
                  <li>🧠 AI Wellness Insights</li>
                  <li>📆 Renewals + Tax Report</li>
                </ul>
              </Tab.Pane>

              {/* COMPLIANCE OFFICER */}
              <Tab.Pane eventKey="compliance">
                <h4>🌐 Country Compliance Officer</h4>
                <Alert variant="info">Manage regulations, policy uploads, HL7/FHIR toggles.</Alert>
                <ul>
                  <li>📜 Plan Terms by Country</li>
                  <li>✅ HL7 / FHIR Settings</li>
                  <li>📥 Upload Govt Rules</li>
                  <li>📬 Alert BBSCART Legal</li>
                </ul>
              </Tab.Pane>

              {/* AGENT / PARTNER */}
              <Tab.Pane eventKey="agent">
                <h4>💼 Commission & Referral Panel</h4>
                <Alert variant="info">Track sales, earnings, referrals, payouts.</Alert>
                <ul>
                  <li>📈 Sales Dashboard</li>
                  <li>💰 Earnings & Referral Count</li>
                  <li>📊 Conversion Ratio</li>
                  <li>🧾 Settlement Status</li>
                </ul>
              </Tab.Pane>

              {/* SUPPORT */}
              <Tab.Pane eventKey="support">
                <h4>💬 Support Tickets</h4>
                <Table striped>
                  <thead>
                    <tr><th>ID</th><th>Subject</th><th>Status</th><th>Assigned</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>#2101</td><td>Login Issue</td><td><Badge bg="danger">Open</Badge></td><td>Support Team A</td></tr>
                  </tbody>
                </Table>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
   </>
  );
};

export default AdminDashboardsPartnerControl;
