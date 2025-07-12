// File: FamilyDependentScreen.js (React Native)

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const dummyFamily = [
  {
    id: 1,
    name: "Aryan Sharma",
    role: "Son",
    age: 10,
    tier: "Basic",
    permissions: ["book", "alerts"],
    healthSummary: "Mild anemia detected. Dietary changes suggested.",
    features: ["Vaccination Tracker", "Pediatric Logs", "Growth Tracking"],
  },
  {
    id: 2,
    name: "Sita Sharma",
    role: "Mother",
    age: 68,
    tier: "Premium",
    permissions: ["book", "view", "reminders"],
    healthSummary: "Stable sugar levels, cardiac review due in 1 month.",
    features: ["Geriatric Tools", "Fall Risk", "Vitals Reminder"],
  },
];

export default function FamilyDependentScreen() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBook = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Appointment booked successfully!");
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>👨‍👩‍👧‍👦 Family & Dependents</Text>

      {dummyFamily.map((member) => (
        <TouchableOpacity
          key={member.id}
          style={styles.card}
          onPress={() => setSelected(member)}
        >
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.subtext}>{member.role} | Age: {member.age}</Text>
          <Text style={styles.tier}>Tier: {member.tier}</Text>
          <Text style={styles.summary}>
            <FontAwesome5 name="heartbeat" size={16} color="crimson" /> {"  "}
            {member.healthSummary}
          </Text>
        </TouchableOpacity>
      ))}

      <Modal visible={!!selected} animationType="slide">
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selected?.name}’s Profile</Text>
          <Text style={styles.modalItem}>🎭 Role: {selected?.role}</Text>
          <Text style={styles.modalItem}>🎂 Age: {selected?.age}</Text>
          <Text style={styles.modalItem}>🏷️ Plan Tier: {selected?.tier}</Text>
          <Text style={styles.modalItem}>
            🔐 Permissions: {selected?.permissions.join(", ")}
          </Text>
          <Text style={styles.modalItem}>
            🧠 Summary: {selected?.healthSummary}
          </Text>

          <Text style={[styles.modalItem, { marginTop: 10 }]}>🧰 Features Enabled:</Text>
          {selected?.features.map((f, i) => (
            <Text key={i} style={styles.featureItem}>• {f}</Text>
          ))}

          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBook}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.bookText}>Book Appointment</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={styles.closeText}>⬅️ Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtext: {
    color: "gray",
  },
  tier: {
    marginTop: 4,
    fontWeight: "600",
    color: "#4a90e2",
  },
  summary: {
    marginTop: 8,
    fontStyle: "italic",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  featureItem: {
    marginLeft: 16,
    fontSize: 15,
    color: "#555",
  },
  bookButton: {
    backgroundColor: "#28a745",
    padding: 14,
    marginVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bookText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeText: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});
