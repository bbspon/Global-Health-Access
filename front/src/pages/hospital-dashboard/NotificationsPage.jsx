import React, { useEffect, useState } from "react";
import { Container, ListGroup, Badge, Spinner } from "react-bootstrap";
import axios from "axios";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/notifications?role=hospital"
      );
      setNotifications(res.data.data || res.data || []);
    } catch (err) {
      console.error("Error loading notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getBadgeVariant = (category) => {
    switch (category) {
      case "Info":
        return "info";
      case "Finance":
        return "success";
      case "System":
        return "warning";
      case "Health":
        return "primary";
      case "Alert":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Container className="py-4">
      <h4>🔔 Alerts & Notifications</h4>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <ListGroup>
          {notifications.map((note) => (
            <ListGroup.Item key={note._id}>
              {note.message}{" "}
              <Badge bg={getBadgeVariant(note.category)}>{note.category}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default NotificationsPage;
