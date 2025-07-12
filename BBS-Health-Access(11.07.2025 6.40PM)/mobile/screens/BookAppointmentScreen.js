import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  Picker,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { deductWalletAmountMobile } from '../services/walletAPI';

const BookAppointmentScreen = () => {
  const [form, setForm] = useState({
    type: 'doctor',
    providerName: '',
    doctorName: '',
    specialization: '',
    appointmentDate: '',
    slot: '',
    notes: '',
  });

  //Need to fix (e.g., medicine booking)
  
  const handlePrescriptionPayment = async () => {
    try {
      await deductWalletAmountMobile({
        amount: 300,
        usageType: 'prescription',
        referenceId: 'MED-789',
        note: 'Medicine Order',
      });
      alert('Wallet deducted successfully');
    } catch (err) {
      alert(
        'Error: ' + err?.response?.data?.error || 'Wallet deduction failed',
      );
    }
  };
  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const submit = async () => {
    await axios.post('https://yourdomain.com/api/appointments/book', form);
    alert('Appointment Booked');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>

      <Picker
        selectedValue={form.type}
        onValueChange={v => handleChange('type', v)}
      >
        <Picker.Item label="Doctor" value="doctor" />
        <Picker.Item label="Video" value="video" />
        <Picker.Item label="Lab" value="lab" />
      </Picker>

      <TextInput
        placeholder="Hospital/Lab"
        onChangeText={v => handleChange('providerName', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Doctor Name"
        onChangeText={v => handleChange('doctorName', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Specialization"
        onChangeText={v => handleChange('specialization', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        onChangeText={v => handleChange('appointmentDate', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Time Slot"
        onChangeText={v => handleChange('slot', v)}
        style={styles.input}
      />
      <TextInput
        placeholder="Notes"
        multiline
        onChangeText={v => handleChange('notes', v)}
        style={styles.textarea}
      />

      <Button title="Book Appointment" onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 6 },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 6,
    height: 100,
  },
});

export default BookAppointmentScreen;
