// File: FamilyDependentDashboard.jsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Badge,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import {
  PeopleFill,
  PersonBadge,
  ShieldLock,
  StarFill,
} from "react-bootstrap-icons";
import axios from "axios";

export default function FamilyDependentDashboard() {
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (member) => {
    setSelected(member);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  const handleBook = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Appointment booked successfully!");
    }, 1500);
  };
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
        const token = bbsUserData?.token;

        // ✅ Fallback for different key names: 'id' or '_id'
        const userId = bbsUserData?.user?.id || bbsUserData?.user?._id;

        console.log("Fetched userId:", userId);

        if (!userId) {
          console.warn("userId is missing in bbsUser object");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/family-dashboard?userId=${userId}`
        );

        setMembers(res.data.data || []);
      } catch (err) {
        console.error("Error loading family dashboard", err);
      }
    };

    fetchMembers();
  }, []);

  return (
    <Container className="py-4">
      <h3>
        <PeopleFill className="me-2" /> Family & Dependents
      </h3>
      <Row>
        {members.length === 0 ? (
          <p>No members found or still loading...</p>
        ) : (
          members.map((m) => (
            <Col md={6} lg={4} className="mb-4" key={m.id}>
              <Card className="shadow rounded-4">
                <Card.Body>
                  <Card.Title>{m.memberName}</Card.Title> // ✅
                  <p>
                    <PersonBadge className="me-2" /> Role: {m.role} | Age:{" "}
                    {m.age}
                  </p>
                  <Badge bg="info" className="me-2">
                    Plan: {m.tier}
                  </Badge>
                  <Badge bg="warning" className="me-2">
                    {m.permissions.length} Permissions
                  </Badge>
                  <p className="mt-2">
                    <strong>Summary:</strong>
                    <br /> {m.healthSummary}
                  </p>
                  <Button
                    variant="primary"
                    className="w-100 mt-3"
                    onClick={() => openModal(m)}
                  >
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selected?.name}’s Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <p>
                <strong>Role:</strong> {selected.role} | Age: {selected.age}
              </p>
              <p>
                <strong>Plan Tier:</strong> {selected.tier}
              </p>
              <p>
                <strong>Permissions:</strong> {selected.permissions.join(", ")}
              </p>
              <p>
                <strong>Health Summary:</strong> {selected.healthSummary}
              </p>
              <h5>Enabled Tools:</h5>
              <ul>
                {selected.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <Button variant="success" disabled>
              <Spinner size="sm" animation="border" className="me-2" />{" "}
              Booking...
            </Button>
          ) : (
            <Button variant="success" onClick={handleBook}>
              Book Appointment
            </Button>
          )}
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
