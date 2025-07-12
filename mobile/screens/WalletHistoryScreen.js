import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const WalletHistoryScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: '', min: '', max: '' });

  const fetchHistory = async () => {
    const { data } = await axios.get(
      'https://yourdomain.com/api/wallet/history',
      {
        params: filters,
      },
    );
    setTransactions(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type (credit/debit)"
        onChangeText={val => setFilters({ ...filters, type: val })}
        style={styles.input}
      />
      <TextInput
        placeholder="Min Amount"
        keyboardType="numeric"
        onChangeText={val => setFilters({ ...filters, min: val })}
        style={styles.input}
      />
      <TextInput
        placeholder="Max Amount"
        keyboardType="numeric"
        onChangeText={val => setFilters({ ...filters, max: val })}
        style={styles.input}
      />
      <Button title="Apply Filters" onPress={fetchHistory} />

      <FlatList
        data={transactions}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{new Date(item.createdAt).toLocaleString()}</Text>
            <Text>
              {item.type.toUpperCase()} — ₹{item.amount}
            </Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  item: { marginBottom: 15, borderBottomWidth: 1, paddingBottom: 8 },
});

export default WalletHistoryScreen;
