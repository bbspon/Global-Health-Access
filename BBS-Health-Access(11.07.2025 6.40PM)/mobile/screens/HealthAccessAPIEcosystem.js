import React, { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Appbar,
  Modal,
  Portal,
  Provider,
  List,
  Divider,
} from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

const HealthAccessAPIEcosystem = () => {
  const [apiInput, setApiInput] = useState('{ "userId": "123", "hospitalId": "ABC" }');
  const [apiResponse, setApiResponse] = useState(null);
  const [whiteLabelName, setWhiteLabelName] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [uploadMsg, setUploadMsg] = useState('');
  const [adminVisible, setAdminVisible] = useState(false);

  const handleSendRequest = () => {
    setApiResponse("✅ Plan Valid: BBSCART Premium. Valid till 2025-12-31.");
  };

  const handleWhiteLabelSubmit = () => {
    Alert.alert("Success", "Branded app generated successfully.");
  };

  const handleAskAI = () => {
    setAiAnswer("🤖 BBSCART AI: Use the /records/pushFHIR endpoint for FHIR sync with valid token.");
  };

  const handleCSVUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setUploadMsg(`✅ Uploaded ${result.name}. 52 plans issued.`);
    } else {
      setUploadMsg('❌ Upload cancelled.');
    }
  };

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="Health Access API Ecosystem" />
        <Appbar.Action icon="shield-lock" onPress={() => setAdminVisible(true)} />
      </Appbar.Header>

      <ScrollView style={{ padding: 16 }}>
        {/* API Explorer */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Title title="🚀 API Explorer" />
          <Card.Content>
            <Text>Test Endpoint: /checkEligibility</Text>
            <TextInput
              label="JSON Payload"
              value={apiInput}
              onChangeText={setApiInput}
              multiline
              style={{ marginVertical: 10 }}
            />
            <Button mode="contained" onPress={handleSendRequest}>Send Request</Button>
            {apiResponse && (
              <Paragraph style={{ marginTop: 10, color: 'green' }}>{apiResponse}</Paragraph>
            )}
          </Card.Content>
        </Card>

        {/* Developer Docs */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Title title="📚 Developer SDKs & Docs" />
          <Card.Content>
            <List.Item title="Node.js SDK" left={() => <List.Icon icon="language-javascript" />} />
            <List.Item title="Python SDK" left={() => <List.Icon icon="language-python" />} />
            <List.Item title="Flutter SDK" left={() => <List.Icon icon="language-dart" />} />
            <List.Item title="Postman Collection" left={() => <List.Icon icon="file-download" />} />
            <Paragraph>Integration guides, API reference & curl examples included.</Paragraph>
          </Card.Content>
        </Card>

        {/* White-label */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Title title="🏷️ White-Label App Configurator" />
          <Card.Content>
            <TextInput
              label="Brand Name"
              value={whiteLabelName}
              onChangeText={setWhiteLabelName}
              placeholder="e.g., LifeCare+"
              style={{ marginBottom: 10 }}
            />
            <Button mode="contained" onPress={handleWhiteLabelSubmit}>Generate App</Button>
          </Card.Content>
        </Card>

        {/* NGO Upload */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Title title="📥 Upload CSV (NGO / HR)" />
          <Card.Content>
            <Button icon="upload" onPress={handleCSVUpload}>Upload Beneficiaries CSV</Button>
            {uploadMsg !== '' && <Paragraph style={{ marginTop: 10 }}>{uploadMsg}</Paragraph>}
          </Card.Content>
        </Card>

        {/* AI Assistant */}
        <Card style={{ marginBottom: 20 }}>
          <Card.Title title="🤖 Ask BBSCART AI Assistant" />
          <Card.Content>
            <TextInput
              label="Your Question"
              value={aiQuestion}
              onChangeText={setAiQuestion}
              multiline
              style={{ marginBottom: 10 }}
            />
            <Button mode="outlined" onPress={handleAskAI}>Ask</Button>
            {aiAnswer && <Paragraph style={{ marginTop: 10 }}>{aiAnswer}</Paragraph>}
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Admin Panel Modal */}
      <Portal>
        <Modal visible={adminVisible} onDismiss={() => setAdminVisible(false)} contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          margin: 20,
          borderRadius: 10
        }}>
          <Title>🔐 Admin Control Panel</Title>
          <Divider style={{ marginVertical: 10 }} />
          <Paragraph>• View consent logs</Paragraph>
          <Paragraph>• Monitor API usage</Paragraph>
          <Paragraph>• Set rate limits per partner</Paragraph>
          <Button onPress={() => setAdminVisible(false)} style={{ marginTop: 20 }}>Close</Button>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default HealthAccessAPIEcosystem;
