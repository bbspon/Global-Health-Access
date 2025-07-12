import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PlanCard = ({ plan }) => {
  const badgeColor =
    {
      basic: '#6c757d',
      premium: '#17a2b8',
      super_premium: '#ffc107',
    }[plan.tier] || '#343a40';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{plan.name}</Text>
        <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
          {plan.tier.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.desc}>{plan.description}</Text>

      <View style={styles.features}>
        {plan.features.map((f, i) => (
          <Text key={i} style={styles.feature}>
            • {f}
          </Text>
        ))}
      </View>

      <Text style={styles.price}>₹ {plan.price} / year</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.outlineBtn} disabled>
          <Text style={styles.btnText}>Compare</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filledBtn} disabled>
          <Text style={styles.btnTextWhite}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  badge: {
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
  },
  desc: { fontSize: 14, marginBottom: 8 },
  features: { marginBottom: 8 },
  feature: { fontSize: 12, color: '#555' },
  price: { fontSize: 16, fontWeight: '600', marginVertical: 6 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between' },
  outlineBtn: {
    padding: 10,
    borderColor: '#17a2b8',
    borderWidth: 1,
    borderRadius: 6,
  },
  filledBtn: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 6,
  },
  btnText: { color: '#17a2b8', fontWeight: '600' },
  btnTextWhite: { color: '#fff', fontWeight: '600' },
});

export default PlanCard;
