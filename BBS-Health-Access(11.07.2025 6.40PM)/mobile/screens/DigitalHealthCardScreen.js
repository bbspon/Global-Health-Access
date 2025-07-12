import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Button, ScrollView, Alert
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const DigitalHealthCardScreen = () => {
  const [qrValue, setQrValue] = useState("");
  const [refreshed, setRefreshed] = useState(false);

  const userInfo = {
    name: "Rajesh Kumar",
    tier: "Premium",
    expiry: "2025-12-31",
    city: "Chennai",
    state: "Tamil Nadu",
    status: "Active",
    coverage: { opd: 6, ipd: 2, labs: 4 }
  };

  useEffect(() => {
    const refreshQR = () => {
      const token = `${userInfo.name}-${userInfo.tier}-${Date.now()}`;
      setQrValue(token);
      setRefreshed(true);
    };
    refreshQR();
    const interval = setInterval(refreshQR, 1000 * 60 * 60 * 48);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    Alert.alert("Feature Coming Soon", "Download to Wallet or PDF not available in this build.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>🆔 Your Digital Health Card</Text>
      <QRCode value={qrValue} size={200} />
      <Text style={styles.name}>{userInfo.name}</Text>
      <Text style={styles.tier}>Tier: {userInfo.tier}</Text>
      <Text>Status: {userInfo.status}</Text>
      <Text>Expires: {userInfo.expiry}</Text>
      <View style={styles.coverage}>
        <Text>Coverage:</Text>
        <Text>• OPD: {userInfo.coverage.opd}</Text>
        <Text>• IPD: {userInfo.coverage.ipd}</Text>
        <Text>• Labs: {userInfo.coverage.labs}</Text>
      </View>
      <Text>City: {userInfo.city}, {userInfo.state}</Text>
      {refreshed && <Text style={styles.refreshed}>QR Refreshed. Valid 48h</Text>}
      <View style={styles.button}>
        <Button title="Download as PDF / Wallet" onPress={handleDownload} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center", backgroundColor: "#fff" },
  heading: { fontSize: 20, marginBottom: 20 },
  name: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  tier: { fontSize: 16 },
  coverage: { marginTop: 15, marginBottom: 10 },
  refreshed: { color: "green", marginTop: 10 },
  button: { marginTop: 20, width: "100%" }
});

export default DigitalHealthCardScreen;
