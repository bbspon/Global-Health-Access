import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import {
  calculatePlanValue,
  getPlanValuePresets,
} from "../services/planValueAPI"; // Adjust path as needed

const HealthPlanValueCalculator = () => {
  const [healthRate, setHealthRate] = useState(6200); // Default rate
  const [units, setUnits] = useState(10);
  const [locked, setLocked] = useState(true);
  const [lockDate, setLockDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [overrideRate, setOverrideRate] = useState(null);
  const [finalValue, setFinalValue] = useState(0);
  const [alertMsg, setAlertMsg] = useState(null);

  useEffect(() => {
    const fetchPresets = async () => {
      const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
      try {
        const data = await getPlanValuePresets(token);
        if (data.defaultRate) setHealthRate(data.defaultRate);
      } catch (err) {
        console.error("Failed to fetch presets:", err);
      }
    };

    fetchPresets();
  }, []);

  useEffect(() => {
    const rateToUse = overrideRate ?? healthRate;
    setFinalValue(rateToUse * units);
  }, [healthRate, units, overrideRate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;

    const payload = {
      units,
      rate: overrideRate ?? healthRate,
      locked,
      lockDate: locked ? lockDate : null,
    };
    console.log("🚀 Payload sent to server:", {
      units,
      locked,
      lockDate,
      healthRate,
      overrideRate,
    });
    try {
      const result = await calculatePlanValue(payload, token);
      setFinalValue(result.calculatedValue);
      setAlertMsg(
        `✅ Calculated by API: ₹${result.calculatedValue.toLocaleString()} (${units} × ₹${
          payload.rate
        }/unit)`
      );
    } catch (err) {
      console.error("API calculation failed:", err);
      setAlertMsg("❌ Failed to calculate plan value via API.");
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h4 className="mb-4">🩺 Health Plan Value Calculator</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Health Plan Units</Form.Label>
                <Form.Control
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(parseFloat(e.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Use Floating Rate?</Form.Label>
                <Form.Check
                  type="switch"
                  checked={!locked}
                  onChange={() => setLocked(!locked)}
                  label={
                    locked ? "Locked at Enrollment" : "Floating – auto updates"
                  }
                />
              </Form.Group>

              {locked && (
                <Form.Group className="mb-3">
                  <Form.Label>Lock Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={lockDate}
                    onChange={(e) => setLockDate(e.target.value)}
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Health Rate (₹/unit)</Form.Label>
                <Form.Control
                  type="number"
                  value={healthRate}
                  onChange={(e) => setHealthRate(parseFloat(e.target.value))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Override Rate (Optional)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Leave empty to use current rate"
                  value={overrideRate ?? ""}
                  onChange={(e) =>
                    setOverrideRate(
                      e.target.value ? parseFloat(e.target.value) : null
                    )
                  }
                />
              </Form.Group>

              <Alert variant={alertMsg?.startsWith("✅") ? "success" : "info"}>
                📊 <strong>Calculated Plan Value:</strong> ₹
                {finalValue.toLocaleString()} ({units} × ₹
                {overrideRate ?? healthRate}/unit)
              </Alert>

              {alertMsg && (
                <Alert
                  variant={alertMsg.startsWith("✅") ? "success" : "danger"}
                >
                  {alertMsg}
                </Alert>
              )}

              <Button type="submit" variant="primary">
                📩 Submit Plan
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HealthPlanValueCalculator;
