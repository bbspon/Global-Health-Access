import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Button, Form, Table, Badge, Spinner
} from 'react-bootstrap';

const WalletAdminDashboard = () => {
  const [walletStats, setWalletStats] = useState({});
  const [cashbackRate, setCashbackRate] = useState(5);
  const [subsidyLimit, setSubsidyLimit] = useState(1000);
  const [healthEnabled, setHealthEnabled] = useState(true);
  const [golddexEnabled, setGolddexEnabled] = useState(true);
  const [smartSuggest, setSmartSuggest] = useState(true);
  const [splitPay, setSplitPay] = useState(true);
  const [manualCreditUserId, setManualCreditUserId] = useState('');
  const [manualCreditAmount, setManualCreditAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Load initial dashboard data
  const loadDashboardData = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/admin/wallet/summary')
      .then(res => res.json())
      .then(data => {
        setWalletStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching summary:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleUpdateConfig = () => {
    fetch('http://localhost:5000/api/admin/wallet/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cashbackRate,
        subsidyLimit,
        healthEnabled,
        golddexEnabled,
        smartSuggest,
        splitPay,
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert('✅ Config updated');
        console.log(data);
      })
      .catch(err => {
        alert('❌ Config update failed');
        console.error(err);
      });
  };

  const handleManualCredit = () => {
    fetch('http://localhost:5000/api/admin/wallet/manual-credit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: manualCreditUserId,
        amount: Number(manualCreditAmount),
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert(`✅ Credited ₹${manualCreditAmount} to ${manualCreditUserId}`);
        setManualCreditUserId('');
        setManualCreditAmount('');
        loadDashboardData();
      })
      .catch(err => {
        alert('❌ Manual credit failed');
        console.error(err);
      });
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">🧾 Wallet Admin Dashboard</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {/* Summary Cards */}
          <Row className="mb-4">
            <Col md={4}><Card body><h5>Health Wallet Balance</h5><p>₹{walletStats.healthTotal}</p></Card></Col>
            <Col md={4}><Card body><h5>Golddex Wallet Balance</h5><p>₹{walletStats.golddexTotal}</p></Card></Col>
            <Col md={4}><Card body><h5>Monthly Budget Used</h5><p>{walletStats.monthlyUsage}%</p></Card></Col>
          </Row>

          {/* Config Card */}
          <Card className="mb-4">
            <Card.Header>⚙️ Wallet Settings</Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Cashback Rate (%)</Form.Label>
                      <Form.Control
                        type="number"
                        value={cashbackRate}
                        onChange={(e) => setCashbackRate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Subsidy Limit (₹)</Form.Label>
                      <Form.Control
                        type="number"
                        value={subsidyLimit}
                        onChange={(e) => setSubsidyLimit(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Check
                  type="switch"
                  label="Enable BBSCART Health Wallet"
                  checked={healthEnabled}
                  onChange={() => setHealthEnabled(!healthEnabled)}
                />
                <Form.Check
                  type="switch"
                  label="Enable Golddex Wallet"
                  checked={golddexEnabled}
                  onChange={() => setGolddexEnabled(!golddexEnabled)}
                />
                <Form.Check
                  type="switch"
                  label="Smart Suggest"
                  checked={smartSuggest}
                  onChange={() => setSmartSuggest(!smartSuggest)}
                />
                <Form.Check
                  type="switch"
                  label="Split Pay Option"
                  checked={splitPay}
                  onChange={() => setSplitPay(!splitPay)}
                />

                <Button className="mt-3" onClick={handleUpdateConfig}>🔄 Update Config</Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Manual Credit */}
          <Card className="mb-4">
            <Card.Header>💸 Manual Wallet Credit</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Control
                    placeholder="User ID"
                    value={manualCreditUserId}
                    onChange={(e) => setManualCreditUserId(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="₹ Amount"
                    type="number"
                    value={manualCreditAmount}
                    onChange={(e) => setManualCreditAmount(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Button variant="success" onClick={handleManualCredit}>💰 Credit Now</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Transactions Table */}
          <Card>
            <Card.Header>📊 Recent Transactions</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Wallet</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(walletStats.transactions || []).map((tx, index) => (
                    <tr key={index}>
                      <td>{tx.user}</td>
                      <td>₹{tx.amount}</td>
                      <td><Badge bg={tx.wallet === 'health' ? 'success' : 'warning'}>{tx.wallet}</Badge></td>
                      <td>{tx.type}</td>
                      <td>{new Date(tx.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default WalletAdminDashboard;
