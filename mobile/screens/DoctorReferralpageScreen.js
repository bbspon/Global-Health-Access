import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  CheckBox
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const specialists = [
  { id: 1, name: 'Dr. Latha (Dermatologist)', language: 'English' },
  { id: 2, name: 'Dr. Vikram (Cardiologist)', language: 'Hindi' },
  { id: 3, name: 'Dr. Noor (Nutritionist)', language: 'Arabic' }
];

export default function DoctorReferralScreen() {
  const [referral, setReferral] = useState({
    doctors: [],
    reason: '',
    notes: '',
    file: null,
    priority: 'Routine',
    language: '',
    consent: false
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);

  const toggleDoctor = (doctorName) => {
    const newDoctors = referral.doctors.includes(doctorName)
      ? referral.doctors.filter((d) => d !== doctorName)
      : [...referral.doctors, doctorName];
    setReferral({ ...referral, doctors: newDoctors });
  };

  const handleFileUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setReferral({ ...referral, file: result.assets[0] });
    }
  };

  const sendReferral = () => {
    setModalVisible(false);
    setSubmitted(true);
  };

  const sendWhatsApp = () => {
    setWhatsappSent(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📤 Issue Referral</Text>

      <Text style={styles.label}>Select Specialist(s):</Text>
      {specialists.map((doc) => (
        <TouchableOpacity
          key={doc.id}
          style={referral.doctors.includes(doc.name) ? styles.selected : styles.option}
          onPress={() => toggleDoctor(doc.name)}
        >
          <Text>{doc.name} - {doc.language}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Referral Priority:</Text>
      {['Routine', 'Urgent', 'Critical'].map((level) => (
        <TouchableOpacity
          key={level}
          style={referral.priority === level ? styles.selected : styles.option}
          onPress={() => setReferral({ ...referral, priority: level })}
        >
          <Text>{level}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Preferred Language:</Text>
      {['', 'English', 'Hindi', 'Arabic'].map((lang) => (
        <TouchableOpacity
          key={lang}
          style={referral.language === lang ? styles.selected : styles.option}
          onPress={() => setReferral({ ...referral, language: lang })}
        >
          <Text>{lang === '' ? 'Any' : lang}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.label}>Reason for Referral:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Cardiac Checkup"
        value={referral.reason}
        onChangeText={(text) => setReferral({ ...referral, reason: text })}
      />

      <Text style={styles.label}>Clinical Notes:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Patient history, findings..."
        multiline
        value={referral.notes}
        onChangeText={(text) => setReferral({ ...referral, notes: text })}
      />

      <Button title="Attach File" onPress={handleFileUpload} />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={referral.consent}
          onValueChange={(val) => setReferral({ ...referral, consent: val })}
        />
        <Text style={styles.checkboxLabel}>I have obtained patient consent</Text>
      </View>

      <Button
        title="Send Referral"
        onPress={() => setModalVisible(true)}
        disabled={!referral.consent || referral.doctors.length === 0}
      />

      {/* Confirmation Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold' }}>Confirm Referral</Text>
            <Text>To: {referral.doctors.join(', ')}</Text>
            <Text>Reason: {referral.reason}</Text>
            <Text>Priority: {referral.priority}</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Confirm" onPress={sendReferral} />
            </View>
          </View>
        </View>
      </Modal>

      {submitted && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✅ Referral Sent to {referral.doctors.join(', ')}</Text>
          <Button title="📲 Send WhatsApp Summary" onPress={sendWhatsApp} />
        </View>
      )}

      {whatsappSent && (
        <View style={styles.infoBox}>
          <Text>✅ WhatsApp Summary sent to patient (simulated)</Text>
        </View>
      )}

      {submitted && (
        <View style={styles.warningBox}>
          <Text>⚠️ SLA Warning: Specialist hasn't responded in 24h</Text>
        </View>
      )}

      {submitted && (
        <View style={styles.qrBox}>
          <Text>📎 QR Code Placeholder</Text>
          <View style={styles.qrPlaceholder}>
            <Text>[🔳 Simulated QR]</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  label: { marginTop: 15, fontWeight: 'bold' },
  input: { borderBottomWidth: 1, padding: 5, marginBottom: 10 },
  textarea: { borderWidth: 1, padding: 10, height: 80, textAlignVertical: 'top', marginBottom: 10 },
  option: { padding: 8, backgroundColor: '#eee', marginVertical: 4 },
  selected: { padding: 8, backgroundColor: '#cce', marginVertical: 4 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  checkboxLabel: { marginLeft: 8 },
  modalOverlay: { flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' },
  modalContent: { backgroundColor: '#fff', margin: 30, padding: 20, borderRadius: 8 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  successBox: { backgroundColor: '#d4edda', padding: 10, marginTop: 15 },
  successText: { fontWeight: 'bold', color: 'green' },
  infoBox: { backgroundColor: '#e7f1ff', padding: 10, marginTop: 10 },
  warningBox: { backgroundColor: '#fff3cd', padding: 10, marginTop: 10 },
  qrBox: { marginTop: 20, alignItems: 'center' },
  qrPlaceholder: { marginTop: 10, borderWidth: 1, padding: 20, borderStyle: 'dashed' }
});
