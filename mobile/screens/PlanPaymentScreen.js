// Mobile → src/screens/PlanPaymentScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const PlanPaymentScreen = () => {
  const [planId, setPlanId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("razorpay");
  const [txnId, setTxnId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/plan/pay/initiate`,
        { planId, amount, method },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTxnId(res.data.txnId);
      Alert.alert("Initiated", "Payment session started.");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || "Failed to initiate.");
    }
    setLoading(false);
  };

  const confirmPayment = async () => {
    if (!txnId) return Alert.alert("Error", "No transaction to confirm");

    try {
      const paymentRef = "MOBILE_TXN_" + new Date().getTime();
      await axios.post(
        `${import.meta.env.VITE_API_URI}/plan/pay/confirm`,
        { txnId, paymentRef },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", "Payment confirmed and plan activated.");
    } catch (err) {
      Alert.alert("Error", "Failed to confirm.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>💳 Plan Payment</Text>

      <TextInput
        placeholder="Plan ID"
        value={planId}
        onChangeText={setPlanId}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />

      <TextInput
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <Button title="Initiate Payment" onPress={initiatePayment} />

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

      {txnId && (
        <View style={{ marginTop: 20 }}>
          <Button title="Confirm Payment" color="green" onPress={confirmPayment} />
        </View>
      )}
    </View>
  );
};

export default PlanPaymentScreen;
