// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import { getComparisonPlans, purchasePlan } from '../services/healthPlanAPI';

// const BuyPlanScreen = ({ route, navigation }) => {
//   const { planId } = route.params;
//   const [plan, setPlan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('upi');
//   const [accepted, setAccepted] = useState(false);

//   useEffect(() => {
//     const fetchPlan = async () => {
//       try {
//         const data = await getComparisonPlans('INR');
//         const selected = data.plans.find(p => p._id === planId);
//         setPlan(selected);
//       } catch (err) {
//         Alert.alert('Error', 'Failed to load plan');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlan();
//   }, [planId]);

//   const handlePurchase = async () => {
//     if (!accepted) return Alert.alert('Warning', 'Please accept the terms.');

//     try {
//       setSubmitting(true);
//       const res = await purchasePlan(planId, paymentMethod);
//       if (res.success) {
//         Alert.alert('Success', 'Plan purchased successfully');
//         navigation.navigate('MyPlanScreen');
//       } else {
//         Alert.alert('Error', 'Purchase failed');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Something went wrong');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!plan) {
//     return (
//       <View style={styles.center}>
//         <Text>Plan not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.wrapper}>
//       <Text style={styles.title}>Buy Plan: {plan.name}</Text>
//       <Text style={styles.price}>₹ {plan.price} / year</Text>

//       <Text style={styles.subtitle}>Features:</Text>
//       {plan.features.map((f, i) => (
//         <Text key={i} style={styles.feature}>
//           • {f}
//         </Text>
//       ))}

//       <Text style={styles.subtitle}>Select Payment Method:</Text>
//       {['upi', 'card'].map(method => (
//         <TouchableOpacity
//           key={method}
//           style={[styles.radio, paymentMethod === method && styles.radioActive]}
//           onPress={() => setPaymentMethod(method)}
//         >
//           <Text style={styles.radioText}>{method.toUpperCase()}</Text>
//         </TouchableOpacity>
//       ))}

//       <TouchableOpacity style={[styles.radio, { opacity: 0.4 }]} disabled>
//         <Text style={styles.radioText}>WALLET (Coming Soon)</Text>
//       </TouchableOpacity>

//       <View style={styles.checkWrapper}>
//         <CheckBox value={accepted} onValueChange={setAccepted} />
//         <Text style={styles.checkText}>I accept the terms and conditions</Text>
//       </View>

//       <TouchableOpacity
//         style={[
//           styles.button,
//           (!accepted || submitting) && { backgroundColor: '#ccc' },
//         ]}
//         onPress={handlePurchase}
//         disabled={!accepted || submitting}
//       >
//         <Text style={styles.buttonText}>
//           {submitting ? 'Processing...' : 'Confirm Purchase'}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: { padding: 16 },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
//   price: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
//   subtitle: { fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
//   feature: { fontSize: 14, marginBottom: 4 },
//   radio: {
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#17a2b8',
//     borderRadius: 6,
//     marginVertical: 6,
//   },
//   radioActive: {
//     backgroundColor: '#17a2b8',
//   },
//   radioText: {
//     color: '#000',
//     fontWeight: '500',
//   },
//   checkWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 12,
//   },
//   checkText: {
//     marginLeft: 8,
//     fontSize: 13,
//   },
//   button: {
//     backgroundColor: '#28a745',
//     padding: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default BuyPlanScreen;

// BuyPlanScreen.js
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView
} from "react-native";

const plans = [
  { name: "Basic", price: 199, benefits: "2 OPDs" },
  { name: "Standard", price: 399, benefits: "4 OPDs / 2 Labs" },
  { name: "Premium", price: 699, benefits: "Unlimited OPDs" },
];

const BuyPlanScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [tenure, setTenure] = useState("monthly");
  const [location, setLocation] = useState("");
  const [otp, setOtp] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleActivate = () => {
    if (!selectedPlan || !otp || !consent) {
      Alert.alert("Incomplete", "Please fill all details");
      return;
    }
    setSuccess(true);
  };

  const total = selectedPlan ? selectedPlan.price * (tenure === "yearly" ? 12 : tenure === "quarterly" ? 3 : 1) : 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Choose a Plan</Text>
      <FlatList
        data={plans}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.planCard, selectedPlan?.name === item.name && styles.selected]}
            onPress={() => setSelectedPlan(item)}
          >
            <Text style={styles.planTitle}>{item.name}</Text>
            <Text>{item.benefits}</Text>
            <Text>₹{item.price}/month</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />

      <Text style={styles.label}>Tenure</Text>
      <View style={styles.row}>
        {["monthly", "quarterly", "yearly"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tenureBtn, tenure === t && styles.selectedBtn]}
            onPress={() => setTenure(t)}
          >
            <Text style={styles.tenureText}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>City</Text>
      <TextInput
        placeholder="Enter your city"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <Text style={styles.label}>OTP</Text>
      <TextInput
        placeholder="Enter 6-digit OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        maxLength={6}
      />

      <TouchableOpacity onPress={() => setConsent(!consent)} style={styles.checkboxRow}>
        <Text>{consent ? "☑️" : "⬜️"} I accept the terms</Text>
      </TouchableOpacity>

      <Text style={styles.total}>Total: ₹{total}</Text>
      <TouchableOpacity onPress={handleActivate} style={styles.activateBtn}>
        <Text style={styles.activateText}>Activate Plan</Text>
      </TouchableOpacity>

      {success && <Text style={styles.success}>✅ Plan Activated. Check your Health QR.</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  planCard: {
    padding: 15, margin: 5, borderRadius: 10, borderColor: "#ccc", borderWidth: 1
  },
  selected: { borderColor: "#007bff", borderWidth: 2 },
  planTitle: { fontSize: 16, fontWeight: "bold" },
  label: { marginTop: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginTop: 5
  },
  row: { flexDirection: "row", marginTop: 10 },
  tenureBtn: {
    padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginRight: 10
  },
  selectedBtn: { borderColor: "#007bff", backgroundColor: "#e7f0ff" },
  tenureText: { textTransform: "capitalize" },
  checkboxRow: { marginTop: 20 },
  total: { marginTop: 20, fontSize: 18, fontWeight: "bold" },
  activateBtn: {
    backgroundColor: "#007bff", padding: 15, marginTop: 20, borderRadius: 8
  },
  activateText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  success: { marginTop: 20, color: "green", fontWeight: "bold" },
});

export default BuyPlanScreen;
