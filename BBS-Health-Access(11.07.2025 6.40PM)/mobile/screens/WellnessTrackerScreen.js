import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const WellnessTrackerScreen = () => {
  const [log, setLog] = useState({
    steps: '',
    sleepHours: '',
    waterLitres: '',
  });
  const [logs, setLogs] = useState([]);

  const today = new Date().toISOString().split('T')[0];

  const fetchLogs = async () => {
    const { data } = await axios.get(
      'https://yourdomain.com/api/wellness/recent',
    );
    setLogs(data);
  };

  const submit = async () => {
    await axios.post('https://yourdomain.com/api/wellness/log', {
      ...log,
      date: today,
    });
    fetchLogs();
    setLog({ steps: '', sleepHours: '', waterLitres: '' });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wellness Tracker</Text>

      <TextInput
        placeholder="Steps"
        keyboardType="numeric"
        value={log.steps}
        onChangeText={val => setLog({ ...log, steps: val })}
        style={styles.input}
      />
      <TextInput
        placeholder="Sleep Hours"
        keyboardType="numeric"
        value={log.sleepHours}
        onChangeText={val => setLog({ ...log, sleepHours: val })}
        style={styles.input}
      />
      <TextInput
        placeholder="Water Litres"
        keyboardType="numeric"
        value={log.waterLitres}
        onChangeText={val => setLog({ ...log, waterLitres: val })}
        style={styles.input}
      />

      <Button title="Save Entry" onPress={submit} />

      <FlatList
        data={logs}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text>{item.date}</Text>
            <Text>{item.steps} steps</Text>
            <Text>{item.sleepHours} hrs sleep</Text>
            <Text>{item.waterLitres} L water</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  entry: { marginTop: 10, borderBottomWidth: 1, paddingBottom: 8 },
});

export default WellnessTrackerScreen;
