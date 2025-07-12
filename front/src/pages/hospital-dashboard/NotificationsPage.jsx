import React from "react";
import { Container, ListGroup, Badge } from "react-bootstrap";

const NotificationsPage = () => {
  return (
    <Container className="py-4">
      <h4>🔔 Alerts & Notifications</h4>
      <ListGroup>
        <ListGroup.Item>
          New plan tier rules updated <Badge bg="info">Info</Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          Reimbursement payment released <Badge bg="success">Finance</Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          System maintenance scheduled <Badge bg="warning">System</Badge>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default NotificationsPage;
