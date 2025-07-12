import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// 🔐 Mock JWT Decode (replace with actual auth)
const getUserData = () => ({
  name: "Fatima",
  roleTag: ["agent"], // Change to "parent", "employer", or "agent" to test
});

const RoleBasedDashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUserData();
    if (user?.roleTag?.length) {
      setRole(user.roleTag[0]);
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, []);

  // ✅ Download payout report as CSV
  const handleDownloadPayoutReport = () => {
    const csvContent = [
      ["User", "Plan", "Commission"],
      ["Aditya", "Super Premium", "₹800"],
      ["Fatima", "Basic+", "₹300"],
    ]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "agent-payout-report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Role: <Badge bg="info">{role}</Badge></h4>

      {/* 🧠 AI Suggestion Alert */}
      <Alert variant="light">
        <strong>🧠 Smart Suggestion:</strong>{" "}
        {role === "parent" && "Your child Aarav has a lab test due this week."}
        {role === "employer" && "2 employees are nearing plan limits. Consider upgrades."}
        {role === "agent" && "You have 3 new referral leads pending follow-up."}
      </Alert>

      {/* 👨‍👩‍👧 Parent (Family) View */}
      {role === "parent" && (
        <Card className="mb-4">
          <Card.Header>👨‍👩‍👧 Family Health Tracker</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <h6>Add/Manage Members</h6>
                <Button variant="outline-primary" className="mb-2">+ Add Member</Button>
                <Table bordered>
                  <thead>
                    <tr><th>Name</th><th>Plan</th><th>Permissions</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Aarav</td><td>OPD Only</td><td>Booking, View Records</td></tr>
                    <tr><td>Meera</td><td>Full</td><td>All Access</td></tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <h6>🩺 Book Appointment</h6>
                <Form.Select className="mb-2">
                  <option>Choose Family Member</option>
                  <option>Aarav</option>
                  <option>Meera</option>
                </Form.Select>
                <Button variant="success">Book Doctor Visit</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* 💼 Employer View */}
      {role === "employer" && (
        <Card className="mb-4">
          <Card.Header>🏢 Company Plan Manager</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Button variant="success">+ Add Employee</Button>
              </Col>
              <Col md={6}>
                <Form.Select>
                  <option>Filter by Branch</option>
                  <option>Head Office</option>
                  <option>Chennai Office</option>
                </Form.Select>
              </Col>
            </Row>
            <Table striped bordered>
              <thead>
                <tr><th>Employee</th><th>Plan</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>Ravi Kumar</td><td>Gold</td><td><Badge bg="success">Active</Badge></td></tr>
                <tr><td>Divya Nair</td><td>Silver</td><td><Badge bg="warning">Pending</Badge></td></tr>
              </tbody>
            </Table>
            <Button variant="outline-dark">📄 Download Invoice Report</Button>
          </Card.Body>
        </Card>
      )}

      {/* 💸 Agent View */}
      {role === "agent" && (
        <Card className="mb-4">
          <Card.Header>💸 Agent Earnings Dashboard</Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Col md={4}>
                <h6>Total Earnings</h6>
                <Badge bg="success" className="fs-5">₹12,400</Badge>
              </Col>
              <Col md={4}>
                <h6>Bonus Tier</h6>
                <Badge bg="warning">Gold Agent</Badge>
              </Col>
              <Col md={4}>
                <h6>📱 QR Referral</h6>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=https://bbscart.health/agent123"
                  alt="Referral QR"
                  height={80}
                />
              </Col>
            </Row>
            <Table striped bordered>
              <thead><tr><th>User</th><th>Plan</th><th>Commission</th></tr></thead>
              <tbody>
                <tr><td>Aditya</td><td>Super Premium</td><td>₹800</td></tr>
                <tr><td>Fatima</td><td>Basic+</td><td>₹300</td></tr>
              </tbody>
            </Table>
            <Button variant="outline-secondary" onClick={handleDownloadPayoutReport}>
              📥 Download Payout Report
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* 🧍 General or Admin */}
      {["admin", "individual"].includes(role) && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Welcome to BBSCART Health</h5>
            <p>This role currently has general access only. Please select a plan or visit the main dashboard.</p>
          </Card.Body>
        </Card>
      )}

      {/* 🔮 Future Preview */}
      <Card className="mt-4">
        <Card.Body>
          <h6>🔮 Upcoming Features</h6>
          <ul>
            <li>Sub-Agent Hierarchies</li>
            <li>Doctor/Nurse Logins</li>
            <li>Family AI Assistant: “What doctor did my dad see?”</li>
            <li>Employer Smart Plan Upsell Recommendations</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RoleBasedDashboard;
