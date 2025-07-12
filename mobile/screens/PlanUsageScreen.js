import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ProgressBar = ({ used, total }) => {
  const percent = (used / total) * 100;
  return (
    <View style={styles.progressOuter}>
      <View style={[styles.progressInner, { width: `${percent}%` }]} />
      <Text style={styles.progressLabel}>{`${used}/${total}`}</Text>
    </View>
  );
};

const PlanUsageScreen = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get('https://yourdomain.com/api/user-plan/plan-usage')
      .then(res => setPlans(res.data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {plans.map(plan => (
        <View key={plan._id} style={styles.card}>
          <Text style={styles.title}>{plan.title}</Text>
          <Text style={styles.date}>
            Started: {new Date(plan.createdAt).toLocaleDateString()}
          </Text>

          <Text style={styles.label}>OPD Visits</Text>
          <ProgressBar used={plan.usage.opdVisitsUsed} total={plan.opdLimit} />

          <Text style={styles.label}>Lab Tests</Text>
          <ProgressBar used={plan.usage.labTestsUsed} total={plan.labLimit} />

          <Text style={styles.label}>Video Consultations</Text>
          <ProgressBar
            used={plan.usage.videoConsultsUsed}
            total={plan.videoLimit}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  date: { marginBottom: 10 },
  label: { marginTop: 10, marginBottom: 4 },
  progressOuter: {
    backgroundColor: '#ccc',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    justifyContent: 'center',
  },
  progressInner: {
    height: 20,
    backgroundColor: '#4caf50',
  },
  progressLabel: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
    color: '#000',
  },
});

export default PlanUsageScreen;
