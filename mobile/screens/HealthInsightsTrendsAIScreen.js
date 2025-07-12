import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TextInput, Alert, TouchableOpacity, Modal, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as Speech from 'expo-speech';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: () => '#000',
};

const HealthInsightsTrendsAI = () => {
  const [voiceInput, setVoiceInput] = useState("");
  const [mealImage, setMealImage] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const handleVoiceAsk = () => {
    const message = "You've had 3 high-sodium meals this week. Try switching one to fruits or veggies.";
    Speech.speak(message);
    setVoiceInput("Coach said: " + message);
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setMealImage(result.assets[0].uri);
      Alert.alert("Image uploaded successfully ✅");
    }
  };

  const handleExportCSV = async () => {
    const headers = "Month,BP,Sugar,Weight\n";
    const months = ["Mar", "Apr", "May", "Jun", "Jul"];
    const rows = months.map((m, i) => `${m},${bp[i]},${sugar[i]},${weight[i]}`).join("\n");
    const csv = headers + rows;

    const fileUri = FileSystem.documentDirectory + "health_trends.csv";
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });

    await Sharing.shareAsync(fileUri);
  };

  const handleDownloadPDF = async () => {
    const html = `
      <h1>BBSCART Health Summary</h1>
      <p>Name: Aarav Sharma</p>
      <p>BP Trend: 120 → 145</p>
      <p>Sugar: 92 → 122 mg/dL</p>
      <p>Weight: 70 → 73 kg</p>
      <p>Risk Level: Diabetes - 72%</p>
    `;

    const file = await RNHTMLtoPDF.convert({
      html,
      fileName: 'health_summary',
      base64: false,
    });

    await Sharing.shareAsync(file.filePath);
  };

  const bp = [120, 125, 130, 140, 145];
  const sugar = [92, 96, 102, 109, 122];
  const weight = [70, 71, 72, 72, 73];

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>🌠 Health Insights + AI Coach</Text>

      {/* Alerts */}
      <Text style={{ color: 'red' }}>⚠️ Sugar level 122 mg/dL exceeds community average</Text>
      <Text style={{ color: 'orange' }}>🚱 You skipped 3 hydration days this week</Text>

      {/* Chart */}
      <Text style={{ fontSize: 16, marginTop: 20 }}>📊 Monthly Health Trends</Text>
      <LineChart
        data={{
          labels: ["Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            { data: bp, color: () => "#dc3545", strokeWidth: 2 },
            { data: sugar, color: () => "#0d6efd", strokeWidth: 2 },
            { data: weight, color: () => "#198754", strokeWidth: 2 }
          ],
          legend: ["BP", "Sugar", "Weight"]
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
      />

      {/* Export */}
      <View style={{ marginVertical: 10 }}>
        <Button title="Export CSV" onPress={handleExportCSV} />
        <Button title="Download PDF" onPress={handleDownloadPDF} color="#444" />
      </View>

      {/* AI Coach */}
      <Text style={{ fontSize: 16, marginTop: 20 }}>🧠 AI Coach</Text>
      <Text>- ⚠️ High sodium detected. Try veggies.</Text>
      <Text>- 😴 You slept 18% less last week.</Text>
      <Text>- 💧 Drink 1L more water.</Text>
      <TextInput value={voiceInput} placeholder="Ask the coach..." editable={false} style={{ borderColor: '#ccc', borderWidth: 1, marginVertical: 10, padding: 8 }} />
      <Button title="🎤 Voice Ask" onPress={handleVoiceAsk} />
      <Button title="📸 Upload Meal Image" onPress={handlePickImage} />
      {mealImage && <Image source={{ uri: mealImage }} style={{ width: 100, height: 100, marginTop: 10 }} />}

      {/* Risk */}
      <Text style={{ fontSize: 16, marginTop: 20 }}>🚨 Risk Prediction</Text>
      <Text>Diabetes Risk: 72% (Critical)</Text>
      <Text>Cardiac Risk: 56% (Moderate)</Text>
      <Text>Mental Wellness: 40% (Low)</Text>

      {/* Booking */}
      <Text style={{ marginTop: 20 }}>🧪 Smart Test Suggestion</Text>
      <Text>Lipid profile overdue by 14 months</Text>
      <Button title="Book at ABC Hospital" onPress={() => setShowBooking(true)} color="#007bff" />

      {/* Modal */}
      <Modal visible={showBooking} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' }}>
          <View style={{ backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 }}>
            <Text>📅 Booking at ABC Hospital</Text>
            <Text>Select date and confirm</Text>
            <Button title="Confirm Booking" onPress={() => { setShowBooking(false); Alert.alert("Booked ✅"); }} />
            <Button title="Cancel" onPress={() => setShowBooking(false)} color="#aaa" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HealthInsightsTrendsAI;
