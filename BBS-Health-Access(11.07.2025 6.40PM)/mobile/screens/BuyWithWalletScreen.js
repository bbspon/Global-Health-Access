import React, { useEffect, useState } from 'react';
import { View, Text, Picker, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const BuyWithWalletScreen = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    axios
      .get('https://yourdomain.com/api/health-plans')
      .then(res => setPlans(res.data));
    axios
      .get('https://yourdomain.com/api/wallet/balance')
      .then(res => setWalletBalance(res.data.balance));
  }, []);

  const handlePurchase = () => {
    axios
      .post('https://yourdomain.com/api/user-plan/checkout-wallet', {
        planId: selectedPlan,
      })
      .then(() => Alert.alert('Success', 'Plan purchased using wallet'))
      .catch(() => Alert.alert('Error', 'Transaction failed'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buy with Wallet</Text>
      <Text style={styles.balance}>Wallet: ₹{walletBalance}</Text>

      <Picker
        selectedValue={selectedPlan}
        onValueChange={v => setSelectedPlan(v)}
      >
        <Picker.Item label="Select Plan" value="" />
        {plans.map(p => (
          <Picker.Item
            label={`${p.title} — ₹${p.price}`}
            value={p._id}
            key={p._id}
          />
        ))}
      </Picker>

      <Button
        title="Buy with Wallet"
        onPress={handlePurchase}
        disabled={!selectedPlan}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  balance: { marginBottom: 10, fontSize: 16 },
});

export default BuyWithWalletScreen;
