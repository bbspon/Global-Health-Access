import axios from "axios";

export const calculatePlanValue = async (payload) => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;
  const res = await axios.post(
    "http://localhost:5000/api/plan-value/calculate",
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getPlanValuePresets = async () => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;
  const res = await axios.get("http://localhost:5000/api/plan-value/presets", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
