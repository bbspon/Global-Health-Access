// Filename: GamifiedHealthJourneyScreen.js (React Native Full Version)

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { Mic, Gift, Trophy, Star, Users, Clock, Download, Share2 } from 'lucide-react-native';

const journeys = [
  {
    title: 'Step Up!',
    progress: 0.7,
    streak: 10,
    badge: 'Step Warrior',
    reward: '₹50 Golldex',
    description: 'Track 10,000+ steps per day',
  },
  {
    title: 'Hydration Hero',
    progress: 0.9,
    streak: 14,
    badge: 'Hydro Master',
    reward: 'Free Coupon',
    description: 'Drink 8+ glasses of water daily',
  },
];

export default function GamifiedHealthJourneyScreen() {
  const [askCoach, setAskCoach] = useState('');
  const [showCoach, setShowCoach] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🎮 Gamified Health Journeys + AI Coach</Text>

      {journeys.map((j, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.title}>{j.title}</Text>
          <Text>{j.description}</Text>
          <ProgressBar progress={j.progress} color="green" style={{ height: 8, marginTop: 6 }} />
          <Text>🔥 Streak: {j.streak} days</Text>
          <Text>🏆 Badge: {j.badge}</Text>
          <Text>🎁 Reward: {j.reward}</Text>

          <View style={styles.rowButtons}>
            <TouchableOpacity onPress={() => alert('PDF download triggered')}>
              <Download size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Shared to WhatsApp')}>
              <Share2 size={20} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Ask AI Coach */}
      <View style={styles.card}>
        <Text style={styles.title}>🧠 Ask the AI Health Coach</Text>
        <TouchableOpacity onPress={() => alert('Voice input activated')}>
          <Mic color="gray" />
        </TouchableOpacity>
        <TextInput
          placeholder="e.g. Is 4 hours of sleep harmful?"
          value={askCoach}
          onChangeText={setAskCoach}
          style={styles.input}
        />
        <Button mode="contained" onPress={() => setShowCoach(true)}>
          Ask Coach
        </Button>
      </View>

      {/* Coach Response Modal */}
      <Modal visible={showCoach} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text>🤖 Coach: "Aim for 7-8 hours of sleep to reduce health risk."</Text>
            <Button onPress={() => setShowCoach(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Stats */}
      <View style={styles.card}>
        <Text style={styles.title}>📊 Your Stats</Text>
        <Text><Clock size={14} /> Step Up Streak: 10 Days</Text>
        <Text><Clock size={14} /> Hydration Hero: 14 Days</Text>
        <Text><Star size={14} /> Badges: Step Warrior, Hydro Master</Text>
        <Text><Users size={14} /> Rank: #4 in Chennai Club</Text>
      </View>

      {/* Admin/HR Info */}
      <View style={styles.card}>
        <Text style={styles.title}>👨‍💼 Company Wellness Insights</Text>
        <Text>✅ 72% employees on active journeys</Text>
        <Text>🎁 45 members eligible for rewards</Text>
        <Text>🏅 Top Teams: Tech, Sales</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
});