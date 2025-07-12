import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";

const PlanUsagePage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get("/api/user-plan/plan-usage").then((res) => setPlans(res.data));
  }, []);

  const renderProgress = (used, total) => (
    <ProgressBar now={(used / total) * 100} label={`${used}/${total}`} />
  );

  return (
    <div className="container py-4">
      <h4>Track Plan Usage</h4>
      {plans.map((plan) => (
        <div className="card my-3 p-3" key={plan._id}>
          <h5>{plan.title}</h5>
          <p>Started: {new Date(plan.createdAt).toLocaleDateString()}</p>

          <p>OPD Visits</p>
          {renderProgress(plan.usage.opdVisitsUsed, plan.opdLimit)}

          <p>Lab Tests</p>
          {renderProgress(plan.usage.labTestsUsed, plan.labLimit)}

          <p>Video Consultations</p>
          {renderProgress(plan.usage.videoConsultsUsed, plan.videoLimit)}
        </div>
      ))}
    </div>
  );
};

export default PlanUsagePage;
