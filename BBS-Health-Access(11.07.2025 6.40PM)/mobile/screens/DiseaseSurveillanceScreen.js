// File: DiseaseSurveillanceMobile.jsx
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import {
  Text,
  Card,
  Button,
  List,
  Modal,
  Portal,
  TextInput,
  Title,
  Paragraph,
} from "react-native-paper";
import MapView, { Circle, Marker } from "react-native-maps";

const mockHospitalSpikes = [
  { id: 1, city: "Mumbai", cases: 78, lastUpdated: "2025-07-10 10:30" },
  { id: 2, city: "Dubai", cases: 42, lastUpdated: "2025-07-10 11:00" },
];
const mockLabTrends = [
  { test: "Blood Culture Positivity", value: 12, trend: "up" },
  { test: "COVID PCR Positivity", value: 5, trend: "down" },
];
const mockPharmacyTrends = [
  { drug: "Paracetamol", sales: 230, trend: "up" },
  { drug: "Cough Syrup", sales: 150, trend: "steady" },
];
const mockAlerts = [
  {
    id: 101,
    region: "Delhi NCR",
    message: "Fever spike detected; hospital ICU capacity at 80%",
    level: "warning",
    time: "2025-07-10 11:45",
  },
  {
    id: 102,
    region: "Sharjah",
    message: "Increase in OTC cough syrup sales over threshold",
    level: "info",
    time: "2025-07-10 11:15",
  },
];

const geoClusters = [
  {
    id: "c1",
    latitude: 28.7041,
    longitude: 77.1025,
    radius: 5000,
    intensity: 0.7,
    region: "Delhi",
  },
  {
    id: "c2",
    latitude: 25.276987,
    longitude: 55.296249,
    radius: 3000,
    intensity: 0.5,
    region: "Dubai",
  },
];

export default function DiseaseSurveillanceMobile() {
  const [icuBeds, setIcuBeds] = useState("100");
  const [icuDemand, setIcuDemand] = useState("70");
  const [modalVisible, setModalVisible] = useState(false);

  const runSimulation = () => {
    const beds = parseInt(icuBeds, 10);
    const demand = parseInt(icuDemand, 10);
    if (isNaN(beds) || isNaN(demand)) {
      Alert.alert("Input Error", "Please enter valid numbers for ICU beds and demand.");
      return;
    }
    const projected = Math.min(Math.round(demand * 1.25), beds);
    Alert.alert(
      "Hospital Surge Simulation",
      `Current ICU Beds: ${beds}\nProjected Demand (25% growth): ${projected}`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>
        AI Disease Surveillance Grid + Pandemic Readiness
      </Title>

      {/* Hospital Admission Spike Monitor */}
      <Card style={styles.card} elevation={3}>
        <Card.Title title="🏥 Hospital Admission Spike Monitor" />
        <Card.Content>
          {mockHospitalSpikes.map((item) => (
            <Paragraph key={item.id}>
              <Text style={styles.bold}>{item.city}</Text>: {item.cases} fever/respiratory cases{" "}
              <Text style={styles.muted}>({item.lastUpdated})</Text>
            </Paragraph>
          ))}
        </Card.Content>
      </Card>

      {/* Lab Result Correlation Engine */}
      <Card style={styles.card} elevation={3}>
        <Card.Title title="🧪 Lab Result Correlation Engine" />
        <Card.Content>
          {mockLabTrends.map((test) => (
            <Paragraph key={test.test}>
              {test.test}: <Text style={styles.bold}>{test.value}%</Text> (
              <Text
                style={{
                  color:
                    test.trend === "up"
                      ? "green"
                      : test.trend === "down"
                      ? "red"
                      : "gray",
                }}
              >
                {test.trend}
              </Text>
              )
            </Paragraph>
          ))}
        </Card.Content>
      </Card>

      {/* Pharmacy Sales Trends */}
      <Card style={styles.card} elevation={3}>
        <Card.Title title="💊 Pharmacy Sales Trends" />
        <Card.Content>
          {mockPharmacyTrends.map((drug) => (
            <Paragraph key={drug.drug}>
              {drug.drug}: <Text style={styles.bold}>{drug.sales}</Text> units (
              <Text
                style={{
                  color:
                    drug.trend === "up"
                      ? "green"
                      : drug.trend === "down"
                      ? "red"
                      : "gray",
                }}
              >
                {drug.trend}
              </Text>
              )
            </Paragraph>
          ))}
        </Card.Content>
      </Card>

      {/* Geo Heatmap Dashboard */}
      <Card style={[styles.card, { height: 300 }]} elevation={3}>
        <Card.Title title="📍 Geo Heatmap Dashboard (Cluster Detection)" />
        <Card.Content style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 20.5937,
              longitude: 78.9629,
              latitudeDelta: 20,
              longitudeDelta: 20,
            }}
          >
            {geoClusters.map((cluster) => (
              <Circle
                key={cluster.id}
                center={{ latitude: cluster.latitude, longitude: cluster.longitude }}
                radius={cluster.radius}
                strokeColor={`rgba(255, 0, 0, ${cluster.intensity})`}
                fillColor={`rgba(255, 0, 0, ${cluster.intensity * 0.4})`}
              >
                <Marker
                  coordinate={{ latitude: cluster.latitude, longitude: cluster.longitude }}
                  title={`${cluster.region} - Intensity: ${(cluster.intensity * 100).toFixed(0)}%`}
                />
              </Circle>
            ))}
          </MapView>
        </Card.Content>
      </Card>

      {/* Alerts */}
      <Card style={styles.card} elevation={3}>
        <Card.Title title="🚨 Auto Alert Triggers" />
        <Card.Content>
          {mockAlerts.length === 0 && <Paragraph>No alerts currently.</Paragraph>}
          {mockAlerts.map((alert) => (
            <List.Item
              key={alert.id}
              title={`${alert.region}: ${alert.message}`}
              description={alert.time}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={alert.level === "warning" ? "alert" : "information"}
                  color={alert.level === "warning" ? "orange" : "blue"}
                />
              )}
            />
          ))}
        </Card.Content>
      </Card>

      {/* Pandemic Readiness */}
      <Card style={styles.card} elevation={3}>
        <Card.Title title="🛡️ Pandemic Readiness & Response Engine" />
        <Card.Content>
          <Paragraph>
            <Text style={styles.bold}>ICU Beds Available:</Text> {icuBeds}
            {"\n"}
            <Text style={styles.bold}>Current ICU Demand:</Text> {icuDemand}
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => setModalVisible(true)}
            style={{ marginBottom: 10 }}
          >
            Run Hospital Surge Simulation
          </Button>
          <Button
            mode="outlined"
            onPress={() => Alert.alert("Feature coming soon", "Resource deployment planner")}
          >
            Open Resource Deployment Planner
          </Button>
        </Card.Content>
      </Card>

      {/* Simulation Modal */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title>Hospital Surge Simulation</Title>
          <TextInput
            label="Total ICU Beds"
            keyboardType="numeric"
            value={icuBeds}
            onChangeText={setIcuBeds}
            style={styles.input}
          />
          <TextInput
            label="Current ICU Demand"
            keyboardType="numeric"
            value={icuDemand}
            onChangeText={setIcuDemand}
            style={styles.input}
          />
          <Paragraph style={{ marginBottom: 10 }}>
            Predict ICU demand growth based on outbreak progression.
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => {
              runSimulation();
              setModalVisible(false);
            }}
          >
            Run Simulation
          </Button>
          <Button onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
            Cancel
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f7f9fc",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
  },
  bold: {
    fontWeight: "700",
  },
  muted: {
    color: "#666",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 12,
  },
});
