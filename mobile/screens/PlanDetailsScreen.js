import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Button } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const PlanDetails = () => {
  const route = useRoute();
  const { planId } = route.params;
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URI}/plans/${planId}`);
        setPlan(res.data);
      } catch (err) {
        console.error("Failed to load plan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [planId]);

  if (loading) return <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />;
  if (!plan) return <Text style={{ textAlign: 'center', color: 'red' }}>Plan not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{plan.name}</Text>
      <Text style={styles.badge}>{(plan.tier || "").toUpperCase()}</Text>
      <Text style={styles.description}>{plan.description}</Text>
      <Text style={styles.price}>₹ {plan.price} / year</Text>
      <Text style={styles.featuresTitle}>Features:</Text>
      {plan.features?.map((feature, i) => (
        <Text key={i} style={styles.feature}>• {feature}</Text>
      ))}
      <Button title="Buy This Plan" onPress={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  badge: { backgroundColor: '#ddd', padding: 4, borderRadius: 4, alignSelf: 'flex-start' },
  description: { marginVertical: 10 },
  price: { fontSize: 18, fontWeight: '600', marginVertical: 5 },
  featuresTitle: { fontWeight: 'bold', marginTop: 10 },
  feature: { marginLeft: 10, marginTop: 4 },
});

export default PlanDetails;
