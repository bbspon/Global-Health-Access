import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const FamilyMembersPage = () => {
  const { planId } = useParams();

  console.log(planId, "planID");

  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    relationship: "",
    idProofUrl: "",
  });

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user-plan/${planId}/family`
      );
      setMembers(data.data || []);
    } catch (err) {
      console.error("Error fetching family members:", err);
    }
  };

  const addMember = async () => {
    try {
      await axios.post(`http://localhost:5000/api/user-plan/${planId}/family`, {
        ...form,
      });
      setForm({
        name: "",
        age: "",
        gender: "",
        relationship: "",
        idProofUrl: "",
      });
      fetchMembers();
    } catch (err) {
      console.error("Error adding family member:", err);
    }
  };

  useEffect(() => {
    if (planId) {
      fetchMembers();
    }
  }, [planId]);

  return (
    <div className="container py-4">
      <h4>Add Family Members to Plan</h4>
      <Form className="mb-4">
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Relationship"
            value={form.relationship}
            onChange={(e) => setForm({ ...form, relationship: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="ID Proof URL (optional)"
            value={form.idProofUrl}
            onChange={(e) => setForm({ ...form, idProofUrl: e.target.value })}
          />
        </Form.Group>
        <Button onClick={addMember}>Add Member</Button>
      </Form>

      <h5>Family Members</h5>
      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Relation</th>
            <th>ID Proof</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, idx) => (
            <tr key={m._id || idx}>
              <td>{m.name}</td>
              <td>{m.age}</td>
              <td>{m.gender}</td>
              <td>{m.relationship}</td>
              <td>
                {m.idProofUrl ? (
                  <a href={m.idProofUrl} target="_blank" rel="noreferrer">
                    View
                  </a>
                ) : (
                  <span>No ID</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FamilyMembersPage;
