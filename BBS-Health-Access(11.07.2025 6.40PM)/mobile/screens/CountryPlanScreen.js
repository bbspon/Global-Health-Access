import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Picker, ScrollView, ActivityIndicator, Button
} from "react-native";

const CountryPlanScreen = () => {
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("Chennai");
  const [plans, setPlans] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const countryOptions = ["India", "UAE"];
  const cityOptions = {
    India: ["Chennai", "Delhi", "Bengaluru"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah"]
  };

  useEffect(() => {
    fetchPlansAndHospitals();
  }, [country, city]);

  const fetchPlansAndHospitals = () => {
    setLoading(true);
    setTimeout(() => {
      const fetchedPlans = [
        { name: "Basic", price: country === "UAE" ? "AED 80" : "₹499", features: ["OPD Access", "Lab Discounts"] },
        { name: "Premium", price: country === "UAE" ? "AED 199" : "₹1499", features: ["IPD", "Dental", "Ayurveda"] },
      ];
      const fetchedHospitals = [
        { name: "Sunrise Hospital", city, tier: "Premium", services: ["OPD", "IPD"] },
        { name: "MediCare", city, tier: "Basic", services: ["OPD", "Labs"] },
      ];
      setPlans(fetchedPlans);
      setHospitals(fetchedHospitals);
      setLoading(false);
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌍 BBSCART Region-Specific Plans</Text>

      <Text style={styles.label}>Country</Text>
      <Picker selectedValue={country} onValueChange={(value) => setCountry(value)}>
        {countryOptions.map((item) => <Picker.Item key={item} label={item} value={item} />)}
      </Picker>

      <Text style={styles.label}>City</Text>
      <Picker selectedValue={city} onValueChange={(value) => setCity(value)}>
        {cityOptions[country].map((item) => <Picker.Item key={item} label={item} value={item} />)}
      </Picker>

      {loading ? <ActivityIndicator size="large" /> : (
        <>
          <Text style={styles.section}>📦 Plans in {city}</Text>
          {plans.map((plan, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={styles.cardTitle}>{plan.name} — {plan.price}</Text>
              {plan.features.map((f, i) => <Text key={i}>• {f}</Text>)}
              <Button title={`Buy ${plan.name}`} />
            </View>
          ))}

          <Text style={styles.section}>🏥 Hospitals in {city}</Text>
          {hospitals.map((h, idx) => (
            <View key={idx} style={styles.hospitalCard}>
              <Text style={styles.cardTitle}>{h.name} ({h.tier} Tier)</Text>
              <Text>Services: {h.services.join(", ")}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  card: { padding: 15, marginBottom: 10, backgroundColor: "#e0f7fa", borderRadius: 8 },
  hospitalCard: { padding: 15, backgroundColor: "#d0f0c0", marginBottom: 10, borderRadius: 8 },
  cardTitle: { fontSize: 16, fontWeight: "600" },
});

export default CountryPlanScreen;
