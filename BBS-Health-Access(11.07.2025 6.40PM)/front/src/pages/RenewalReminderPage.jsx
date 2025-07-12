import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Badge } from "react-bootstrap";

const RenewalReminderPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get("/api/renewal/upcoming-renewals")
      .then((res) => setPlans(res.data));
  }, []);

  return (
    <div className="container py-4">
      <h4>Upcoming Renewals (Next 7 Days)</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.userId.name}</td>
              <td>{plan.userId.email}</td>
              <td>{plan.userId.phone}</td>
              <td>{new Date(plan.endDate).toLocaleDateString()}</td>
              <td>
                <Badge bg="warning">Pending</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RenewalReminderPage;
