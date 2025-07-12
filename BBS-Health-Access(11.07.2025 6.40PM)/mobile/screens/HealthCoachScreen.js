import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  TextInput,
} from "react-native";
import { Card } from "react-native-paper";
import ProgressBar from "react-native-progress/Bar";

const HealthCoachScreen = () => {
  const [simResult, setSimResult] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatReply, setChatReply] = useState("");

  const handleSimulation = () => {
    setSimResult({
      risk: "🔴 High Risk",
      message: "3 missed insulin doses + high sugar trend",
      advice: "Schedule endocrinologist call. AI suggests insulin dose check.",
    });
  };

  const handleChat = () => {
    if (chatInput.toLowerCase().includes("insulin")) {
      setChatReply("Next insulin dose is at 7PM. Don’t forget to eat 30 mins before.");
    } else if (chatInput.toLowerCase().includes("sugar")) {
      setChatReply("Sugar average this week is 168 mg/dL — slightly high.");
    } else {
      setChatReply("Let me check your vitals... please wait.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>💡 AI Health Coach</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Plan: Chronic Care (Diabetes Pro+)</Text>
          <Text>Avg Glucose: 168 mg/dL</Text>
          <Text>Adherence: 72%</Text>
          <ProgressBar progress={0.72} width={null} style={{ marginVertical: 8 }} />
          <Text>Mood: 😐 Low Energy</Text>
          <Text>Sleep Avg: 5.6 hrs</Text>
          <Button title="Run Risk Simulation" onPress={handleSimulation} />
        </Card.Content>
      </Card>

      {simResult && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.subhead}>🧪 Simulation Result</Text>
            <Text>Risk: {simResult.risk}</Text>
            <Text>Message: {simResult.message}</Text>
            <Text>Advice: {simResult.advice}</Text>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subhead}>💬 Ask Your AI Health Coach</Text>
          <TextInput
            placeholder="Ask about insulin, sugar, or next checkup"
            value={chatInput}
            onChangeText={setChatInput}
            style={styles.input}
          />
          <Button title="Ask Coach" onPress={handleChat} />
          {chatReply ? <Text style={{ marginTop: 10 }}>{chatReply}</Text> : null}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subhead}>👨‍👩‍👧 Caregiver View</Text>
          <Text>Fatima’s last 7-day trend: Sugar ↑, Mood ↓</Text>
          <Text>✅ You acknowledged last alert on 8th July</Text>
          <Button title="Notify Fatima Now" onPress={() => Alert.alert("Notification Sent")} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  subhead: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  card: {
    marginBottom: 20,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default HealthCoachScreen;
