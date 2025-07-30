// src/services/authAPI.js
import axios from "axios";

console.log("BASE URL:", import.meta.env.VITE_API_URI);  // ✅ This will now log the value

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}/auth`,
});

export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);
