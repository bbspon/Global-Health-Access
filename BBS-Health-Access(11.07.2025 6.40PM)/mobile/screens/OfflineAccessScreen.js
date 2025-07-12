// File: OfflineAccessScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const OfflineAccessScreen = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [syncStatus, setSyncStatus] = useState('offline');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
      if (!state.isConnected) {
        setSyncStatus('offline');
      } else {
        setSyncStatus('online');
      }
    });
    return () => unsubscribe();
  }, []);

  const triggerSOS = () => {
    setSosSent(true);
    Alert.alert("🚨 SOS Triggered", "Location & timestamp saved. Will sync when online.");
  };

  const simulateScan = () => {
    Alert.alert("✅ QR Scan Success", "Patient: John Doe / ID: 1020");
  };

  const simulatePrintToken = () => {
    Alert.alert("🖨️ Token Printed", "OPD Token: #045");
  };

  const simulateUsbSync = () => {
    Alert.alert("🔌 USB Sync", "USB Sync started...");
    setTimeout(() => {
      Alert.alert("✅ USB Sync Complete", "Data successfully transferred.");
    }, 2000);
  };

  const simulateSync = () => {
    setSyncStatus('syncing');
    Alert.alert("🔄 Syncing", "Attempting to sync...");
    setTimeout(() => {
      setSyncStatus('online');
      Alert.alert("✅ Sync Complete", "Data synced successfully.");
    }, 2500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🛰️ BBSCART Emergency Toolkit</Text>

      {isOffline && (
        <Text style={styles.offlineAlert}>⚠️ No Internet - Offline Mode Active</Text>
      )}

      <View style={styles.card}>
        <Text style={styles.label}>📄 Cached Health Card</Text>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Health Card", "John Doe / ID: 1020")}>
          <Text style={styles.buttonText}>Show Card</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📍 Trigger SOS</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#cc0000' }]} onPress={triggerSOS}>
          <Text style={styles.buttonText}>Activate SOS</Text>
        </TouchableOpacity>
        {sosSent && <Text style={styles.success}>✓ SOS Cached</Text>}
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📸 Offline QR Check-In</Text>
        <TouchableOpacity style={styles.button} onPress={simulateScan}>
          <Text style={styles.buttonText}>Simulate QR Scan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🖨️ Print OPD Token</Text>
        <TouchableOpacity style={styles.button} onPress={simulatePrintToken}>
          <Text style={styles.buttonText}>Print Token</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🔌 USB Manual Sync</Text>
        <TouchableOpacity style={styles.button} onPress={simulateUsbSync}>
          <Text style={styles.buttonText}>Start USB Sync</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🔄 Sync Status: 
          <Text style={{
            color: syncStatus === 'online' ? 'green' : syncStatus === 'syncing' ? 'orange' : 'gray'
          }}> {syncStatus}</Text>
        </Text>
        <TouchableOpacity style={styles.buttonOutline} onPress={simulateSync}>
          <Text style={styles.buttonText}>Force Sync</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OfflineAccessScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  offlineAlert: {
    color: '#cc0000',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonOutline: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600'
  },
  success: {
    color: 'green',
    marginTop: 8,
  }
});
