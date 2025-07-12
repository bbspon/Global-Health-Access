import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlanCard = ({ plan }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{plan.name}</Text>
      <Text style={styles.tier}>{plan.tier.toUpperCase()}</Text>
      <Text>Valid From: {new Date(plan.startDate).toLocaleDateString()}</Text>
      <Text>Valid Till: {new Date(plan.endDate).toLocaleDateString()}</Text>
      <Text>Status: {plan.status}</Text>
      <Text>Payment Method: {plan.paymentMethod}</Text>
      <Text>Wallet Used: ₹{plan.usedWalletAmount}</Text>
      <Text>Txn ID: {plan.transactionId}</Text>

      <Text style={styles.featureHeader}>Features:</Text>
      {plan.features?.map((feature, i) => (
        <Text key={i} style={styles.featureItem}>
          • {feature}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  tier: { fontSize: 14, color: '#007bff', marginBottom: 8 },
  featureHeader: { marginTop: 10, fontWeight: '600' },
  featureItem: { fontSize: 14, color: '#333' },
});

export default PlanCard;
