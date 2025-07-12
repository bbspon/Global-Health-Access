import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const QRCodeScreen = () => {
  const [qrData, setQrData] = useState('');
  const qrRef = useRef();

  useEffect(() => {
    axios
      .get('https://yourdomain.com/api/user-qr')
      .then(res => setQrData(res.data.qrCode))
      .catch(() => {});
  }, []);

  const handleDownload = async () => {
    if (!qrRef.current) return;

    qrRef.current.toDataURL(data => {
      let fileUri = FileSystem.documentDirectory + 'health-qr.png';
      FileSystem.writeAsStringAsync(fileUri, data, {
        encoding: FileSystem.EncodingType.Base64,
      }).then(() => Sharing.shareAsync(fileUri));
    });
  };

  if (!qrData)
    return (
      <Text style={styles.warning}>QR not available. Activate your plan.</Text>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Health QR Code</Text>
      <View style={styles.qrBox}>
        <QRCode value={qrData} size={200} getRef={qrRef} />
        <Text style={styles.note}>
          Use this QR at hospitals, labs, or pharmacies.
        </Text>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.btnPrimary} onPress={handleDownload}>
          <Text style={styles.btnText}>Download QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.btnText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  qrBox: { marginBottom: 20, alignItems: 'center' },
  note: { marginTop: 10, color: '#666', fontSize: 13 },
  btnGroup: { flexDirection: 'row', gap: 10 },
  btnPrimary: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: '#007bff',
    padding: 12,
    borderRadius: 6,
  },
  btnText: { color: '#fff', fontWeight: '600' },
  warning: { marginTop: 20, color: 'red' },
});

export default QRCodeScreen;
