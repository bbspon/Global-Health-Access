// healthInsightsAPI.js
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URI}/health-insights`;
console.log("ENV:", import.meta.env.VITE_API_URI);

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
