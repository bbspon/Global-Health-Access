import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";

export default function ComplianceDashboardScreen() {
  const [complianceData, setComplianceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URI}/compliance/data`)
      .then((res) => {
        setComplianceData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch compliance data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Compliance Dashboard</Text>

      <Text style={styles.subheading}>Hospital Audit Flags:</Text>
      {complianceData.auditFlags.map((flag, i) => (
        <Text key={i} style={styles.item}>• {flag}</Text>
      ))}

      <Text style={styles.subheading}>Policy Violations:</Text>
      {complianceData.policyViolations.map((violation, i) => (
        <Text key={i} style={styles.item}>• {violation}</Text>
      ))}

      <Text style={styles.subheading}>Compliance Records:</Text>
      <FlatList
        data={complianceData.records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Entity: {item.entity}</Text>
            <Text>Issue: {item.issue}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Last Reviewed: {item.lastReviewed}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subheading: { fontSize: 18, marginTop: 20, fontWeight: "600" },
  item: { fontSize: 16, marginVertical: 2 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  error: { color: "red", textAlign: "center", marginTop: 20 },
});
