import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";

const QRScanner = ({ onScan }) => {
  const handleBarCodeRead = ({ data }) => {
    onScan(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Care Pass</Text>
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeRead}
        captureAudio={false}
      />
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  title: { textAlign: "center", fontSize: 18, marginBottom: 10 },
  camera: {
    flex: 1,
    width: "100%",
    height: 300,
  },
});
