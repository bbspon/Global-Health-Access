import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { Card, Button, Divider } from 'react-native-paper';
import axios from 'axios';

const WalletAdminDashboard = () => {
  const [walletStats, setWalletStats] = useState({});
  const [adminTransactions, setAdminTransactions] = useState([]); // ✅ NEW
  const [cashbackRate, setCashbackRate] = useState(5);
  const [subsidyLimit, setSubsidyLimit] = useState(1000);
  const [healthEnabled, setHealthEnabled] = useState(true);
  const [golddexEnabled, setGolddexEnabled] = useState(true);
  const [smartSuggest, setSmartSuggest] = useState(true);
  const [splitPay, setSplitPay] = useState(true);
  const [creditUserId, setCreditUserId] = useState('');
  const [creditAmount, setCreditAmount] = useState('');

  // Load wallet summary
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/admin/wallet/summary')
      .then((res) => setWalletStats(res.data))
      .catch(() => Alert.alert('Error', 'Failed to load wallet summary.'));
  }, []);

  // ✅ Load admin wallet history
  useEffect(() => {
    const fetchAdminWalletHistory = async () => {
      const bbsUser = JSON.parse(localStorage.getItem('bbsUser'));
      const token = bbsUser?.token;

      try {
        const res = await axios.get(
          'http://localhost:5000/api/wallet/admin/wallet-history',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAdminTransactions(res.data);
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch wallet history');
      }
    };

    fetchAdminWalletHistory();
  }, []);

  const handleUpdateConfig = () => {
    axios
      .post('http://localhost:5000/api/admin/wallet/config', {
        cashbackRate,
        subsidyLimit,
        healthEnabled,
        golddexEnabled,
        smartSuggest,
        splitPay,
      })
      .then(() => Alert.alert('✅ Success', 'Config updated successfully.'))
      .catch(() => Alert.alert('❌ Error', 'Config update failed.'));
  };

  const handleManualCredit = () => {
    axios
      .post('http://localhost:5000/api/admin/wallet/manual-credit', {
        userId: creditUserId,
        amount: Number(creditAmount),
      })
      .then(() => {
        Alert.alert('✅ Success', `Credited ₹${creditAmount} to ${creditUserId}`);
        setCreditUserId('');
        setCreditAmount('');
      })
      .catch(() => Alert.alert('❌ Error', 'Failed to credit wallet.'));
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
            <Text>Smart Suggest</Text>
            <Switch value={smartSuggest} onValueChange={setSmartSuggest} />
          </View>
          <View style={styles.switchRow}>
            <Text>Split Pay Option</Text>
            <Switch value={splitPay} onValueChange={setSplitPay} />
          </View>

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleUpdateConfig}
          >
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

      {/* ✅ Admin Wallet History Table */}
      <Card style={styles.card}>
        <Card.Title title="📜 Admin Wallet History" />
        <Card.Content>
          {adminTransactions.length === 0 ? (
            <Text style={{ color: 'gray' }}>No transactions found.</Text>
          ) : (
            adminTransactions.map((txn, index) => (
              <View key={index} style={styles.txnRow}>
                <Text style={styles.txnText}>
                  🧑 {txn.user} | ₹{txn.amount} | {txn.type.toUpperCase()}
                </Text>
                <Text style={styles.txnSub}>
                  {txn.method} - {txn.purpose} |{' '}
                  {new Date(txn.timestamp).toLocaleString()}
                </Text>
                <Divider style={{ marginVertical: 6 }} />
              </View>
            ))
          )}
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
    backgroundColor: '#fff',
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
  txnRow: {
    marginBottom: 8,
  },
  txnText: {
    fontWeight: 'bold',
  },
  txnSub: {
    fontSize: 12,
    color: '#666',
  },
});
