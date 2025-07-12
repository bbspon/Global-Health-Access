import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

const PlanTierEditor = () => {
  const [planName, setPlanName] = useState("");
  const [coverage, setCoverage] = useState("");

  const handleSave = () => {
    console.log({ planName, coverage });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Custom Plan Tier</Text>
      <TextInput
        placeholder="Plan Name"
        style={styles.input}
        value={planName}
        onChangeText={setPlanName}
      />
      <TextInput
        placeholder="Coverage Details"
        style={[styles.input, { height: 100 }]}
        multiline
        value={coverage}
        onChangeText={setCoverage}
      />
      <Button title="Save Plan" onPress={handleSave} />
    </ScrollView>
  );
};

export default PlanTierEditor;

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
