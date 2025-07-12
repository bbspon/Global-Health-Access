// File: PublicPartnerMobile.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const sections = [
  { key: "govt", title: "🏛 Government Care Pass", example: "Show OPD spike zones for govt plans." },
  { key: "corp", title: "🏢 Corporate HR Wellness", example: "Which teams have absenteeism risk?" },
  { key: "ngo", title: "🤝 NGO Sponsored Access", example: "Track OPD usage in tribal regions." },
  { key: "mass", title: "🌍 Mass Adoption Strategy", example: "School family plan usage by region?" },
];

const simulatedAIResponse = {
  govt: "✅ OPD surge in Bhagalpur, Bihar. Consider activating emergency plan booster.",
  corp: "⚠️ Unit-3 Logistics team has 20% absenteeism in last 2 weeks.",
  ngo: "📊 68% of rural tribal beneficiaries used OPD this quarter.",
  mass: "📈 Highest usage in Tamil Nadu Tier-3 schools. Family opt-in rate: 82%.",
};

const PublicPartnerMobile = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [aiResult, setAIResult] = useState("");
  const [loading, setLoading] = useState(false);

  const openAIFor = (section) => {
    setSelectedSection(section);
    setAIPrompt(section.example);
    setAIResult("");
    setShowModal(true);
  };

  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;

    setLoading(true);
    setAIResult("");

    // Simulate API delay
    setTimeout(() => {
      const response = simulatedAIResponse[selectedSection.key] || "🤖 AI could not process request.";
      setAIResult(response);
      setLoading(false);
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🌐 BBSCART Access Partnerships</Text>
      <Text style={styles.subtext}>Empowering Govt, Employers, NGOs & Families with digital health</Text>

      {sections.map((section, idx) => (
        <TouchableOpacity
          key={idx}
          style={styles.card}
          onPress={() => openAIFor(section)}
        >
          <Text style={styles.cardTitle}>{section.title}</Text>
          <Text style={styles.cardDesc}>Tap to ask insights or track updates</Text>
        </TouchableOpacity>
      ))}

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>🧠 Ask {selectedSection?.title} AI Bot</Text>
          <TextInput
            value={aiPrompt}
            onChangeText={setAIPrompt}
            style={styles.input}
            placeholder="Type your AI prompt"
            multiline
          />
          <Button title="Ask AI" onPress={handleAskAI} color="#007bff" />
          {loading && (
            <ActivityIndicator size="small" color="#000" style={{ marginTop: 15 }} />
          )}
          {aiResult ? (
            <View style={styles.responseBox}>
              <Text style={styles.responseText}>{aiResult}</Text>
            </View>
          ) : null}
          <Button title="Close" color="#6c757d" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PublicPartnerMobile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    marginBottom: 20,
    color: "#555",
  },
  card: {
    backgroundColor: "#e6f2ff",
    padding: 16,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  responseBox: {
    backgroundColor: "#d1e7dd",
    padding: 12,
    marginVertical: 15,
    borderRadius: 8,
  },
  responseText: {
    color: "#0f5132",
  },
});
