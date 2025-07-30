import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HealthPlanRenewalScreen = () => {
  const [info, setInfo] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchEligibility = async () => {
      const token = JSON.parse(await AsyncStorage.getItem("bbsUser"))?.token;
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/plan/check-renewal`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo(res.data);
    };

    fetchEligibility();
  }, []);

  const handleRenew = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("bbsUser"))?.token;
    const res = await axios.post(`${import.meta.env.VITE_API_URI}/plan/renew`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMsg(res.data.message);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>🔁 Plan Renewal</Text>

      {info ? (
        <>
          <Text>Your Plan: {info.currentPlan}</Text>
          <Text>Days left: {info.daysLeft}</Text>
          {info.renewable ? (
            <Button title="Renew Plan" onPress={handleRenew} />
          ) : (
            <Text style={{ color: "gray" }}>Not eligible yet for renewal.</Text>
          )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      {msg ? <Text style={{ color: "green", marginTop: 10 }}>{msg}</Text> : null}
    </View>
  );
};

export default HealthPlanRenewalScreen;
