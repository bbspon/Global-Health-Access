import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Dummy plan data (replace with API later)
const dummyPlans = [
  {
    id: "basic",
    name: "Basic Care Plan",
    price: 299,
    frequency: "Monthly",
    benefits: ["2 OPD visits", "1 lab test"],
    addOns: ["Emergency Access"],
    tier: "Basic",
  },
  {
    id: "plus",
    name: "Plus Plan",
    price: 599,
    frequency: "Monthly",
    benefits: ["4 OPD", "2 Lab", "1 Dental"],
    addOns: ["Ambulance", "Second Opinion"],
    tier: "Plus",
  },
  {
    id: "premium",
    name: "Premium Health Plan",
    price: 999,
    frequency: "Monthly",
    benefits: ["Unlimited OPD", "4 Labs", "2 Dental", "IPD Discount"],
    addOns: ["AI Chatbot", "24x7 Telemedicine", "Ambulance"],
    tier: "Premium",
  },
];

const PlanListScreen = ({ navigation }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch delay
    setTimeout(() => {
      setPlans(dummyPlans);
      setLoading(false);
    }, 1000);
  }, []);

  const handleBuyPlan = (planId) => {
    navigation.navigate("BuyPlanFlow", { planId });
  };

  const handleCompare = () => {
    navigation.navigate("PlanComparisonScreen", { plans: dummyPlans });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🩺 Explore BBSCART Health Plans</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 40 }} />
      ) : (
        <>
          <TouchableOpacity onPress={handleCompare} style={styles.compareButton}>
            <FontAwesome5 name="balance-scale" size={18} color="white" />
            <Text style={styles.compareText}> Compare Plans</Text>
          </TouchableOpacity>

          {plans.map((plan) => (
            <Card key={plan.id} style={styles.card}>
              <Card.Title
                title={plan.name}
                subtitle={`${plan.tier} Tier`}
                left={() => (
                  <Ionicons
                    name="medkit"
                    size={28}
                    color={plan.tier === "Premium" ? "#d9534f" : "#007bff"}
                  />
                )}
              />
              <Card.Content>
                <Text style={styles.price}>
                  ₹{plan.price} / {plan.frequency}
                </Text>
                <Text style={styles.sectionTitle}>Benefits:</Text>
                {plan.benefits.map((b, i) => (
                  <Text key={i} style={styles.bulletText}>• {b}</Text>
                ))}

                <Text style={styles.sectionTitle}>Add-Ons:</Text>
                {plan.addOns.map((a, i) => (
                  <Text key={i} style={styles.addonText}>+ {a}</Text>
                ))}
              </Card.Content>
              <Card.Actions style={styles.actions}>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => handleBuyPlan(plan.id)}
                >
                  <Text style={styles.buyText}>Buy Now</Text>
                </TouchableOpacity>
              </Card.Actions>
            </Card>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default PlanListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f7f9fc",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  compareButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  compareText: {
    color: "white",
    fontWeight: "bold",
  },
  card: {
    marginBottom: 18,
    borderRadius: 12,
    elevation: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 8,
  },
  bulletText: {
    fontSize: 14,
    marginLeft: 6,
  },
  addonText: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#6c757d",
    marginLeft: 6,
  },
  actions: {
    justifyContent: "flex-end",
    paddingRight: 12,
    marginBottom: 6,
  },
  buyButton: {
    backgroundColor: "#28a745",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buyText: {
    color: "white",
    fontWeight: "bold",
  },
});
