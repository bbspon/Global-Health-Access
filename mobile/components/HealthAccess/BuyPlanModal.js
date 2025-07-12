import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  CheckBox,
} from 'react-native';

const BuyPlanModal = ({ visible, onClose, plan, onConfirm }) => {
  const [accepted, setAccepted] = React.useState(false);

  if (!plan) return null;

  const badgeColor =
    {
      basic: '#6c757d',
      premium: '#17a2b8',
      super_premium: '#ffc107',
    }[plan.tier] || '#343a40';

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            Buy Plan: {plan.name}
            {'  '}
            <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
              {plan.tier.toUpperCase()}
            </Text>
          </Text>

          <Text style={styles.price}>₹ {plan.price} / year</Text>

          <ScrollView style={styles.features}>
            {plan.features.map((f, i) => (
              <Text key={i} style={styles.feature}>
                ✔ {f}
              </Text>
            ))}
          </ScrollView>

          <View style={styles.row}>
            <CheckBox value={accepted} onValueChange={setAccepted} />
            <Text style={styles.agree}>I accept the terms and conditions</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirm, !accepted && { backgroundColor: '#ccc' }]}
              onPress={() => accepted && onConfirm(plan)}
              disabled={!accepted}
            >
              <Text style={styles.btnTextWhite}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modal: { margin: 20, backgroundColor: '#fff', borderRadius: 10, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  badge: { paddingHorizontal: 6, color: '#fff', borderRadius: 4, fontSize: 12 },
  price: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  features: { maxHeight: 100, marginBottom: 10 },
  feature: { fontSize: 13, color: '#555' },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  agree: { marginLeft: 8, fontSize: 13 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancel: { padding: 10 },
  confirm: { padding: 10, backgroundColor: '#28a745', borderRadius: 6 },
  btnText: { color: '#28a745', fontWeight: '600' },
  btnTextWhite: { color: '#fff', fontWeight: '600' },
});

export default BuyPlanModal;
