import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const countries = [
  { name: "India", status: "Compliant", color: "#28a745" },
  { name: "UAE", status: "In Review", color: "#ffc107" },
  { name: "EU", status: "Pending", color: "#dc3545" },
  { name: "SEA", status: "Ready", color: "#17a2b8" },
];

const ComplianceDashboardScreen = () => {
  const handleExport = (type) => {
    Alert.alert("Export Successful", `${type} has been exported.`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        <Feather name="shield" size={22} /> Global Legal Compliance
      </Text>
      <Text style={styles.subtitle}>
        Monitor legal readiness for BBSCART Health Plans in every country.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌍 Country Compliance Status</Text>
        {countries.map((c, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.countryName}>{c.name}</Text>
            <View
              style={[styles.statusBadge, { backgroundColor: c.color }]}
            >
              <Text style={styles.statusText}>{c.status}</Text>
            </View>
            <TouchableOpacity
              style={styles.adapterButton}
              onPress={() => Alert.alert("Adapter", `Viewing ${c.name} adapter`)}
            >
              <Text style={styles.adapterButtonText}>View Adapter</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛠️ Legal Tools</Text>

        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => handleExport("Legal Audit Report")}
        >
          <Feather name="file-text" size={18} />
          <Text style={styles.toolText}> Generate Full Legal Audit Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => handleExport("Compliance Overview")}
        >
          <Feather name="download-cloud" size={18} />
          <Text style={styles.toolText}> Export Country Compliance Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => Alert.alert("Geo Simulation", "Simulate plan in another country")}
        >
          <MaterialCommunityIcons name="map-search" size={18} />
          <Text style={styles.toolText}> Simulate Plan in Another Country</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => Alert.alert("Adapter Config", "Opening country-specific settings")}
        >
          <Feather name="settings" size={18} />
          <Text style={styles.toolText}> Manage Country Regulation Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#6c757d", marginBottom: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
  },
  countryName: { fontSize: 16, fontWeight: "500" },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginVertical: 6,
  },
  statusText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  adapterButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  adapterButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
  },
  toolButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e2e6ea",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  toolText: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 14,
  },
});

export default ComplianceDashboardScreen;
