// services/customerIdentityAPI.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URI}/customer-identity`;

export const saveIdentity = async (formData) => {
  return axios.post(`${API_URL}/save`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getIdentity = async (userId) => {
  return axios.get(`${API_URL}/${userId}`);
};
