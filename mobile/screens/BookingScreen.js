import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Linking } from 'react-native';

const BookingScreen = () => {
  const [bookingType, setBookingType] = useState('opd');
  const [provider, setProvider] = useState('');
  const [datetime, setDatetime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleBooking = () => {
    const message = `✅ Hello ${patientName}, your ${bookingType.toUpperCase()} appointment with ${provider} on ${datetime.toLocaleString()} is confirmed. – BBSCART Health`;
    const url = `https://wa.me/${mobile}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
    Alert.alert('✔️ Booking Confirmed', 'WhatsApp notification sent.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📅 Book Appointment</Text>

      <Text style={styles.label}>Service Type</Text>
      <Picker selectedValue={bookingType} onValueChange={(value) => setBookingType(value)} style={styles.input}>
        <Picker.Item label="OPD" value="opd" />
        <Picker.Item label="Lab Test" value="lab" />
        <Picker.Item label="Scan" value="scan" />
        <Picker.Item label="Video Consultation" value="video" />
        <Picker.Item label="Home Collection" value="home" />
      </Picker>

      <Text style={styles.label}>Doctor/Lab</Text>
      <TextInput style={styles.input} value={provider} onChangeText={setProvider} placeholder="e.g. Dr. Nivedita" />

      <Text style={styles.label}>Date & Time</Text>
      <Button title={datetime.toLocaleString()} onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker value={datetime} mode="datetime" display="default" onChange={(e, selectedDate) => {
          setShowPicker(false);
          if (selectedDate) setDatetime(selectedDate);
        }} />
      )}

      <Text style={styles.label}>Patient Name</Text>
      <TextInput style={styles.input} value={patientName} onChangeText={setPatientName} placeholder="Your Name" />

      <Text style={styles.label}>Mobile for WhatsApp</Text>
      <TextInput style={styles.input} value={mobile} onChangeText={setMobile} placeholder="+919999999999" keyboardType="phone-pad" />

      <View style={{ marginTop: 20 }}>
        <Button title="Confirm Booking" onPress={handleBooking} color="#28a745" />
      </View>
    </ScrollView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
  },
});
