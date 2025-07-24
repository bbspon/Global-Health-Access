// healthInsightsAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/health-insights";

export const fetchHealthInsights = async (token) => {
  const res = await axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const generateHealthInsights = async (token) => {
  const res = await axios.post(
    `${BASE_URL}/generate`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.data;
};
