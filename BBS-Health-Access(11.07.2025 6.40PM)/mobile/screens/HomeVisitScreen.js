import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function HomeVisitScreen() {
  const [address, setAddress] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏥 Home Visit Request</Text>
      <Text>Select Type: GP, Nurse, Physio</Text>
      <TextInput style={styles.input} placeholder="Enter Address" value={address} onChangeText={setAddress} />
      <Button title="Confirm Visit & Pay" onPress={() => alert("Visit booked")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 10, marginVertical: 10 },
});
