import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HospitalDashboardHome = () => {
  const navigation = useNavigation();

  const modules = [
    { title: "Hospital Onboarding", route: "HospitalOnboardingForm" },
    { title: "Create Plan Tier", route: "PlanTierEditor" },
    { title: "Service Availability", route: "AvailabilityManager" },
    { title: "Care Pass QR Scanner", route: "QRScanner" },
    { title: "Enter Billing", route: "CarePassBilling" },
    { title: "Analytics", route: "HospitalAnalytics" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🏥 Hospital Partner Dashboard</Text>
      {modules.map((mod, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigation.navigate(mod.route)}
        >
          <Text style={styles.cardText}>{mod.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HospitalDashboardHome;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#007bff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
