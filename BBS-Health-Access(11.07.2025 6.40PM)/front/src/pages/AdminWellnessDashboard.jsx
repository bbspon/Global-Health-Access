import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";

// Dummy Data
const initialUsers = [
  { name: "Aarav", steps: 9000, credits: 120, tier: "Gold" },
  { name: "Fatima", steps: 5200, credits: 60, tier: "Silver" },
];

const initialRewards = [
  { id: 1, name: "10% OPD Discount", credits: 100 },
  { id: 2, name: "Amazon ₹100 Card", credits: 200 },
];

const AdminWellnessDashboard = () => {
  const [users] = useState(initialUsers);
  const [rewards, setRewards] = useState(initialRewards);
  const [newRewardName, setNewRewardName] = useState("");
  const [newRewardCredits, setNewRewardCredits] = useState("");

  const [showTiersModal, setShowTiersModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  // Add Reward
  const handleAddReward = () => {
    if (!newRewardName.trim() || !newRewardCredits || isNaN(newRewardCredits)) {
      alert("Please enter a valid reward name and numeric credit value.");
      return;
    }
    const newReward = {
      id: Date.now(),
      name: newRewardName,
      credits: parseInt(newRewardCredits),
    };
    setRewards([...rewards, newReward]);
    setNewRewardName("");
    setNewRewardCredits("");
  };

  // Remove Reward
  const handleRemoveReward = (id) => {
    const updatedRewards = rewards.filter((r) => r.id !== id);
    setRewards(updatedRewards);
  };

  // Export CSV
  const handleExport = () => {
    const csvContent = [
      ["Name", "Steps", "Credits", "Tier"],
      ...users.map((u) => [u.name, u.steps, u.credits, u.tier]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "wellness_leaderboard.csv");
    link.click();
  };

  return (
    <Container  className="mt-4 p-3">
      <h3>🏥 Admin Wellness Credits Dashboard</h3>
      <Row className="mt-3">
        <Col md={8}>
          <Card>
            <Card.Header>User Leaderboard</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Steps</th>
                    <th>Credits</th>
                    <th>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i}>
                      <td>{u.name}</td>
                      <td>{u.steps}</td>
                      <td>
                        <Badge bg="success">{u.credits}</Badge>
                      </td>
                      <td>
                        <Badge bg="warning">{u.tier}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>🎁 Reward Catalog Management</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Reward Name</th>
                    <th>Credits Required</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((r) => (
                    <tr key={r.id}>
                      <td>{r.name}</td>
                      <td>{r.credits}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveReward(r.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h5 className="mt-4">Add New Reward</h5>
              <Form>
                <Row className="align-items-end">
                  <Col md={5}>
                    <Form.Label>Reward Name</Form.Label>
                    <Form.Control
                      value={newRewardName}
                      onChange={(e) => setNewRewardName(e.target.value)}
                      placeholder="Enter reward name"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>Credits</Form.Label>
                    <Form.Control
                      type="number"
                      value={newRewardCredits}
                      onChange={(e) => setNewRewardCredits(e.target.value)}
                      placeholder="100"
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="primary"
                      onClick={handleAddReward}
                      style={{ marginTop: 30 }}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>⚙️ Admin Actions</Card.Header>
            <Card.Body>
              <Button
                variant="info"
                className="mb-2"
                onClick={handleExport}
                block="true"
              >
                📤 Export Logs
              </Button>
              <Button
                variant="secondary"
                className="mb-2"
                onClick={() => setShowTiersModal(true)}
                block="true"
              >
                🛠 Manage Tiers
              </Button>
              <Button
                variant="dark"
                onClick={() => setShowChallengeModal(true)}
                block="true"
              >
                🚀 Launch New Challenge
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Manage Tiers Modal */}
      <Modal show={showTiersModal} onHide={() => setShowTiersModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🛠 Manage Tiers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Bronze: 0–99 Credits</Form.Label>
              <Form.Control disabled value="Bronze: 0–99 (Fixed)" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Silver Threshold</Form.Label>
              <Form.Control type="number" defaultValue={100} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gold Threshold</Form.Label>
              <Form.Control type="number" defaultValue={200} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Platinum Threshold</Form.Label>
              <Form.Control type="number" defaultValue={500} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowTiersModal(false)}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Launch Challenge Modal */}
      <Modal show={showChallengeModal} onHide={() => setShowChallengeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🚀 Launch New Challenge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Challenge Name</Form.Label>
              <Form.Control placeholder="e.g. 10K Steps in 5 Days" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Credit Bonus</Form.Label>
              <Form.Control type="number" placeholder="e.g. 100" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowChallengeModal(false)}>Launch</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminWellnessDashboard;
