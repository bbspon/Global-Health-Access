import axios from "axios";

/**
 * Base API URL
 * Example: http://localhost:5000/api
 */
const API_BASE = import.meta.env.VITE_API_URI;

/**
 * Get auth token safely
 */
const getAuthHeaders = () => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));

  const token = bbsUserData?.token;

  if (!token) {
    console.error("❌ Auth token not found in localStorage (bbsUser.token)");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


export const addTimelineEvent = async (memberName, newEvent) => {
  const payload = {
    memberName,
    newEvent,
  };

  const res = await axios.post(
    `${API_BASE}/family-health-timeline`,
    payload,
    getAuthHeaders()
  );

  return res.data.data; // updated timeline
};

// ================================
// DELETE EVENT
// DELETE /api/family-health-timeline/:member/:eventId
// ================================
export const deleteTimelineEvent = async (memberName, eventId) => {
  const res = await axios.delete(
    `${API_BASE}/family-health-timeline/${memberName}/${eventId}`,
    getAuthHeaders()
  );

  return res.data.data;
};
export const fetchTimeline = async (planId) => {
  if (!planId) {
    throw new Error("❌ planId is required to fetch family members");
  }

  const res = await axios.get(
    `${API_BASE}/user-plan/${planId}/family`,
    getAuthHeaders()
  );

  /**
   * Expected response:
   * {
   *   success: true,
   *   data: [ { _id, name, age, relationship, ... } ]
   * }
   */
  return res.data;
};
