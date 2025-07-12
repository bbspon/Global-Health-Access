import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const languages = [
  "All Languages",
  "English",
  "Hindi",
  "Tamil",
  "Arabic",
  "Telugu",
  "French",
  "Spanish",
];

const supportChats = [
  {
    id: '1',
    user: 'User9981',
    issue: 'Plan Upgrade',
    language: 'Telugu',
    status: 'Resolved',
    escalation: 'Bot',
    satisfaction: 5,
  },
  {
    id: '2',
    user: 'User3041',
    issue: 'Booking Failed',
    language: 'Hindi',
    status: 'Escalated',
    escalation: 'Admin',
    satisfaction: 2,
  },
  {
    id: '3',
    user: 'User5566',
    issue: 'Report Confusion',
    language: 'English',
    status: 'Resolved',
    escalation: 'Agent',
    satisfaction: 4,
  },
];

const MultilingualSupportScreen = () => {
  const [language, setLanguage] = useState('All Languages');
  const [selectedChat, setSelectedChat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredChats =
    language === 'All Languages'
      ? supportChats
      : supportChats.filter(chat => chat.language === language);

  const openChat = (chat) => {
    setSelectedChat(chat);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🌐 Multilingual Support (Mobile)</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={language}
          onValueChange={(itemValue) => setLanguage(itemValue)}
          style={styles.picker}
        >
          {languages.map((lang) => (
            <Picker.Item label={lang} value={lang} key={lang} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openChat(item)}
          >
            <Text style={styles.cardTitle}>{item.user}</Text>
            <Text>Issue: {item.issue}</Text>
            <Text>Language: {item.language}</Text>
            <Text>Escalation: {item.escalation}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Satisfaction: {item.satisfaction} ⭐</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No records found for selected language.</Text>
        }
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text style={styles.modalTitle}>Chat: {selectedChat?.user}</Text>
              <Text>Language: {selectedChat?.language}</Text>
              <Text>Issue: {selectedChat?.issue}</Text>
              <Text>Status: {selectedChat?.status}</Text>
              <Text>Escalation: {selectedChat?.escalation}</Text>
              <Text>Satisfaction: {selectedChat?.satisfaction} ⭐</Text>
              <Text style={{ marginTop: 10 }}>
                Transcript: [Simulated chat transcript goes here...]
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MultilingualSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 50,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 20,
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 12,
    marginTop: 20,
    borderRadius: 6,
  },
  closeText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 30,
  },
});
