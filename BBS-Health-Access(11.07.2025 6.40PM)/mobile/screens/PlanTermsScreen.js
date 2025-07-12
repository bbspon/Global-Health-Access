import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";

const PlanTermsScreen = ({ navigation, route }) => {
  const [accepted, setAccepted] = useState(false);
  const [signature, setSignature] = useState("");

  const termsText = route?.params?.termsText || "Insert your region-specific Terms & Conditions here...";
  const version = route?.params?.version || "v1.0";

  const handleAccept = () => {
    if (!accepted || !signature.trim()) {
      Alert.alert("Incomplete", "Please accept the terms and sign your name.");
      return;
    }

    const consentData = {
      signature,
      timestamp: new Date().toISOString(),
      version,
      device: Platform.OS,
      ipAddress: "FETCH_ON_SERVER",
    };

    console.log("Consent Submitted:", consentData);
    // TODO: Send consentData to backend API
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.termsBox}>
        <Text style={styles.title}>Terms of Service (Version {version})</Text>
        <Text style={styles.termsText}>{termsText}</Text>
      </ScrollView>

      <View style={styles.checkboxRow}>
        <CheckBox
          value={accepted}
          onValueChange={setAccepted}
          tintColors={{ true: "#28a745", false: "#aaa" }}
        />
        <Text style={styles.checkboxLabel}>I have read and agree to the above terms</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Type your full name as signature"
        value={signature}
        onChangeText={setSignature}
        autoCapitalize="words"
      />

      <TouchableOpacity
        style={[styles.button, !(accepted && signature.trim()) && styles.buttonDisabled]}
        onPress={handleAccept}
        disabled={!(accepted && signature.trim())}
      >
        <Text style={styles.buttonText}>Accept & Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlanTermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  termsBox: {
    flex: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  termsText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 15,
    color: "#444",
    flex: 1,
    flexWrap: "wrap",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#b0c4b1",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
