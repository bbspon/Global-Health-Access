import axios from "axios";

const BASE = "http://localhost:5000/api/feedback";

// Fetch all feedback (Admin only or if allowed)
export const fetchAllFeedback = async () => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;

  const res = await axios.get(`${BASE}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.data;
};

// ✅ Submit new feedback (User)
export const submitFeedback = async (feedbackData) => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;

  const res = await axios.post(`${BASE}/submit`, feedbackData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
