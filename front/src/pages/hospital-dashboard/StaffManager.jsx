import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

const StaffManager = () => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/staff");
      setStaffList(res.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  return (
    <Container className="py-4">
      <h4>👥 Staff Access Manager</h4>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff._id}>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.status}</td>
              <td>
                <Button size="sm">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StaffManager;
