// 📱 React Native Code – Medical Records Vault Screen

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const MedicalVaultScreen = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchRecords = async () => {
    setRecords([
      {
        id: '1',
        name: 'CBC Lab Report',
        type: 'Lab',
        date: '2025-07-01',
        tags: ['Blood', 'General'],
        url: '#'
      },
      {
        id: '2',
        name: 'Prescription - Dr. Kumar',
        type: 'OPD',
        date: '2025-06-25',
        tags: ['Diabetes'],
        url: '#'
      }
    ]);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (!result.canceled && result.assets) {
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        setUploadModalVisible(false);
        Alert.alert('Upload Complete', 'Your record has been uploaded.');
        fetchRecords();
      }, 2000);
    }
  };

  const filtered = records.filter(rec => rec.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧬 My Medical Vault</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search records..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}><MaterialIcons name="description" size={18} /> {item.name}</Text>
            <Text style={styles.cardText}>Type: {item.type}</Text>
            <Text style={styles.cardText}>Date: {item.date}</Text>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, idx) => (
                <View key={idx} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
              ))}
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Download', 'Opening record...')} style={styles.downloadBtn}>
              <Ionicons name="download-outline" size={18} color="#fff" />
              <Text style={styles.downloadText}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.uploadFab}
        onPress={() => setUploadModalVisible(true)}>
        <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Upload Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={uploadModalVisible}
        onRequestClose={() => setUploadModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Medical Record</Text>
            <Pressable style={styles.modalButton} onPress={handleFilePick}>
              {uploading ? <ActivityIndicator color="#fff" /> : (
                <><Ionicons name="document-attach-outline" size={20} color="#fff" /><Text style={styles.buttonText}>Pick File</Text></>
              )}
            </Pressable>
            <Pressable style={[styles.modalButton, { backgroundColor: '#ccc' }]} onPress={() => setUploadModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 12 },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2
  },
  cardTitle: { fontWeight: '600', fontSize: 16, marginBottom: 4 },
  cardText: { fontSize: 13, color: '#555' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6 },
  tag: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6
  },
  tagText: { color: '#fff', fontSize: 12 },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 6
  },
  downloadText: { color: '#fff', marginLeft: 6 },
  uploadFab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 50,
    elevation: 4
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center'
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  modalButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    width: '100%'
  },
  buttonText: { color: '#fff', marginLeft: 8 }
});

export default MedicalVaultScreen;
