import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PlanCard from '../components/Plan/PlanCard';

const UserPlanList = () => {
  const [userPlans, setUserPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/user/plans', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = res.data.map((up) => ({
          ...up.planId,
          startDate: up.startDate,
          endDate: up.endDate,
          status: up.status,
          paymentMethod: up.paymentMethod,
          usedWalletAmount: up.usedWalletAmount,
          transactionId: up.transactionId,
        }));

        setUserPlans(formatted);
      } catch (error) {
        console.error("Failed to fetch user plans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#000" />;

  if (userPlans.length === 0) return <Text>No plans purchased yet.</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      {userPlans.map((plan, index) => (
        <PlanCard key={index} plan={plan} />
      ))}
    </ScrollView>
  );
};

export default UserPlanList;
