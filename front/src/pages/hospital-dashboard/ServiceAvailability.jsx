import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

const ServiceAvailability = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/service-availability`)
      .then((res) => setServices(res.data))
      .catch((err) => console.error("❌ Error fetching data:", err));
  }, []);

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
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.department}</td>
              <td>{service.daysAvailable}</td>
              <td>{service.timeSlot}</td>
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

export default ServiceAvailability;
