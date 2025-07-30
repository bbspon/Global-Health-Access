import axios from "axios";

export const calculatePlanValue = async (payload) => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;
  const res = await axios.post(
    `${import.meta.env.VITE_API_URI}/plan-value/calculate`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getPlanValuePresets = async () => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;
  const res = await axios.get(`${import.meta.env.VITE_API_URI}/plan-value/presets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
