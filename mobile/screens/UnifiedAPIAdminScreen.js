// UnifiedAPIAdminDashboardMobile.jsx - React Native version

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Button, Card } from 'react-native-paper';

const mockPartners = [
  {
    id: 1,
    name: 'Apollo Hospitals',
    type: 'Hospital',
    status: 'Live',
    lastCall: '5 mins ago',
    country: 'India',
    version: 'v1.2',
    endpoint: '/api/hospital/v1',
  },
  {
    id: 2,
    name: 'SRL Diagnostics',
    type: 'Lab',
    status: 'Pending',
    lastCall: 'N/A',
    country: 'India',
    version: 'v1.0',
    endpoint: '/api/lab/v1',
  },
  {
    id: 3,
    name: '1mg Pharmacy',
    type: 'Pharmacy',
    status: 'Live',
    lastCall: '2 mins ago',
    country: 'UAE',
    version: 'v1.1',
    endpoint: '/api/pharmacy/v1',
  },
];

export default function UnifiedAPIAdminDashboardMobile() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPartners(mockPartners);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = () => {
    const updated = partners.map((p) =>
      p.id === selected.id ? { ...p, status: 'Live', lastCall: 'Just now' } : p
    );
    setPartners(updated);
    setShowModal(false);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title title={item.name} subtitle={item.type} />
      <Card.Content>
        <Text>Status: {item.status}</Text>
        <Text>Last API Call: {item.lastCall}</Text>
        <Text>Country: {item.country}</Text>
        <Text>Version: {item.version}</Text>
        <Text>Endpoint: {item.endpoint}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {
          setSelected(item);
          setShowModal(true);
        }}>Manage</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧩 Unified API Admin Dashboard</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={partners}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <ScrollView style={styles.modalContent}>
          {selected && (
            <>
              <Text style={styles.modalTitle}>Partner Details</Text>
              <Text><Text style={styles.label}>Name:</Text> {selected.name}</Text>
              <Text><Text style={styles.label}>Type:</Text> {selected.type}</Text>
              <Text><Text style={styles.label}>Status:</Text> {selected.status}</Text>
              <Text><Text style={styles.label}>Last API Call:</Text> {selected.lastCall}</Text>
              <Text><Text style={styles.label}>Country:</Text> {selected.country}</Text>
              <Text><Text style={styles.label}>Version:</Text> {selected.version}</Text>
              <Text><Text style={styles.label}>Endpoint:</Text> {selected.endpoint}</Text>

              {selected.status !== 'Live' && (
                <Button mode="contained" onPress={handleApprove} style={{ marginTop: 20 }}>
                  Approve & Activate
                </Button>
              )}

              <Button onPress={() => setShowModal(false)} style={{ marginTop: 10 }}>
                Close
              </Button>
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 12,
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
  },
});