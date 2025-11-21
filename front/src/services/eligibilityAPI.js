// src/services/eligibilityAPI.js

import axios from "axios";

const API = import.meta.env.VITE_API_URI;

// POST → Check Eligibility
export const checkEligibility = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${API}/eligibility/check`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Eligibility API Error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Server error",
    };
  }
};

// POST → Hospital Classification (used later)
export const classifyHospital = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${API}/eligibility/classify`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Hospital Classification API Error:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Server error",
    };
  }
};
