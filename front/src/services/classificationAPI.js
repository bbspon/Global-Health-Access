import axios from "axios";

const API = import.meta.env.VITE_API_URI;

export const classifyHospital = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(`${API}/hospitals/classify`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Classification API Error:", err);
    return {
      success: false,
      message: err?.response?.data?.message || "Server error",
    };
  }
};
