// PlanUsageDashboard.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Modal,
  Badge,
} from "react-bootstrap";

const planColors = {
  Basic: "secondary",
  Silver: "info",
  Gold: "warning",
  Premium: "success",
  Corporate: "primary",
};

const dummyData = [
  {
    user: "Aarav Shah",
    plan: "Gold",
    family: ["Spouse: Nidhi Shah"],
    opdUsed: 4,
    opdCap: 4,
    ipdUsed: 2,
    ipdCap: 3,
    labUsed: 2500,
    labCap: 3000,
    mentalHealthUsed: 1,
    mentalHealthCap: 3,
    addOns: { opd: 1 },
    alerts: ["OPD usage at 100%"],
  },
  {
    user: "Fatima Ali",
    plan: "Premium",
    family: [],
    opdUsed: 1,
    opdCap: 10,
    ipdUsed: 0,
    ipdCap: 5,
    labUsed: 500,
    labCap: 4000,
    mentalHealthUsed: 0,
    mentalHealthCap: 4,
    addOns: {},
    alerts: [],
  },
  {
    user: "Ravi Patel",
    plan: "Corporate",
    family: ["Spouse: Meera Patel", "Child: Arya Patel"],
    opdUsed: 6,
    opdCap: 8,
    ipdUsed: 3,
    ipdCap: 4,
    labUsed: 3500,
    labCap: 4000,
    mentalHealthUsed: 2,
    mentalHealthCap: 3,
    addOns: { lab: 500 },
    alerts: ["Lab limit at 95%"],
  },
  {
    user: "Neha Verma",
    plan: "Silver",
    family: [],
    opdUsed: 2,
    opdCap: 4,
    ipdUsed: 1,
    ipdCap: 3,
    labUsed: 1000,
    labCap: 2000,
    mentalHealthUsed: 0,
    mentalHealthCap: 2,
    addOns: {},
    alerts: [],
  },
  {
    user: "Imran Khan",
    plan: "Basic",
    family: ["Spouse: Zara Khan"],
    opdUsed: 1,
    opdCap: 2,
    ipdUsed: 0,
    ipdCap: 1,
    labUsed: 400,
    labCap: 1000,
    mentalHealthUsed: 0,
    mentalHealthCap: 1,
    addOns: {},
    alerts: [],
  },
];

const PlanUsageDashboard = () => {
  const [data, setData] = useState(dummyData);
  const [pdfModal, setPdfModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  const handlePDFDownload = () => {
    setPdfModal(true);
    setTimeout(() => setPdfModal(false), 3000);
  };

  const handleManualReset = () => {
    setResetModal(true);
    setTimeout(() => setResetModal(false), 2000);
  };

  return (
    <Container fluid>
      <h2 className="my-4">📊 Plan Usage Dashboard</h2>
      <Row>
        {data.map((user, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>
                  {user.user}{" "}
                  <Badge bg={planColors[user.plan] || "secondary"}>
                    {user.plan} Plan
                  </Badge>
                </Card.Title>

                {user.family.length > 0 && (
                  <Card.Subtitle className="mb-2 text-muted">
                    Family: {user.family.join(", ")}
                  </Card.Subtitle>
                )}
                <hr />

                {["opd", "ipd", "lab", "mentalHealth"].map((type) => {
                  const used = (user[`${type}Used`] || 0) + (user.addOns?.[type] || 0);
                  const cap = user[`${type}Cap`] || 1;
                  const percent = Math.round((used / cap) * 100);
                  const alert = user.alerts?.find((a) =>
                    a.toLowerCase().includes(type)
                  );
                  return (
                    <div className="mb-3" key={type}>
                      <strong>
                        {type.toUpperCase()} Usage{" "}
                        {alert && <Badge bg="danger">{alert}</Badge>}
                      </strong>
                      <ProgressBar
                        now={percent > 100 ? 100 : percent}
                        label={`${used}/${cap}`}
                        variant={
                          percent < 70
                            ? "success"
                            : percent < 90
                            ? "warning"
                            : "danger"
                        }
                        className="mt-1"
                      />
                    </div>
                  );
                })}

                <div className="d-flex mt-4 justify-content-between">
                  <Button variant="success" onClick={handlePDFDownload}>
                    📥 Download PDF
                  </Button>
                  <Button variant="outline-danger" onClick={handleManualReset}>
                    ♻️ Manual Reset
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* PDF Modal */}
      <Modal show={pdfModal} onHide={() => setPdfModal(false)} centered>
        <Modal.Body className="text-center">
          <h5>✅ PDF Generated</h5>
          <p>Your usage summary is ready for download.</p>
        </Modal.Body>
      </Modal>

      {/* Reset Modal */}
      <Modal show={resetModal} onHide={() => setResetModal(false)} centered>
        <Modal.Body className="text-center">
          <h5>♻️ Plan Counters Reset</h5>
          <p>This user’s usage counters will now reset.</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PlanUsageDashboard;