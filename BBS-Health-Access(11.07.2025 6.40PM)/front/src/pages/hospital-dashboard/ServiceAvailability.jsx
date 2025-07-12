import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const ServiceAvailability = () => {
  return (
    <Container className="py-4">
      <h4>🕒 Manage Service Availability</h4>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Department</th>
            <th>Days Available</th>
            <th>Time Slot</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OPD</td>
            <td>Mon–Fri</td>
            <td>9AM–5PM</td>
            <td><Button size="sm">Edit</Button></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default ServiceAvailability;
