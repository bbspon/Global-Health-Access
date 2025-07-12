import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Button, Menu, Divider, Provider as PaperProvider } from 'react-native-paper';

const features = [
  { icon: 'heart-pulse', label: 'Health Access Plans', route: 'Plans' },
  { icon: 'calendar-check', label: 'Book Doctor / Lab', route: 'Book' },
  { icon: 'account-badge', label: 'My Health Card', route: 'HealthCard' },
  { icon: 'file-document', label: 'Medical Records', route: 'MedicalRecords' },
  { icon: 'map-marker', label: 'Nearby Hospitals', route: 'Hospitals' },
  { icon: 'robot', label: 'BB Health Assistant', route: 'AIAssistant' },
  { icon: 'credit-card', label: 'My Wallet', route: 'Wallet' },
  { icon: 'storefront', label: 'BBSCART Offers', route: 'Offers' },
];

const HomeDashboardScreen = () => {
  const navigation = useNavigation();
  const [visibleLang, setVisibleLang] = React.useState(false);
  const [visibleRegion, setVisibleRegion] = React.useState(false);

  const openMenu = (setter) => setter(true);
  const closeMenu = (setter) => setter(false);

  const handleQuickAction = (action) => {
    Alert.alert('Quick Action', `Triggered: ${action}`);
  };

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Welcome to <Text style={styles.brand}>BBSCART Health</Text></Text>
            <Text style={styles.subtitle}>Futuristic Health Access Dashboard</Text>
          </View>

          <View style={styles.actions}>
            <Menu
              visible={visibleRegion}
              onDismiss={() => closeMenu(setVisibleRegion)}
              anchor={
                <Button mode="outlined" icon="earth" textColor="white" onPress={() => openMenu(setVisibleRegion)}>
                  UAE
                </Button>
              }>
              <Menu.Item onPress={() => {}} title="India 🇮🇳" />
              <Menu.Item onPress={() => {}} title="UAE 🇦🇪" />
              <Menu.Item onPress={() => {}} title="Global 🌐" />
            </Menu>

            <Menu
              visible={visibleLang}
              onDismiss={() => closeMenu(setVisibleLang)}
              anchor={
                <Button mode="outlined" icon="account" textColor="white" onPress={() => openMenu(setVisibleLang)}>
                  Language
                </Button>
              }>
              <Menu.Item onPress={() => {}} title="English" />
              <Menu.Item onPress={() => {}} title="Arabic" />
              <Menu.Item onPress={() => {}} title="Hindi" />
            </Menu>

            <Button mode="outlined" icon="weather-night" textColor="white" onPress={() => {}}>
              Dark Mode
            </Button>
            <Button mode="outlined" icon="bell-outline" textColor="white" onPress={() => {}}>
              Alerts
            </Button>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.grid}>
          {features.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(item.route)}
            >
              <MaterialCommunityIcons name={item.icon} size={32} color="#0d6efd" />
              <Text style={styles.cardText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <Card style={styles.quickCard}>
          <Card.Content>
            <Text style={styles.quickTitle}>⚡ Quick Actions</Text>
            <View style={styles.quickActions}>
              <Button mode="contained" onPress={() => handleQuickAction('Switch User')} buttonColor="#28a745">Switch User</Button>
              <Button mode="contained" onPress={() => handleQuickAction('Emergency Mode')} buttonColor="#dc3545">Emergency Mode</Button>
              <Button mode="contained" onPress={() => handleQuickAction('Health Tips')} buttonColor="#0dcaf0">Health Tips</Button>
              <Button mode="contained" onPress={() => handleQuickAction('Profile')} buttonColor="#212529">Profile</Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203a43',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  brand: {
    color: '#0dcaf0',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#cccccc',
  },
  actions: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'flex-start',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#ffffff10',
    borderWidth: 1,
    borderColor: '#ffffff22',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    marginTop: 8,
    fontWeight: '600',
    textAlign: 'center',
  },
  quickCard: {
    backgroundColor: '#ffffff10',
    marginTop: 30,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  quickTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
});

export default HomeDashboardScreen;
