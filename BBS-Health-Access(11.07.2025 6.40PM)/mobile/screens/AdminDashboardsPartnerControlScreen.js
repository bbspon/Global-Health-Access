import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const tabs = [
  { key: 'superadmin', label: 'Super Admin', icon: 'person' },
  { key: 'hospital', label: 'Hospital Admin', icon: 'medkit' },
  { key: 'doctor', label: 'Doctor Panel', icon: 'clipboard' },
  { key: 'lab', label: 'Lab Admin', icon: 'flask' },
  { key: 'employer', label: 'Employer', icon: 'business' },
  { key: 'compliance', label: 'Compliance', icon: 'globe' },
  { key: 'agent', label: 'Commission', icon: 'people' },
  { key: 'support', label: 'Support', icon: 'chatbubbles' },
];

const AdminDashboardsPartnerControl = () => {
  const [activeTab, setActiveTab] = useState('superadmin');

  const renderContent = () => {
    switch (activeTab) {
      case 'superadmin':
        return (
          <View style={styles.section}>
            <Text style={styles.title}>Super Admin Dashboard</Text>
            <Text>Total Users: 120,430</Text>
            <Text>New Signups: 5,230</Text>
            <Text>Plan Split: Basic 45%, Premium 35%, Gold 20%</Text>
          </View>
        );
      case 'hospital':
        return (
          <View style={styles.section}>
            <Text style={styles.title}>Hospital Admin Panel</Text>
            <Text>View appointment schedules, revenue, usage, and feedback.</Text>
          </View>
        );
      case 'doctor':
        return (
          <View style={styles.section}>
            <Text style={styles.title}>Doctor Panel</Text>
            <Text>Access appointments, add notes, view patient history.</Text>
          </View>
        );
      case 'lab':
        return (
          <View style={styles.section}>
            <Text style={styles.title}>Lab Admin Panel</Text>
            <Text>Manage test types, schedules, upload results.</Text>
          </View>
        );
      case 'employer':
        return (
          <View style={styles.section}>
            <Text style={styles.title}>Employer Dashboard</Text>
            <Text>Manage employees, usage, wellness, renewals, tax reports.</Text>
          </View>
        );
      case 'compliance':
        return (
          <View style={styles.section}>
            <Text style={styles.title}>Compliance Officer Panel</Text>
            <Text>Manage regional laws, HL7/FHIR settings, upload policies.</Text>
          </View>
        );
      case 'agent':
        return (
          <View style={styles.section}>
            <Text style={styles.title}>Commission Partner Panel</Text>
            <Text>Track earnings, referrals, and settlements.</Text>
          </View>
        );
      case 'support':
        return (
          <View style={styles.section}>
            <Text style={styles.title}>Support Tickets</Text>
            <Text>Manage support tickets and escalations.</Text>
          </View>
        );
      default:
        return <Text>No content</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.tabBar} showsHorizontalScrollIndicator={false}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabItem, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons name={tab.icon} size={20} color={activeTab === tab.key ? '#fff' : '#333'} />
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.content}>{renderContent()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabLabel: {
    marginLeft: 5,
    color: '#333',
    fontWeight: '600',
  },
  activeLabel: {
    color: '#fff',
  },
  content: {
    padding: 15,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AdminDashboardsPartnerControl;
