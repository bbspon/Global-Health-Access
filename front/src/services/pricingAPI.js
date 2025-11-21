import axios from "axios";

const API = import.meta.env.VITE_API_URI;

// Auth Header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ============================================================
   1. PREMIUM CALCULATOR
   POST → /api/pricing/calculate
   ============================================================ */
export const calculatePremium = async (data) => {
  try {
    const res = await axios.post(
      `${API}/pricing/calculate`,
      data,
      getAuthHeader()
    );
    return res.data;
  } catch (error) {
    console.error("Premium Calculation Error:", error);
    throw error;
  }
};

/* ============================================================
   2. PRICING MATRIX (AGE BANDS, TIERS, GEO RATES)
   GET → /api/pricing/matrix
   ============================================================ */
export const getPricingMatrix = async () => {
  try {
    const res = await axios.get(`${API}/pricing/matrix`, getAuthHeader());
    return res.data;
  } catch (error) {
    console.error("Pricing Matrix Error:", error);
    return null;
  }
};

/* ============================================================
   3. ELIGIBILITY CHECK
   POST → /api/eligibility/check
   ============================================================ */
export const checkEligibility = async (data) => {
  try {
    const res = await axios.post(
      `${API}/eligibility/check`,
      data,
      getAuthHeader()
    );
    return res.data;
  } catch (error) {
    console.error("Eligibility Error:", error);
    throw error;
  }
};

/* ============================================================
   4. HOSPITAL CLASSIFICATION
   GET → /api/hospital/classify/:id
   ============================================================ */
export const classifyHospital = async (hospitalId) => {
  try {
    const res = await axios.get(
      `${API}/hospital/classify/${hospitalId}`,
      getAuthHeader()
    );
    return res.data;
  } catch (error) {
    console.error("Hospital Classification Error:", error);
    return null;
  }
};

/* ============================================================
   5. SETTLEMENT SIMULATION
   POST → /api/settlement/simulate
   ============================================================ */
export const simulateSettlement = async (data) => {
  try {
    const res = await axios.post(
      `${API}/settlement/simulate`,
      data,
      getAuthHeader()
    );
    return res.data;
  } catch (error) {
    console.error("Settlement Simulation Error:", error);
    throw error;
  }
};
