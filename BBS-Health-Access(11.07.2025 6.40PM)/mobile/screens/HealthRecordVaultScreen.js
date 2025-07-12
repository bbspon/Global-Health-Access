import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import Share from "react-native-share";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const HealthRecordVaultScreen = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleUpload = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      const newRecord = {
        id: Date.now().toString(),
        title: res.name,
        type: "Lab Report",
        date: new Date().toISOString().slice(0, 10),
        tags: ["tag1", "tag2"],
        file: res,
      };

      setRecords((prev) => [...prev, newRecord]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the picker");
      } else {
        Alert.alert("Error", "Could not upload file");
      }
    }
  };

  const handleDownload = (record) => {
    Alert.alert("Download", `Simulated download of: ${record.title}`);
  };

  const handleShare = async (record) => {
    try {
      if (!record.file || !record.file.uri) {
        Alert.alert("No file", "No file attached to share.");
        return;
      }

      await Share.open({
        title: record.title,
        message: `Sharing your record: ${record.title}`,
        url: record.file.uri,
      });
    } catch (err) {
      console.log("Share error:", err);
    }
  };

  const filteredRecords = records.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📁 Health Record Vault</Text>

      <View style={styles.searchUploadRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search records..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
          <Ionicons name="cloud-upload-outline" size={20} />
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSub}>📅 {item.date}</Text>
            <Text style={styles.cardSub}>🏷️ {item.tags.join(", ")}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleDownload(item)}>
                <Ionicons name="download-outline" size={24} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShare(item)}>
                <Ionicons name="share-social-outline" size={24} color="#28a745" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No records match your search.</Text>
        }
      />

      <View style={styles.reminderSection}>
        <Text style={styles.reminderHeader}>🧠 Smart Reminders</Text>
        <Text>🧪 Next HBA1C due: August 2025</Text>
        <Text>💊 BP refill by July 10</Text>
        <TouchableOpacity
          style={styles.syncButton}
          onPress={() => Alert.alert("Sync", "Syncing from BBSCART Hospital...")}
        >
          <MaterialCommunityIcons name="sync" size={20} color="#0dcaf0" />
          <Text style={{ marginLeft: 6, color: "#0dcaf0" }}>Sync Now</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.emergencyBtn}
        onPress={() => setShowEmergencyModal(true)}
      >
        <MaterialCommunityIcons name="alert" size={20} />
        <Text style={{ marginLeft: 8 }}>Emergency Card</Text>
      </TouchableOpacity>

      {/* Emergency Card Modal */}
      <Modal visible={showEmergencyModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>🚨 Emergency Card</Text>
            <Text>🩸 Blood Group: O+ve</Text>
            <Text>💉 Conditions: Diabetes, Hypertension</Text>
            <Text>⚠️ Allergies: Penicillin</Text>
            <Text>❤️ Donor: Yes</Text>
            <Text>💊 Meds: Metformin, Amlodipine</Text>
            <Text>📞 Contact: +91-9876543210</Text>

            <View style={styles.modalActions}>
              <Button title="Close" onPress={() => setShowEmergencyModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  searchUploadRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 10,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 6,
  },
  uploadText: { marginLeft: 6 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardSub: { fontSize: 12, color: "#555" },
  cardActions: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
    width: 100,
  },
  emptyText: { textAlign: "center", color: "#888", marginTop: 20 },
  reminderSection: { marginTop: 20 },
  reminderHeader: { fontWeight: "bold", marginBottom: 6 },
  syncButton: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  emergencyBtn: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffe6e6",
    borderRadius: 6,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    width: "90%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalActions: {
    marginTop: 20,
    alignItems: "flex-end",
  },
});

export default HealthRecordVaultScreen;
