import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const regions = ["All India", "Delhi", "Maharashtra", "Tamil Nadu", "UAE"];
const diseases = [
  "Diabetes",
  "Maternal Care",
  "Respiratory Infections",
  "Cardiovascular",
  "Malaria",
];
const roles = ["Government", "CSR Head", "Researcher"];

function simulateFetchData(filter) {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        planUsage: Math.random() * 100,
        diseasePrevalence: Math.floor(Math.random() * 1000),
        csrOpportunityScore: Math.random() * 100,
        hospitalLoad: Math.floor(Math.random() * 100),
        emergencyBottleneck: Math.random() > 0.7,
        nextIntervention: "Mobile Clinic Deployment",
        seasonalTrend: [
          { month: "Jan", value: 20 },
          { month: "Feb", value: 35 },
          { month: "Mar", value: 40 },
          { month: "Apr", value: 25 },
          { month: "May", value: 30 },
          { month: "Jun", value: 45 },
          { month: "Jul", value: 50 },
          { month: "Aug", value: 48 },
          { month: "Sep", value: 42 },
          { month: "Oct", value: 38 },
          { month: "Nov", value: 33 },
          { month: "Dec", value: 25 },
        ],
      });
    }, 1000);
  });
}

export default function HealthInsightsEngine() {
  const [selectedRegion, setSelectedRegion] = useState("All India");
  const [selectedDisease, setSelectedDisease] = useState("Diabetes");
  const [selectedRole, setSelectedRole] = useState("Government");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showImpactModal, setShowImpactModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

useEffect(() => {
  setLoading(true);
  fetchHealthInsights({
    region: selectedRegion,
    disease: selectedDisease,
  }).then((res) => {
    setData(res);
    setLoading(false);
  });
}, [selectedRegion, selectedDisease]);


  function resetFilters() {
    setSelectedRegion("All India");
    setSelectedDisease("Diabetes");
    setSelectedRole("Government");
  }

  // Find peak month
  const peakMonth =
    data?.seasonalTrend.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    ).month || "";

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>National & State-Level Health Insights Engine</Text>

      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={styles.filterItem}>
          <Text style={styles.label}>Filter by Region</Text>
          <Picker
            selectedValue={selectedRegion}
            onValueChange={(v) => setSelectedRegion(v)}
            style={styles.picker}
            mode="dropdown"
          >
            {regions.map((r) => (
              <Picker.Item key={r} label={r} value={r} />
            ))}
          </Picker>
        </View>
        <View style={styles.filterItem}>
          <Text style={styles.label}>Filter by Disease</Text>
          <Picker
            selectedValue={selectedDisease}
            onValueChange={(v) => setSelectedDisease(v)}
            style={styles.picker}
            mode="dropdown"
          >
            {diseases.map((d) => (
              <Picker.Item key={d} label={d} value={d} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.filterItem}>
          <Text style={styles.label}>User Role</Text>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(v) => setSelectedRole(v)}
            style={styles.picker}
            mode="dropdown"
          >
            {roles.map((role) => (
              <Picker.Item key={role} label={role} value={role} />
            ))}
          </Picker>
        </View>
        <View style={[styles.filterItem, { justifyContent: "flex-end" }]}>
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text>Loading data...</Text>
        </View>
      )}

      {/* Data Cards */}
      {!loading && data && (
        <>
          <View style={styles.cardRow}>
            <View style={[styles.card, styles.greenCard]}>
              <Text style={styles.cardTitle}>Plan Usage (%)</Text>
              <Text style={styles.cardValue}>{data.planUsage.toFixed(1)}%</Text>
            </View>
            <View style={[styles.card, styles.yellowCard]}>
              <Text style={styles.cardTitle}>Disease Prevalence</Text>
              <Text style={styles.cardValue}>{data.diseasePrevalence} cases</Text>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={[styles.card, styles.blueCard]}>
              <Text style={styles.cardTitle}>CSR Opportunity Score</Text>
              <Text style={styles.cardValue}>
                {data.csrOpportunityScore.toFixed(1)}
              </Text>
            </View>
            <View style={[styles.card, styles.greyCard]}>
              <Text style={styles.cardTitle}>Seasonal Trend</Text>
              <Text style={styles.cardValue}>Peak in {peakMonth}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Hospital Load & Emergency Bottleneck</Text>
            <Text>Hospital Load: {data.hospitalLoad} % capacity</Text>
            <Text>
              Emergency Bottleneck:{" "}
              <Text
                style={{
                  color: data.emergencyBottleneck ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {data.emergencyBottleneck ? "Yes" : "No"}
              </Text>
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setShowMapModal(true)}
            >
              <Text style={styles.primaryButtonText}>View Detailed Map</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>AI-Driven Next Best Intervention</Text>
            <Text>{data.nextIntervention}</Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={() => setShowImpactModal(true)}
            >
              <Text style={styles.successButtonText}>Simulate Impact</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setShowPrivacyModal(true)}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.linkText}>Data Ethics, Privacy & Transparency</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Detailed Map Modal */}
      <Modal
        visible={showMapModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMapModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detailed Geo Health Map</Text>
            <Text style={{ marginVertical: 8 }}>
              [Interactive Geo Heatmap showing disease prevalence, hospital load,
              and healthcare access overlays.]
            </Text>
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>Map visualization coming soon...</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowMapModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Simulate Impact Modal */}
      <Modal
        visible={showImpactModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowImpactModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Simulate Intervention Impact</Text>
            <Text style={{ marginVertical: 8 }}>
              Using AI models to forecast health outcomes and ROI of deploying{" "}
              <Text style={{ fontWeight: "bold" }}>{data?.nextIntervention}</Text> in the selected
              region.
            </Text>
            <View style={[styles.placeholderBox, { height: 150 }]}>
              <Text style={styles.placeholderText}>
                Impact simulation charts coming soon...
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowImpactModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Data Ethics & Privacy</Text>
            <View style={{ marginVertical: 8 }}>
              <Text>• All data anonymized with tokenized IDs</Text>
              <Text>• Full compliance with DPDP, GDPR, UAE Data Laws</Text>
              <Text>• User consent and opt-out enforced</Text>
              <Text>• Transparent use with audit logs and reports</Text>
              <Text>• Secure API access with authentication</Text>
            </View>
            <Text>
              We prioritize user privacy and data security while enabling impactful
              health insights for public good.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPrivacyModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#0d6efd",
    textAlign: "center",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "center",
  },
  label: {
    fontWeight: "600",
    marginBottom: Platform.OS === "ios" ? 6 : 0,
    color: "#333",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 40,
  },
  resetButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 8,
    borderRadius: 4,
  },
  resetButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  loadingContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  greenCard: {
    backgroundColor: "#198754",
  },
  yellowCard: {
    backgroundColor: "#ffc107",
  },
  blueCard: {
    backgroundColor: "#0dcaf0",
  },
  greyCard: {
    backgroundColor: "#6c757d",
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 6,
    fontSize: 16,
  },
  cardValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  infoCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  infoTitle: {
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
    color: "#212529",
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: "#0d6efd",
    paddingVertical: 10,
    borderRadius: 6,
  },
  primaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  successButton: {
    marginTop: 12,
    backgroundColor: "#198754",
    paddingVertical: 10,
    borderRadius: 6,
  },
  successButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  linkText: {
    color: "#0d6efd",
    fontWeight: "600",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0d6efd",
    textAlign: "center",
  },
  placeholderBox: {
    height: 120,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#6c757d",
    fontStyle: "italic",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#6c757d",
    paddingVertical: 10,
    borderRadius: 6,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
