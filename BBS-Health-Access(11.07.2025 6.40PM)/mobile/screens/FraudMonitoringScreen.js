import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';

const FraudMonitoringScreen = () => {
  const [riskData, setRiskData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRiskData();
  }, []);

  const loadRiskData = () => {
    // Simulated API result
    setRiskData([
      { id: 1, name: 'User1123', type: 'User', risk: 'High', flags: 4 },
      { id: 2, name: 'Hospital XYZ', type: 'Hospital', risk: 'Medium', flags: 12 }
    ]);
    setLoading(false);
  };

  const openModal = (item) => {
    setSelected(item);
    setModalVisible(true);
  };

  const RiskItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Type: {item.type}</Text>
      <Text style={item.risk === 'High' ? styles.riskHigh : styles.riskMedium}>
        Risk: {item.risk}
      </Text>
      <Text>Flags: {item.flags}</Text>
    </TouchableOpacity>
  );

  const HighRiskActions = () => (
    <View style={styles.highRiskContainer}>
      <Text style={styles.highRiskTitle}>🔴 High-Risk Actions Recommended:</Text>
      <Text>• Auto-freeze wallet & block claims</Text>
      <Text>• Trigger biometric re-verification</Text>
      <Text>• Launch AI deep behavior analysis</Text>
      <Text>• Notify Insurance & Admin oversight</Text>
      <Text>• Restrict login from new devices</Text>
      <Text>• Flag for re-KYC if repeat within 48hrs</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚨 Fraud Detection Overview</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={riskData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <RiskItem item={item} />}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalView}>
            <Text style={styles.modalTitle}>{selected?.name}</Text>
            <Text>Type: {selected?.type}</Text>
            <Text>Risk Level: {selected?.risk}</Text>
            <Text>Flags: {selected?.flags}</Text>
            <Text>Trigger: Multiple OPD claims within 2 hrs</Text>

            {selected?.risk === 'High' && <HighRiskActions />}

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default FraudMonitoringScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  },
  card: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  riskHigh: {
    color: 'red',
    fontWeight: 'bold'
  },
  riskMedium: {
    color: 'orange',
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  modalView: {
    margin: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  highRiskContainer: {
    marginTop: 15,
    backgroundColor: '#fff0f0',
    padding: 10,
    borderRadius: 8
  },
  highRiskTitle: {
    fontWeight: 'bold',
    color: 'darkred',
    marginBottom: 8
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5
  },
  closeText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
