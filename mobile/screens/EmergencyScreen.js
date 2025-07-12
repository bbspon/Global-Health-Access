import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const dummyLogs = [
  {
    user: "Riya Verma",
    plan: "Gold",
    time: "2025-07-09 13:24",
    location: "Bandra, Mumbai",
    status: "Resolved",
    method: "Fall Detection",
    allergies: "Penicillin",
    conditions: "Diabetes, Asthma",
    instructions: "Alert daughter, avoid morphine",
  },
  {
    user: "Ahmed Khan",
    plan: "Platinum",
    time: "2025-07-08 22:10",
    location: "Bur Dubai, UAE",
    status: "Escalated",
    method: "Voice Trigger",
    allergies: "None",
    conditions: "Hypertension",
    instructions: "Call wife, avoid sedatives",
  },
];

export default function EmergencySOSScreen() {
  const [location, setLocation] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Get user location on mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow location permission to use emergency features."
        );
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  // PDF generation & sharing using Expo Print + Sharing
  const generateAndSharePDF = async () => {
    if (!selectedUser) return;

    const htmlContent = `
      <h1>Emergency Health Summary</h1>
      <p><b>Name:</b> ${selectedUser.user}</p>
      <p><b>Health Plan:</b> ${selectedUser.plan}</p>
      <p><b>Medical Conditions:</b> ${selectedUser.conditions}</p>
      <p><b>Allergies:</b> ${selectedUser.allergies}</p>
      <p><b>Emergency Instructions:</b> ${selectedUser.instructions}</p>
      <p><b>Last Known Location:</b> ${selectedUser.location}</p>
      <p><b>Trigger Method:</b> ${selectedUser.method}</p>
      <p><b>Time of Event:</b> ${selectedUser.time}</p>
    `;

    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Error", "Failed to generate or share PDF.");
    }
  };

  const renderLogItem = ({ item }) => (
    <TouchableOpacity
      style={styles.logItem}
      onPress={() => {
        setSelectedUser(item);
        setModalVisible(true);
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.userName}>{item.user}</Text>
        <Text style={[styles.statusBadge, item.status === "Resolved" ? styles.statusResolved : styles.statusEscalated]}>
          {item.status}
        </Text>
      </View>
      <Text>Plan: {item.plan}</Text>
      <Text>Time: {item.time}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Trigger: {item.method}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency Event Logs</Text>

      <FlatList
        data={dummyLogs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderLogItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal for selected user info */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Patient Emergency Info</Text>

          {selectedUser && (
            <>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoText}>{selectedUser.user}</Text>

              <Text style={styles.infoLabel}>Health Plan:</Text>
              <Text style={styles.infoText}>{selectedUser.plan}</Text>

              <Text style={styles.infoLabel}>Medical Conditions:</Text>
              <Text style={styles.infoText}>{selectedUser.conditions}</Text>

              <Text style={styles.infoLabel}>Allergies:</Text>
              <Text style={styles.infoText}>{selectedUser.allergies}</Text>

              <Text style={styles.infoLabel}>Emergency Instructions:</Text>
              <Text style={styles.infoText}>{selectedUser.instructions}</Text>

              <Text style={styles.infoLabel}>Location:</Text>
              <Text style={styles.infoText}>{selectedUser.location}</Text>

              <Text style={styles.infoLabel}>Trigger Method:</Text>
              <Text style={styles.infoText}>{selectedUser.method}</Text>

              <Text style={styles.infoLabel}>Time:</Text>
              <Text style={styles.infoText}>{selectedUser.time}</Text>

              <TouchableOpacity
                style={styles.downloadBtn}
                onPress={generateAndSharePDF}
              >
                <Text style={styles.downloadBtnText}>Download Emergency PDF</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 40 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  logItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    elevation: 2,
  },
  userName: { fontSize: 18, fontWeight: "bold" },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    color: "#fff",
    fontWeight: "bold",
    overflow: "hidden",
  },
  statusResolved: { backgroundColor: "#4caf50" },
  statusEscalated: { backgroundColor: "#ff9800" },
  modalContent: { flex: 1, padding: 20 },
  closeButton: { alignSelf: "flex-end" },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  infoLabel: { fontWeight: "bold", marginTop: 15 },
  infoText: { fontSize: 16, marginTop: 5 },
  downloadBtn: {
    marginTop: 30,
    backgroundColor: "#1976d2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  downloadBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
