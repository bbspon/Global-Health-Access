// src/screens/HealthcareCartScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, Switch, Alert, StyleSheet } from 'react-native';

const initialItems = [
  {
    id: 1,
    name: 'Comprehensive Family Plan',
    type: 'Plan',
    provider: 'BBSCART Health',
    price: 3999,
    covered: true,
    coPay: 0,
    for: 'Self + 2',
  },
  {
    id: 2,
    name: 'Blood Sugar Test',
    type: 'Lab',
    provider: 'Apollo Labs',
    price: 499,
    covered: true,
    coPay: 99,
    for: 'Self',
  },
];

const HealthcareCartScreen = () => {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState('');
  const [walletUsed, setWalletUsed] = useState(false);

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.coPay > 0 ? item.coPay : item.price;
    });
    if (promoCode === 'HEALTH100') total -= 100;
    if (walletUsed) total -= 250;
    return total;
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛒 Your Healthcare Cart</Text>

      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.itemTitle}>{item.name} ({item.type})</Text>
          <Text style={styles.sub}>Provider: {item.provider}</Text>
          <Text>For: {item.for}</Text>
          <Text>Price: ₹{item.price} {item.coPay > 0 ? `(Co-pay ₹${item.coPay})` : ''}</Text>
          <Button title="Remove" color="#d9534f" onPress={() => removeItem(item.id)} />
        </View>
      ))}

      <Text style={styles.sectionTitle}>Promo Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter code"
        value={promoCode}
        onChangeText={setPromoCode}
      />

      <View style={styles.switchRow}>
        <Text>Use Wallet ₹250</Text>
        <Switch value={walletUsed} onValueChange={setWalletUsed} />
      </View>

      <Text style={styles.total}>Total: ₹{calculateTotal()}</Text>
      <Button title="Proceed to Checkout" onPress={() => Alert.alert("Continue to Payment")} />

      <View style={styles.aiBox}>
        <Text>🤖 AI Suggestion:</Text>
        <Text>Consider adding an Eye Test – covered under your plan.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold' },
  card: { marginVertical: 10, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10 },
  itemTitle: { fontWeight: 'bold', fontSize: 16 },
  sub: { fontStyle: 'italic' },
  sectionTitle: { marginTop: 20, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  total: { fontSize: 20, marginVertical: 10, fontWeight: 'bold' },
  aiBox: { backgroundColor: '#e0f7fa', padding: 10, marginTop: 15, borderRadius: 6 },
});

export default HealthcareCartScreen;
