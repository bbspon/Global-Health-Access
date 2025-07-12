import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Alert, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Card, Button, RadioButton, Checkbox, TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Mock data fetchers
const fetchPassportData = async () => ({
  name: 'Jane Doe',
  planId: 'BP-3221',
  lang: 'English',
  conditions: ['Diabetes', 'Hypertension'],
  meds: ['Metformin', 'Amlodipine'],
  allergies: ['Penicillin'],
  lastVisit: '2025-06-15',
});

const fetchDocuments = async () => [
  { id: 'd1', name: 'Vaccination.pdf', type: 'Vaccination' },
  { id: 'd2', name: 'LabReport.pdf', type: 'Lab Report' },
];

export default function HealthPassportExportSystem() {
  const [passport, setPassport] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState({
    history: 'all',
    includeSensitive: true,
    country: 'uae',
  });
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    (async () => {
      setPassport(await fetchPassportData());
      setDocuments(await fetchDocuments());
    })();
  }, []);

  const handleExport = (type) => {
    Alert.alert(`Exporting ${type}`, `Filters:
Country: ${filters.country}
History: ${filters.history}
Sensitive: ${filters.includeSensitive ? 'Yes' : 'Filtered'}`);
  };

  const previewDocument = (name) => {
    Alert.alert('Preview', `Simulating preview for: ${name}`);
  };

  const downloadDocument = async (name) => {
    const uri = `${FileSystem.documentDirectory}${name}`;
    await FileSystem.writeAsStringAsync(uri, 'Mock PDF content here');
    await Sharing.shareAsync(uri);
  };

  if (!passport) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌍 BBSCART Health Passport</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>QR Code</Text>
        <QRCode
          value={`${passport.planId}|${passport.name}`}
          size={180}
        />
        <Text style={styles.info}><Text style={styles.bold}>ID:</Text> {passport.planId}</Text>
        <Text style={styles.info}><Text style={styles.bold}>Name:</Text> {passport.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passport Summary</Text>
        <Text><Text style={styles.bold}>Conditions:</Text> {passport.conditions.join(', ')}</Text>
        <Text><Text style={styles.bold}>Medications:</Text> {passport.meds.join(', ')}</Text>
        <Text><Text style={styles.bold}>Allergies:</Text> {passport.allergies.join(', ')}</Text>
        <Text><Text style={styles.bold}>Last Visit:</Text> {passport.lastVisit}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Export Filters</Text>

        <Text style={styles.label}>Visit History:</Text>
        <RadioButton.Group
          onValueChange={value => setFilters({ ...filters, history: value })}
          value={filters.history}
        >
          <RadioButton.Item label="Full History" value="all" />
          <RadioButton.Item label="OPD Only" value="opd" />
          <RadioButton.Item label="Emergency Only" value="emergency" />
        </RadioButton.Group>

        <Checkbox.Item
          label="Hide Sensitive Info"
          status={!filters.includeSensitive ? 'checked' : 'unchecked'}
          onPress={() => setFilters({ ...filters, includeSensitive: !filters.includeSensitive })}
        />

        <TextInput
          label="Country Format"
          value={filters.country}
          onChangeText={(text) => setFilters({ ...filters, country: text })}
          mode="outlined"
          style={{ marginTop: 8 }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Export Options</Text>
        <Button mode="contained" onPress={() => handleExport('PDF')} style={styles.exportBtn}>Export PDF</Button>
        <Button mode="contained" onPress={() => handleExport('FHIR')} style={styles.exportBtn}>FHIR JSON</Button>
        <Button mode="contained" onPress={() => handleExport('ZIP')} style={styles.exportBtn}>Offline ZIP</Button>
        <Button mode="contained" onPress={() => handleExport('Link')} style={styles.exportBtn}>Secure Share Link</Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📎 Medical Documents</Text>
        {documents.map((doc) => (
          <Card key={doc.id} style={{ marginVertical: 8 }}>
            <Card.Title title={doc.name} subtitle={doc.type} />
            <Card.Actions>
              <Button onPress={() => previewDocument(doc.name)}>Preview</Button>
              <Button onPress={() => downloadDocument(doc.name)}>Download</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>

      <Button onPress={() => setShowSummary(true)} mode="outlined" style={{ marginTop: 20 }}>🧠 View AI Summary</Button>

      <Modal visible={showSummary} animationType="slide">
        <ScrollView style={{ padding: 20 }}>
          <Text style={styles.sectionTitle}>🧠 AI Health Summary</Text>
          <Text>Conditions: {passport.conditions.join(', ')}</Text>
          <Text>Medications: {passport.meds.join(', ')}</Text>
          <Text>Allergies: {passport.allergies.join(', ')}</Text>
          <Text>Last Visit: {passport.lastVisit}</Text>

          <Text style={{ marginTop: 20 }}>💡 Use Cases:</Text>
          <Text>🛃 Immigration / Embassy Format</Text>
          <Text>🚑 Emergency Flash Summary</Text>
          <Text>🎓 Student Visa Records</Text>
          <Text>🛫 Medical Tourism Upload</Text>
          <Text>🔐 OTP-based Secure Share</Text>

          <Button mode="contained" onPress={() => setShowSummary(false)} style={{ marginTop: 20 }}>Close</Button>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  section: { marginVertical: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  info: { marginTop: 4 },
  bold: { fontWeight: 'bold' },
  exportBtn: { marginVertical: 4 },
  label: { marginTop: 8, fontWeight: 'bold' }
});
