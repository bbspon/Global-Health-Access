import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { Button, Card, Badge, ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const getRiskColor = (risk) => {
  if (risk === 'High') return 'red';
  if (risk === 'Medium') return 'orange';
  return 'green';
};

export default function ComplianceMainPageScreen() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  useEffect(() => {
    fetchCompliancePartners();
  }, []);

  const fetchCompliancePartners = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/compliance/main', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
        console.log("✅ Partner data:", res.data);

      setPartners(res.data.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderPartner = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title title={item.name} subtitle={item.type} />
      <Card.Content>
        <Text>KYC: {item.kyc}</Text>
        <Text>Verified: {item.verified ? '✅' : '❌'}</Text>
        <Text style={{ color: getRiskColor(item.risk) }}>Risk: {item.risk}</Text>
        <Text>Docs: {item.docs?.length || 0}</Text>
        <Text>Sync: {item.syncStatus || 'Unknown'}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {
          setSelected(item);
          setPreviewDoc(null);
        }}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛡️ Compliance Dashboard</Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={partners}
          renderItem={renderPartner}
          keyExtractor={(item, index) => item._id || `partner-${index}`}
        />
      )}

      <Modal
        visible={!!selected}
        animationType="slide"
        onRequestClose={() => {
          setSelected(null);
          setPreviewDoc(null);
        }}
      >
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Partner Compliance Info</Text>
          {selected && (
            <>
              <Text style={styles.label}>Name: {selected.name}</Text>
              <Text>Type: {selected.type}</Text>
              <Text>KYC: {selected.kyc}</Text>
              <Text style={{ color: getRiskColor(selected.risk) }}>Risk: {selected.risk}</Text>
              <Text>Verified: {selected.verified ? '✅' : '❌'}</Text>
              <Text>Sync Status: {selected.syncStatus}</Text>

              <Text style={styles.label}>📄 Documents:</Text>
              {selected.docs?.length > 0 ? (
                selected.docs.map((doc, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setPreviewDoc(doc)}
                  >
                    <Text style={styles.link}>🔍 Preview {doc.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No documents uploaded.</Text>
              )}

              {previewDoc && (
                <View style={styles.previewBox}>
                  <Text style={styles.label}>Preview: {previewDoc.name}</Text>
                  <View style={{ height: 400 }}>
                    <WebView
                      source={{ uri: previewDoc.url }}
                      style={{ flex: 1 }}
                      startInLoadingState
                    />
                  </View>
                  <Button
                    mode="contained"
                    style={{ marginTop: 10 }}
                    onPress={() => Linking.openURL(previewDoc.url)}
                  >
                    ⬇️ Download {previewDoc.name}
                  </Button>
                </View>
              )}

              <Button
                onPress={() => {
                  setSelected(null);
                  setPreviewDoc(null);
                }}
                mode="outlined"
                style={{ marginTop: 20 }}
              >
                Close
              </Button>
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { marginBottom: 12 },
  modalContainer: { padding: 20, backgroundColor: 'white' },
  modalHeader: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 10, fontWeight: '600' },
  link: { color: 'blue', marginTop: 5 },
  previewBox: { marginTop: 20, backgroundColor: '#f0f0f0', padding: 10 },
});
