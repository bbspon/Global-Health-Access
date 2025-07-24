import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, Button, Image, TextInput, Alert,
  Modal, Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import * as Speech from 'expo-speech';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

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
  const [trends, setTrends] = useState([]);
  const [voiceInput, setVoiceInput] = useState("");
  const [mealImage, setMealImage] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const fetchTrends = async () => {
    try {
      const bbsUserData = JSON.parse(localStorage.getItem('bbsUser'));
      const token = bbsUserData?.token;
      const res = await axios.get('http://localhost:5000/api/health-insights-trends/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrends(res.data.data || []);
    } catch (err) {
      console.error('Error loading trends', err);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  // Group trends by type (e.g., BP, Sugar, Weight)
  const grouped = trends.reduce((acc, item) => {
    const type = item.trendType.toLowerCase(); // e.g., "bp"
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  // Create trend arrays and labels
  const labels = grouped.bp?.map(item => item.month) || ["Mar", "Apr", "May", "Jun", "Jul"];
  const bp = grouped.bp?.map(item => item.value) || [120, 125, 130, 140, 145];
  const sugar = grouped.sugar?.map(item => item.value) || [92, 96, 102, 109, 122];
  const weight = grouped.weight?.map(item => item.value) || [70, 71, 72, 72, 73];

  const handleVoiceAsk = () => {
    const message = "You've had 3 high-sodium meals this week. Try switching one to fruits or veggies.";
    Speech.speak(message);
    setVoiceInput("Coach said: " + message);
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.cancelled) {
      setMealImage(result.assets[0].uri);
      Alert.alert("Image uploaded successfully ✅");
    }
  };

  const handleExportCSV = async () => {
    const headers = "Month,BP,Sugar,Weight\n";
    const rows = labels.map((m, i) => `${m},${bp[i]},${sugar[i]},${weight[i]}`).join("\n");
    const csv = headers + rows;
    const fileUri = FileSystem.documentDirectory + "health_trends.csv";
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
    await Sharing.shareAsync(fileUri);
  };

  const handleDownloadPDF = async () => {
    const html = `
      <h1>BBSCART Health Summary</h1>
      <p>Name: Aarav Sharma</p>
      <p>BP Trend: ${bp[0]} → ${bp[bp.length - 1]}</p>
      <p>Sugar: ${sugar[0]} → ${sugar[sugar.length - 1]} mg/dL</p>
      <p>Weight: ${weight[0]} → ${weight[weight.length - 1]} kg</p>
    `;
    const file = await RNHTMLtoPDF.convert({ html, fileName: 'health_summary', base64: false });
    await Sharing.shareAsync(file.filePath);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>🌠 Health Insights + AI Coach</Text>

      <Text style={{ marginTop: 10, color: 'red' }}>⚠️ Sugar level {sugar[sugar.length - 1]} mg/dL exceeds community average</Text>

      <Text style={{ fontSize: 16, marginTop: 20 }}>📊 Monthly Health Trends</Text>
      <LineChart
        data={{
          labels,
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

      <Button title="Export CSV" onPress={handleExportCSV} />
      <Button title="Download PDF" onPress={handleDownloadPDF} color="#444" />

      <Text style={{ fontSize: 16, marginTop: 20 }}>🧠 AI Coach</Text>
      <TextInput value={voiceInput} placeholder="Ask the coach..." editable={false} style={{ borderWidth: 1, marginVertical: 10, padding: 8 }} />
      <Button title="🎤 Voice Ask" onPress={handleVoiceAsk} />
      <Button title="📸 Upload Meal Image" onPress={handlePickImage} />
      {mealImage && <Image source={{ uri: mealImage }} style={{ width: 100, height: 100, marginTop: 10 }} />}

      <Text style={{ marginTop: 20 }}>🧪 Smart Test Suggestion: Lipid profile overdue</Text>
      <Button title="Book at ABC Hospital" onPress={() => setShowBooking(true)} color="#007bff" />

      {/* Booking Modal */}
      <Modal visible={showBooking} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' }}>
          <View style={{ backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 }}>
            <Text>📅 Booking at ABC Hospital</Text>
            <Button title="Confirm Booking" onPress={() => { setShowBooking(false); Alert.alert("Booked ✅"); }} />
            <Button title="Cancel" onPress={() => setShowBooking(false)} color="#aaa" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HealthInsightsTrendsAI;
