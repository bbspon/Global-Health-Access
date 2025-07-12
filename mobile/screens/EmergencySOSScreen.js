import React, { useState } from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const EmergencySOSScreen = () => {
  const [hospital, setHospital] = useState(null);

  const triggerSOS = () => {
    Geolocation.getCurrentPosition(async info => {
      const res = await axios.post(
        'https://yourdomain.com/api/emergency/trigger',
        {
          lat: info.coords.latitude,
          lng: info.coords.longitude,
          address: 'Mobile user location',
        },
      );

      setHospital(res.data.hospital);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      <Button title="Trigger SOS" color="red" onPress={triggerSOS} />

      {hospital && (
        <View style={styles.card}>
          <Text style={styles.sub}>Nearest Hospital: {hospital.name}</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL(`tel:${hospital.phone}`)}
          >
            Call Now: {hospital.phone}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
  },
  sub: { fontSize: 16, fontWeight: '600' },
  link: { color: 'blue', textDecorationLine: 'underline', marginTop: 5 },
});

export default EmergencySOSScreen;
