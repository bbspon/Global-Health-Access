import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Aisha Sharma",
    specialty: "Cardiologist",
    experience: "12 yrs",
    hospital: "Sunrise Hospital, Delhi",
    rating: 4.7,
    status: "Verified",
    languages: ["Hindi", "English"],
    slots: "Mon-Fri, 10am–2pm",
    licenseUrl: "https://example.com/license1.pdf",
    resumeUrl: "https://example.com/resume1.pdf",
  },
  {
    id: 2,
    name: "Dr. Amir Khan",
    specialty: "Dermatologist",
    experience: "8 yrs",
    hospital: "GlobeCare, Dubai",
    rating: 4.4,
    status: "Pending",
    languages: ["English", "Arabic"],
    slots: "Tue-Thu, 2–6pm",
    licenseUrl: "https://example.com/license2.pdf",
    resumeUrl: "https://example.com/resume2.pdf",
  },
];

export default function DoctorManagementScreen() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [adminNote, setAdminNote] = useState("");
  const [searchText, setSearchText] = useState("");

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleApproveReject = (status) => {
    const updated = doctors.map((doc) =>
      doc.id === selectedDoc.id ? { ...doc, status } : doc
    );
    setDoctors(updated);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍⚕️ Doctor Management</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, specialty, hospital..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedDoc(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.docName}>{item.name}</Text>
            <Text>{item.specialty} | {item.hospital}</Text>
            <Text>Experience: {item.experience}</Text>
            <Text>Languages: {item.languages.join(", ")}</Text>
            <Text>Rating: ⭐ {item.rating}</Text>
            <Text>Status: <Text style={{
              color:
                item.status === "Verified"
                  ? "green"
                  : item.status === "Rejected"
                  ? "red"
                  : "orange",
            }}>{item.status}</Text></Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modal}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ alignSelf: "flex-end", marginRight: 15, marginTop: 15 }}
          >
            <Ionicons name="close-circle" size={30} color="gray" />
          </TouchableOpacity>

          {selectedDoc && (
            <View style={{ padding: 20 }}>
              <Text style={styles.modalTitle}>{selectedDoc.name}</Text>
              <Text>Specialty: {selectedDoc.specialty}</Text>
              <Text>Hospital: {selectedDoc.hospital}</Text>
              <Text>Experience: {selectedDoc.experience}</Text>
              <Text>Languages: {selectedDoc.languages.join(", ")}</Text>
              <Text>Rating: ⭐ {selectedDoc.rating}</Text>
              <Text>Slots: {selectedDoc.slots}</Text>

              <TouchableOpacity
                onPress={() => Linking.openURL(selectedDoc.licenseUrl)}
                style={styles.linkBtn}
              >
                <MaterialIcons name="picture-as-pdf" size={20} color="blue" />
                <Text style={styles.linkText}>View License</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Linking.openURL(selectedDoc.resumeUrl)}
                style={styles.linkBtn}
              >
                <MaterialIcons name="cloud-download" size={20} color="blue" />
                <Text style={styles.linkText}>Download Resume</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.notesInput}
                placeholder="📝 Admin Note (optional)"
                value={adminNote}
                onChangeText={setAdminNote}
                multiline
              />

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#4caf50" }]}
                  onPress={() => handleApproveReject("Verified")}
                >
                  <Text style={styles.btnText}>✅ Approve</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#f44336" }]}
                  onPress={() => handleApproveReject("Rejected")}
                >
                  <Text style={styles.btnText}>❌ Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", padding: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  docName: { fontSize: 18, fontWeight: "bold" },
  modal: { flex: 1, backgroundColor: "#fff" },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  linkBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  linkText: {
    color: "blue",
    marginLeft: 6,
    textDecorationLine: "underline",
  },
  notesInput: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    padding: 10,
    textAlignVertical: "top",
    minHeight: 80,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
