// DynamicPricingEngine.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Card, Button } from "react-native-paper";

const basePlans = [
  {
    id: 1,
    name: "Basic Plan",
    basePrice: 999,
    features: ["OPD", "Lab Discounts"],
  },
  {
    id: 2,
    name: "Premium Plan",
    basePrice: 1999,
    features: ["OPD", "IPD", "Dental"],
  },
  {
    id: 3,
    name: "Super Premium",
    basePrice: 2999,
    features: ["All Features", "Wellness Credits"],
  },
];

export default function DynamicPricingEngine() {
  const [userType, setUserType] = useState("public");
  const [location, setLocation] = useState("metro");
  const [promo, setPromo] = useState("");
  const [walletPoints, setWalletPoints] = useState(100);
  const [walletModalVisible, setWalletModalVisible] = useState(false);

  const calculatePrice = (plan) => {
    let price = plan.basePrice;
    if (userType === "ngo") price -= 1000;
    else if (userType === "corporate") price -= 500;
    if (location === "rural") price -= 200;
    if (promo.toUpperCase() === "FEST500") price -= 500;
    price -= walletPoints > 0 ? 100 : 0;
    return price < 0 ? 0 : price;
  };

  const handleBuyNow = (plan) => {
    const finalPrice = calculatePrice(plan);
    Alert.alert("Plan Selected", `${plan.name} - ₹${finalPrice}`);
    // TODO: Redirect to payment screen or trigger backend
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🎯 BBSCART Dynamic Pricing & Discounts</Text>

      <Text style={styles.infoText}>
        Select your user type, location and promo code to get best pricing.
      </Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>User Type</Text>
        <Picker
          selectedValue={userType}
          onValueChange={(value) => setUserType(value)}
        >
          <Picker.Item label="Public" value="public" />
          <Picker.Item label="Corporate" value="corporate" />
          <Picker.Item label="NGO Sponsored" value="ngo" />
        </Picker>

        <Text style={styles.label}>Location</Text>
        <Picker
          selectedValue={location}
          onValueChange={(value) => setLocation(value)}
        >
          <Picker.Item label="Metro" value="metro" />
          <Picker.Item label="Semi-Urban" value="semi-urban" />
          <Picker.Item label="Rural" value="rural" />
        </Picker>

        <Text style={styles.label}>Promo Code</Text>
        <TextInput
          style={styles.input}
          value={promo}
          onChangeText={(text) => setPromo(text)}
          placeholder="e.g. FEST500"
        />
      </View>

      <TouchableOpacity
        style={styles.walletButton}
        onPress={() => setWalletModalVisible(true)}
      >
        <Text style={styles.walletText}>💰 Wallet: ₹{walletPoints}</Text>
      </TouchableOpacity>

      {basePlans.map((plan) => (
        <Card key={plan.id} style={styles.card}>
          <Card.Title title={plan.name} />
          <Card.Content>
            {plan.features.map((f, idx) => (
              <Text key={idx}>• {f}</Text>
            ))}
            <Text style={styles.price}>₹{calculatePrice(plan)}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => handleBuyNow(plan)}>
              Buy Now
            </Button>
          </Card.Actions>
        </Card>
      ))}

      {/* Wallet Modal */}
      <Modal
        visible={walletModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalView}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>💰 Wallet Details</Text>
            <Text style={{ marginBottom: 10 }}>
              You have ₹{walletPoints} in your Golldex Wallet.
            </Text>
            <Button
              mode="outlined"
              onPress={() => setWalletPoints(walletPoints + 100)}
            >
              + Add ₹100
            </Button>
            <Button onPress={() => setWalletModalVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    marginBottom: 12,
    color: "#555",
  },
  pickerContainer: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop: 5,
  },
  walletButton: {
    marginBottom: 16,
    alignSelf: "flex-end",
    backgroundColor: "#dff0ff",
    padding: 8,
    borderRadius: 6,
  },
  walletText: {
    color: "#007bff",
    fontWeight: "600",
  },
  card: {
    marginBottom: 16,
  },
  price: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#28a745",
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
