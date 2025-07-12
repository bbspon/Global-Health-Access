import axios from "axios";

// services/healthPlanAPI.js

export const getHealthPlans = async () => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          plans: [
            {
              _id: "plan1",
              name: "Basic Health Plan",
              tier: "basic", // 👈 add this

              price: 299,
              benefits: ["OPD", "Diagnostics", "Emergency"],
              description: "Covers essential services for individuals",
            },
            {
              _id: "plan2",
              name: "Family Plus Plan",
              tier: "Plus", // 👈 add this
              price: 799,
              benefits: ["OPD", "Diagnostics", "Dental", "Vision"],
              description: "Ideal for families with kids and elders",
            },
            {
              _id: "plan3",
              name: "Super Premium Plan",
              tier: "Premium", // 👈 add this

              price: 1499,
              benefits: ["All inclusive", "Hospitalization", "Cashless Claims"],
              description: "Complete coverage for all medical needs",
            },
          ],
        });
      }, 1000);
    });
  };
  
  export const getComparisonPlans = async (country = "INR") => {
    const res = await fetch(`/api/healthplans/compare?country=${country}`);
    return res.json();
  };
  export const purchasePlan = async (planId, paymentMethod) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/user/plans/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ planId, paymentMethod }),
    });
    return res.json();
  };
  export const getMyActivePlan = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/user/my-plan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  };
  