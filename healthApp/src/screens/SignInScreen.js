import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HEALTHLOGO from '../assets/images/banner1.png';

const API_BASE_URL = 'https://healthcare.bbscart.com/api';
// Same base URL used in web (VITE_API_URI)

const SignInScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleSignIn = async () => {
  if (!email || !password) {
    Alert.alert('Validation Error', 'Email and password are required.');
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    const { token, user } = res.data;

    if (!token) {
      throw new Error('Token missing from response');
    }

    const sessionData = { token, user };

    await AsyncStorage.setItem('bbsUser', JSON.stringify(sessionData));

    // 🔍 LOG STORED DATA
    const storedData = await AsyncStorage.getItem('bbsUser');
    console.log('✅ AsyncStorage after login:', storedData);

    Alert.alert('Success', 'Login successful');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      'Login failed';
    Alert.alert('Login Error', msg);
  } finally {
    setLoading(false);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={HEALTHLOGO} style={styles.logo} />
        <Text style={styles.title}>BBS Global Health Access</Text>
        <Text style={styles.subtitle}>
          Sign in to manage your health services
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4FBFD',
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 260,
    height: 160,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cce4f2',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#2E86AB',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#555',
  },
  link: {
    color: '#2E86AB',
    fontWeight: 'bold',
  },
});
