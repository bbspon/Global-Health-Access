// HealthPlanRenewalScreen.js - Advanced React Native version

import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, Switch,
  Modal, ScrollView, StyleSheet, Alert, TouchableOpacity, Picker
} from 'react-native';

const addOns = [
  { name: 'Dental Coverage', price: 99 },
  { name: 'Mental Health Pack', price: 149 },
  { name: "Women’s Health Combo", price: 129 },
];

const plans = [
  { name: 'Basic', price: 999 },
  { name: 'Premium', price: 1499 },
  { name: 'Super Premium', price: 1999 },
];

const paymentMethods = ['Wallet', 'UPI', 'Card', 'EMI'];

const HealthPlanRenewalScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Wallet');
  const [autoRenew, setAutoRenew] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [language, setLanguage] = useState('English');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [callRequested, setCallRequested] = useState(false);

  const toggleAddOn = (addOnName) => {
    if (selectedAddOns.includes(addOnName)) {
      setSelectedAddOns(selectedAddOns.filter(a => a !== addOnName));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnName]);
    }
  };

  const calculateTotal = () => {
    const planPrice = plans.find(p => p.name === selectedPlan)?.price || 0;
    const addOnPrice = selectedAddOns.reduce((total, item) => {
      const match = addOns.find(a => a.name === item);
      return total + (match ? match.price : 0);
    }, 0);
    return planPrice + addOnPrice;
  };

  const handleRenew = () => {
    Alert.alert('Renewed!', `Plan: ${selectedPlan}\nTotal: ₹${calculateTotal()}`);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.alert}>⚠️ Your plan '{selectedPlan}' expires in 3 days.</Text>

      <Text style={styles.label}>🌐 Language</Text>
      <Picker
        selectedValue={language}
        style={styles.picker}
        onValueChange={(item) => setLanguage(item)}>
        <Picker.Item label="English" value="English" />
        <Picker.Item label="हिंदी" value="Hindi" />
        <Picker.Item label="العربية" value="Arabic" />
      </Picker>

      <Text style={styles.label}>Choose Plan</Text>
      <Picker
        selectedValue={selectedPlan}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedPlan(itemValue)}>
        {plans.map(plan => <Picker.Item key={plan.name} label={`${plan.name} – ₹${plan.price}`} value={plan.name} />)}
      </Picker>

      <Text style={styles.label}>Add-ons</Text>
      {addOns.map(addOn => (
        <TouchableOpacity key={addOn.name} style={styles.addonOption} onPress={() => toggleAddOn(addOn.name)}>
          <Text>{selectedAddOns.includes(addOn.name) ? '✅' : '⬜'} {addOn.name} (₹{addOn.price})</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Payment Method</Text>
      <Picker
        selectedValue={paymentMethod}
        style={styles.picker}
        onValueChange={(item) => setPaymentMethod(item)}>
        {paymentMethods.map(method => <Picker.Item key={method} label={method} value={method} />)}
      </Picker>

      <View style={styles.row}>
        <Text>Enable Auto-Renew</Text>
        <Switch value={autoRenew} onValueChange={setAutoRenew} />
      </View>

      <Text style={styles.label}>Coupon Code</Text>
      <TextInput style={styles.input} placeholder="Enter code" value={coupon} onChangeText={setCoupon} />

      <Button title={`Renew Plan (₹${calculateTotal()})`} onPress={handleRenew} />

      <View style={styles.divider} />

      <Text style={styles.label}>🧠 AI Suggestion:</Text>
      <Text>Based on your usage, upgrade to Super Premium for better coverage.</Text>
      <Button title="Compare & Upgrade" onPress={handleUpgrade} />

      <View style={styles.divider} />

      <Text style={styles.label}>📞 Need Help?</Text>
      {!callRequested ? (
        <Button title="Schedule Advisor Call" onPress={() => {
          setCallRequested(true);
          Alert.alert("Advisor call scheduled within 24h");
        }} />
      ) : <Text style={styles.success}>Advisor call scheduled ✅</Text>}

      {/* Upgrade Modal */}
      <Modal visible={showUpgradeModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🔄 Compare Plans</Text>
          {plans.map(p => <Text key={p.name}>• {p.name} – ₹{p.price}</Text>)}
          <Button title="Upgrade to Super Premium" onPress={() => Alert.alert("Upgraded to Super Premium")} />
          <Button title="Close" onPress={() => setShowUpgradeModal(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  alert: { color: 'red', fontSize: 16, marginBottom: 15 },
  label: { fontWeight: 'bold', marginTop: 15 },
  picker: { marginVertical: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginVertical: 5 },
  divider: { borderBottomWidth: 1, borderColor: '#ddd', marginVertical: 15 },
  addonOption: { marginVertical: 5 },
  modalContainer: { padding: 20, marginTop: 100 },
  modalTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  success: { color: 'green', marginTop: 5 }
});

export default HealthPlanRenewalScreen;
