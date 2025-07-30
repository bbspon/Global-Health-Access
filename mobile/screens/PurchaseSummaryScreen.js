import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";

const PurchaseSummaryScreen = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/user/summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSummary(res.data);
    };
    fetchData();
  }, []);

  if (!summary) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Purchase Summary</Text>
      <Text>Plan: {summary.planId.name}</Text>
      <Text>Price: ₹{summary.amountPaid}</Text>
      <Text>Payment: {summary.paymentMethod}</Text>
      {summary.addons?.length > 0 && summary.addons.map((a, i) => (
        <Text key={i}>Addon: {a.name} (+₹{a.price})</Text>
      ))}
      <Text>Signature: {summary.signatureMetadata?.signature}</Text>
      <Text>Version: {summary.signatureMetadata?.version}</Text>
      <Text>Device: {summary.signatureMetadata?.device}</Text>
    </ScrollView>
  );
};

export default PurchaseSummaryScreen;
