// components/AddOnSelector.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Switch } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const allAddOns = [
  {
    id: 1,
    name: "Mental Health Support",
    price: 499,
    description: "Access to certified therapists, chat sessions, and emotional wellness programs.",
    tooltip: "Includes 2 live therapy sessions & unlimited self-care exercises.",
    recommended: true,
    sponsoredBy: null,
  },
  {
    id: 2,
    name: "Maternity & Child Health",
    price: 799,
    description: "Covers prenatal checkups, delivery support, and infant care consultation.",
    tooltip: "Best for families expecting a baby or having infants under 2 years.",
    recommended: false,
    sponsoredBy: "NGO",
  },
  {
    id: 3,
    name: "Emergency + Ambulance Coverage",
    price: 599,
    description: "24x7 ambulance + ER access at any partner hospital.",
    tooltip: "Covers all emergency ambulance and stabilization charges.",
    recommended: true,
    sponsoredBy: "Employer",
  },
];

const AddOnSelector = ({ onAddOnsChange }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const toggleAddOn = (id, price) => {
    let updated = [];
    if (selectedAddOns.includes(id)) {
      updated = selectedAddOns.filter((item) => item !== id);
    } else {
      updated = [...selectedAddOns, id];
    }
    setSelectedAddOns(updated);
    onAddOnsChange && onAddOnsChange(updated);
  };

  const total = allAddOns
    .filter((addon) => selectedAddOns.includes(addon.id))
    .reduce((sum, a) => sum + a.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your Plan with Add-ons</Text>
      <ScrollView>
        {allAddOns.map((addon) => (
          <View key={addon.id} style={styles.card}>
            <View style={styles.row}>
              <Switch
                value={selectedAddOns.includes(addon.id)}
                onValueChange={() => toggleAddOn(addon.id, addon.price)}
              />
              <Text style={styles.addonTitle}>{addon.name}</Text>
              <TouchableOpacity onPress={() => alert(addon.tooltip)}>
                <Ionicons name="information-circle-outline" size={20} color="blue" />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{addon.description}</Text>
            <Text style={styles.price}>₹{addon.price}</Text>
            {addon.recommended && (
              <Text style={styles.badge}><MaterialIcons name="stars" /> Recommended</Text>
            )}
            {addon.sponsoredBy && (
              <Text style={styles.sponsor}>Covered by: {addon.sponsoredBy}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.totalBar}>
        <Text style={styles.totalText}>Total: ₹{total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  card: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addonTitle: { fontSize: 16, flex: 1, marginLeft: 10 },
  description: { fontSize: 12, color: "#555", marginVertical: 4 },
  price: { fontWeight: "bold", marginTop: 6 },
  badge: { color: "#f39c12", fontSize: 12 },
  sponsor: { fontSize: 12, color: "#27ae60" },
  totalBar: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 10,
    marginTop: 12,
  },
  totalText: { fontSize: 16, fontWeight: "bold", color: "#2ecc71" },
});

export default AddOnSelector;
