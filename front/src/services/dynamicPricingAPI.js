// services/dynamicPricingAPI.js
import axios from "axios";

export const API_URL = "http://localhost:5000/api/plan-dynamic/calculate";

export const calculateDynamicPrice = async (data) => {
    const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
    const token = bbsUserData?.token;
  const response = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
