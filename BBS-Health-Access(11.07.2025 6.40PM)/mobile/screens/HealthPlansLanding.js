import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import PlanCard from '../components/HealthAccess/PlanCard';
import { getHealthPlans } from '../services/healthPlanAPI';
import BuyPlanModal from '../components/HealthAccess/BuyPlanModal';

const HealthPlansLanding = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleBuyClick = plan => {
    setSelectedPlan(plan);
    setModalVisible(true);
  };

  const handleConfirmPurchase = plan => {
    setModalVisible(false);
    // Proceed to BuyPlanScreen or trigger API (next block)
  };
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getHealthPlans();
        setPlans(data.plans);
      } catch (err) {
        Alert.alert('Error', 'Failed to load health plans');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (plans.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No health plans available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={plans}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <PlanCard plan={item} onBuyClick={handleBuyClick} />
      )}
      contentContainerStyle={styles.list}
    />
  );
};

<BuyPlanModal
  visible={modalVisible}
  plan={selectedPlan}
  onClose={() => setModalVisible(false)}
  onConfirm={handleConfirmPurchase}
/>;
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
});

export default HealthPlansLanding;
