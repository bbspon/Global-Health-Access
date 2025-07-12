// HealthIntelligenceDashboard.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { LineChart, BarChart, RadarChart } from "react-native-chart-kit";
import MapView, { Circle, Marker } from "react-native-maps";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const HealthIntelligenceDashboard = () => {
  const [role, setRole] = useState("admin");

  const mockAlerts = [
    { message: "Spike in pediatric OPD in Zone 3 — alert hospital admin.", type: "hospital" },
    { message: "Your sugar trend is rising — book a diabetic consult?", type: "user" },
    { message: "Fever cases rising near Hospital A — possible outbreak zone.", type: "govt" }
  ];

  const mockDistrictIndex = [
    { district: "Delhi Central", index: 73 },
    { district: "Bengaluru North", index: 81 },
    { district: "Hyderabad South", index: 67 }
  ];

  const mockNationalTrends = [
    { label: "Jan", value: 71 },
    { label: "Feb", value: 74 },
    { label: "Mar", value: 78 },
    { label: "Apr", value: 82 },
    { label: "May", value: 77 },
    { label: "Jun", value: 85 }
  ];

  const radarData = {
    labels: ["Wait Time", "Doctor", "Facility", "Staff", "App"],
    datasets: [
      {
        data: [60, 80, 70, 75, 65],
        color: () => "rgba(0, 123, 255, 0.7)"
      }
    ]
  };

  const getFilteredAlerts = () => {
    if (role === "admin") return mockAlerts;
    if (role === "hospital") return mockAlerts.filter(a => a.type === "hospital");
    if (role === "govt") return mockAlerts.filter(a => a.type === "govt");
    return [];
  };

  const generatePDF = () => {
    Alert.alert("PDF Download", "Report generation not implemented in mobile demo.");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧠 Health Intelligence Dashboard</Text>

      {/* Role Selector */}
      <View style={styles.roleContainer}>
        {["admin", "hospital", "govt"].map(r => (
          <TouchableOpacity
            key={r}
            style={[styles.roleButton, role === r && styles.selectedRole]}
            onPress={() => setRole(r)}
          >
            <Text style={styles.roleText}>{r.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Alerts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔔 Smart Alerts</Text>
        {getFilteredAlerts().length > 0 ? (
          getFilteredAlerts().map((a, idx) => (
            <Text key={idx} style={styles.alertText}>• {a.message}</Text>
          ))
        ) : (
          <Text style={styles.alertText}>No alerts for this role.</Text>
        )}
      </View>

      {/* National Trend Chart */}
      {(role === "admin" || role === "govt") && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 National Trends</Text>
          <LineChart
            data={{
              labels: mockNationalTrends.map(t => t.label),
              datasets: [{ data: mockNationalTrends.map(t => t.value) }]
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
        </View>
      )}

      {/* District Health Index */}
      {role !== "user" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📍 District Health Index</Text>
          <BarChart
            data={{
              labels: mockDistrictIndex.map(d => d.district),
              datasets: [{ data: mockDistrictIndex.map(d => d.index) }]
            }}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      )}

      {/* Map View */}
      {(role === "admin" || role === "govt") && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌐 Outbreak Map</Text>
          <MapView
            style={{ width: "100%", height: 200 }}
            initialRegion={{
              latitude: 20.5937,
              longitude: 78.9629,
              latitudeDelta: 20,
              longitudeDelta: 20
            }}
          >
            <Circle center={{ latitude: 28.6139, longitude: 77.2090 }} radius={30000} strokeColor="red" fillColor="rgba(255,0,0,0.3)" />
            <Circle center={{ latitude: 17.3850, longitude: 78.4867 }} radius={20000} strokeColor="orange" fillColor="rgba(255,165,0,0.3)" />
            <Circle center={{ latitude: 12.9716, longitude: 77.5946 }} radius={25000} strokeColor="green" fillColor="rgba(0,255,0,0.3)" />
          </MapView>
        </View>
      )}

      {/* Radar Chart */}
      {role !== "user" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📡 AI Sentiment Radar</Text>
          <RadarChart
            data={radarData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      )}

      {/* Export */}
      <TouchableOpacity onPress={generatePDF} style={styles.downloadButton}>
        <Text style={styles.downloadText}>📥 Download PDF Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#f5f5f5",
  backgroundGradientTo: "#f5f5f5",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
  labelColor: () => "#000",
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "5",
    strokeWidth: "1",
    stroke: "#007bff"
  }
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  roleContainer: { flexDirection: "row", marginBottom: 16 },
  roleButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: "#ccc"
  },
  selectedRole: { backgroundColor: "#007bff" },
  roleText: { color: "#fff" },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  alertText: { fontSize: 14, marginVertical: 2 },
  downloadButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },
  downloadText: { color: "#fff", fontWeight: "600" }
});

export default HealthIntelligenceDashboard;
