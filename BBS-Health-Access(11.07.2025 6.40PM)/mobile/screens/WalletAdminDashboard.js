// WalletAdminDashboard.js
import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TextInput, Switch, StyleSheet, Alert
} from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import axios from 'axios';

const WalletAdminDashboard = () => {
  const [walletStats, setWalletStats] = useState({});
  const [cashbackRate, setCashbackRate] = useState(5);
  const [subsidyLimit, setSubsidyLimit] = useState(1000);
  const [healthEnabled, setHealthEnabled] = useState(true);
  const [golddexEnabled, setGolddexEnabled] = useState(true);
  const [smartSuggest, setSmartSuggest] = useState(true);
  const [splitPay, setSplitPay] = useState(true);
  const [creditUserId, setCreditUserId] = useState('');
  const [creditAmount, setCreditAmount] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/wallet/summary')
      .then(res => setWalletStats(res.data))
      .catch(() => Alert.alert("Error", "Failed to load wallet summary."));
  }, []);

  const handleUpdateConfig = () => {
    axios.post('http://localhost:5000/api/admin/wallet/config', {
      cashbackRate,
      subsidyLimit,
      healthEnabled,
      golddexEnabled,
      smartSuggest,
      splitPay,
    })
      .then(() => Alert.alert("✅ Success", "Config updated successfully."))
      .catch(() => Alert.alert("❌ Error", "Config update failed."));
  };

  const handleManualCredit = () => {
    axios.post('http://localhost:5000/api/admin/wallet/manual-credit', {
      userId: creditUserId,
      amount: Number(creditAmount)
    })
      .then(() => {
        Alert.alert("✅ Success", `Credited ₹${creditAmount} to ${creditUserId}`);
        setCreditUserId('');
        setCreditAmount('');
      })
      .catch(() => Alert.alert("❌ Error", "Failed to credit wallet."));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧾 Wallet Admin Dashboard</Text>

      {/* Wallet Summary */}
      <Card style={styles.card}>
        <Card.Title title="💊 BBSCART Health Wallet" />
        <Card.Content>
          <Text>Balance: ₹{walletStats.healthTotal || 0}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="🪙 Golddex Wallet" />
        <Card.Content>
          <Text>Balance: ₹{walletStats.golddexTotal || 0}</Text>
        </Card.Content>
      </Card>

      {/* Config Settings */}
      <Card style={styles.card}>
        <Card.Title title="⚙️ Configuration" />
        <Card.Content>
          <Text>Cashback Rate (%)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={cashbackRate.toString()}
            onChangeText={(text) => setCashbackRate(Number(text))}
          />

          <Text>Subsidy Limit (₹)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={subsidyLimit.toString()}
            onChangeText={(text) => setSubsidyLimit(Number(text))}
          />

          <View style={styles.switchRow}>
            <Text>Health Wallet Enabled</Text>
            <Switch value={healthEnabled} onValueChange={setHealthEnabled} />
          </View>
          <View style={styles.switchRow}>
            <Text>Golddex Wallet Enabled</Text>
            <Switch value={golddexEnabled} onValueChange={setGolddexEnabled} />
          </View>
          <View style={styles.switchRow}>
            <Text>Smart Suggest Enabled</Text>
            <Switch value={smartSuggest} onValueChange={setSmartSuggest} />
          </View>
          <View style={styles.switchRow}>
            <Text>Split Pay Enabled</Text>
            <Switch value={splitPay} onValueChange={setSplitPay} />
          </View>

          <Button mode="contained" style={styles.button} onPress={handleUpdateConfig}>
            🔄 Update Config
          </Button>
        </Card.Content>
      </Card>

      {/* Manual Credit */}
      <Card style={styles.card}>
        <Card.Title title="💸 Manual Wallet Credit" />
        <Card.Content>
          <Text>User ID</Text>
          <TextInput
            style={styles.input}
            value={creditUserId}
            onChangeText={setCreditUserId}
            placeholder="user@domain.com"
          />
          <Text>Amount (₹)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={creditAmount}
            onChangeText={setCreditAmount}
            placeholder="₹ amount"
          />
          <Button mode="outlined" onPress={handleManualCredit} style={styles.button}>
            💰 Credit Wallet
          </Button>
        </Card.Content>
      </Card>

      <Divider style={{ marginVertical: 20 }} />
      <Text style={styles.footer}>BBSCART Wallet Control Center © 2025</Text>
    </ScrollView>
  );
};

export default WalletAdminDashboard;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    borderRadius: 6, marginVertical: 10, backgroundColor: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
  },
  footer: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,
  },
});
