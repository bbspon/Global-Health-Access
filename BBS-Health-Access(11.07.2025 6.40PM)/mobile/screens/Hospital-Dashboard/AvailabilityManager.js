import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const AvailabilityManager = () => {
  const [opd, setOpd] = useState(true);
  const [ipd, setIpd] = useState(false);
  const [dental, setDental] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Availability</Text>
      <View style={styles.switchRow}>
        <Text>OPD</Text>
        <Switch value={opd} onValueChange={setOpd} />
      </View>
      <View style={styles.switchRow}>
        <Text>IPD</Text>
        <Switch value={ipd} onValueChange={setIpd} />
      </View>
      <View style={styles.switchRow}>
        <Text>Dental</Text>
        <Switch value={dental} onValueChange={setDental} />
      </View>
    </View>
  );
};

export default AvailabilityManager;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
