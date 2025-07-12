import React, { useState } from "react";
import {
  Container, Row, Col, Card, Button, Form, Badge, Modal, InputGroup,
} from "react-bootstrap";
import { MicFill, CameraVideoFill } from "react-bootstrap-icons";

const communities = [
  { name: "Diabetes Circle", tags: ["Condition"], members: 5200 },
  { name: "Mindful Living", tags: ["Wellness", "Mental"], members: 3400 },
  { name: "PCOS Support", tags: ["Women's Health"], members: 2300 },
  { name: "Ayurveda Healing", tags: ["Lifestyle"], members: 1800 },
];

export default function VirtualHealthCommunity() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showJoin, setShowJoin] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [language, setLanguage] = useState("en");
  const [message, setMessage] = useState("");
  const [joinedGroups, setJoinedGroups] = useState([]);

  const handleJoinGroup = () => {
    if (!anonymous) return; // Prevent join if anonymous is OFF

    if (selectedGroup && !joinedGroups.includes(selectedGroup.name)) {
      const joinedAs = anonymous ? "Anonymous" : "Named";
      console.log(`Joined ${selectedGroup.name} as ${joinedAs}. Message: ${message}`);
      setJoinedGroups(prev => [...prev, selectedGroup.name]);
    }
    setShowJoin(false);
    setSelectedGroup(null);
    setMessage("");
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    console.log(`Selected language: ${selectedLang}`);
  };

  return (
    <Container className="py-4">
      <h2>🌐 Virtual Health Communities</h2>
      <p>Join peer-led groups, share experiences, attend AMAs, and stay motivated.</p>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Select onChange={handleLanguageChange} value={language}>
            <option value="en">🌍 English</option>
            <option value="hi">🇮🇳 Hindi</option>
            <option value="ar">🇦🇪 Arabic</option>
          </Form.Select>
        </Col>
        <Col md={4} className="mt-3">
          <Form.Check
            type="switch"
            label="Join Anonymously"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
        </Col>
      </Row>

      <Row>
        {communities.map((group, idx) => (
          <Col md={6} key={idx} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{group.name}</Card.Title>
                <Badge bg="info" className="me-2">{group.tags.join(", ")}</Badge>
                <p>{group.members} members</p>
                <Button
                  variant={joinedGroups.includes(group.name) ? "success" : "primary"}
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowJoin(true);
                  }}
                  disabled={joinedGroups.includes(group.name)}
                >
                  {joinedGroups.includes(group.name) ? "Joined" : "Join"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Join Group Modal */}
      <Modal show={showJoin} onHide={() => setShowJoin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>👥 Join Group: {selectedGroup?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Welcome Message (optional)</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="Say hello..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button variant="outline-secondary"><MicFill /></Button>
              <Button variant="outline-secondary"><CameraVideoFill /></Button>
            </InputGroup>
          </Form.Group>
          <Form.Text className="d-block mt-2">
            Anonymous mode is <strong>{anonymous ? "ON ✅" : "OFF ❌"}</strong>.
          </Form.Text>
          {!anonymous && (
            <p className="text-danger mt-2">
              ⚠️ You must enable Anonymous Mode to join this group.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowJoin(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleJoinGroup}
            disabled={!anonymous}
          >
            Confirm & Join
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
