import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URI}/medical-vault`;

export const fetchMedicalRecords = async () => {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;
  const res = await axios.get(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const uploadMedicalRecord = async (data, token) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("name", data.name);
  formData.append("category", data.category);
  formData.append("date", data.date);
  formData.append("tags", JSON.stringify(data.tags));

  const res = await axios.post(`${API_BASE}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
