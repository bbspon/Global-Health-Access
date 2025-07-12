import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import PlanCard from '../components/Plan/PlanCard';
import { getMyActivePlan } from '../services/healthPlanAPI';
import { useNavigation } from '@react-navigation/native';

const MyPlanScreen = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await getMyActivePlan();
        if (data?.plan) {
          setPlan(data.plan);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#007bff"
        style={{ marginTop: 40 }}
      />
    );
  }

  if (!plan) {
    return (
      <View style={styles.centered}>
        <Text style={styles.alertText}>No active health plan found.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('BuyPlan')}>
          <Text style={styles.link}>Buy a Plan</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Active Health Plan</Text>
      <PlanCard plan={plan} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertText: { fontSize: 16, marginBottom: 10, color: '#555' },
  link: { color: '#007bff', textDecorationLine: 'underline' },
});

export default MyPlanScreen;
