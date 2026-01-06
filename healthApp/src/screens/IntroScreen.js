import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import IntroImage from '../assets/images/banner1.png'; // replace with your healthcare logo/illustration
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={IntroImage}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.heading}>
        Your Health, Our Priority
      </Text>

      <Text style={styles.subText}>
        Book doctor appointments, track your medicines,{"\n"}get lab tests, and manage your health with ease.
      </Text>

      {/* Custom Styled Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Secondary action */}
      <TouchableOpacity 
        style={styles.secondaryButton} 
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.secondaryButtonText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5F9FF',
  },
  image: {
    width: 450,
    height: 450,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1E3A8A',
  },
  subText: {
    fontSize: 15,
    marginBottom: 40,
    paddingHorizontal: 10,
    lineHeight: 24,
    textAlign: 'center',
    color: '#374151',
  },
  button: {
    backgroundColor: '#34D399', // green = health/vitality
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    ...(Platform.OS === 'web' && { cursor: 'pointer' }),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 20,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
});

export default IntroScreen;
