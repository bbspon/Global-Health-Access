// Filename: PatientFeedbackEngineNative.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';

const PatientFeedbackEngineNative = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');
  const [tags, setTags] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const validateAndSubmit = () => {
    if (!type || !rating || !text) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }

    const newEntry = {
      id: `FB${feedbacks.length + 1}`,
      type,
      rating: parseInt(rating),
      tags: tags.split(',').map(tag => tag.trim()),
      text,
      image,
      sentiment: rating >= 4 ? 'Positive' : 'Negative',
      status: rating < 3 ? 'Escalated' : 'Closed',
      impact: rating < 3 ? 'Flagged to hospital compliance' : 'Added to hospital NPS',
    };

    setFeedbacks([newEntry, ...feedbacks]);
    setType('');
    setRating('');
    setTags('');
    setText('');
    setImage(null);
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleVoiceInput = () => {
    Speech.speak('Please describe your experience. Your feedback will be saved.');
    // For live speech-to-text, additional library needed (e.g. react-native-voice)
    Alert.alert('Voice Input', 'Voice prompt triggered. (Speech-to-text not implemented)');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>📊 Patient Feedback</Text>

      <Text style={styles.label}>Service Type *</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} placeholder="e.g. Lab Test" />

      <Text style={styles.label}>Rating (1-5) *</Text>
      <TextInput style={styles.input} value={rating} onChangeText={setRating} keyboardType="numeric" />

      <Text style={styles.label}>Tags</Text>
      <TextInput style={styles.input} value={tags} onChangeText={setTags} placeholder="e.g. Clean, Delay" />

      <Text style={styles.label}>Feedback *</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={text}
        onChangeText={setText}
        placeholder="Write your experience"
        multiline
        numberOfLines={4}
      />

      <View style={styles.row}>
        <Button title="🎤 Voice Input" onPress={handleVoiceInput} />
        <Button title="📷 Upload Image" onPress={handlePickImage} />
      </View>

      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}

      <Button title="Submit Feedback" color="green" onPress={validateAndSubmit} />

      <Text style={styles.subheading}>📋 Submitted Feedbacks</Text>
      {feedbacks.map((fb) => (
        <View key={fb.id} style={styles.card}>
          <Text><Text style={styles.bold}>Type:</Text> {fb.type}</Text>
          <Text><Text style={styles.bold}>Rating:</Text> {fb.rating}</Text>
          <Text><Text style={styles.bold}>Tags:</Text> {fb.tags.join(', ')}</Text>
          <Text><Text style={styles.bold}>Feedback:</Text> {fb.text}</Text>
          <Text><Text style={styles.bold}>Status:</Text> {fb.status}</Text>
          <Text><Text style={styles.bold}>Impact:</Text> {fb.impact}</Text>
          {fb.image && <Image source={{ uri: fb.image }} style={styles.imageThumb} />}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginTop: 4 },
  textArea: { height: 80 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  imagePreview: { width: '100%', height: 200, borderRadius: 10, marginVertical: 10 },
  imageThumb: { width: 100, height: 100, marginTop: 8, borderRadius: 8 },
  subheading: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  card: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginBottom: 10 },
  bold: { fontWeight: 'bold' },
});

export default PatientFeedbackEngineNative;
