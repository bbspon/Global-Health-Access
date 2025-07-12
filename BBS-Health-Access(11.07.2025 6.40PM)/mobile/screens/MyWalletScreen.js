import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const MyWalletScreen = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');

  const fetchWallet = async () => {
    const res = await axios.get('https://yourdomain.com/api/wallet/me');
    setBalance(res.data.balance);
    setTransactions(res.data.transactions);
  };

  const topUp = async () => {
    await axios.post('https://yourdomain.com/api/wallet/topup', {
      amount: parseFloat(amount),
      method: 'gateway',
      transactionId: 'TXN' + Date.now(),
    });
    alert('Wallet recharged');
    fetchWallet();
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Balance: ₹{balance}</Text>

      <TextInput
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Recharge Wallet" onPress={topUp} />

      <Text style={styles.subtitle}>Recharge History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.txnItem}>
            <Text>
              ₹{item.amount} - {item.method}
            </Text>
            <Text>{new Date(item.timestamp).toLocaleString()}</Text>
            <Text>{item.transactionId}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { marginTop: 20, fontSize: 16, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  txnItem: { marginVertical: 5, padding: 10, backgroundColor: '#f9f9f9' },
});

export default MyWalletScreen;
