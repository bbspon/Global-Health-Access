import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const MyHealthPlan = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [userId, setUserId] = useState(null);
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const userID = bbsUserData?.user?.id;
  useEffect(() => {
    const fetchPlan = async () => {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;
      const userIdFromStorage = bbsUserData?.user?._id;

      setUserId(userIdFromStorage);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/user/my-plan`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlan(res.data);
      } catch (err) {
        console.error("Error loading plan", err);
      }
    };

    fetchPlan();
  }, []);

  if (!plan) return <p>No active plan found.</p>;

  return (
    <Card className="p-4 shadow-sm">
      <h4>My Health Plan</h4>
      <p>
        <strong>Name:</strong> {plan.planId?.name}
      </p>
      <Badge bg="info" className="mb-2">
        {(plan.planId?.tier || "N/A").toUpperCase()}
      </Badge>
      <p>
        <strong>Status:</strong> {plan.status}
      </p>
      <p>
        <strong>Price:</strong> ₹{plan.planId?.price?.INR}
      </p>
      <p>
        <strong>Valid Till:</strong>{" "}
        {new Date(plan.endDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Txn ID:</strong> {plan.transactionId}
      </p>
      <p>
        <strong>Add-ons:</strong>{" "}
        {plan.selectedAddons && plan.selectedAddons.join(", ")}
      </p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Button variant="primary">View QR</Button>
        <Button onClick={() => navigate(`/user-plan/${plan._id}/family`)}>
          Manage Family
        </Button>
        <Link
          to={`/my-health/prescription-loop/${plan._id}`}
          className="btn btn-outline-secondary"
        >
          View Prescriptions
        </Link>
        <Button
          onClick={() => navigate(`/health-access/my-plan/coach/${userID}`)}
        >
          View Health Coach Dashboard
        </Button>
      </div>
    </Card>
  );
};

export default MyHealthPlan;
