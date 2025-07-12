import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Modal,
  Badge,
} from "react-bootstrap";

const languages = [
  "All Languages",
  "English",
  "Hindi",
  "Tamil",
  "Arabic",
  "Telugu",
  "French",
  "Spanish",
];

const mockChats = [
  {
    user: "User1123",
    language: "Hindi",
    issue: "Booking Help",
    status: "Resolved",
    escalationLevel: 1,
    satisfaction: 4,
  },
  {
    user: "User8822",
    language: "Arabic",
    issue: "Duplicate Billing",
    status: "Escalated",
    escalationLevel: 3,
    satisfaction: 2,
  },
  {
    user: "User0011",
    language: "English",
    issue: "Plan Upgrade",
    status: "Resolved",
    escalationLevel: 2,
    satisfaction: 5,
  },
];

const MultilingualSupportDashboard = () => {
  const [selectedLang, setSelectedLang] = useState("All Languages");
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleViewChat = (chat) => {
    setSelectedChat(chat);
    setShowModal(true);
  };

  const renderEscalationLevel = (level) => {
    if (level === 1) return <Badge bg="info">Bot</Badge>;
    if (level === 2) return <Badge bg="warning">Agent</Badge>;
    return <Badge bg="danger">Admin</Badge>;
  };

  const filteredChats = selectedLang === "All Languages"
    ? mockChats
    : mockChats.filter(chat => chat.language === selectedLang);

  return (
    <Container fluid className="p-4">
      <h3>🌐 Multilingual Support System (Web)</h3>

      <Form.Select
        className="mb-3"
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang}>{lang}</option>
        ))}
      </Form.Select>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header>
              Recent Support Logs{" "}
              {selectedLang !== "All Languages" && `(Language: ${selectedLang})`}
            </Card.Header>
            <Card.Body>
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Language</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Escalation</th>
                    <th>Satisfaction</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChats.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No records found for this language.
                      </td>
                    </tr>
                  ) : (
                    filteredChats.map((chat, i) => (
                      <tr key={i}>
                        <td>{chat.user}</td>
                        <td>{chat.language}</td>
                        <td>{chat.issue}</td>
                        <td>
                          <Badge bg={chat.status === "Resolved" ? "success" : "danger"}>
                            {chat.status}
                          </Badge>
                        </td>
                        <td>{renderEscalationLevel(chat.escalationLevel)}</td>
                        <td>{chat.satisfaction}⭐</td>
                        <td>
                          <Button size="sm" onClick={() => handleViewChat(chat)}>
                            View
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chat Detail: {selectedChat?.user}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Language:</strong> {selectedChat?.language}</p>
          <p><strong>Issue:</strong> {selectedChat?.issue}</p>
          <p><strong>Escalation Level:</strong> {selectedChat?.escalationLevel}</p>
          <p><strong>Status:</strong> {selectedChat?.status}</p>
          <p><strong>Satisfaction:</strong> {selectedChat?.satisfaction}⭐</p>
          <p><strong>Transcript:</strong> [Simulated chat history…]</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MultilingualSupportDashboard;
