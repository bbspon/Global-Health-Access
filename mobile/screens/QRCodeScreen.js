import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QRCodeScreen = () => {
  const [qr, setQr] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchQR = async () => {
      const token = await AsyncStorage.getItem('token');

      axios
        .get('http://localhost:5000/api/user/qr', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setQr(res.data.qr);
          setInfo(res.data.info);
        })
        .catch((err) => console.error('Failed to load QR', err));
    };

    fetchQR();
  }, []);

  if (!qr) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Health Access QR</Text>
      <Image source={{ uri: qr }} style={styles.qrImage} />
      <Text>Plan: {info.planName}</Text>
      <Text>Valid Until: {new Date(info.endDate).toDateString()}</Text>
      <Text>Txn ID: {info.transactionId}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  qrImage: { width: 200, height: 200, marginBottom: 20 },
});

export default QRCodeScreen;
