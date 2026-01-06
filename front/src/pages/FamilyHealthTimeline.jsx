import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Badge,
  Alert,
} from "react-bootstrap";
import { saveAs } from "file-saver";
import {
  fetchTimeline,
  addTimelineEvent,
  deleteTimelineEvent,
} from "../services/familyHealthTimelineAPI";
import { useParams } from "react-router-dom";

export default function FamilyHealthTimeline() {
  const [currentPerson, setCurrentPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [newEvent, setNewEvent] = useState({
    type: "Doctor",
    label: "",
    date: "",
    notes: "",
    attachment: null,
  });
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { planId } = useParams();

const handleAddEvent = async () => {
  if (!currentPerson) {
    alert("Please select a family member before adding an event.");
    return;
  }

  try {
    const member = members.find((m) => m._id === currentPerson);
    if (!member) return;

    const payload = {
      type: newEvent.type,
      label: newEvent.label,
      date: newEvent.date,
      notes: newEvent.notes,
      attachmentUrl: null,
    };

await addTimelineEvent(member.name, payload);

await loadTimeline(); // 🔑 refresh state from DB

setShowModal(false);
setNewEvent({
  type: "Doctor",
  label: "",
  date: "",
  notes: "",
  attachment: null,
});

alert("Event saved successfully");

  } catch (err) {
    console.error("Add event error:", err?.response?.data || err);
    alert("Failed to save event");
  }
};


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewEvent({ ...newEvent, attachment: file });
  };

const exportTimeline = () => {
  const member = members.find((m) => m._id === currentPerson);

  if (!member) {
    alert("Please select a family member");
    return;
  }

  if (!member.events || member.events.length === 0) {
    alert("No events to export");
    return;
  }

  const doc = new jsPDF();

  let y = 10;
  doc.setFontSize(14);
  doc.text("Family Health Timeline", 10, y);

  y += 8;
  doc.setFontSize(11);
  doc.text(`Member Name: ${member.name}`, 10, y);

  y += 6;
  doc.text(`Plan ID: ${planId}`, 10, y);

  y += 10;
  doc.setFontSize(12);
  doc.text("Events:", 10, y);

  y += 6;
  doc.setFontSize(10);

  member.events.forEach((event, index) => {
    if (y > 270) {
      doc.addPage();
      y = 10;
    }

    doc.text(`${index + 1}. ${event.date} | ${event.type}`, 10, y);
    y += 5;

    doc.text(`Label: ${event.label}`, 12, y);
    y += 5;

    if (event.notes) {
      doc.text(`Notes: ${event.notes}`, 12, y);
      y += 6;
    }

    y += 2;
  });

  doc.save(`${member.name.replace(/\s/g, "_")}_Health_Timeline.pdf`);
};

  const handleDeleteEvent = async (eventId) => {
    try {
      const updated = await deleteTimelineEvent(currentPerson, eventId);
      setMembers(updated);
    } catch (err) {
      alert("Error deleting event");
    }
  };
const loadTimeline = async () => {
  try {
    setLoading(true);
    if (!planId) return;

    const response = await fetchTimeline(planId);

    const membersData = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.data?.data)
      ? response.data.data
      : [];

    setMembers(membersData);

    if (membersData.length > 0) {
      setCurrentPerson(membersData[0]._id);
    } else {
      setCurrentPerson(null);
    }
  } catch (error) {
    console.error("Failed to fetch timeline:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadTimeline();
}, [planId]);



  const selectedMember = members.find((m) => m._id === currentPerson);
  return (
    <div className="container py-4">
      <h4>👨‍👩‍👧 Family Health Timeline & Milestones</h4>

      <Alert variant="info" className="d-flex justify-content-between">
        <span>
          Viewing: <strong>{currentPerson}</strong>
        </span>
        <Form.Check
          type="switch"
          label="Admin Mode"
          checked={adminMode}
          onChange={(e) => setAdminMode(e.target.checked)}
        />
      </Alert>

      <Form.Select
        className="mb-3"
        value={currentPerson || ""}
        onChange={(e) => setCurrentPerson(e.target.value)}
      >
        <option value="" disabled>
          -- Select Family Member --
        </option>

        {members.map((m) => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </Form.Select>

      {selectedMember?.events?.map((event, idx) => (
        <Card className="mb-3" key={idx}>
          <Card.Body>
            <Row>
              <Col md={8}>
                <h6>{event.label}</h6>
                <p className="text-muted">📅 {event.date}</p>
                <p>{event.notes}</p>
                {event.attachment && (
                  <p className="text-primary">📎 {event.attachment.name}</p>
                )}
              </Col>
              <Col md={4} className="text-end">
                <Badge bg="secondary">{event.type}</Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <Button
        className="me-2"
        variant="primary"
        onClick={() => setShowModal(true)}
      >
        ➕ Add Event
      </Button>
      <Button variant="success" onClick={exportTimeline}>
        📄 Export as PDF
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Timeline Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Event Type</Form.Label>
              <Form.Select
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, type: e.target.value })
                }
              >
                <option>Doctor</option>
                <option>Vaccine</option>
                <option>Lab</option>
                <option>Reminder</option>
                <option>Milestone</option>
                <option>AI Suggestion</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.label}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, label: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.notes}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, notes: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Attachment (Optional)</Form.Label>
              <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddEvent}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>

      {adminMode && (
        <div className="mt-4">
          <h5>📊 Admin Dashboard</h5>
          {members.map((m) => (
            <Card className="mb-2" key={m._id}>
              <Card.Body>
                <h6>{m.name}</h6>
                <p>Total Events: {m.events.length}</p>
                <p>
                  Doctor Visits:{" "}
                  {m.events.filter((e) => e.type === "Doctor").length}
                </p>
                <p>
                  Reminders:{" "}
                  {m.events.filter((e) => e.type === "Reminder").length}
                </p>
                <p>
                  AI Suggestions:{" "}
                  {m.events.filter((e) => e.type === "AI Suggestion").length}
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
