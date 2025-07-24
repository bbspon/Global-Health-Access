// Filename: PatientFeedbackEngineNative.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { submitFeedback } from './services/feedbackAPI';

const PatientFeedbackEngineNative = () => {
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');
  const [tags, setTags] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const validateAndSubmit = async () => {
    if (!type || !rating || !text) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }

    const token = await AsyncStorage.getItem('bbsUser');
    const parsedToken = JSON.parse(token)?.token;

    const form = {
      type,
      rating: parseInt(rating),
      tags: tags.split(',').map((tag) => tag.trim()),
      text,
    };

    if (image) {
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const typeMime = match ? `image/${match[1]}` : `image`;
      form.image = {
        uri: image,
        name: filename,
        type: typeMime,
      };
    }

    try {
      await submitFeedback(form, parsedToken);
      Alert.alert('Success', 'Feedback submitted!');
      setType('');
      setRating('');
      setTags('');
      setText('');
      setImage(null);
    } catch (err) {
      console.error('Submit Error:', err.response?.data || err.message);
      Alert.alert('Error', 'Submission failed');
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleVoiceInput = () => {
    Speech.speak('Please describe your experience. Your feedback will be saved.');
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
});

export default PatientFeedbackEngineNative;
