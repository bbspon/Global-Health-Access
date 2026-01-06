import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from "react-native";

import DocumentPicker from "react-native-document-picker";
import axios from "axios";

export default function HospitalOnboarding() {
  const [hospitalName, setHospitalName] = useState("");
  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(false);

  /* -------------------------
     ANDROID STORAGE PERMISSION
  -------------------------- */
  const requestStoragePermission = async () => {
    if (Platform.OS !== "android") return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "Allow access to upload documents",
          buttonPositive: "Allow",
          buttonNegative: "Cancel",
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  };

  /* -------------------------
     PICK LICENSE FILE
  -------------------------- */
  const pickLicense = async () => {
    const hasPermission = await requestStoragePermission();

    if (!hasPermission) {
      Alert.alert("Permission denied", "Storage permission is required");
      return;
    }

    try {
      const res = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
        ],
        presentationStyle: "fullScreen",
        copyTo: "cachesDirectory",
      });

      setLicense(res);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert("Error", "Unable to select file");
      }
    }
  };

  /* -------------------------
     SUBMIT FORM
  -------------------------- */
  const handleSubmit = async () => {
    if (!hospitalName || !license) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("hospitalName", hospitalName);
    formData.append("license", {
      uri:
        Platform.OS === "android"
          ? license.fileCopyUri || license.uri
          : license.uri,
      name: license.name || "license.pdf",
      type: license.type || "application/pdf",
    });

    try {
      await axios.post(
        "https://healthcare.bbscart.com/api/hospital/onboard",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Alert.alert("Success", "Hospital onboarded successfully");
      setHospitalName("");
      setLicense(null);
    } catch (error) {
      Alert.alert("Upload failed", "Please try again");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------
     UI
  -------------------------- */
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hospital Onboarding</Text>

      <TextInput
        style={styles.input}
        placeholder="Hospital Name"
        value={hospitalName}
        onChangeText={setHospitalName}
      />

      <TouchableOpacity style={styles.uploadBtn} onPress={pickLicense}>
        <Text style={styles.uploadText}>
          {license ? "Change License File" : "Upload License"}
        </Text>
      </TouchableOpacity>

      {license && (
        <Text style={styles.fileName}>
          Selected: {license.name}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.submitBtn, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading ? "Submitting..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* -------------------------
   STYLES
-------------------------- */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  uploadBtn: {
    backgroundColor: "#0dcaf0",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "600",
  },
  fileName: {
    fontSize: 12,
    color: "#555",
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: "#198754",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});
