import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MyPlanScreen = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPlan = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/user/my-plan`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlan(response.data);
    } catch (err) {
      console.error("Error fetching plan:", err);
      setError('No active plan found or server error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <Text style={styles.heading}>My Current Plan</Text>
          <Text style={styles.label}>Plan Name:</Text>
          <Text style={styles.value}>{plan?.planId?.name || 'N/A'}</Text>

          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{new Date(plan?.startDate).toDateString()}</Text>

          <Text style={styles.label}>Expiry Date:</Text>
          <Text style={styles.value}>{new Date(plan?.expiryDate).toDateString()}</Text>

          <Text style={styles.label}>Status:</Text>
          <Text style={[styles.value, plan.status === 'active' ? styles.active : styles.inactive]}>
            {plan.status}
          </Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 12,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  active: {
    color: 'green',
    fontWeight: 'bold',
  },
  inactive: {
    color: 'red',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 100,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default MyPlanScreen;
