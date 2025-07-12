import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const PlanEligibilityScreen = () => {
  const [form, setForm] = useState({ age: '', city: '', income: '' });
  const [loading, setLoading] = useState(false);

  const checkEligibility = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'https://yourdomain.com/api/health-plans/check-eligibility',
        form,
      );
      if (res.data.eligible) {
        Alert.alert('Eligible ✅', 'You are eligible for this plan.');
      } else {
        Alert.alert(
          'Not Eligible ❌',
          res.data.reason || 'No reason provided.',
        );
      }
    } catch {
      Alert.alert('Error', 'Failed to check eligibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Check Plan Eligibility</Text>

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={val => setForm({ ...form, age: val })}
        value={form.age}
      />
      <TextInput
        placeholder="City"
        style={styles.input}
        onChangeText={val => setForm({ ...form, city: val })}
        value={form.city}
      />
      <TextInput
        placeholder="Monthly Income"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={val => setForm({ ...form, income: val })}
        value={form.income}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Check Eligibility" onPress={checkEligibility} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
});

export default PlanEligibilityScreen;
