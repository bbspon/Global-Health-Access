// WalletTopupScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { topupWallet } from "../services/walletAPI";

const WalletTopupScreen = () => {
  const [amount, setAmount] = useState("");

  const handleTopup = async () => {
    const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
    try {
      await topupWallet({
        amount,
        method: "UPI",
        referenceId: "TXN" + Date.now(),
        token,
      });
      Alert.alert("Success", "Wallet Top-up Successful");
    } catch {
      Alert.alert("Error", "Top-up failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Amount (₹)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Add Money" onPress={handleTopup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
  },
});

export default WalletTopupScreen;
