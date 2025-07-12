// React + Bootstrap Version (User-Facing + Admin + Advanced Tier Management + Enhanced Features)
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Table,
  ProgressBar,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";

const tiers = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
const tierColors = {
  Bronze: "secondary",
  Silver: "info",
  Gold: "warning",
  Platinum: "success",
  Diamond: "primary",
};

const rewardsData = [
  {
    user: "Aarav Shah",
    tier: "Gold",
    xp: 75,
    goal: "Complete 1 more month without OPD",
    history: [
      { date: "2025-06-01", reward: "₹300 wallet credit", reason: "No IPD this quarter" },
      { date: "2025-03-10", reward: "Free Lab Test", reason: "Completed full body check" },
    ],
    suggestions: ["Book your preventive dental check", "Complete 5k steps daily"],
    cityRank: 8,
    globalRank: 152,
  },
  {
    user: "Fatima Ali",
    tier: "Silver",
    xp: 40,
    goal: "2 OPD-free weeks for Gold",
    history: [
      { date: "2025-05-10", reward: "₹250 wallet", reason: "OPD usage < 50%" },
    ],
    suggestions: ["Avoid OPD this month for upgrade", "Log your vitals regularly"],
    cityRank: 15,
    globalRank: 320,
  },
];

export default function LoyaltyRewardsDashboard() {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [tierConfig, setTierConfig] = useState({
    Bronze: "Default",
    Silver: "3 months claim-free",
    Gold: "6 months + 1 checkup",
    Platinum: "12 months + high engagement",
    Diamond: "Top 10% healthiest",
  });

  const handleRedeem = (user) => {
    setModalData(user);
    setShow(true);
  };

  const handleTierChange = (tier, value) => {
    setTierConfig({ ...tierConfig, [tier]: value });
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>🎯 Loyalty & Claims-Free Rewards</h2>
        </Col>
        <Col className="text-end">
          <Button variant="dark" onClick={() => setAdminMode(!adminMode)}>
            {adminMode ? "Exit Admin Mode" : "Admin Panel"}
          </Button>
        </Col>
      </Row>

      {adminMode ? (
        <Card className="mb-4 p-4">
          <h5 className="mb-3">⚙️ Tier Configuration</h5>
          {tiers.map((tier, idx) => (
            <Form.Group key={idx} className="mb-3">
              <Form.Label><Badge bg={tierColors[tier]}>{tier}</Badge> Criteria</Form.Label>
              <Form.Control
                type="text"
                value={tierConfig[tier]}
                onChange={(e) => handleTierChange(tier, e.target.value)}
              />
            </Form.Group>
          ))}
          <Button variant="success">💾 Save Tier Rules</Button>
        </Card>
      ) : (
        <Row>
          {rewardsData.map((user, idx) => (
            <Col md={6} key={idx}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Badge bg={tierColors[user.tier]} className="mb-2">
                    {user.tier} Tier
                  </Badge>
                  <Card.Title>{user.user}</Card.Title>
                  <ProgressBar
                    now={user.xp}
                    label={`${user.xp}%`}
                    variant={tierColors[user.tier]}
                    className="mb-3"
                  />
                  <p><strong>Progress:</strong> {user.goal}</p>
                  <ul>
                    {user.suggestions.map((s, i) => (
                      <li key={i}>💡 {s}</li>
                    ))}
                  </ul>
                  <Alert variant="light">
                    🏆 City Rank: <strong>{user.cityRank}</strong> | 🌍 Global Rank: <strong>{user.globalRank}</strong>
                  </Alert>
                  <Button variant="success" onClick={() => handleRedeem(user)}>
                    🎁 Redeem Rewards
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🎁 Rewards for {modalData?.user}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reward</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {modalData?.history.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td>{r.reward}</td>
                  <td>{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
