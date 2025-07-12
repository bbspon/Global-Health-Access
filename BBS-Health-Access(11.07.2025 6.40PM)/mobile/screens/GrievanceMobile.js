import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button, Card, Checkbox, RadioButton, Modal } from 'react-native-paper';

// Mock data
const categoriesList = ['Doctor','Hospital','Lab','Pharmacy','Plan','Billing','Other'];

export default function GrievanceMobile() {
  const [step, setStep] = useState('form'); // form or timeline
  const [form, setForm] = useState({ category:'', description:'', priority:'Low', anonymous:false });
  const [timeline, setTimeline] = useState([]);
  const [showTimelineModal, setShowTimelineModal] = useState(false);

  useEffect(() => {
    // mock timeline
    setTimeline([
      { stage:'Raised', time:'2025‑07‑10 10:15' },
      { stage:'Assigned', time:'2025‑07‑10 12:00' },
      { stage:'In Progress', time:'2025‑07‑11 10:00' },
    ]);
  }, []);

  const handleSubmit = () => {
    Alert.alert('Submitted', 'Your grievance has been raised.');
    setShowTimelineModal(true);
  };

  return (
    <ScrollView contentContainerStyle={{ padding:16 }}>
      {step === 'form' && (
        <>
          <Text style={{ fontSize:18, marginBottom:12 }}>Raise a Complaint</Text>
          <TextInput
            label="Category"
            value={form.category}
            mode="outlined"
            style={{ marginBottom:8 }}
            onFocus={() => Alert.alert('Pick from categories', categoriesList.join(', '))}
            onChangeText={(t) => setForm({ ...form, category:t })}
          />
          <TextInput
            label="Description"
            multiline
            rows={3}
            mode="outlined"
            style={{ marginBottom:8 }}
            value={form.description}
            onChangeText={(t) => setForm({ ...form, description:t })}
          />
          <RadioButton.Group
            onValueChange={(v) => setForm({ ...form, priority:v })}
            value={form.priority}
          >
            {['Low','Medium','Critical'].map(p => (
              <RadioButton.Item key={p} label={`Priority: ${p}`} value={p} />
            ))}
          </RadioButton.Group>
          <Checkbox.Item
            label="Submit Anonymously"
            status={form.anonymous ? 'checked':'unchecked'}
            onPress={() => setForm({ ...form, anonymous:!form.anonymous })}
          />
          <Button mode="contained" onPress={handleSubmit}>Submit Complaint</Button>
        </>
      )}

      <Modal visible={showTimelineModal} onDismiss={() => setShowTimelineModal(false)}>
        <ScrollView style={{ padding:16 }}>
          <Text style={{ fontSize:18, marginBottom:12 }}>Complaint Timeline</Text>
          {timeline.map((t,i) => (
            <Text key={i} style={{ marginVertical:4 }}>
              • {t.stage} — {t.time}
            </Text>
          ))}
          <Button mode="contained" style={{ marginTop:16 }} onPress={() => setShowTimelineModal(false)}>Close</Button>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}
