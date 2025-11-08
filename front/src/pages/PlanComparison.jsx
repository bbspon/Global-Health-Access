import React from "react";
import { Container, Table, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const planData = [
  {
    feature: "OPD Consultations / Mo",
    tiers: ["2", "4", "6", "Unlimited"],
  },
  {
    feature: "Follow-Up Visits (14 Days)",
    tiers: ["1", "2", "3", "Unlimited"],
  },
  {
    feature: "Diagnostics & Tests",
    tiers: [
      "1 Lab / Mo",
      "2 Labs + 1 Scan",
      "4 Labs + 2 Scans",
      "Unlimited (Fair Usage)",
    ],
  },
  {
    feature: "Pharmacy Discount",
    tiers: ["5%", "7.5%", "10%", "15%"],
  },
  {
    feature: "Dental Services / Year",
    tiers: [
      "1",
      "1 + Cleaning",
      "2 + Cleaning + X-Ray",
      "3 + Cleaning + Procedure",
    ],
  },
  {
    feature: "Accidental Care Cap",
    tiers: ["₹5K / Visit", "₹10K", "₹15K", "₹25K"],
  },
  {
    feature: "IPD Room Charges (Non-ICU)",
    tiers: ["❌", "20% Co-Pay", "50% (₹30K Max)", "75% (₹50K Max)"],
  },
  {
    feature: "Ambulance Access",
    tiers: ["❌", "₹300 Discount", "Free (in-city)", "Free + Pan-city"],
  },
  {
    feature: "Second Opinion (Online)",
    tiers: ["❌", "1 / Year", "2 / Year", "Unlimited"],
  },
  {
    feature: "Video Consultations",
    tiers: ["2 / Mo", "4 / Mo", "Unlimited", "Unlimited + Priority"],
  },
  {
    feature: "Family Member Add-on",
    tiers: ["❌", "Max 2", "Max 4", "Max 6"],
  },
  {
    feature: "AI Health Report Interpreter",
    tiers: ["❌", "✅", "✅", "✅ + Archive"],
  },
  {
    feature: "Nutritionist Consultation",
    tiers: ["❌", "Add-on", "1 / Yr", "2 / Yr"],
  },
  {
    feature: "Mental Health Teletherapy",
    tiers: ["❌", "Add-on", "1 / Mo", "2 / Mo"],
  },
  {
    feature: "Upgrade Option",
    tiers: ["✅", "✅", "✅", "❌"],
  },
];

const PlanComparison = () => {
  const tiers = ["Basic", "Plus", "Premium", "Super Premium"];
  const badgeColors = ["secondary", "info", "primary", "success"];
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Plan Tier Comparison</h2>
      <Button
        className="mt-1 mb-4"
        variant="outline-info"
        onClick={() => navigate("/hospital/plancomparison-editor")}
      >
        Plan Comparison Editor
      </Button>
      <div className="border border-3 border-dark rounded p-3">
        <Table
          bordered
          responsive
          hover
          className="text-center align-middle shadow mb-4 border-1 p-3"
        >
          <thead className="table-dark">
            <tr>
              <th>Feature</th>
              {tiers.map((tier, i) => (
                <th key={tier}>
                  <Badge bg={badgeColors[i]}>{tier}</Badge>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planData.map((row, i) => (
              <tr key={i}>
                <td>{row.feature}</td>
                {row.tiers.map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default PlanComparison;
