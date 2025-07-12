import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Linking, StyleSheet } from 'react-native';
import axios from 'axios';

const HealthIDCardScreen = () => {
  const [qr, setQr] = useState(null);

  useEffect(() => {
    axios
      .get('https://yourdomain.com/api/qr/my-health-id')
      .then(res => setQr(res.data));
  }, []);

  if (!qr) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digital Health ID</Text>
      <Image source={{ uri: qr.imageUrl }} style={styles.qr} />
      <Button
        title="View Profile"
        onPress={() => Linking.openURL(qr.qrString)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  qr: { width: 200, height: 200, marginBottom: 15 },
});

export default HealthIDCardScreen;
