import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const communities = [
  { name: "Diabetes Circle", tags: ["Condition"], members: 5200 },
  { name: "Mindful Living", tags: ["Wellness", "Mental"], members: 3400 },
  { name: "PCOS Support", tags: ["Women's Health"], members: 2300 },
  { name: "Ayurveda Healing", tags: ["Lifestyle"], members: 1800 },
];

export default function VirtualHealthCommunityScreen() {
  const [language, setLanguage] = useState("en");
  const [anonymous, setAnonymous] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleJoin = () => {
    if (!anonymous) return;

    if (!joinedGroups.includes(selectedGroup.name)) {
      setJoinedGroups([...joinedGroups, selectedGroup.name]);
      Alert.alert("Success", `Joined ${selectedGroup.name} anonymously.`);
    }

    setShowModal(false);
    setMessage("");
    setSelectedGroup(null);
  };

  const renderGroup = ({ item }) => {
    const isJoined = joinedGroups.includes(item.name);
    return (
      <View style={styles.card}>
        <Text style={styles.groupName}>{item.name}</Text>
        <Text style={styles.badge}>{item.tags.join(", ")}</Text>
        <Text style={styles.memberText}>{item.members} members</Text>
        <TouchableOpacity
          style={[styles.joinButton, isJoined && styles.joinedButton]}
          disabled={isJoined}
          onPress={() => {
            setSelectedGroup(item);
            setShowModal(true);
          }}
        >
          <Text style={styles.joinButtonText}>{isJoined ? "Joined" : "Join"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌐 Virtual Health Communities</Text>
      <Text style={styles.subHeader}>
        Join peer-led groups, share experiences, attend AMAs, and stay motivated.
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>🌍 Language:</Text>
        <TouchableOpacity
          onPress={() => {
            const nextLang = language === "en" ? "hi" : language === "hi" ? "ar" : "en";
            setLanguage(nextLang);
            Alert.alert("Selected Language", nextLang.toUpperCase());
          }}
        >
          <Text style={styles.langOption}>{language.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Join Anonymously:</Text>
        <Switch
          value={anonymous}
          onValueChange={setAnonymous}
        />
      </View>

      <FlatList
        data={communities}
        renderItem={renderGroup}
        keyExtractor={(item) => item.name}
      />

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>👥 Join: {selectedGroup?.name}</Text>

            <TextInput
              style={styles.input}
              placeholder="Say hello..."
              value={message}
              onChangeText={setMessage}
            />

            <View style={styles.iconRow}>
              <Ionicons name="mic-outline" size={24} color="#333" style={styles.icon} />
              <Ionicons name="videocam-outline" size={24} color="#333" style={styles.icon} />
            </View>

            {!anonymous && (
              <Text style={styles.warning}>⚠️ Anonymous mode must be ON to join.</Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setShowModal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, !anonymous && styles.disabledBtn]}
                disabled={!anonymous}
                onPress={handleJoin}
              >
                <Text style={{ color: anonymous ? "#fff" : "#aaa" }}>
                  Confirm & Join
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  subHeader: { marginBottom: 16, color: "#555" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  label: { fontSize: 16, marginRight: 10 },
  langOption: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  groupName: { fontSize: 18, fontWeight: "bold" },
  badge: { backgroundColor: "#cde", padding: 4, borderRadius: 4, marginTop: 4 },
  memberText: { color: "#555", marginTop: 4 },
  joinButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  joinedButton: { backgroundColor: "gray" },
  joinButtonText: { color: "#fff", fontWeight: "600" },

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  icon: { marginRight: 16 },
  warning: { color: "red", marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: "#eee",
    marginRight: 10,
  },
  disabledBtn: {
    backgroundColor: "#ccc",
  },
});
