import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const MyHealthPlan = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const userID = bbsUserData?.user?.id;

  useEffect(() => {
    const fetchPlan = async () => {
      console.log("fetchPlan called");
      try {
        setLoading(true);
        const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
        const token = bbsUserData?.token;
        const userIdFromStorage = bbsUserData?.user?._id;

        setUserId(userIdFromStorage);

        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/user/my-plan`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data && Object.keys(res.data).length > 0) {
          setPlan(res.data);
        } else {
          setError("No active plan found. Purchase a plan to get started.");
        }
      } catch (err) {
        console.error("Error loading plan:", err);
        if (err.response?.status === 404) {
          setError("No active plan found. Purchase a plan to continue.");
        } else {
          setError(err.response?.data?.message || "Failed to load plan data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your health plan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning p-5 text-center m-3">
        <h5>📋 {error}</h5>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/plans")}
        >
          Browse Plans
        </button>
        <button
          className="btn btn-outline-primary ms-2 mt-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

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
      {/* raw JSON output for debugging */}
      <div className="mt-4">
        {/* <h5>Raw plan JSON</h5> */}
        {/* <pre style={{ maxHeight: "300px", overflow: "auto", background: "#f8f9fa", padding: "1rem" }}>
          {JSON.stringify(plan, null, 2)}
        </pre> */}
      </div>
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
   
      </div>
    </Card>
  );
};

export default MyHealthPlan;
