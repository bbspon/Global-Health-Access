// PharmacyIntegrationScreen.js (React Native version)
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Button,
  TextInput,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const mockPrescriptions = [
  {
    id: 'RX-001',
    patient: 'Aarav Sharma',
    doctor: 'Dr. Meera Rao',
    date: '2025-07-09',
    status: 'Delivered',
    meds: ['Pantoprazole', 'Isotretinoin'],
    deliveryPartner: 'PharmEasy'
  }
];

const PharmacyIntegrationScreen = () => {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [refillEnabled, setRefillEnabled] = useState(false);
  const [alertEnabled, setAlertEnabled] = useState(false);

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*']
    });

    if (result?.assets?.length > 0) {
      const file = result.assets[0];
      const newPrescription = {
        id: `RX-${Date.now()}`,
        patient: 'External Upload',
        doctor: 'Unknown',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending Scan',
        meds: [file.name.replace(/\.[^/.]+$/, '')],
        deliveryPartner: 'Not Assigned'
      };
      setPrescriptions([newPrescription, ...prescriptions]);
      Alert.alert('Upload Success', `Prescription '${file.name}' added.`);
    }
  };

  const handleRefillUpdate = () => {
    Alert.alert(
      'Refill Settings Updated',
      `Refill: ${refillEnabled ? 'ON' : 'OFF'}\nAlert: ${alertEnabled ? 'ON' : 'OFF'}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>💊 Pharmacy Integration</Text>

        <Text style={styles.sectionTitle}>📋 All Prescriptions</Text>
        <FlatList
          data={prescriptions}
          keyExtractor={(item) => item.id}
          style={styles.table}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.id}</Text>
              <Text style={styles.cell}>{item.patient}</Text>
              <Text style={styles.cell}>{item.date}</Text>
              <Text style={styles.cell}>{item.meds.join(', ')}</Text>
              <Text style={styles.cell}>{item.status}</Text>
              <Text style={styles.cell}>{item.deliveryPartner}</Text>
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>📤 Upload External Prescription</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleFileUpload}>
          <Text style={styles.uploadText}>Select File & Upload</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>⚙️ Auto-Refill Settings</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Enable Refill:</Text>
          <Switch value={refillEnabled} onValueChange={setRefillEnabled} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>25 Day Inactivity Alert:</Text>
          <Switch value={alertEnabled} onValueChange={setAlertEnabled} />
        </View>

        <View style={{ marginTop: 10 }}>
          <Button title="Update Settings" onPress={handleRefillUpdate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8
  },
  table: {
    marginBottom: 10
  },
  row: {
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5
  },
  cell: {
    fontSize: 14,
    marginBottom: 2
  },
  uploadBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    alignItems: 'center',
    borderRadius: 6
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8
  },
  switchLabel: {
    fontSize: 16
  }
});

export default PharmacyIntegrationScreen;