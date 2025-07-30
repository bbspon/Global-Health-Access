import React from "react";
import { View, Button, Alert } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import axios from "axios";

const RazorpayCheckoutScreen = () => {
  const handlePay = async () => {
    try {
      const bbsUser = JSON.parse(await AsyncStorage.getItem("bbsUser"));

      const { data } = await axios.post(`${import.meta.env.VITE_API_URI}/razorpay/create-order`, {
        userId: bbsUser.userId,
        amount: 499,
      });

      const options = {
        description: 'Health Plan',
        image: 'https://yourlogo.url',
        currency: 'INR',
        key: 'RAZORPAY_KEY_ID', // Replace with your key
        amount: data.order.amount,
        name: 'BBS Health Access',
        order_id: data.order.id,
        prefill: {
          email: bbsUser.email,
          contact: bbsUser.phone,
          name: bbsUser.name,
        },
        theme: { color: '#53a20e' }
      };

      RazorpayCheckout.open(options)
        .then((response) => {
          axios.post(`${import.meta.env.VITE_API_URI}/razorpay/verify-payment`, response);
          Alert.alert("Success", "Payment completed");
        })
        .catch(() => {
          Alert.alert("Error", "Payment failed");
        });
    } catch (err) {
      console.log("Payment error", err);
    }
  };

  return (
    <View style={{ marginTop: 100, padding: 20 }}>
      <Button title="Pay ₹499" onPress={handlePay} />
    </View>
  );
};

export default RazorpayCheckoutScreen;
