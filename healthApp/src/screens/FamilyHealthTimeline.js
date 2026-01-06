import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Android Emulator → http://10.0.2.2:5000
// Physical Device → http://YOUR_PC_IP:5000
// Production → https://api.yourdomain.com
const API_BASE_URL = 'https://healthcare.bbscart.com/api';

export default function FamilyHealthTimeline() {
  const [showModal, setShowModal] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [members, setMembers] = useState([]);
  const [currentPerson, setCurrentPerson] = useState('');
  const [loading, setLoading] = useState(false);

  const [newEvent, setNewEvent] = useState({
    type: 'Doctor',
    label: '',
    date: '',
    notes: '',
  });

  const selectedMember = members.find(m => m.memberName === currentPerson);

  /* ---------------- AUTH HELPERS ---------------- */
  const getSession = async () => {
    const raw = await AsyncStorage.getItem('bbsUser');
    return raw ? JSON.parse(raw) : null;
  };

  /* ---------------- FETCH TIMELINE ---------------- */
  const loadTimeline = async () => {
    try {
      setLoading(true);
      const session = await getSession();
      if (!session?.token) return;

      const res = await axios.get(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      const data = res.data?.data || [];
      setMembers(data);

      if (data.length > 0) {
        setCurrentPerson(data[0].memberName);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to load family timeline');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimeline();
  }, []);

  /* ---------------- ADD EVENT (API) ---------------- */
  const handleAddEvent = async () => {
    if (!currentPerson) {
      Alert.alert('Select a family member first');
      return;
    }

    try {
      const session = await getSession();
      if (!session?.token) {
        Alert.alert('Auth Error', 'Please login again');
        return;
      }

      const userId = session?.user?.id || session?.user?._id;

      const payload = {
        userId,
        memberName: currentPerson,
        events: [newEvent],
      };

      const res = await axios.post(API_BASE_URL, payload, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });

      setMembers(res.data?.data || []);
      setShowModal(false);
      setNewEvent({
        type: 'Doctor',
        label: '',
        date: '',
        notes: '',
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to save event');
    }
  };

  /* ---------------- DELETE EVENT (ADMIN) ---------------- */
  const handleDeleteEvent = async eventId => {
    try {
      const session = await getSession();
      if (!session?.token) return;

      const res = await axios.delete(
        `${API_BASE_URL}/${encodeURIComponent(currentPerson)}/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        },
      );

      setMembers(res.data?.data || []);
    } catch (err) {
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  const exportTimeline = () => {
    Alert.alert('Export', 'Local export placeholder');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👨‍👩‍👧 Family Health Timeline & Milestones</Text>

      <View style={styles.infoBar}>
        <Text>
          Viewing: <Text style={styles.bold}>{currentPerson}</Text>
        </Text>
        <View style={styles.switchRow}>
          <Text>Admin Mode</Text>
          <Switch value={adminMode} onValueChange={setAdminMode} />
        </View>
      </View>

      <View style={styles.pickerWrapper}>
        <Picker selectedValue={currentPerson} onValueChange={setCurrentPerson}>
          {members.map(m => (
            <Picker.Item
              key={m._id}
              label={m.memberName}
              value={m.memberName}
            />
          ))}
        </Picker>
      </View>

      {selectedMember?.events?.map(event => (
        <View key={event.id} style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{event.label}</Text>
              <Text style={styles.muted}>📅 {event.date}</Text>
              <Text>{event.notes}</Text>
            </View>

            <View>
              <Text style={styles.badge}>{event.type}</Text>
              {adminMode && (
                <TouchableOpacity onPress={() => handleDeleteEvent(event.id)}>
                  <Text style={{ color: 'red', marginTop: 6 }}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ))}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.btnText}>➕ Add Event</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.successBtn} onPress={exportTimeline}>
          <Text style={styles.btnText}>📄 Export</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide">
        <ScrollView style={styles.modal}>
          <Text style={styles.modalTitle}>Add Timeline Event</Text>

          <Text style={styles.label}>Event Type</Text>
          <Picker
            selectedValue={newEvent.type}
            onValueChange={v => setNewEvent({ ...newEvent, type: v })}
          >
            <Picker.Item label="Doctor" value="Doctor" />
            <Picker.Item label="Vaccine" value="Vaccine" />
            <Picker.Item label="Lab" value="Lab" />
            <Picker.Item label="Reminder" value="Reminder" />
            <Picker.Item label="Milestone" value="Milestone" />
            <Picker.Item label="AI Suggestion" value="AI Suggestion" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Label"
            value={newEvent.label}
            onChangeText={t => setNewEvent({ ...newEvent, label: t })}
          />

          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={newEvent.date}
            onChangeText={t => setNewEvent({ ...newEvent, date: t })}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline
            placeholder="Notes"
            value={newEvent.notes}
            onChangeText={t => setNewEvent({ ...newEvent, notes: t })}
          />

          <TouchableOpacity style={styles.successBtn} onPress={handleAddEvent}>
            <Text style={styles.btnText}>Save Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => setShowModal(false)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}

/* STYLES — UNCHANGED */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  muted: { fontSize: 12, color: '#6c757d', marginBottom: 4 },
  bold: { fontWeight: '700' },
  label: { marginTop: 12, marginBottom: 4, fontWeight: '600' },
  infoBar: {
    backgroundColor: '#e9f5ff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  switchRow: { flexDirection: 'row', alignItems: 'center' },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  badge: {
    backgroundColor: '#6c757d',
    color: '#fff',
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  buttonRow: { flexDirection: 'row', marginTop: 12 },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#0d6efd',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  successBtn: {
    flex: 1,
    backgroundColor: '#198754',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryBtn: { marginTop: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  modal: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 8,
  },
});
