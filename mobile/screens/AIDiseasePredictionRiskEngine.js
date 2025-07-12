import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Linking, TextInput, Dimensions } from 'react-native';
import { Card, Button, Modal, Portal, ProgressBar } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;

const AIDiseasePredictionRiskEngine = () => {
  const [visibleExplain, setVisibleExplain] = useState(false);
  const [visiblePlans, setVisiblePlans] = useState(false);
  const [visibleSync, setVisibleSync] = useState(false);
  const [visibleAsk, setVisibleAsk] = useState(false);
  const [question, setQuestion] = useState('');

  const riskData = {
    diabetes: 68,
    cardiac: 44,
    mental: 22,
    ortho: 15,
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [55, 58, 61, 65, 68],
        strokeWidth: 2,
        color: () => `#e74c3c`,
      },
    ],
    legend: ['Diabetes Risk %'],
  };

  const handleBookNow = () => {
    Linking.openURL('https://yourdomain.com/hospital-booking');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🧠 AI Disease Risk & Early Warning</Text>

      {Object.entries(riskData).map(([key, val]) => (
        <Card key={key} style={styles.card}>
          <Card.Title title={key.toUpperCase()} />
          <Card.Content>
            <ProgressBar progress={val / 100} color={val > 60 ? '#e74c3c' : '#f39c12'} />
            <Text>{val}% Risk</Text>
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.card}>
        <Card.Title title="🧬 Smart AI Suggestions" />
        <Card.Content>
          <Text>• 🚶 Walk 6,000+ steps/day</Text>
          <Text>• 🥣 High-fiber breakfast</Text>
          <Text>• 🛌 Sleep 7.5+ hours</Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.alertCard]}>
        <Card.Content>
          <Text style={{ color: '#fff' }}>⚠️ You're entering the red zone for Diabetes. Act within 7 days.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="📦 Smart Plan Suggestion" />
        <Card.Content>
          <Text>Upgrade to the Metabolic Care Plan for free HbA1c, dietician, and more.</Text>
          <Button onPress={() => setVisiblePlans(true)} mode="outlined" style={styles.button}>Explore Plan Options</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="📊 Risk Reduction Progress" />
        <Card.Content>
          <Text>✅ 30 days walking: BP improved from 140/90 → 130/85</Text>
          <Text>✅ Low-carb diet: HbA1c reduced from 6.4% → 6.0%</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="🔔 Upcoming Screenings" />
        <Card.Content>
          <Text>📅 HbA1c in 5 days</Text>
          <Text>📅 Cholesterol in 2 weeks</Text>
          <Button mode="outlined" onPress={handleBookNow} style={styles.button}>Book Now</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="⌚ Sync Wearable Device" />
        <Card.Content>
          <Text>Connect Fitbit, Apple Watch or Garmin.</Text>
          <Button mode="contained" onPress={() => setVisibleSync(true)} style={styles.button}>Sync My Device</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="👨‍👩‍👧‍👦 Family Risk Overview" />
        <Card.Content>
          <Text>Your sibling has diabetes. Consider preventive HbA1c within 6 months.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="🧠 AI Doctor Chat" />
        <Card.Content>
          <Text><Text style={styles.bold}>You:</Text> Why is my sugar rising?</Text>
          <Text><Text style={styles.bold}>AI:</Text> Weight + inactivity = higher glucose risk.</Text>
          <Button icon="microphone" mode="contained" onPress={() => setVisibleAsk(true)} style={styles.button}>Ask More</Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="📉 Risk Timeline Forecast" />
        <Card.Content>
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: () => `#e74c3c`,
              labelColor: () => '#555',
            }}
            bezier
            style={{ borderRadius: 10 }}
          />
        </Card.Content>
      </Card>

      {/* Footer buttons */}
      <View style={styles.footer}>
        <Button mode="outlined" onPress={() => setVisibleExplain(true)} icon="information">
          Why This Prediction?
        </Button>
      </View>

      {/* Modals */}
      <Portal>
        <Modal visible={visibleExplain} onDismiss={() => setVisibleExplain(false)} contentContainerStyle={styles.modal}>
          <Text>AI analyzed your lab trends, activity, and historical data — resulting in 68% diabetes risk.</Text>
        </Modal>

        <Modal visible={visiblePlans} onDismiss={() => setVisiblePlans(false)} contentContainerStyle={styles.modal}>
          <Text>Plans:</Text>
          <Text>• Basic Plan: Annual checkups</Text>
          <Text>• Metabolic Care: Dietician + HbA1c</Text>
          <Text>• Complete Health: Full coverage</Text>
        </Modal>

        <Modal visible={visibleSync} onDismiss={() => setVisibleSync(false)} contentContainerStyle={styles.modal}>
          <Text>Select your device to sync:</Text>
          <Text>• Fitbit</Text>
          <Text>• Apple Watch</Text>
          <Text>• Samsung Health</Text>
        </Modal>

        <Modal visible={visibleAsk} onDismiss={() => setVisibleAsk(false)} contentContainerStyle={styles.modal}>
          <Text>Ask your question:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. How to lower cholesterol?"
            value={question}
            onChangeText={setQuestion}
          />
          <Button style={styles.button}>Send to AI</Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default AIDiseasePredictionRiskEngine;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f7fb',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2c3e50',
  },
  card: {
    marginBottom: 16,
    paddingBottom: 8,
  },
  alertCard: {
    backgroundColor: '#e74c3c',
  },
  button: {
    marginTop: 10,
  },
  footer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});
