import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const StaffManager = () => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔥 FIXED API BASE URL
  const API = "http://localhost:5000/api";

  useEffect(() => {
    fetchStaff();
  }, []);

  // Fetch staff list
  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/staff`);
      console.log("API Staff:", res.data); // Debugging ✔
      setStaffList(res.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
    setLoading(false);
  };

  // Trigger edit modal
  const handleEdit = (staff) => {
    console.log("Editing staff:", staff); // Debug ✔
    setSelectedStaff({ ...staff });
    setShowModal(true);
  };

  // Save edits to DB
  const handleSave = async () => {
    if (!selectedStaff?._id) return;

    setSaving(true);

    try {
      // ✨ Only valid fields sent to backend
      const payload = {
        name: selectedStaff.name,
        role: selectedStaff.role,
        status: selectedStaff.status,
      };

      const res = await axios.put(
        `${API}/staff/${selectedStaff._id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

   console.log("Updated result:", res.data);

   if (!res.data || !res.data.staff) {
     alert("Update failed: Staff record not found");
     setSaving(false);
     return;
   }


      setShowModal(false);
      fetchStaff(); // Refresh UI from DB
    } catch (error) {
      console.error("Update staff failed:", error);
      alert(
        "Update failed: " + (error.response?.data?.error || "Unknown error")
      );
    }

    setSaving(false);
  };

  return (
    <Container className="py-4">
      <h4 className="text-center mb-4">👥 Staff Access Manager</h4>

      {loading ? (
        <div className="text-center p-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ width: "120px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((staff) => (
              <tr key={staff._id}>
                <td>{staff.name}</td>
                <td>{staff.role}</td>
                <td>{staff.status}</td>

                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleEdit(staff)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* EDIT MODAL */}
      {selectedStaff && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Staff</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={selectedStaff.name}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={selectedStaff.role}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, role: e.target.value })
                  }
                >
                  <option>Admin</option>
                  <option>Doctor</option>
                  <option>Nurse</option>
                  <option>Support</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={selectedStaff.status}
                  onChange={(e) =>
                    setSelectedStaff({
                      ...selectedStaff,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>

            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default StaffManager;
