// BBSCART HealthAccessScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const plans = [
  { tier: 'Basic', features: ['AI Consult', 'Discounted OPD', 'Lab Vouchers'], color: '#6c757d' },
  { tier: 'Premium', features: ['Unlimited Consults', 'Priority Booking', 'Health Coach', 'Family Support'], color: '#0d6efd' },
  { tier: 'Corporate', features: ['Team Health Plans', 'Dashboard', 'Dedicated Doctors'], color: '#343a40' },
];

export default function HealthAccessScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>BBSCART Health Access</Text>
      <Text style={styles.subText}>Smart, affordable and AI-powered care — anytime, anywhere.</Text>

      {plans.map((plan, index) => (
        <View key={index} style={[styles.card, { borderColor: plan.color }]}>
          <Text style={[styles.cardTitle, { color: plan.color }]}>{plan.tier} Plan</Text>
          {plan.features.map((f, i) => (
            <Text key={i} style={styles.feature}><MaterialIcons name="check-circle" color="green" />  {f}</Text>
          ))}
          <TouchableOpacity style={[styles.button, { backgroundColor: plan.color }]}>
            <Text style={styles.buttonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.servicesContainer}>
        <TouchableOpacity style={styles.serviceBox}>
          <FontAwesome5 name="hospital" size={24} color="#0d6efd" />
          <Text style={styles.serviceText}>Hospital Finder</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.serviceBox}>
          <FontAwesome5 name="robot" size={24} color="#28a745" />
          <Text style={styles.serviceText}>AI Symptom Check</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subText: { textAlign: 'center', color: '#6c757d', marginBottom: 20 },
  card: { borderWidth: 1, borderRadius: 10, padding: 15, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  feature: { fontSize: 14, marginVertical: 2 },
  button: { padding: 10, marginTop: 10, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
  servicesContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 },
  serviceBox: { alignItems: 'center' },
  serviceText: { marginTop: 5, color: '#333' },
});
