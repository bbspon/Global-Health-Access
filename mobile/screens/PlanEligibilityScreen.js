// Mobile → src/screens/PlanEligibilityScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Picker,
} from "react-native";
import axios from "axios";

const PlanEligibilityScreen = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [planType, setPlanType] = useState("basic");

  const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;

  const checkEligibility = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/plan/check-eligibility`,
        { age, city, planType },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.eligible) {
        Alert.alert("✅ Eligible", res.data.message, [
          { text: "Buy Plan", onPress: () => navigation.navigate("BuyPlanScreen") },
        ]);
      } else {
        Alert.alert("⚠️ Not Eligible", res.data.message);
      }
    } catch (err) {
      Alert.alert("❌ Error", err.response?.data?.message || "Failed to check.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        🔍 Check Plan Eligibility
      </Text>

      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={{ borderBottomWidth: 1, marginVertical: 10 }}
      />
      <Picker
        selectedValue={planType}
        onValueChange={(itemValue) => setPlanType(itemValue)}
        style={{ marginBottom: 20 }}
      >
        <Picker.Item label="Basic" value="basic" />
        <Picker.Item label="Prime" value="prime" />
        <Picker.Item label="Elite" value="elite" />
      </Picker>

      <Button title="Check Eligibility" onPress={checkEligibility} />
    </View>
  );
};

export default PlanEligibilityScreen;
