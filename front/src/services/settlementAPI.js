import axios from "axios";

const API = import.meta.env.VITE_API_URI;

export const generateSettlement = async (payload) => {
  try {
    const res = await axios.post(`${API}/settlements/generate`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (err) {
    console.error("Settlement Generate Error:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Error generating settlement",
    };
  }
};

export const getSettlements = async (hospitalId) => {
  try {
    const res = await axios.get(`${API}/settlements`, {
      params: { hospitalId },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (err) {
    console.error("Fetch Settlements Error:", err);
    return {
      success: false,
      message: err.response?.data?.message || "Error fetching settlements",
    };
  }
};
