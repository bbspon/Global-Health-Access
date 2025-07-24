import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getHealthPlans = async () => {
  const res = await axios.get('http://localhost:5000/api/healthplans');
  return res.data;
};
export const getComparisonPlans = async (currency = 'INR') => {
  const res = await fetch(
    `http://localhost:5000/api/healthplans/compare?country=${currency}`,
  );
  return res.json();
};
export const purchasePlan = async (planId, paymentMethod) => {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch('http://localhost:5000/api/user/plans/purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ planId, paymentMethod }),
  });
  return res.json();
};
