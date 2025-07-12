import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Modal } from 'react-native';
import { Card, Button, Title, Paragraph, ActivityIndicator } from 'react-native-paper';

// Mock data
const fetchData = {
  ngos: async () => [{ id: 'n1', name: 'Hope Foundation', onboarded: 120, renewals: 80 }],
  schools: async () => [{ id: 's1', name: 'Govt School A', students: 300, parents: 150 }],
  csr: async () => [{ id: 'c1', company: 'XYZ Ltd', impacted: 480 }],
  rurals: async () => [{
    id: 'r1', volunteer: 'John Doe', villages: ['Village Z','Hamlet A'],
    fieldSyncs: 22, lastSync: '2025‑07‑10 14:30', pendingUploads: 5,
    syncStatus: 'yellow', syncScore: 88, volunteerPhone: '+91‑9876543210',
    kitAssigned: true, healthZone: 'PHC‑A Block', notes: 'Low signal', lastLat: 12.345, lastLng: 78.901
  }],
  leaderboard: async () => [{ id: 'l1', label: 'Hero John', category: 'Volunteer', score: 95 }]
};

export default function EcosystemExpansionScreen() {
  const [data, setData] = useState({});
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    (async () => {
      const keys = Object.keys(fetchData);
      const all = {};
      for (let key of keys) all[key] = await fetchData[key]();
      setData(all);
    })();
  }, []);

  if (!data.ngos) return <ActivityIndicator style={{ marginTop: 50 }} />;

  const renderCard = (item, type) => {
    const title = type === 'ngo' ? item.name : type === 'school' ? item.name : type === 'csr' ? item.company : item.volunteer;
    const subtitle = type === 'ngo' ? `Renewals: ${item.renewals}` :
      type === 'school' ? `Parents: ${item.parents}` :
      type === 'csr' ? `Impacted: ${item.impacted}` :
      `Syncs: ${item.fieldSyncs}`;
    return (
      <Card style={styles.card} key={item.id}>
        <Card.Title title={title} subtitle={subtitle} />
        <Card.Actions>
          <Button onPress={() => setDetail({ type, item })}>View Details</Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>NGO Partnerships</Text>
      {data.ngos.map(n => renderCard(n, 'ngo'))}

      <Text style={styles.header}>School Programs</Text>
      {data.schools.map(s => renderCard(s, 'school'))}

      <Text style={styles.header}>CSR Campaigns</Text>
      {data.csr.map(c => renderCard(c, 'csr'))}

      <Text style={styles.header}>Rural Deployments</Text>
      {data.rurals.map(r => renderCard(r, 'rural'))}

      <Text style={styles.header}>Recognition Leaderboard</Text>
      {data.leaderboard.map(l => (
        <Text key={l.id}>{l.label} ({l.category}) — {l.score}</Text>
      ))}

      <Modal visible={!!detail} animationType="slide" onRequestClose={() => setDetail(null)}>
        <View style={styles.modal}>
          {detail && (
            <>
              <Title>{detail.type.toUpperCase()} Details</Title>
              <Paragraph>
                {detail.type === 'ngo' && `Name: ${detail.item.name}\nRenewals: ${detail.item.renewals}`}
                {detail.type === 'school' && `Name: ${detail.item.name}\nParents: ${detail.item.parents}`}
                {detail.type === 'csr' && `Company: ${detail.item.company}\nImpacted: ${detail.item.impacted}`}
                {detail.type === 'rural' && `Volunteer: ${detail.item.volunteer}\nVillages: ${detail.item.villages.join(', ')}\nSyncs: ${detail.item.fieldSyncs}\nLast Sync: ${detail.item.lastSync}\nPending: ${detail.item.pendingUploads}\nSync Score: ${detail.item.syncScore}%\nContact: ${detail.item.volunteerPhone}\nKit Assigned: ${detail.item.kitAssigned ? 'Yes' : 'No'}\nZone: ${detail.item.healthZone}\nNotes: ${detail.item.notes}`}
              </Paragraph>
              <Button onPress={() => setDetail(null)}>Close</Button>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  

  card: { marginVertical: 8 },
  modal: { flex: 1, padding: 20, backgroundColor: '#FFF' }
});
