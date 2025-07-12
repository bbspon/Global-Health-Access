import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

const HospitalOnboardingForm = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [specialties, setSpecialties] = useState("");

  const handleSubmit = () => {
    // API call to save onboarding info
    console.log({ hospitalName, registrationNo, specialties });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hospital Onboarding</Text>
      <TextInput
        placeholder="Hospital Name"
        style={styles.input}
        value={hospitalName}
        onChangeText={setHospitalName}
      />
      <TextInput
        placeholder="Registration Number"
        style={styles.input}
        value={registrationNo}
        onChangeText={setRegistrationNo}
      />
      <TextInput
        placeholder="Specialties (comma separated)"
        style={styles.input}
        value={specialties}
        onChangeText={setSpecialties}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default HospitalOnboardingForm;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
