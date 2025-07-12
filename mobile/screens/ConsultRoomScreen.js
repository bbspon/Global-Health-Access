import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

export default function ConsultRoomScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👩‍⚕️ Video Consultation</Text>
      <View style={styles.videoBox}><Text>Video Stream Here (WebRTC)</Text></View>
      <Button title="Send Message" onPress={() => alert("Chat message sent")} />
      <Button title="End Consult" color="red" onPress={() => alert("Consult ended & saved")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  videoBox: { height: 250, backgroundColor: "#ccc", justifyContent: "center", alignItems: "center", marginBottom: 20 },
});
