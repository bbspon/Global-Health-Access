import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const hospitalsDummy = [
  {
    id: 1,
    name: "CityCare Multispeciality Hospital",
    location: "Chennai",
    specialties: ["Cardiology", "Pediatrics"],
    accessTier: "Premium",
    rating: 4.7,
    openNow: true,
    emergency: true,
    distanceKm: 3.5,
    liveWaitTime: "15 mins",
    coordinates: { latitude: 13.0827, longitude: 80.2707 },
    doctors: [
      { name: "Dr. Anika Sharma", specialty: "Cardiologist", available: true },
      { name: "Dr. Ramesh Iyer", specialty: "Pediatrician", available: false },
    ],
    facilities: ["ICU", "Pharmacy", "Imaging", "Emergency", "OT"],
  },
  {
    id: 2,
    name: "Global Heart Institute",
    location: "Hyderabad",
    specialties: ["Cardiology"],
    accessTier: "Basic",
    rating: 4.2,
    openNow: false,
    emergency: false,
    distanceKm: 12.3,
    liveWaitTime: "45 mins",
    coordinates: { latitude: 17.385, longitude: 78.4867 },
    doctors: [
      { name: "Dr. Sunita Nair", specialty: "Cardiologist", available: true },
    ],
    facilities: ["Imaging", "Emergency"],
  },
];

export default function HospitalDiscoveryScreen() {
  const [search, setSearch] = useState("");
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  const filteredHospitals = hospitalsDummy.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.specialties.join(", ").toLowerCase().includes(search.toLowerCase())
  );

  const handleBook = () => {
    setBookingStatus("loading");
    setTimeout(() => {
      setBookingStatus("success");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏥 Discover Hospitals</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Search hospitals or specialty..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredHospitals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedHospital(item);
              setModalVisible(true);
              setBookingStatus(null);
            }}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.location} • {item.distanceKm} km away</Text>
            <Text>Access: {item.accessTier}</Text>
            <Text>Wait Time: {item.liveWaitTime}</Text>
            <Text>⭐ {item.rating} Rating</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        {selectedHospital && (
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedHospital.name}</Text>
            <Text>📍 {selectedHospital.location}</Text>
            <Text>🩺 Specialties: {selectedHospital.specialties.join(", ")}</Text>
            <Text>🔓 Access Tier: {selectedHospital.accessTier}</Text>
            <Text>⭐ Rating: {selectedHospital.rating}</Text>
            <Text>🕒 Wait Time: {selectedHospital.liveWaitTime}</Text>
            <Text>Status: {selectedHospital.openNow ? "Open" : "Closed"}</Text>
            <Text>{selectedHospital.emergency ? "🚨 Emergency Available" : ""}</Text>

            <Text style={styles.sectionHeader}>👨‍⚕️ Doctors</Text>
            {selectedHospital.doctors.map((doc, index) => (
              <Text key={index}>
                {doc.name} ({doc.specialty}) — {doc.available ? "Available ✅" : "Unavailable ❌"}
              </Text>
            ))}

            <Text style={styles.sectionHeader}>🏥 Facilities</Text>
            {selectedHospital.facilities.map((f, i) => (
              <Text key={i}>• {f}</Text>
            ))}

            <Text style={styles.sectionHeader}>🗺️ Location</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: selectedHospital.coordinates.latitude,
                longitude: selectedHospital.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={selectedHospital.coordinates}
                title={selectedHospital.name}
              />
            </MapView>

            <View style={{ marginTop: 20 }}>
              {bookingStatus === "loading" ? (
                <ActivityIndicator size="large" color="#0a84ff" />
              ) : bookingStatus === "success" ? (
                <Text style={styles.successText}>✅ Appointment Booked!</Text>
              ) : (
                <TouchableOpacity style={styles.bookBtn} onPress={handleBook}>
                  <Text style={{ color: "#fff", textAlign: "center" }}>Book Appointment</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#0a84ff", textAlign: "center" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  modalContent: { padding: 16, backgroundColor: "#fff" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  sectionHeader: { marginTop: 16, fontWeight: "bold" },
  map: { height: 200, marginTop: 10, borderRadius: 10 },
  bookBtn: {
    backgroundColor: "#0a84ff",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  closeBtn: {
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#0a84ff",
    borderWidth: 1,
  },
  successText: {
    fontSize: 16,
    textAlign: "center",
    color: "green",
    marginTop: 10,
    fontWeight: "bold",
  },
});
