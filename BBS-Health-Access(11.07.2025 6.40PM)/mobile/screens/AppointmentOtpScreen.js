import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AppointmentOtpScreen = ({ phone, appointmentId }) => {
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);

  const sendOtp = () => {
    axios
      .post('https://yourdomain.com/api/otp/send-otp', { phone })
      .then(() => setSent(true));
  };

  const verifyOtp = async () => {
    const res = await axios.post('https://yourdomain.com/api/otp/verify-otp', {
      phone,
      otp,
    });
    if (res.data.verified) {
      await axios.post('https://yourdomain.com/api/appointments/confirm', {
        appointmentId,
      });
      alert('Confirmed!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP for Appointment</Text>
      {!sent ? (
        <Button title="Send OTP" onPress={sendOtp} />
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            onChangeText={setOtp}
            style={styles.input}
          />
          <Button title="Verify & Confirm" onPress={verifyOtp} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginTop: 10 },
});

export default AppointmentOtpScreen;
