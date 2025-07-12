import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const PlanRenewalScreen = () => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    axios.get('https://yourdomain.com/api/user-plan/my-plan').then(res => {
      setPlan(res.data);
    });
  }, []);

  const handleRenew = () => {
    Alert.alert('Renew Plan', 'Redirecting to renewal page...');
  };

  if (!plan) return <Text>Loading...</Text>;

  const endDate = new Date(plan.endDate);
  const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Health Plan</Text>
      <Text>Ends on: {endDate.toDateString()}</Text>
      {daysLeft <= 7 && (
        <Button title="Renew Now" color="orange" onPress={handleRenew} />
      )}
      {daysLeft > 7 && (
        <Text style={styles.safe}>No action needed. {daysLeft} days left.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  safe: { marginTop: 10, color: 'green' },
});

export default PlanRenewalScreen;
