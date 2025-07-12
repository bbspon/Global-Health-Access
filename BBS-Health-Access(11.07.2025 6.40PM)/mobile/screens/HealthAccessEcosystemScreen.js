// ✅ React Native Version — Health Access Interlink (DROP BLOCK 039)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

export default function HealthAccessEcosystemMobile() {
  const [wallet] = useState(1250);
  const [cashback] = useState(150);
  const [plan] = useState('Basic Care Plan');
  const [showCoach, setShowCoach] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBookAppointment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('✅ Appointment booked!');
    }, 1000);
  };

  const handleCoachSubmit = () => {
    if (query.trim()) {
      Alert.alert('🤖 AI Coach', `Tip for you: Stay active and hydrated for better health.`);
      setQuery('');
      setShowCoach(false);
    }
  };

  const handleExplore = (title) => {
    Alert.alert('Coming Soon', `Explore: ${title}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🏥 BBSCART Health Access</Text>
      <View style={styles.card}>
        <Text style={styles.plan}>Plan: {plan}</Text>
        <Text style={styles.wallet}>Wallet ₹{wallet} | Cashback ₹{cashback}</Text>
        <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
          <Text style={styles.buttonText}>{loading ? 'Booking...' : 'Book Appointment'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.coachButton} onPress={() => setShowCoach(true)}>
          <Ionicons name="md-chatbox-ellipses" size={20} color="#fff" />
          <Text style={styles.coachText}> Ask AI Coach</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {features.map((f, index) => (
          <TouchableOpacity key={index} style={styles.featureBox} onPress={() => handleExplore(f.title)}>
            <AntDesign name={f.icon} size={24} color="#444" />
            <Text style={styles.featureText}>{f.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={showCoach} animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>🤖 Ask AI Health Coach</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. How to manage stress?"
            value={query}
            onChangeText={setQuery}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleCoachSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const features = [
  { icon: 'wallet', title: 'Wallet' },
  { icon: 'gift', title: 'Gift Plan' },
  { icon: 'hearto', title: 'Nearby Labs' },
  { icon: 'shoppingcart', title: 'Health Shop' },
  { icon: 'rocket1', title: 'Priority Delivery' },
  { icon: 'bulb1', title: 'AI Suggestions' },
];

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9f9f9' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 20 },
  plan: { fontSize: 16, fontWeight: '600' },
  wallet: { color: 'green', marginVertical: 8 },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 6, marginVertical: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  coachButton: { flexDirection: 'row', backgroundColor: '#2196F3', padding: 10, borderRadius: 6, alignItems: 'center' },
  coachText: { color: '#fff', marginLeft: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  featureBox: { width: '30%', backgroundColor: '#fff', padding: 12, marginVertical: 10, alignItems: 'center', borderRadius: 10, elevation: 2 },
  featureText: { marginTop: 6, fontSize: 13 },
  modalView: { flex: 1, padding: 20, justifyContent: 'center' },
  modalTitle: { fontSize: 18, marginBottom: 12, fontWeight: '600' },
  input: { borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 10, minHeight: 100, marginBottom: 12 }
});
