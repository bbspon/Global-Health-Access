import React, { useState } from 'react';
import { View, Text, Button, Picker, Switch, StyleSheet } from 'react-native';
import axios from 'axios';

const PlanPaymentScreen = ({ planId, totalAmount }) => {
  const [method, setMethod] = useState('wallet');
  const [partial, setPartial] = useState(false);

  const pay = async () => {
    const res = await axios.post(
      'https://yourdomain.com/api/plan-payment/initiate',
      {
        planId,
        amount: totalAmount,
        method,
        partialPayment: partial,
      },
    );

    const { payment } = res.data;

    if (method === 'wallet') {
      await axios.post('https://yourdomain.com/api/plan-payment/wallet-pay', {
        paymentId: payment._id,
      });
      alert('Paid with Wallet');
    } else {
      alert('Proceed to payment gateway');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Options</Text>

      <Picker selectedValue={method} onValueChange={v => setMethod(v)}>
        <Picker.Item label="Wallet" value="wallet" />
        <Picker.Item label="Online Gateway" value="gateway" />
      </Picker>

      <View style={styles.row}>
        <Text>Use Partial Payment (40%)</Text>
        <Switch value={partial} onValueChange={setPartial} />
      </View>

      <Button title="Pay Now" onPress={pay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default PlanPaymentScreen;
