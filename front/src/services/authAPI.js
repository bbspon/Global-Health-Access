// services/authAPI.js
import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/auth`,
});
export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);
