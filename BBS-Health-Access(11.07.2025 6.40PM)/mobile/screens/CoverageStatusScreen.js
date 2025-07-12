import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';

const CoverageStatusScreen = () => {
  const [userId, setUserId] = useState('');
  const [coverageResult, setCoverageResult] = useState(null);

  const [simPlan, setSimPlan] = useState('');
  const [simService, setSimService] = useState('');
  const [simResult, setSimResult] = useState(null);

  // Simulate API check
  const handleCheckCoverage = () => {
    if (!userId) {
      Alert.alert('Error', 'Enter a User ID or scan QR');
      return;
    }

    setCoverageResult({
      name: 'Fatima Sheikh',
      plan: 'Super Premium',
      service: 'OPD Consultation',
      status: '⚠️ Partially Covered',
      visitsUsed: 5,
      visitsAllowed: 6,
      amountLeft: '₹500',
      copay: '₹300',
      nextEligible: '12 Aug 2025',
    });
  };

  const handleSimulate = () => {
    if (!simPlan || !simService) {
      Alert.alert('Missing Info', 'Choose plan and service');
      return;
    }

    let simulated = {
      status: 'Not Covered',
      copay: '₹0',
      visitsUsed: 0,
      visitsAllowed: 0,
      amountLeft: '₹0',
    };

    if (simPlan === 'Super Premium') {
      simulated = {
        status: '✅ Fully Covered',
        copay: '₹0',
        visitsUsed: 2,
        visitsAllowed: 6,
        amountLeft: '₹4200',
      };
    } else if (simPlan === 'Premium') {
      simulated = {
        status: '⚠️ Partially Covered',
        copay: '₹250',
        visitsUsed: 3,
        visitsAllowed: 4,
        amountLeft: '₹1200',
      };
    } else if (simPlan === 'Basic') {
      simulated = {
        status: '❌ Not Covered',
        copay: '₹500',
        visitsUsed: 2,
        visitsAllowed: 2,
        amountLeft: '₹0',
      };
    }

    setSimResult({
      plan: simPlan,
      service: simService,
      ...simulated,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🧠 Coverage Check</Text>

      {/* Live Coverage */}
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            style={styles.input}
            placeholder="Enter User ID / QR"
            value={userId}
            onChangeText={setUserId}
          />
          <Button mode="contained" onPress={handleCheckCoverage}>
            Check Eligibility
          </Button>
        </Card.Content>
      </Card>

      {coverageResult && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{coverageResult.name}</Text>
            <Text>Plan: {coverageResult.plan}</Text>
            <Text>Service: {coverageResult.service}</Text>
            <Text>Status: {coverageResult.status}</Text>
            <Text>Visits: {coverageResult.visitsUsed}/{coverageResult.visitsAllowed}</Text>
            <Text>Amount Left: {coverageResult.amountLeft}</Text>
            <Text>Co-Pay: {coverageResult.copay}</Text>
            <Text>Next Eligible: {coverageResult.nextEligible}</Text>
          </Card.Content>
        </Card>
      )}

      {/* Simulation Section */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subheader}>🛠 Simulation (Admin Use)</Text>
          <TextInput
            placeholder="Enter Plan (Basic / Premium / Super Premium)"
            style={styles.input}
            value={simPlan}
            onChangeText={setSimPlan}
          />
          <TextInput
            placeholder="Enter Service Type"
            style={styles.input}
            value={simService}
            onChangeText={setSimService}
          />
          <Button mode="outlined" onPress={handleSimulate}>
            Run Simulation
          </Button>
        </Card.Content>
      </Card>

      {simResult && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.subheader}>🧪 Simulation Result</Text>
            <Text>Plan: {simResult.plan}</Text>
            <Text>Service: {simResult.service}</Text>
            <Text>Status: {simResult.status}</Text>
            <Text>Visits: {simResult.visitsUsed}/{simResult.visitsAllowed}</Text>
            <Text>Amount Left: {simResult.amountLeft}</Text>
            <Text>Co-Pay: {simResult.copay}</Text>
          </Card.Content>
        </Card>
      )}

      {/* Future Features */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subheader}>🔮 Future Additions</Text>
          <Text>• Scan Bill Upload</Text>
          <Text>• AI Plan Suggestion</Text>
          <Text>• Cross-Hospital Usage Sync</Text>
          <Text>• Explainable Coverage AI</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  subheader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
});

export default CoverageStatusScreen;
