import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const initialPlans = [
  {
    id: 1,
    name: 'Basic Care',
    tier: 'Basic',
    price: '₹199/month',
    features: ['OPD', 'Lab Tests'],
    status: 'Published',
  },
  {
    id: 2,
    name: 'Premium Wellness',
    tier: 'Premium',
    price: '₹799/month',
    features: ['OPD', 'Lab Tests', 'Ambulance', 'Telemedicine'],
    status: 'Draft',
  },
];

const PlanManagementScreen = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [previewPlan, setPreviewPlan] = useState(null);
  const [filterTier, setFilterTier] = useState('All');
  const [searchText, setSearchText] = useState('');

  const userRole = 'admin';

  const handleSave = () => {
    if (!editingPlan.name || !editingPlan.price) return;

    if (editingPlan.id) {
      setPlans((prev) =>
        prev.map((p) => (p.id === editingPlan.id ? editingPlan : p))
      );
    } else {
      setPlans((prev) => [
        ...prev,
        { ...editingPlan, id: Date.now(), status: 'Draft' },
      ]);
    }

    setEditingPlan(null);
    setShowModal(false);
  };

  const handleClone = (plan) => {
    if (userRole !== 'admin') return;
    const cloned = {
      ...plan,
      id: Date.now(),
      name: `${plan.name} (Clone)`,
      status: 'Draft',
    };
    setPlans((prev) => [...prev, cloned]);
  };

  const handleDelete = (id) => {
    Alert.alert('Confirm', 'Delete this plan?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => setPlans((prev) => prev.filter((p) => p.id !== id)),
      },
    ]);
  };

  const filteredPlans = plans.filter(
    (p) =>
      (filterTier === 'All' || p.tier === filterTier) &&
      p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🛠️ Plan Management</Text>

      <View style={styles.filterRow}>
        <TextInput
          style={styles.input}
          placeholder="Search plan..."
          onChangeText={setSearchText}
        />
        <TextInput
          style={styles.input}
          placeholder="Tier filter (All/Basic/Plus...)"
          value={filterTier}
          onChangeText={setFilterTier}
        />
        {userRole === 'admin' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setEditingPlan({ name: '', tier: 'Basic', price: '', features: [] });
              setShowModal(true);
            }}
          >
            <Icon name="add-circle" size={20} color="#fff" />
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredPlans.map((plan) => (
        <View key={plan.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{plan.name}</Text>
            <Text style={styles.status(plan.status)}>{plan.status}</Text>
          </View>

          <Text style={styles.tierText}>{plan.tier} Tier</Text>
          <Text style={styles.priceBox}>💰 {plan.price}</Text>

          <View style={styles.featureList}>
            {plan.features.map((feat, i) => (
              <Text key={i} style={styles.featureItem}>• {feat}</Text>
            ))}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity onPress={() => setPreviewPlan(plan)}>
              <Icon name="eye-outline" size={20} />
            </TouchableOpacity>
            {userRole === 'admin' && (
              <>
                <TouchableOpacity onPress={() => { setEditingPlan(plan); setShowModal(true); }}>
                  <Icon name="pencil-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleClone(plan)}>
                  <Icon name="copy-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(plan.id)}>
                  <Icon name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ))}

      {/* View Modal */}
      <Modal visible={!!previewPlan} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Plan Details</Text>
            {previewPlan && (
              <>
                <Text>Name: {previewPlan.name}</Text>
                <Text>Tier: {previewPlan.tier}</Text>
                <Text>Price: {previewPlan.price}</Text>
                <Text>Status: {previewPlan.status}</Text>
                <Text>Features:</Text>
                {previewPlan.features.map((f, i) => (
                  <Text key={i}>- {f}</Text>
                ))}
              </>
            )}
            <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => setPreviewPlan(null)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Create/Edit Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{editingPlan?.id ? 'Edit Plan' : 'New Plan'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editingPlan?.name}
              onChangeText={(v) => setEditingPlan((prev) => ({ ...prev, name: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Tier"
              value={editingPlan?.tier}
              onChangeText={(v) => setEditingPlan((prev) => ({ ...prev, tier: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={editingPlan?.price}
              onChangeText={(v) => setEditingPlan((prev) => ({ ...prev, price: v }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Features (comma-separated)"
              value={editingPlan?.features?.join(', ')}
              onChangeText={(v) => setEditingPlan((prev) => ({ ...prev, features: v.split(',').map((f) => f.trim()) }))}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'gray' }]} onPress={() => setShowModal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    flexGrow: 1,
    minWidth: 100,
    marginRight: 8,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  tierText: {
    fontStyle: 'italic',
    marginVertical: 4,
  },
  priceBox: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureList: {
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
  },
  status: (status) => ({
    color: status === 'Published' ? 'green' : 'gray',
    fontWeight: 'bold',
  }),
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default PlanManagementScreen;
