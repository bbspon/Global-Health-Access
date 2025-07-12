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
