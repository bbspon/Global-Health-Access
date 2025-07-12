import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";

const HospitalAnalytics = () => {
  const chartData = {
    labels: ["OPD", "IPD", "Dental"],
    datasets: [{ data: [45, 30, 15] }],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width - 40}
        height={220}
        fromZero
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f0f0f0",
          backgroundGradientTo: "#d0d0d0",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 150, ${opacity})`,
        }}
        style={{ borderRadius: 10 }}
      />
    </ScrollView>
  );
};

export default HospitalAnalytics;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
});
