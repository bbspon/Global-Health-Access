import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card, Button, TextInput, Avatar, Chip, Divider } from 'react-native-paper';

// 🔐 Replace with real auth context or token decode
const getUserData = () => ({
  name: "Fatima",
  roleTag: ["agent"], // Change to "parent", "employer", "agent"
});

const RoleBasedDashboard = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = getUserData();
    setRole(user?.roleTag?.[0] || "individual");
  }, []);

  const handleDownloadCSV = () => {
    Alert.alert("Export Disabled", "CSV export isn't supported in mobile. View your earnings or sync via desktop.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Role: <Text style={styles.role}>{role}</Text></Text>

      {/* 🧠 Smart Suggestion */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.boldText}>🧠 Smart Suggestion:</Text>
          {role === "parent" && <Text>Your child Aarav has a pending checkup.</Text>}
          {role === "employer" && <Text>3 employees are approaching plan limits.</Text>}
          {role === "agent" && <Text>You earned ₹4200 this month. 3 new leads waiting!</Text>}
        </Card.Content>
      </Card>

      {/* 👨‍👩‍👧 Parent */}
      {role === "parent" && (
        <Card style={styles.card}>
          <Card.Title title="Family Health Access" left={() => <Avatar.Icon icon="account-group" />} />
          <Card.Content>
            <Text style={styles.boldText}>👨‍👩‍👧 Members:</Text>
            <Chip style={styles.chip}>Aarav - OPD</Chip>
            <Chip style={styles.chip}>Meera - Full</Chip>
            <Divider style={styles.divider} />
            <Text style={styles.boldText}>Book for:</Text>
            <Button mode="contained" style={styles.button}>Book Pediatrician</Button>
          </Card.Content>
        </Card>
      )}

      {/* 💼 Employer */}
      {role === "employer" && (
        <Card style={styles.card}>
          <Card.Title title="Employer Dashboard" left={() => <Avatar.Icon icon="office-building" />} />
          <Card.Content>
            <Text style={styles.boldText}>Employees:</Text>
            <Text>Ravi Kumar - Gold - ✅ Active</Text>
            <Text>Divya Nair - Silver - ⏳ Pending</Text>
            <Divider style={styles.divider} />
            <Button mode="outlined" style={styles.button}>Download Invoice (Desktop Only)</Button>
          </Card.Content>
        </Card>
      )}

      {/* 💸 Agent */}
      {role === "agent" && (
        <Card style={styles.card}>
          <Card.Title title="Agent Dashboard" left={() => <Avatar.Icon icon="cash" />} />
          <Card.Content>
            <Text style={styles.boldText}>Commission:</Text>
            <Text>Aditya - Super Premium - ₹800</Text>
            <Text>Fatima - Basic+ - ₹300</Text>
            <Divider style={styles.divider} />
            <Text style={{ marginTop: 8 }}>📱 Referral Link: https://bbscart.health/agent123</Text>
            <Button onPress={handleDownloadCSV} style={styles.button} mode="outlined">
              Download Earnings Report
            </Button>
          </Card.Content>
        </Card>
      )}

      {/* 🔍 Fallback */}
      {["admin", "individual"].includes(role) && (
        <Card style={styles.card}>
          <Card.Content>
            <Text>Welcome to BBSCART Health. Please select a role or plan to begin.</Text>
          </Card.Content>
        </Card>
      )}

      {/* 🔮 Future Features */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.boldText}>🔮 Upcoming Features:</Text>
          <Text>• Family AI Assistant</Text>
          <Text>• Agent Sub-Hierarchy</Text>
          <Text>• Doctor & Nurse App Logins</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 60,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  role: {
    color: "#0057e7",
  },
  card: {
    marginBottom: 20,
    elevation: 3,
  },
  chip: {
    marginVertical: 4,
  },
  divider: {
    marginVertical: 12,
  },
  boldText: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    marginTop: 10,
  },
});

export default RoleBasedDashboard;
