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
// =========================
// 2. Get All Healthcare Partners (Corrected)
// =========================
export const getHealthcarePartners = async (
  page = 1,
  limit = 20,
  filters = {}
) => {
  try {
    const params = { page, limit, ...filters };

    const res = await axios.get(`${API}/healthcare-partners`, {
      ...getAuthHeader(),
      params,
    });

    return {
      partners: res.data.partners || [],
      total: (res.data.partners || []).length,
    };
  } catch (err) {
    console.error("Fetch Partners Error:", err);
    return { partners: [], total: 0 };
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
    const cities = [...new Set(all.map((p) => p.city))];
    const clinicTypes = [...new Set(all.map((p) => p.clinicType))];
    const partnerTypes = [...new Set(all.map((p) => p.partnerType))];
    const hospitalTiers = [...new Set(all.map((p) => p.tier))];

    return {
      states,
      districts,
      cities,
      clinicTypes,
      partnerTypes,
      hospitalTiers,
    };
  } catch (err) {
    console.error("Filter Options Error:", err);
    return {
      states: [],
      districts: [],
      cities: [],
      clinicTypes: [],
      partnerTypes: [],
      hospitalTiers: [],
    };
  }
};