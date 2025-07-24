import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Picker,
  SafeAreaView,
} from "react-native";
import axios from "axios";

const WalletHistoryScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/wallet/wallet-history${
            typeFilter ? `?type=${typeFilter}` : ""
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions(res.data);
      } catch (err) {
        console.error("History fetch failed", err);
      }
    };

    fetchHistory();
  }, [typeFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Wallet History</Text>

      <Picker
        selectedValue={typeFilter}
        style={styles.picker}
        onValueChange={(itemValue) => setTypeFilter(itemValue)}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="Credit" value="credit" />
        <Picker.Item label="Debit" value="debit" />
      </Picker>

      <FlatList
        data={transactions}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.type}>{item.type.toUpperCase()}</Text>
            <Text>₹{item.amount}</Text>
            <Text>{item.reason}</Text>
            <Text>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, marginBottom: 10 },
  picker: { height: 50, width: "100%" },
  item: { padding: 10, borderBottomWidth: 1 },
  type: { fontWeight: "bold" },
});

export default WalletHistoryScreen;
