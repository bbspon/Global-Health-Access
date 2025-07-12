import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    features: ["AI Consults", "Limited OPD Access"],
    consultLimit: 2,
    opdLimit: 1,
  },
  {
    name: "Premium",
    price: "₹999/year",
    features: ["Unlimited AI", "5 Doctor Consults", "3 OPD Visits"],
    consultLimit: 5,
    opdLimit: 3,
  },
  {
    name: "Corporate",
    price: "Custom",
    features: ["All Premium", "Family Access", "Dedicated Coach"],
    consultLimit: 10,
    opdLimit: 5,
  },
];

export default function HealthMembershipScreen() {
  const [currentPlan, setCurrentPlan] = useState("Basic");
  const [usedConsults, setUsedConsults] = useState(1);
  const [usedOpd, setUsedOpd] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [walletBalance, setWalletBalance] = useState(300); // ₹ mock balance

  const handleUpgrade = (newPlan) => {
    if (walletBalance >= 300) {
      setCurrentPlan(newPlan);
      setWalletBalance(walletBalance - 300);
      setModalVisible(false);
    } else {
      alert("Insufficient Wallet Balance");
    }
  };

  const currentTier = tiers.find((t) => t.name === currentPlan);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My BBSCART Health Plan</Text>
      <Text style={styles.sub}>Plan: {currentPlan}</Text>

      <View style={styles.card}>
        <Text style={styles.header}>Usage Stats</Text>
        <Text>Consults Used: {usedConsults}/{currentTier.consultLimit}</Text>
        <Text>OPD Visits Used: {usedOpd}/{currentTier.opdLimit}</Text>
        <Text>Wallet: ₹{walletBalance}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Upgrade Plan</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Smart Suggestion</Text>
      {usedConsults / currentTier.consultLimit >= 0.8 && (
        <View style={styles.card}>
          <Text>
            You're using over 80% of your plan. Upgrade to Premium for unlimited care!
          </Text>
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modal}>
          <Text style={styles.title}>Select a Plan</Text>
          {tiers
            .filter((t) => t.name !== currentPlan)
            .map((tier, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.header}>{tier.name}</Text>
                <Text>Price: {tier.price}</Text>
                {tier.features.map((f, i) => (
                  <Text key={i}>• {f}</Text>
                ))}
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#28a745" }]}
                  onPress={() => handleUpgrade(tier.name)}
                >
                  <Text style={styles.buttonText}>Upgrade to {tier.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={[styles.button, { backgroundColor: "#999" }]}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  sub: { fontSize: 16, marginBottom: 20 },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  header: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  sectionTitle: { fontSize: 18, marginTop: 30, fontWeight: "600" },
  modal: { padding: 20, backgroundColor: "#fff" },
});
