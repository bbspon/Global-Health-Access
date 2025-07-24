import axios from "axios";

const API_BASE = "http://localhost:5000/api/family-health-timeline"; // Change on deploy

const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
const token = bbsUserData?.token;

// ✅ Fallback for different key names: 'id' or '_id'
const userId = bbsUserData?.user?.id || bbsUserData?.user?._id;

if (!userId) {
  console.error("❌ userId is still undefined. Check localStorage format.");
}

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchTimeline = async () => {
  const res = await axios.get(API_BASE, getAuthHeaders());
  return res.data.data;
};

export const addTimelineEvent = async (memberName, newEvent) => {
  const timelineData = {
    userId, // ✅ Include userId
    memberName,
    events: [newEvent], // ✅ Send as array
  };

  console.log("Sending timeline data:", timelineData); // Debug log

  const res = await axios.post(API_BASE, timelineData, getAuthHeaders());
  return res.data.data;
};

export const deleteTimelineEvent = async (member, eventId) => {
  const res = await axios.delete(
    `${API_BASE}/${encodeURIComponent(member)}/${eventId}`,
    getAuthHeaders()
  );
  return res.data.data;
};
