// /src/services/walletAPI.js

import axios from "axios";

export const deductWalletAmount = async ({
  amount,
  usageType,
  referenceId,
  note,
}) => {
  try {
    const response = await axios.post("/api/wallet/deduct", {
      amount,
      usageType,
      referenceId,
      note,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Wallet deduction failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const topupWallet = async ({ amount, method, referenceId }) => {
    const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
    const token = bbsUserData?.token;
  const res = await axios.post(
    "http://localhost:5000/api/wallet/topup",
    { amount, method, referenceId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};