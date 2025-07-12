import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const StaffManager = () => {
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
          <tr>
            <td>Dr. Meera</td>
            <td>Admin</td>
            <td>Active</td>
            <td><Button size="sm">Edit</Button></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default StaffManager;
