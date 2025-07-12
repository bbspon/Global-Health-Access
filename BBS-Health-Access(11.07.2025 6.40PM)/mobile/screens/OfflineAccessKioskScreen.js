import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const translations = {
  en: {
    title: "Offline Health Access Kiosk",
    selectLanguage: "Select Language:",
    enterPatientId: "Enter Patient ID / Aadhaar / QR Code:",
    fetchDataBtn: "Fetch Patient Data",
    patientDetails: "Patient Details",
    plan: "Plan",
    medicalHistory: "Medical History",
    uploadDocs: "Upload Prescription / Reports:",
    queueSyncBtn: "Queue Data for Sync",
    noFilesAlert: "Please upload at least one document.",
    enterIdAlert: "Please enter Patient ID or scan QR",
    uploadBtn: "Pick Images / Files",
  },
  hi: {
    title: "ऑफ़लाइन हेल्थ एक्सेस कियोस्क",
    selectLanguage: "भाषा चुनें:",
    enterPatientId: "रोगी आईडी / आधार / क्यूआर कोड दर्ज करें:",
    fetchDataBtn: "डेटा प्राप्त करें",
    patientDetails: "रोगी विवरण",
    plan: "योजना",
    medicalHistory: "मेडिकल इतिहास",
    uploadDocs: "प्रिस्क्रिप्शन / रिपोर्ट अपलोड करें:",
    queueSyncBtn: "डेटा सिंक के लिए कतारबद्ध करें",
    noFilesAlert: "कृपया कम से कम एक दस्तावेज़ अपलोड करें।",
    enterIdAlert: "कृपया रोगी आईडी दर्ज करें या क्यूआर स्कैन करें",
    uploadBtn: "चित्र / फ़ाइलें चुनें",
  },
  ta: {
    title: "ஆஃப்லைன் சுகாதார அணுகல் கியாஸ்க்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்:",
    enterPatientId: "Пациент ஐடி / ஆதார் / QR குறியீட்டை உள்ளிடவும்:",
    fetchDataBtn: "தகவல் பெறுக",
    patientDetails: "நோயாளி விவரங்கள்",
    plan: "திட்டம்",
    medicalHistory: "மருத்துவ வரலாறு",
    uploadDocs: "மருத்துவக் குறிப்பு / அறிக்கைகள் பதிவேற்று:",
    queueSyncBtn: "தரவை ஒத்திசைக்க வரிசைப்படுத்தவும்",
    noFilesAlert: "தயவுசெய்து குறைந்தது ஒரு கோப்பை பதிவேற்றவும்.",
    enterIdAlert: "தயவுசெய்து நோயாளி ஐடியை உள்ளிடவும் அல்லது QR ஐ ஸ்கேன் செய்யவும்",
    uploadBtn: "படங்கள் / கோப்புகளை தேர்ந்தெடுக்கவும்",
  },
  ar: {
    title: "كشك الوصول الصحي دون اتصال",
    selectLanguage: "اختر اللغة:",
    enterPatientId: "أدخل معرف المريض / الهوية / رمز الاستجابة السريعة:",
    fetchDataBtn: "جلب بيانات المريض",
    patientDetails: "تفاصيل المريض",
    plan: "الخطة",
    medicalHistory: "التاريخ الطبي",
    uploadDocs: "تحميل الوصفة / التقارير:",
    queueSyncBtn: "وضع البيانات في قائمة المزامنة",
    noFilesAlert: "يرجى تحميل ملف واحد على الأقل.",
    enterIdAlert: "يرجى إدخال معرف المريض أو مسح رمز الاستجابة السريعة",
    uploadBtn: "اختر الصور / الملفات",
  },
};

export default function OfflineAccessKiosk() {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [patientID, setPatientID] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);

  const handleFetchPatient = () => {
    if (!patientID.trim()) {
      Alert.alert(t.enterIdAlert);
      return;
    }
    setPatientData({
      name: "Ravi Kumar",
      plan: "Rural Basic Care Plan",
      history: [
        "Visit: 2025-05-10 - Cold & Flu",
        "Prescription: Paracetamol 500mg",
        "Lab Test: Blood Sugar - Normal",
      ],
    });
  };

  const pickImages = async () => {
    try {
      let permissionResult =
        Platform.OS !== "web"
          ? await ImagePicker.requestMediaLibraryPermissionsAsync()
          : { granted: true };

      if (!permissionResult.granted) {
        Alert.alert("Permission to access media library is required!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        // For older versions of expo-image-picker, result.selected or result.assets
        const selected = result.selected || result.assets || [];
        setUploadFiles((prev) => [...prev, ...selected]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleQueueSync = () => {
    if (uploadFiles.length === 0) {
      Alert.alert(t.noFilesAlert);
      return;
    }
    Alert.alert(
      `Queued ${uploadFiles.length} file(s) and data for Patient ID: ${patientID}`
    );
    setPatientID("");
    setPatientData(null);
    setUploadFiles([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🩺 {t.title}</Text>

      <Text style={styles.label}>{t.selectLanguage}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={language}
          onValueChange={(val) => setLanguage(val)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="हिंदी" value="hi" />
          <Picker.Item label="தமிழ்" value="ta" />
          <Picker.Item label="العربية" value="ar" />
        </Picker>
      </View>

      <Text style={styles.label}>{t.enterPatientId}</Text>
      <TextInput
        style={styles.input}
        placeholder={t.enterPatientId}
        value={patientID}
        onChangeText={setPatientID}
      />
      <View style={styles.button}>
        <Button title={t.fetchDataBtn} onPress={handleFetchPatient} />
      </View>

      {patientData && (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>{t.patientDetails}</Text>
          <Text style={styles.patientName}>{patientData.name}</Text>
          <Text style={styles.plan}>
            {t.plan}: {patientData.plan}
          </Text>
          <Text style={styles.medicalHistoryLabel}>{t.medicalHistory}:</Text>
          {patientData.history.map((entry, i) => (
            <Text key={i} style={styles.historyEntry}>
              • {entry}
            </Text>
          ))}

          <Text style={[styles.label, { marginTop: 20 }]}>{t.uploadDocs}</Text>
          <View style={styles.button}>
            <Button title={t.uploadBtn} onPress={pickImages} />
          </View>

          {uploadFiles.length > 0 && (
            <View style={styles.uploadList}>
              <Text>{`Selected files (${uploadFiles.length}):`}</Text>
              {uploadFiles.map((file, i) => (
                <Text key={i} style={styles.fileName}>
                  {file.fileName || file.uri || `File ${i + 1}`}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.button}>
            <Button title={t.queueSyncBtn} onPress={handleQueueSync} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = {
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    height: 44,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 44,
    marginBottom: 12,
  },
  button: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 6,
  },
  cardHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
    color: "#0d6efd",
  },
  patientName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  plan: {
    marginBottom: 8,
  },
  medicalHistoryLabel: {
    fontWeight: "bold",
  },
  historyEntry: {
    marginLeft: 10,
    marginBottom: 4,
  },
  uploadList: {
    marginTop: 8,
    marginBottom: 16,
  },
  fileName: {
    fontStyle: "italic",
    fontSize: 14,
  },
};
