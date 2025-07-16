import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const HealthPlanValueCalculator = () => {
  const [healthRate, setHealthRate] = useState(6200); // default ₹/unit
  const [units, setUnits] = useState(10);
  const [locked, setLocked] = useState(true);
  const [lockDate, setLockDate] = useState(new Date().toISOString().slice(0, 10));
  const [overrideRate, setOverrideRate] = useState(null);
  const [finalValue, setFinalValue] = useState(0);

  useEffect(() => {
    const rateToUse = overrideRate ? overrideRate : healthRate;
    setFinalValue(rateToUse * units);
  }, [healthRate, units, overrideRate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Plan Value Calculated: ₹${finalValue} (${units} units @ ₹${overrideRate || healthRate}/unit)`);
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
                  label={locked ? 'Locked at Enrollment' : 'Floating – auto updates'}
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
                  value={overrideRate || ''}
                  onChange={(e) => setOverrideRate(e.target.value ? parseFloat(e.target.value) : null)}
                />
              </Form.Group>

              <Alert variant="info">
                📊 <strong>Calculated Plan Value:</strong> ₹{finalValue.toLocaleString()} ({units} units × ₹{overrideRate || healthRate}/unit)
              </Alert>

              <Button type="submit" variant="primary">Submit Plan</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HealthPlanValueCalculator;
