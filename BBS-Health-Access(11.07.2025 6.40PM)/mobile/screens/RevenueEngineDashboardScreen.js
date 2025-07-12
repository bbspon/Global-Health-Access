import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { TabView, TabBar } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const RevenueEngineDashboardScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'admin', title: 'Admin Rules' },
    { key: 'agent', title: 'Agent Commissions' },
    { key: 'hospital', title: 'Hospital Earnings' },
    { key: 'forecast', title: 'Forecasts' },
    { key: 'ai', title: 'AI Bot' },
  ]);

  // Admin form states
  const [region, setRegion] = useState('');
  const [condition, setCondition] = useState('');
  const [cut, setCut] = useState('');

  // Forecast input
  const [forecastScenario, setForecastScenario] = useState('');

  // AI modal
  const [showModal, setShowModal] = useState(false);

  const handleSaveRule = () => {
    if (!region || !condition || !cut) {
      Toast.show({ type: 'error', text1: 'Please fill all required fields!' });
      return;
    }
    Toast.show({ type: 'success', text1: 'Commission rule saved!' });
    setRegion('');
    setCondition('');
    setCut('');
  };

  const handleForecast = () => {
    if (!forecastScenario.trim()) {
      Toast.show({ type: 'error', text1: 'Please enter a valid scenario.' });
      return;
    }
    Toast.show({ type: 'success', text1: `Forecast generated: ${forecastScenario}` });
    setForecastScenario('');
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'admin':
        return (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Commission Rule Editor</Text>
            <TextInput
              placeholder="Region (e.g., Dubai)"
              style={styles.input}
              value={region}
              onChangeText={setRegion}
            />
            <TextInput
              placeholder="Condition (e.g., Plan = Premium)"
              style={styles.input}
              value={condition}
              onChangeText={setCondition}
            />
            <TextInput
              placeholder="BBSCART Cut %"
              style={styles.input}
              keyboardType="numeric"
              value={cut}
              onChangeText={setCut}
            />
            <Button title="Save Rule" onPress={handleSaveRule} />
          </ScrollView>
        );

      case 'agent':
        return (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Agent Commissions</Text>
            <Text style={styles.listItem}>👤 A. Mehta – ₹13,400 – ✅ Paid – Chennai</Text>
            <Text style={styles.listItem}>👤 S. Khan – ₹10,200 – ⏳ Pending – Dubai</Text>
          </ScrollView>
        );

      case 'hospital':
        return (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Hospital Earnings</Text>
            <Text>🏥 Chennai – ₹4.6L Revenue</Text>
            <Text>OPD: 74% | Labs: 56% | Dental: ❌ 12%</Text>
          </ScrollView>
        );

      case 'forecast':
        return (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Forecast Dashboard</Text>
            <Text>MRR: ₹1.42Cr | Churn: 7.8%</Text>
            <TextInput
              placeholder="e.g., Add 10K users in Tier-2 cities"
              style={styles.input}
              value={forecastScenario}
              onChangeText={setForecastScenario}
            />
            <Button title="Generate Forecast" onPress={handleForecast} />
          </ScrollView>
        );

      case 'ai':
        return (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>AI Revenue Bot</Text>
            <Text>💡 "Raise Premium price in Delhi by ₹50?"</Text>
            <Text>⚠️ "Dental not used → 40% downgrade chance"</Text>
            <TouchableOpacity style={styles.askBotButton} onPress={() => setShowModal(true)}>
              <Text style={styles.askBotText}>Ask Bot</Text>
            </TouchableOpacity>

            <Modal visible={showModal} animationType="slide" transparent={true}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>AI Suggestions</Text>
                  <Text>✅ Boost Super Premium in Tier-2</Text>
                  <Text>📉 Alert: Drop in lab usage in Sharjah</Text>
                  <Button title="Close" onPress={() => setShowModal(false)} />
                </View>
              </View>
            </Modal>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#0d6efd' }}
            style={{ backgroundColor: '#fff' }}
            labelStyle={{ color: 'black' }}
          />
        )}
      />
      <Toast />
    </>
  );
};

export default RevenueEngineDashboardScreen;

const styles = StyleSheet.create({
  tabContent: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  listItem: {
    marginBottom: 10,
    fontSize: 16,
  },
  askBotButton: {
    backgroundColor: '#0d6efd',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  askBotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});
