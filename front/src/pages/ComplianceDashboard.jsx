import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
} from "react-bootstrap";
import {
  Globe,
  ShieldLock,
  FileEarmarkText,
  CloudDownload,
  GraphUp,
  Gear,
} from "react-bootstrap-icons";

const countries = [
  { name: "India", status: "Compliant", badge: "success" },
  { name: "UAE", status: "In Review", badge: "warning" },
  { name: "EU", status: "Pending", badge: "danger" },
  { name: "SEA", status: "Ready", badge: "info" },
];

const ComplianceDashboard = () => {
  const handleExport = (type) => {
    alert(`${type} has been exported successfully.`);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h3>
            <ShieldLock className="me-2" />
            Global Compliance & Legal Readiness
          </h3>
          <p>
            Track and manage the legal status and regulation adapters across
            countries for BBSCART Health Plans.
          </p>
        </Col>
      </Row>

      <Row>
        {/* Left Column: Country Compliance Status */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <Globe className="me-2" />
              Country Compliance Status
            </Card.Header>
            <Card.Body>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map((c, idx) => (
                    <tr key={idx}>
                      <td>{c.name}</td>
                      <td>
                        <Badge bg={c.badge}>{c.status}</Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            alert(`Viewing adapter details for ${c.name}`)
                          }
                        >
                          View Adapter
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Legal Tools */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <FileEarmarkText className="me-2" />
              Legal Tools
            </Card.Header>
            <Card.Body>
              <Button
                className="mb-2 w-100"
                variant="outline-success"
                onClick={() => handleExport("Legal Audit Report")}
              >
                <CloudDownload className="me-2" />
                Generate Full Legal Audit Report
              </Button>
              <Button
                className="mb-2 w-100"
                variant="outline-warning"
                onClick={() => handleExport("Compliance Overview")}
              >
                <CloudDownload className="me-2" />
                Export Country Compliance Overview
              </Button>
              <Button
                className="mb-2 w-100"
                variant="outline-info"
                onClick={() => alert("Geo Simulation Mode Activated")}
              >
                <GraphUp className="me-2" />
                Simulate Plan in Another Country
              </Button>
              <Button
                className="w-100"
                variant="outline-secondary"
                onClick={() => alert("Opening Country-Specific Settings")}
              >
                <Gear className="me-2" />
                Manage Country Regulation Settings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ComplianceDashboard;
