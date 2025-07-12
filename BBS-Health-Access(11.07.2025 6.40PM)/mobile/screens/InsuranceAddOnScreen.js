import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  Switch,
  Linking,
} from 'react-native';

const InsuranceAddOnScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showHelpBot, setShowHelpBot] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);

  const handleBuy = (planName) => {
    if (!consentGiven) {
      alert('Please provide consent to share your data with the insurer.');
      return;
    }
    setSelectedPlan(planName);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🛡️ Add Hospital Insurance Protection</Text>
      <Text style={styles.subText}>
        BBSCART Care Pass covers outpatient care. For hospital, ICU, or surgery coverage, add IRDAI/DHA-approved insurance.
      </Text>

      <View style={styles.currentPolicy}>
        <Text style={styles.sectionTitle}>Your Current Insurance</Text>
        <Text>🧾 Insurer: Star Health</Text>
        <Text>📅 Expiry: 01-Mar-2026</Text>
        <Text>💰 Sum Insured: ₹10,00,000</Text>
        <Text>📂 Claim: Approved ₹87,000 on 30-Jun-2025</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://example.com/policy-star-health.pdf')}>
          <Text style={styles.link}>📥 Download Policy PDF</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text>🔁 Auto Renew</Text>
          <Switch value={autoRenew} onValueChange={setAutoRenew} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Compare & Select Insurance</Text>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Star Health - ₹299/month</Text>
        <Text>Coverage: ₹10L</Text>
        <Button title="Buy Now" onPress={() => handleBuy('Star Health')} />
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Niva Bupa - ₹459/month</Text>
        <Text>Coverage: ₹20L</Text>
        <Button title="Buy Now" onPress={() => handleBuy('Niva Bupa')} />
      </View>

      <View style={styles.planCard}>
        <Text style={styles.planTitle}>Care Health - ₹699/month</Text>
        <Text>Coverage: ₹30L</Text>
        <Button title="Buy Now" onPress={() => handleBuy('Care Health')} />
      </View>

      <View style={styles.switchRow}>
        <Text>I consent to share my data with the insurer</Text>
        <Switch value={consentGiven} onValueChange={setConsentGiven} />
      </View>

      <Button title="💬 Ask Insurance Coach" onPress={() => setShowHelpBot(true)} />

      {/* Modal for Redirection */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Redirecting to {selectedPlan} portal...</Text>
          <Text>Please wait while we open their secure payment and policy purchase page.</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* HelpBot */}
      <Modal visible={showHelpBot} transparent>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>🤖 Insurance Coach</Text>
          <Text style={styles.qa}><Text style={styles.q}>Q:</Text> Why do I need IPD insurance?</Text>
          <Text><Text style={styles.a}>A:</Text> Because Care Pass only covers outpatient care, not hospitalization or surgeries.</Text>
          <Text style={styles.qa}><Text style={styles.q}>Q:</Text> What happens if I’m admitted and don’t have insurance?</Text>
          <Text><Text style={styles.a}>A:</Text> You’ll have to pay the full hospital bill yourself. Adding insurance protects you financially.</Text>
          <Button title="Close" onPress={() => setShowHelpBot(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  subText: { fontSize: 14, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginVertical: 10 },
  currentPolicy: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  link: {
    color: '#007bff',
    marginTop: 5,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  planCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dedede',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  planTitle: { fontWeight: 'bold', marginBottom: 4 },
  modalBox: {
    backgroundColor: '#fff',
    margin: 30,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  qa: {
    marginTop: 10,
    marginBottom: 5,
  },
  q: {
    fontWeight: 'bold',
    color: '#333',
  },
  a: {
    fontWeight: 'bold',
    color: '#444',
  },
});

export default InsuranceAddOnScreen;
