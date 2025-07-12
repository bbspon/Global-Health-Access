import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const doctorsSample = [
  {
    id: 1,
    name: "Dr. Asha Kumar",
    specialty: "Pediatrics",
    rating: 4.7,
    empathyScore: 4.8,
    consultationTimeliness: "On time",
    prescriptionAccuracy: 99,
    outcomeScore: 4.5,
    followUpCompliance: 90,
    communicationClarity: 4.7,
  },
  {
    id: 2,
    name: "Dr. Rajesh Mehta",
    specialty: "Cardiology",
    rating: 4.3,
    empathyScore: 4.0,
    consultationTimeliness: "Delayed 10 min",
    prescriptionAccuracy: 95,
    outcomeScore: 4.2,
    followUpCompliance: 85,
    communicationClarity: 4.4,
  },
  // Add more doctors as needed
];

const hospitalsSample = [
  {
    id: 1,
    name: "ABC City Hospital",
    bedAvailability: 85,
    hygieneRating: 4.5,
    equipmentReadiness: 97,
    staffBehavior: 4.6,
    queueManagement: "Excellent",
    billingTransparency: "Clear",
    emergencyResponseTime: "5 mins",
    patientSafetyIndex: 98,
  },
  {
    id: 2,
    name: "Sunrise Medical Center",
    bedAvailability: 65,
    hygieneRating: 4.0,
    equipmentReadiness: 90,
    staffBehavior: 4.2,
    queueManagement: "Good",
    billingTransparency: "Mostly Clear",
    emergencyResponseTime: "7 mins",
    patientSafetyIndex: 95,
  },
  // Add more hospitals as needed
];

export default function PerformanceScoringDashboard() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [userSymptoms, setUserSymptoms] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const closeDoctorModal = () => {
    setShowDoctorModal(false);
    setSelectedDoctor(null);
  };

  const handleSymptomSearch = () => {
    const keywords = userSymptoms.toLowerCase().split(" ");
    const filtered = doctorsSample.filter((doc) =>
      keywords.some((kw) => doc.specialty.toLowerCase().includes(kw))
    );
    setSearchResults(filtered.length ? filtered : doctorsSample);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Hospital & Doctor Performance Scoring</Text>

        {/* Symptom Input */}
        <Text style={styles.label}>Enter your symptoms or care need</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. pediatric fever, chest pain"
          value={userSymptoms}
          onChangeText={setUserSymptoms}
        />
        <View style={{ marginVertical: 10 }}>
          <Button title="Find Best Doctors" onPress={handleSymptomSearch} />
        </View>

        {/* Doctor Matches */}
        <Text style={styles.sectionTitle}>Doctor Matches</Text>
        {searchResults.length === 0 ? (
          <Text style={styles.noResultsText}>
            No matches yet. Enter symptoms and search.
          </Text>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => openDoctorModal(item)}
              >
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.specialty}</Text>
                <Text>Rating: {item.rating} ⭐</Text>
                <Text>Empathy Score: {item.empathyScore}</Text>
                <Text>Consultation Timeliness: {item.consultationTimeliness}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Doctor Detail Modal */}
        <Modal
          visible={showDoctorModal}
          animationType="slide"
          transparent={true}
          onRequestClose={closeDoctorModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {selectedDoctor?.name} - Performance Details
              </Text>

              {selectedDoctor && (
                <>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Specialty:</Text>
                    <Text>{selectedDoctor.specialty}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Patient Rating Avg.:</Text>
                    <Text>{selectedDoctor.rating} ⭐</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Empathy Score:</Text>
                    <Text>{selectedDoctor.empathyScore}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Consultation Timeliness:</Text>
                    <Text>{selectedDoctor.consultationTimeliness}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Prescription Accuracy (%):</Text>
                    <Text>{selectedDoctor.prescriptionAccuracy}%</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Outcome-Based Score:</Text>
                    <Text>{selectedDoctor.outcomeScore}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Follow-Up Compliance (%):</Text>
                    <Text>{selectedDoctor.followUpCompliance}%</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Communication Clarity:</Text>
                    <Text>{selectedDoctor.communicationClarity}</Text>
                  </View>

                  {/* Coming Soon Buttons */}
                  <View style={styles.comingSoonButtons}>
                    <Button title="Voice Feedback (Coming Soon)" disabled />
                    <View style={{ height: 10 }} />
                    <Button title="Download Performance Report (Coming Soon)" disabled />
                  </View>
                </>
              )}

              <View style={{ marginTop: 20 }}>
                <Button title="Close" onPress={closeDoctorModal} />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f8fa",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#0d6efd",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 12,
  },
  noResultsText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: "600",
  },
  comingSoonButtons: {
    marginTop: 20,
  },
});
