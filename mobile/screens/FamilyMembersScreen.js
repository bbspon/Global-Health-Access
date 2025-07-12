import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Linking,
} from 'react-native';
import axios from 'axios';

const FamilyMembersScreen = ({ route }) => {
  const { planId } = route.params;
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    relationship: '',
    idProofUrl: '',
  });

  const fetchMembers = async () => {
    const { data } = await axios.get(
      `https://yourdomain.com/api/user-plan/${planId}/family`,
    );
    setMembers(data);
  };

  const addMember = async () => {
    await axios.post(
      `https://yourdomain.com/api/user-plan/${planId}/family`,
      form,
    );
    setForm({
      name: '',
      age: '',
      gender: '',
      relationship: '',
      idProofUrl: '',
    });
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Add Family Member</Text>
      <TextInput
        placeholder="Name"
        value={form.name}
        onChangeText={val => setForm({ ...form, name: val })}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={form.age}
        onChangeText={val => setForm({ ...form, age: val })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Gender"
        value={form.gender}
        onChangeText={val => setForm({ ...form, gender: val })}
        style={styles.input}
      />
      <TextInput
        placeholder="Relationship"
        value={form.relationship}
        onChangeText={val => setForm({ ...form, relationship: val })}
        style={styles.input}
      />
      <TextInput
        placeholder="ID Proof URL"
        value={form.idProofUrl}
        onChangeText={val => setForm({ ...form, idProofUrl: val })}
        style={styles.input}
      />
      <Button title="Add Member" onPress={addMember} />

      <Text style={{ marginVertical: 15 }}>Family Members</Text>
      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              {item.name} ({item.age} yrs)
            </Text>
            <Text>
              {item.gender} - {item.relationship}
            </Text>
            {item.idProofUrl ? (
              <Text
                style={styles.link}
                onPress={() => Linking.openURL(item.idProofUrl)}
              >
                View ID
              </Text>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  item: { borderBottomWidth: 1, marginBottom: 10, paddingBottom: 5 },
  link: { color: 'blue', textDecorationLine: 'underline' },
});

export default FamilyMembersScreen;
