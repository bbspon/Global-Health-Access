import React, { useState } from 'react';
import { View, Text, Button, Alert, Picker, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BuyPlanModal = ({ plan }) => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("wallet");

  const toggleAddon = (addonName) => {
    setSelectedAddons(prev =>
      prev.includes(addonName)
        ? prev.filter(a => a !== addonName)
        : [...prev, addonName]
    );
  };

  const handleBuy = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/user/purchase`,
        {
          planId: plan._id,
          selectedAddons,
          paymentMethod,
          usedWalletAmount: 0
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", res.data.message);
    } catch (err) {
      console.error("Purchase error", err);
      Alert.alert("Error", "Failed to purchase plan");
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>{plan.name}</Text>
      <Text>{plan.description}</Text>

      {plan.addons?.map((addon, idx) => (
        <View key={idx} style={{ marginVertical: 5 }}>
          <Button
            title={`${selectedAddons.includes(addon.name) ? '✅' : '➕'} ${addon.name} (₹${addon.price})`}
            onPress={() => toggleAddon(addon.name)}
          />
        </View>
      ))}

      <Picker
        selectedValue={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value)}
      >
        <Picker.Item label="Wallet" value="wallet" />
        <Picker.Item label="Razorpay" value="razorpay" />
        <Picker.Item label="UPI" value="upi" />
      </Picker>

      <Button title="Confirm & Buy" onPress={handleBuy} />
    </ScrollView>
  );
};

export default BuyPlanModal;
