import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from "react-native";

const CarePassBilling = () => {
  const [patientId, setPatientId] = useState("");
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    console.log({ patientId, service, amount });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bill Entry</Text>
      <TextInput
        placeholder="Patient ID"
        style={styles.input}
        value={patientId}
        onChangeText={setPatientId}
      />
      <TextInput
        placeholder="Service"
        style={styles.input}
        value={service}
        onChangeText={setService}
      />
      <TextInput
        placeholder="Amount (₹)"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Submit Bill" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CarePassBilling;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
