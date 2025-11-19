import axios from "axios";

const API = import.meta.env.VITE_API_URI;

// =========================
// Helper: Auth Header
// =========================
const getAuthHeader = () => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// =========================
// 1. Register Healthcare Partner
// =========================
export const registerHealthcarePartner = async (formData) => {
  try {
    const res = await axios.post(
      `${API}/healthcare-partners`,
      formData,
      {
        ...getAuthHeader(),
        headers: {
          ...getAuthHeader().headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Register Partner Error:", err);
    throw err.response?.data || { error: "Registration failed" };
  }
};

// =========================
// 2. Get All Healthcare Partners
// =========================
export const getHealthcarePartners = async () => {
  try {
    const res = await axios.get(
      `${API}/healthcare-partners`,
      getAuthHeader()
    );
    return res.data.partners || [];
  } catch (err) {
    console.error("Fetch Partners Error:", err);
    throw err.response?.data || { error: "Fetch partners failed" };
  }
};

// =========================
// 3. Update Partner Status
// =========================
export const updatePartnerStatus = async (id, status) => {
  try {
    const res = await axios.patch(
      `${API}/healthcare-partners/${id}/status`,
      { status },
      getAuthHeader()
    );
    return res.data.partner;
  } catch (err) {
    console.error("Update Status Error:", err);
    throw err.response?.data || { error: "Status update failed" };
  }
};

// =========================
// 4. Delete Healthcare Partner
// =========================
export const deleteHealthcarePartner = async (id) => {
  try {
    const res = await axios.delete(
      `${API}/healthcare-partners/${id}`,
      getAuthHeader()
    );
    return res.data;
  } catch (err) {
    console.error("Delete Partner Error:", err);
    throw err.response?.data || { error: "Delete failed" };
  }
};

// =========================
// 5. Fetch Filter Options
// =========================
// For UI filtering: states, districts, clinic types

export const getHealthcareFilterOptions = async () => {
  try {
    const res = await axios.get(`${API}/healthcare-partners`, getAuthHeader());

    const all = res.data.partners || [];

    const states = [...new Set(all.map((p) => p.state))];
    const districts = [...new Set(all.map((p) => p.district))];
    const clinicTypes = [...new Set(all.map((p) => p.clinicType))];

    return { states, districts, clinicTypes };
  } catch (err) {
    console.error("Filter Options Error:", err);
    throw err.response?.data || { error: "Filter fetch failed" };
  }
};
