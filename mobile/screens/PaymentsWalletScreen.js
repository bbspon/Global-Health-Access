import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import { Button, Card, RadioButton, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentsWalletScreen = () => {
  const [walletBalance, setWalletBalance] = useState(850);
  const [topupAmount, setTopupAmount] = useState('');
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [paymentPlan, setPaymentPlan] = useState('basic');
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const getPlanPrice = () => {
    switch (paymentPlan) {
      case 'basic':
        return 499;
      case 'premium':
        return 999;
      case 'govt':
        return 0;
      default:
        return 0;
    }
  };

  const handleTopUp = () => {
    const amt = parseInt(topupAmount);
    if (!isNaN(amt) && amt > 0) {
      setWalletBalance(walletBalance + amt);
      setTopupAmount('');
      setShowTopUpModal(false);
      Alert.alert('Success', 'Wallet topped up successfully!');
    } else {
      Alert.alert('Invalid', 'Enter a valid top-up amount');
    }
  };

  const handlePlanPayment = () => {
    const price = getPlanPrice();
    if (price > walletBalance) {
      Alert.alert('Insufficient Balance', 'Please top-up your wallet.');
      return;
    }
    setWalletBalance(walletBalance - price);
    Alert.alert('Success', `Plan '${paymentPlan}' activated!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}><Icon name="wallet" size={24} /> Payments & Wallet</Text>

      {/* Wallet Balance */}
      <Card style={styles.card}>
        <Card.Title title="💼 Wallet Balance" />
        <Card.Content>
          <Text style={styles.balance}>₹{walletBalance}</Text>
          <Text style={styles.caption}>Use for bookings, plans, and offers</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => setShowTopUpModal(true)}>
            Top-up Wallet
          </Button>
        </Card.Actions>
      </Card>

      {/* Plan Payment */}
      <Card style={styles.card}>
        <Card.Title title="💳 Buy Health Plan" />
        <Card.Content>
          <RadioButton.Group
            onValueChange={setPaymentPlan}
            value={paymentPlan}
          >
            <RadioButton.Item label="Basic Plan – ₹499" value="basic" />
            <RadioButton.Item label="Premium Plan – ₹999" value="premium" />
            <RadioButton.Item label="Govt Sponsored – ₹0" value="govt" />
          </RadioButton.Group>

          <TextInput
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChangeText={setCouponCode}
            style={styles.input}
          />
          <Button mode="outlined" onPress={() => Alert.alert('Coupon', `Applied coupon: ${couponCode}`)}>
            Apply Coupon
          </Button>

          <Button mode="contained" style={{ marginTop: 10 }} onPress={handlePlanPayment}>
            Pay & Activate Plan
          </Button>
        </Card.Content>
      </Card>

      {/* Referral Program */}
      <Card style={styles.card}>
        <Card.Title title="👥 Referral Program" />
        <Card.Content>
          <Text>Your Code: <Text style={styles.bold}>BBSCART123</Text></Text>
          <TextInput
            placeholder="Enter Referral Code"
            value={referralCode}
            onChangeText={setReferralCode}
            style={styles.input}
          />
          <Button mode="outlined" onPress={() => Alert.alert('Referral', `Referral applied: ${referralCode}`)}>
            Apply Referral
          </Button>
          <Text style={styles.caption}>Invite friends & earn wallet bonus.</Text>
        </Card.Content>
      </Card>

      {/* Offers Accordion */}
      <List.Section style={styles.accordion}>
        <List.Accordion
          title="🎁 Available Offers"
          expanded={accordionExpanded}
          onPress={() => setAccordionExpanded(!accordionExpanded)}
        >
          <List.Item title="💸 ₹50 Cashback on ₹500 Top-up" />
          <List.Item title="🎁 10% off Premium Plan" />
          <List.Item title="🆓 Free Plan for Approved Users" />
        </List.Accordion>
      </List.Section>

      {/* Top-Up Modal */}
      <Modal
        visible={showTopUpModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTopUpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Top-up Wallet</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={topupAmount}
              onChangeText={setTopupAmount}
            />
            <View style={styles.modalButtons}>
              <Button onPress={() => setShowTopUpModal(false)}>Cancel</Button>
              <Button mode="contained" onPress={handleTopUp}>Top-up Now</Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PaymentsWalletScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  balance: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  caption: {
    marginTop: 4,
    color: '#777',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    marginVertical: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  accordion: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000066',
    paddingHorizontal: 24,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
