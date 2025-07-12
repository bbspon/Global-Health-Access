import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const PlanDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://yourdomain.com/api/health-plans/${id}`)
      .then(res => setPlan(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {plan ? (
        <>
          <Text style={styles.title}>{plan.title}</Text>
          <Text style={styles.tier}>{plan.tier} Tier</Text>
          <Text style={styles.price}>₹{plan.price}</Text>
          <Text style={styles.validity}>Validity: {plan.validity}</Text>

          <Text style={styles.section}>Benefits:</Text>
          {plan.benefits?.map((b, i) => (
            <Text key={i}>• {b}</Text>
          ))}

          {plan.extras?.length > 0 && (
            <>
              <Text style={styles.section}>Extras:</Text>
              {plan.extras.map((ex, i) => (
                <Text key={i}>• {ex}</Text>
              ))}
            </>
          )}

          <TouchableOpacity
            style={styles.buyBtn}
            onPress={() => navigation.navigate('BuyPlanScreen', { plan })}
          >
            <Text style={styles.buyText}>Buy This Plan</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Plan not found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold' },
  tier: { fontSize: 14, color: '#007bff', marginVertical: 4 },
  price: { fontSize: 18, marginVertical: 4 },
  validity: { fontSize: 14, marginBottom: 12 },
  section: { fontSize: 16, fontWeight: 'bold', marginTop: 16 },
  buyBtn: {
    backgroundColor: '#28a745',
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  buyText: { color: '#fff', fontSize: 16 },
});

export default PlanDetailsScreen;
