import axios from "axios";

// Create axios instance
const API = axios.create({
baseURL: `${import.meta.env.VITE_API_URI}/auth`,
});

// Login and signup
export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);

// OTP flows
export const sendOtp = (data) => API.post("/send-otp", data);
export const verifyOtp = (data) => API.post("/verify-otp", data);

// Save user session
export const saveUserSession = (sessionData) => {
try {
localStorage.setItem("bbsUser", JSON.stringify(sessionData));
} catch (err) {
console.log("Error saving session", err);
}
};

// Get user session
export const getUserSession = () => {
try {
const stored = localStorage.getItem("bbsUser");
if (!stored) return null;
return JSON.parse(stored);
} catch (err) {
console.log("Error reading session", err);
return null;
}
};

// Get userId safely
export const getUserId = () => {
const session = getUserSession();
return session?.user?._id || null;
};