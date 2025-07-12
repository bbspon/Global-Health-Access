import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const stakeholders = [
  {
    role: 'User (Patient)',
    icon: 'person-circle-outline',
    description:
      'Customer who buys and benefits from Care Pass. Accesses hospitals, labs, pharmacies at low cost.',
    action: 'Explore Membership',
  },
  {
    role: 'Hospital',
    icon: 'medkit-outline',
    description:
      'Healthcare provider offering consultations, treatments, or health packages via the BBSCART ecosystem.',
    action: 'Join as Hospital',
  },
  {
    role: 'Lab / Scan Center',
    icon: 'flask-outline',
    description:
      'Diagnostic partner offering tests, scans, reports integrated with the patient journey.',
    action: 'Join as Lab Partner',
  },
  {
    role: 'Pharmacy',
    icon: 'bandage-outline',
    description:
      'Medicine fulfillment partner that delivers prescriptions generated through hospitals.',
    action: 'Join Pharmacy Network',
  },
  {
    role: 'BBSCART Admin',
    icon: 'settings-outline',
    description:
      'Platform administrator managing onboarding, wallet, pricing, commissions, and all interactions.',
    action: 'Go to Admin Panel',
  },
  {
    role: 'Referral Agent / Business Partner',
    icon: 'person-add-outline',
    description:
      'Earn commission by referring users, hospitals, or labs into the BBSCART platform.',
    action: 'Refer & Earn',
  },
  {
    role: 'Government / NGO (Sponsor)',
    icon: 'earth-outline',
    description:
      'Sponsor health coverage for low-income individuals via BBSCART. See your impact in dashboards.',
    action: 'Become a Sponsor',
  },
];

const testimonials = [
  {
    quote: 'Thanks to BBSCART Care Pass, I got affordable tests done without hassle!',
    name: 'Aarti, Mumbai',
    role: 'User',
  },
  {
    quote: 'Joining the BBSCART network helped grow our diagnostic business quickly.',
    name: 'Dr. Patel',
    role: 'Lab Partner',
  },
  {
    quote: "We've onboarded 100+ users via referrals. Great earnings!",
    name: 'Rajesh',
    role: 'Referral Agent',
  },
];

const StakeholdersPage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👥 Stakeholders in the BBSCART Ecosystem</Text>
      <Text style={styles.subtitle}>These key contributors make affordable healthcare possible.</Text>

      {stakeholders.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => setSelected(item)}
        >
          <View style={styles.iconRow}>
            <Icon name={item.icon} size={26} color="#007bff" style={styles.icon} />
            <Text style={styles.cardTitle}>{item.role}</Text>
          </View>
          <Text style={styles.cardText}>{item.description}</Text>
          <Text style={styles.actionButton}>{item.action}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal */}
      <Modal visible={!!selected} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selected?.role}</Text>
            <Text style={styles.modalDescription}>{selected?.description}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setSelected(null)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Diagram */}
      <View style={styles.diagramContainer}>
        <Text style={styles.sectionTitle}>🔄 How the Ecosystem Works</Text>
        <Text style={styles.sectionSubtitle}>Sponsor → User → Hospital → Lab/Pharmacy → Admin → Agent</Text>
        <Image
          source={{
            uri: 'https://www.researchgate.net/profile/Roberto-Moro-Visconti/publication/341549427/figure/fig2/AS:893645062410241@1590072994517/The-Healthcare-Ecosystem.png',
          }}
          style={styles.diagramImage}
          resizeMode="contain"
        />
      </View>

      {/* Testimonials */}
      <View style={styles.testimonials}>
        <Text style={styles.sectionTitle}>💬 What Our Stakeholders Say</Text>
        {testimonials.map((t, idx) => (
          <View key={idx} style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>“{t.quote}”</Text>
            <Text style={styles.testimonialAuthor}>
              - {t.name}, {t.role}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  actionButton: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#444',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  diagramContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  diagramImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
  testimonials: {
    marginTop: 30,
  },
  testimonialCard: {
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  testimonialText: {
    fontStyle: 'italic',
    marginBottom: 6,
    color: '#333',
  },
  testimonialAuthor: {
    fontWeight: '500',
    color: '#666',
    textAlign: 'right',
  },
});

export default StakeholdersPage;
