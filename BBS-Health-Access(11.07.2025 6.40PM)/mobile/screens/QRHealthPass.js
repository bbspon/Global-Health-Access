// QRHealthPass.js — React Native version
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, FlatList, Modal, TouchableOpacity, Switch } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function QRHealthPass() {
  const [qrToken, setQrToken] = useState('');
  const [showQR, setShowQR] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [scanLocation, setScanLocation] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const mockPlan = {
    userName: "Ravi Kumar",
    planName: "Premium Multi-City OPD + IPD",
    planStatus: "Active",
    expiryDate: "2025-12-31",
    usage: { opd: 3, ipd: 1, lab: 2 },
    walletBalance: 230.5,
    multiCity: true,
    emergencyAccess: true,
    guardianMode: true,
    nfcEnabled: false,
    faceIdEnabled: false,
  };

  const scanHistory = [
    { id: '1', hospital: 'Apollo Delhi', time: '2025-07-10 10:03 AM', result: 'Access Granted' },
    { id: '2', hospital: 'Manipal Bangalore', time: '2025-06-24 2:40 PM', result: 'Access Granted' },
  ];

  const generateToken = () => {
    const payload = {
      userId: 'USER123',
      planId: 'PLAN789',
      timestamp: Date.now(),
    };
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  };

  useEffect(() => {
    setQrToken(generateToken());
    const interval = setInterval(() => {
      setQrToken(generateToken());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const simulateScan = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = `Lat: ${pos.coords.latitude.toFixed(3)}, Lon: ${pos.coords.longitude.toFixed(3)}`;
          setScanLocation(loc);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
        },
        () => {
          setScanLocation("Location unavailable");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
        }
      );
    } else {
      setScanLocation("Geolocation not supported");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My BBSCART QR Health Pass</Text>
      <Text style={styles.subtitle}>{mockPlan.userName} — {mockPlan.planName}</Text>
      <Text>Status: {mockPlan.planStatus}</Text>

      <View style={styles.qrBox}>
        {showQR ? <QRCode value={qrToken} size={180} /> : <Text>🔒 QR Hidden</Text>}
      </View>
      <Switch value={showQR} onValueChange={() => setShowQR(!showQR)} />
      <Text>{showQR ? "Hide QR" : "Show QR"}</Text>

      <Text style={styles.sectionTitle}>Plan Details</Text>
      <Text>Expiry: {mockPlan.expiryDate}</Text>
      <Text>OPD Left: {mockPlan.usage.opd} | IPD Left: {mockPlan.usage.ipd} | Lab Left: {mockPlan.usage.lab}</Text>
      <Text>Wallet Balance: ₹{mockPlan.walletBalance.toFixed(2)}</Text>
      <Text>Multi-City: {mockPlan.multiCity ? "✅" : "❌"} | Emergency: {mockPlan.emergencyAccess ? "✅" : "❌"}</Text>

      <View style={styles.buttonRow}>
        <Button title="Simulate Scan" onPress={simulateScan} />
        <Button title="Guardian Mode" color="orange" onPress={() => setShowModal(true)} />
      </View>

      {showAlert && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>✅ Scan at Apollo Hospital
            {scanLocation && `\n📍 ${scanLocation}`}
          </Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Scan History</Text>
      <FlatList
        data={scanHistory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>✅ {item.hospital} - {item.time} - {item.result}</Text>
        )}
      />

      <Modal visible={showModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={{ fontWeight: 'bold' }}>Guardian Mode</Text>
            <Text>Access for:</Text>
            <Text>- Aryan Kumar (Child)</Text>
            <Text>- Meera Devi (Senior)</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={{ marginTop: 10, color: 'blue' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 10 },
  qrBox: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', padding: 10, marginVertical: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 10 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' },
  modalBox: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  alertBox: { padding: 10, backgroundColor: '#d1e7dd', marginVertical: 10, borderRadius: 5 },
  alertText: { color: '#0f5132' },
});