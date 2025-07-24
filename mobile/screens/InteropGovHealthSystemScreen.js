// InteropGovHealthSystemMobile.jsx (React Native Version with Backend Integration)

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Modal,
  Alert,
  Platform,
} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/govhealth"; // 🔁 Replace with actual API base

const InteropGovHealthSystemMobile = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [language, setLanguage] = useState("en");
  const [isOffline, setIsOffline] = useState(false);
  const [disasterZone, setDisasterZone] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [syncHistory, setSyncHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [planModalVisible, setPlanModalVisible] = useState(false);

  const checkEligibility = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/eligibility-check`, {
        language,
      });
      setEligibilityResult(res.data.result);
      setAiSuggestion(res.data.suggestion);
      setSyncHistory(prev => [...prev, `Checked eligibility at ${new Date().toLocaleString()}`]);
    } catch (err) {
      Alert.alert("Error", "Failed to check eligibility.");
    }
  };

  const handleConsentToggle = async () => {
    try {
      const action = !consentGiven;
      await axios.post(`${BASE_URL}/consent-toggle`, {
        consent: action,
      });
      setConsentGiven(action);
      setSyncHistory(prev => [
        ...prev,
        `${action ? "Granted" : "Revoked"} consent at ${new Date().toLocaleString()}`
      ]);
    } catch (err) {
      Alert.alert("Error", "Failed to toggle consent.");
    }
  };

  const pickCsvFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'text/csv' });
      if (result.type === 'success') {
        const formData = new FormData();
        formData.append("file", {
          uri: result.uri,
          name: result.name,
          type: 'text/csv',
        });

        await axios.post(`${BASE_URL}/upload-csv`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setCsvFile(result);
        setSyncHistory(prev => [...prev, `CSV uploaded: ${result.name}`]);
      }
    } catch (err) {
      Alert.alert("Upload Failed", "Could not upload CSV.");
    }
  };

  const simulateDisaster = async () => {
    try {
      await axios.post(`${BASE_URL}/disaster-alert`);
      setDisasterZone(true);
      Alert.alert("Disaster Alert", "User in disaster-affected zone. Alert sent to BBSCART & Authorities.");
      setSyncHistory(prev => [...prev, `Disaster alert at ${new Date().toLocaleString()}`]);
    } catch (err) {
      Alert.alert("Error", "Failed to send disaster alert.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Government Health Interoperability</Text>

      {/* Eligibility Checker */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Smart Eligibility Checker</Text>
        <Button title="Check Eligibility" onPress={checkEligibility} />
        {eligibilityResult && (
          <View style={styles.resultBox}>
            <Text>Eligible For: {eligibilityResult.eligibleFor}</Text>
            {eligibilityResult.suggestions.map((s, i) => (
              <Text key={i}>- {s}</Text>
            ))}
          </View>
        )}
        {aiSuggestion && (
          <Text style={styles.suggestion}>🤖 {aiSuggestion}</Text>
        )}
      </View>

      {/* Consent Manager */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Consent Manager</Text>
        <Button
          title={consentGiven ? "Revoke Consent" : "Grant Consent"}
          color={consentGiven ? "red" : "green"}
          onPress={handleConsentToggle}
        />
        <Button title="View Sync History" onPress={() => setModalVisible(true)} />
      </View>

      {/* Linked Plans */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Linked Plans</Text>
        <Button title="View Linked Plans" onPress={() => setPlanModalVisible(true)} />
      </View>

      {/* Language Selector */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Language Preference</Text>
        <Picker selectedValue={language} onValueChange={value => setLanguage(value)}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="हिंदी" value="hi" />
          <Picker.Item label="தமிழ்" value="ta" />
          <Picker.Item label="العربية" value="ar" />
        </Picker>
      </View>

      {/* CSV Upload */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>NGO Bulk CSV Upload</Text>
        <Button title="Pick CSV File" onPress={pickCsvFile} />
        {csvFile && <Text style={styles.uploadedFile}>Uploaded: {csvFile.name}</Text>}
      </View>

      {/* Disaster Simulation */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Disaster Zone Alert</Text>
        <Button title="Simulate Disaster Alert" color="darkred" onPress={simulateDisaster} />
      </View>

      {/* Sync History Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sync History</Text>
          {syncHistory.map((item, idx) => (
            <Text key={idx}>• {item}</Text>
          ))}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* Linked Plans Modal */}
      <Modal visible={planModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Linked Plans Summary</Text>
          <Text>🟢 Government Plan: Ayushman Bharat</Text>
          <Text>🟡 BBSCART Plan: Basic (OPD + Labs)</Text>
          <Text>🔁 Suggestion: Upgrade to Premium+ for IPD/Surgery</Text>
          <Button title="Close" onPress={() => setPlanModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 15, borderRadius: 10, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  resultBox: { marginTop: 10, backgroundColor: '#e0f7fa', padding: 10, borderRadius: 6 },
  suggestion: { marginTop: 10, fontStyle: 'italic', color: '#333' },
  uploadedFile: { marginTop: 8, color: '#007bff' },
  modalContent: { flex: 1, padding: 20, backgroundColor: '#fff' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default InteropGovHealthSystemMobile;
