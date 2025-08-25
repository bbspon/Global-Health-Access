import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const HealthIntelligenceDashboard = () => {
  const [role, setRole] = useState('admin');
  const [intelligenceData, setIntelligenceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const roles = ['admin', 'hospital', 'govt'];

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/health/intelligence/${role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust for secure storage in production
        },
      });
      setIntelligenceData(res.data.data);
    } catch (err) {
      console.error('Mobile Fetch Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [role]);

  const renderRoleSwitcher = () => (
    <View style={styles.roleSwitcher}>
      {roles.map((r) => (
        <TouchableOpacity
          key={r}
          style={[styles.roleButton, role === r && styles.activeRole]}
          onPress={() => setRole(r)}
        >
          <Text style={styles.roleText}>{r.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🧠 Health Intelligence Dashboard</Text>
      {renderRoleSwitcher()}

      {intelligenceData?.alertMessages?.map((alert, idx) => (
        <View key={idx} style={styles.alertBox}>
          <Text style={styles.alertText}>{alert}</Text>
        </View>
      ))}

      {intelligenceData?.nationalTrends && (role === 'admin' || role === 'govt') && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>📊 National Risk Trend</Text>
          <LineChart
            data={{
              labels: intelligenceData.nationalTrends.map((n) => n.label),
              datasets: [{ data: intelligenceData.nationalTrends.map((n) => n.value) }],
            }}
            width={screenWidth - 30}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
              labelColor: () => '#333',
              strokeWidth: 2,
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}

      {intelligenceData?.districtIndex && role !== 'user' && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>🏥 District Health Index</Text>
          <BarChart
            data={{
              labels: intelligenceData.districtIndex.map((d) => d.district),
              datasets: [{ data: intelligenceData.districtIndex.map((d) => d.index) }],
            }}
            width={screenWidth - 30}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: () => '#28a745',
              labelColor: () => '#333',
            }}
            style={styles.chart}
            verticalLabelRotation={30}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertBox: {
    backgroundColor: '#ffc107',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  alertText: {
    color: '#333',
  },
  chartContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  chart: {
    borderRadius: 10,
  },
  roleSwitcher: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  roleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  activeRole: {
    backgroundColor: '#007bff',
  },
  roleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HealthIntelligenceDashboard;
