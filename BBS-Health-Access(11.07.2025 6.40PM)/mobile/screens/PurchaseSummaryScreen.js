import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Linking,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const PurchaseSummaryScreen = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get('https://yourdomain.com/api/user/my-plans')
      .then(res => setPlans(res.data));
  }, []);

  const downloadInvoice = id => {
    const url = `https://yourdomain.com/api/invoice/${id}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={plans}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.planId.title}</Text>
            <Text>
              ₹{item.pricePaid} | {item.paymentMethod}
            </Text>
            <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
            <Button
              title="Download Invoice"
              onPress={() => downloadInvoice(item._id)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
});

export default PurchaseSummaryScreen;
