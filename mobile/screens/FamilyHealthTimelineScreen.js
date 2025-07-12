// FamilyHealthTimelineScreen.js — React Native Version (Converted from React Web with Bootstrap)

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
  Switch,
  Platform
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const dummyMembers = [
  {
    name: 'Rajesh (Self)',
    events: [
      { type: 'Doctor', label: '👨‍⚕️ Dr. Mehta – ENT', date: '2024-01-18', notes: 'Throat infection', attachment: null },
      { type: 'Lab', label: '🧪 Thyroid Test', date: '2024-02-10', notes: 'Normal', attachment: null },
      { type: 'AI Suggestion', label: '🔁 Yearly Thyroid Test Recommended', date: '2025-01-10', notes: 'Based on last Jan test', attachment: null },
    ]
  },
  {
    name: 'Kavya (Child)',
    events: [
      { type: 'Vaccine', label: '💉 MMR Booster', date: '2024-03-05', notes: 'Apollo Hospital', attachment: null },
      { type: 'Milestone', label: '🦷 First Dental Visit', date: '2024-06-10', notes: 'Cavity Check', attachment: null },
      { type: 'Reminder', label: '👶 Next Growth Checkup Due', date: '2025-08-10', notes: 'Growth chart update', attachment: null },
    ]
  }
];

export default function FamilyHealthTimelineScreen() {
  const [members, setMembers] = useState(dummyMembers);
  const [currentPerson, setCurrentPerson] = useState('Rajesh (Self)');
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ type: 'Doctor', label: '', date: '', notes: '', attachment: null });
  const [adminMode, setAdminMode] = useState(false);

  const addEvent = () => {
    const updated = members.map(member => {
      if (member.name === currentPerson) {
        return { ...member, events: [...member.events, newEvent] };
      }
      return member;
    });
    setMembers(updated);
    setNewEvent({ type: 'Doctor', label: '', date: '', notes: '', attachment: null });
    setShowModal(false);
    Alert.alert('Success', 'Event Added');
  };

  const exportTimeline = async () => {
    const member = members.find(m => m.name === currentPerson);
    let content = `Timeline for ${member.name}\n\n`;
    member.events.forEach(e => {
      content += `${e.date} - ${e.label} - ${e.notes}\n`;
    });
    const fileUri = FileSystem.documentDirectory + `${currentPerson.replace(/\s/g, '_')}_timeline.txt`;
    await FileSystem.writeAsStringAsync(fileUri, content);
    await Sharing.shareAsync(fileUri);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>👨‍👩‍👧 Family Health Timeline & Milestones</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Viewing: {currentPerson}</Text>
        <Switch value={adminMode} onValueChange={setAdminMode} />
      </View>

      <View style={styles.memberSwitcher}>
        {members.map(m => (
          <TouchableOpacity key={m.name} onPress={() => setCurrentPerson(m.name)}>
            <Text style={[styles.memberTab, currentPerson === m.name && styles.activeTab]}>{m.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {members.find(m => m.name === currentPerson)?.events.map((event, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.eventLabel}>{event.label}</Text>
          <Text style={styles.date}>📅 {event.date}</Text>
          <Text>{event.notes}</Text>
          {event.attachment && <Text style={styles.attachment}>📎 {event.attachment.name}</Text>}
          <Text style={styles.badge}>{event.type}</Text>
        </View>
      ))}

      <Button title="➕ Add Event" onPress={() => setShowModal(true)} />
      <View style={{ marginTop: 10 }}>
        <Button title="📄 Export as PDF" onPress={exportTimeline} color="green" />
      </View>

      <Modal visible={showModal} animationType="slide">
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalHeader}>Add Event</Text>

          <TextInput placeholder="Event Type (Doctor, Vaccine...)" style={styles.input} value={newEvent.type} onChangeText={t => setNewEvent({ ...newEvent, type: t })} />
          <TextInput placeholder="Label" style={styles.input} value={newEvent.label} onChangeText={t => setNewEvent({ ...newEvent, label: t })} />
          <TextInput placeholder="Date (YYYY-MM-DD)" style={styles.input} value={newEvent.date} onChangeText={t => setNewEvent({ ...newEvent, date: t })} />
          <TextInput placeholder="Notes" style={styles.input} value={newEvent.notes} onChangeText={t => setNewEvent({ ...newEvent, notes: t })} multiline />

          <Button title="Save Event" onPress={addEvent} />
          <Button title="Cancel" onPress={() => setShowModal(false)} color="gray" />
        </ScrollView>
      </Modal>

      {adminMode && (
        <View style={styles.adminPanel}>
          <Text style={styles.section}>📊 Admin Dashboard</Text>
          {members.map((m) => (
            <View key={m.name} style={styles.metricCard}>
              <Text style={styles.bold}>{m.name}</Text>
              <Text>Total Events: {m.events.length}</Text>
              <Text>Doctor Visits: {m.events.filter(e => e.type === 'Doctor').length}</Text>
              <Text>Reminders: {m.events.filter(e => e.type === 'Reminder').length}</Text>
              <Text>AI Suggestions: {m.events.filter(e => e.type === 'AI Suggestion').length}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  section: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  memberSwitcher: { flexDirection: 'row', marginBottom: 15, flexWrap: 'wrap' },
  memberTab: { marginRight: 10, padding: 6, backgroundColor: '#eee', borderRadius: 10 },
  activeTab: { backgroundColor: '#bdf' },
  card: { padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  eventLabel: { fontWeight: 'bold' },
  date: { color: 'gray' },
  badge: { marginTop: 5, fontSize: 12, color: '#555', fontStyle: 'italic' },
  attachment: { color: 'blue', marginTop: 5 },
  modalContent: { padding: 20, marginTop: Platform.OS === 'android' ? 30 : 60 },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  adminPanel: { marginTop: 20 },
  metricCard: { backgroundColor: '#eef', padding: 10, borderRadius: 6, marginBottom: 10 },
  bold: { fontWeight: 'bold' },
  label: { fontWeight: 'bold' }
});
