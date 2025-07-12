// PlanUsageDashboard.js (React Native)
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { ProgressBar } from "react-native-paper";

const planColors = {
  Basic: "#6c757d",
  Silver: "#17a2b8",
  Gold: "#ffc107",
  Premium: "#28a745",
  Corporate: "#007bff",
};

const dummyData = [
  {
    user: "Aarav Shah",
    plan: "Gold",
    family: ["Spouse: Nidhi Shah"],
    opdUsed: 4,
    opdCap: 4,
    ipdUsed: 2,
    ipdCap: 3,
    labUsed: 2500,
    labCap: 3000,
    mentalHealthUsed: 1,
    mentalHealthCap: 3,
    addOns: { opd: 1 },
    alerts: ["OPD usage at 100%"],
  },
  {
    user: "Fatima Ali",
    plan: "Premium",
    family: [],
    opdUsed: 1,
    opdCap: 10,
    ipdUsed: 0,
    ipdCap: 5,
    labUsed: 500,
    labCap: 4000,
    mentalHealthUsed: 0,
    mentalHealthCap: 4,
    addOns: {},
    alerts: [],
  },
  {
    user: "Ravi Patel",
    plan: "Corporate",
    family: ["Spouse: Meera Patel", "Child: Arya Patel"],
    opdUsed: 6,
    opdCap: 8,
    ipdUsed: 3,
    ipdCap: 4,
    labUsed: 3500,
    labCap: 4000,
    mentalHealthUsed: 2,
    mentalHealthCap: 3,
    addOns: { lab: 500 },
    alerts: ["Lab limit at 95%"],
  },
  {
    user: "Neha Verma",
    plan: "Silver",
    family: [],
    opdUsed: 2,
    opdCap: 4,
    ipdUsed: 1,
    ipdCap: 3,
    labUsed: 1000,
    labCap: 2000,
    mentalHealthUsed: 0,
    mentalHealthCap: 2,
    addOns: {},
    alerts: [],
  },
  {
    user: "Imran Khan",
    plan: "Basic",
    family: ["Spouse: Zara Khan"],
    opdUsed: 1,
    opdCap: 2,
    ipdUsed: 0,
    ipdCap: 1,
    labUsed: 400,
    labCap: 1000,
    mentalHealthUsed: 0,
    mentalHealthCap: 1,
    addOns: {},
    alerts: [],
  },
];

export default function PlanUsageDashboard() {
  const [showPDF, setShowPDF] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handlePDF = () => {
    setShowPDF(true);
    setTimeout(() => setShowPDF(false), 2000);
  };

  const handleReset = () => {
    setShowReset(true);
    setTimeout(() => setShowReset(false), 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📊 Plan Usage Dashboard</Text>
      {dummyData.map((user, idx) => (
        <View key={idx} style={styles.card}>
          <View
            style={[styles.badge, { backgroundColor: planColors[user.plan] }]}
          >
            <Text style={styles.badgeText}>{user.plan} Plan</Text>
          </View>
          <Text style={styles.title}>{user.user}</Text>
          {user.family.length > 0 && (
            <Text style={styles.sub}>Family: {user.family.join(", ")}</Text>
          )}

          {["opd", "ipd", "lab", "mentalHealth"].map((type) => {
            const used = (user[`${type}Used`] || 0) + (user.addOns?.[type] || 0);
            const cap = user[`${type}Cap`] || 1;
            const percent = Math.min(used / cap, 1);
            const alert = user.alerts?.find((a) =>
              a.toLowerCase().includes(type)
            );
            return (
              <View key={type} style={styles.trackItem}>
                <Text style={styles.trackTitle}>
                  {type.toUpperCase()} Usage
                  {alert && <Text style={styles.alert}> 🔴 {alert}</Text>}
                </Text>
                <ProgressBar
                  progress={percent}
                  color={percent >= 1 ? "#dc3545" : percent > 0.8 ? "#ffc107" : "#28a745"}
                  style={styles.progress}
                />
                <Text style={styles.count}>{used} / {cap}</Text>
              </View>
            );
          })}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.pdfBtn} onPress={handlePDF}>
              <Text style={styles.btnText}>📥 Download PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
              <Text style={styles.btnText}>♻️ Reset Plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal visible={showPDF} transparent animationType="fade">
        <View style={styles.modal}><Text>✅ PDF Ready</Text></View>
      </Modal>

      <Modal visible={showReset} transparent animationType="fade">
        <View style={styles.modal}><Text>♻️ Plan Reset Done</Text></View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  sub: {
    color: "gray",
    marginBottom: 6,
  },
  trackItem: {
    marginTop: 12,
  },
  trackTitle: {
    fontWeight: "bold",
  },
  progress: {
    height: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  count: {
    color: "#555",
    fontSize: 12,
  },
  alert: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  actions: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pdfBtn: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 6,
  },
  resetBtn: {
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
