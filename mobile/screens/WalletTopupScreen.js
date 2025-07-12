import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const WalletTopupScreen = () => {
  const [amount, setAmount] = useState('');

  const handleTopup = async () => {
    const { data } = await axios.post(
      'https://yourdomain.com/api/wallet/topup-order',
      { amount },
    );

    const html = `
      <html><body>
      <script src="https://checkout.razorpay.com/v1/checkout.js"
      data-key="RAZORPAY_KEY_HERE"
      data-amount="${data.order.amount}"
      data-currency="INR"
      data-order_id="${data.order.id}"
      data-name="BBSCART Wallet"
      data-description="Top-Up"
      ></script></body></html>`;

    const uri = `data:text/html,${encodeURIComponent(html)}`;
    navigation.navigate('WebViewScreen', { uri });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={val => setAmount(val)}
        style={styles.input}
      />
      <Button title="Top-Up Now" onPress={handleTopup} disabled={!amount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
});

export default WalletTopupScreen;
