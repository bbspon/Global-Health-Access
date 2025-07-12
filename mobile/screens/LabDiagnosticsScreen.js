import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Card, Checkbox, Modal, Portal, Provider, Text, ActivityIndicator, Chip } from 'react-native-paper';

const MOCK_LABS = [
  {
    id: 1,
    name: 'LifeDiagnostics UAE',
    city: 'Dubai',
    tests: ['Blood', 'CBC', 'Thyroid'],
    homePickup: true,
  },
  {
    id: 2,
    name: 'Dr. Lal PathLabs',
    city: 'Delhi',
    tests: ['Lipid', 'Scan', 'Urine'],
    homePickup: false,
  },
  {
    id: 3,
    name: 'NABL Labs India',
    city: 'Mumbai',
    tests: ['Blood', 'Thyroid', 'Diabetes'],
    homePickup: true,
  },
];

const LabDiagnosticsScreen = () => {
  const [labs, setLabs] = useState([]);
  const [search, setSearch] = useState('');
  const [testType, setTestType] = useState('');
  const [location, setLocation] = useState('');
  const [homePickup, setHomePickup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLab, setSelectedLab] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchLabs();
  }, []);

  const fetchLabs = async () => {
    setLoading(true);
    try {
      // Replace with Axios call if needed
      setLabs(MOCK_LABS);
    } catch (e) {
      Alert.alert('Error', 'Unable to fetch lab data.');
    }
    setLoading(false);
  };

  const filteredLabs = labs.filter((lab) => {
    return (
      lab.name.toLowerCase().includes(search.toLowerCase()) &&
      (testType === '' || lab.tests.includes(testType)) &&
      (location === '' || lab.city.toLowerCase().includes(location.toLowerCase())) &&
      (!homePickup || lab.homePickup)
    );
  });

  const handleBooking = (lab) => {
    setSelectedLab(lab);
    setModalVisible(true);
  };

  const confirmBooking = () => {
    setModalVisible(false);
    Alert.alert('Booking Confirmed', `✅ Booking with ${selectedLab.name}`);
  };

  const testTypes = ['Blood', 'Scan', 'Urine', 'Thyroid'];

  return (
    <Provider>
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.header}>🧪 Book Lab & Diagnostic Tests</Text>

        <TextInput
          label="Search test or lab name"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
        <TextInput
          label="City or Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />

        <View style={styles.filterRow}>
          {testTypes.map((type) => (
            <Chip
              key={type}
              selected={testType === type}
              onPress={() => setTestType(testType === type ? '' : type)}
              style={styles.chip}
            >
              {type}
            </Chip>
          ))}
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            status={homePickup ? 'checked' : 'unchecked'}
            onPress={() => setHomePickup(!homePickup)}
          />
          <Text>Home Sample Pickup</Text>
        </View>

        <Button icon="magnify" mode="outlined" onPress={fetchLabs} style={styles.searchButton}>
          Search Labs
        </Button>

        {loading ? (
          <ActivityIndicator animating={true} size="large" style={{ marginTop: 30 }} />
        ) : (
          <FlatList
            data={filteredLabs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.card} mode="outlined">
                <Card.Title title={item.name} subtitle={item.city} />
                <Card.Content>
                  <Text>Tests: {item.tests.join(', ')}</Text>
                  <Text>Home Pickup: {item.homePickup ? '✅ Yes' : '❌ No'}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => handleBooking(item)}>Book</Button>
                </Card.Actions>
              </Card>
            )}
          />
        )}

        {/* Booking Modal */}
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modal}>
            <Text variant="titleMedium" style={{ marginBottom: 10 }}>Confirm Booking</Text>
            <Text>Lab: {selectedLab?.name}</Text>
            <Text>City: {selectedLab?.city}</Text>
            <View style={styles.modalButtons}>
              <Button mode="outlined" onPress={() => setModalVisible(false)} style={{ marginRight: 10 }}>Cancel</Button>
              <Button mode="contained" onPress={confirmBooking}>Confirm</Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

export default LabDiagnosticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchButton: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});
