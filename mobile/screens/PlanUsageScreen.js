import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

const PlanUsageScreen = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUsageData();
  }, []);

  const fetchUsageData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/plan-usage", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(res.data);
    } catch (error) {
      console.error("Failed to load usage data", error);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/plan-usage/reset", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      Alert.alert("Reset Success", "Plan usage has been reset.");
      fetchUsageData();
    } catch (error) {
      Alert.alert("Reset Failed", "Something went wrong while resetting usage.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Plan Usage Dashboard</Text>

      {data.map((user, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.subtext}>{user?.plan} Plan</Text>

          <Text>OPD Usage: {user.opdUsed}/{user.opdCap}</Text>
          <Text>IPD Usage: {user.ipdUsed}/{user.ipdCap}</Text>
          <Text>LAB Usage: {user.labUsed}/{user.labCap}</Text>
          <Text>Mental Health Usage: {user.mentalHealthUsed}/{user.mentalHealthCap}</Text>

          <View style={styles.btnGroup}>
            <Button title="Download PDF" onPress={() => Alert.alert("Not yet implemented")} />
            <Button title="Manual Reset" onPress={handleReset} color="#c0392b" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default PlanUsageScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f7f7f7",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  btnGroup: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
