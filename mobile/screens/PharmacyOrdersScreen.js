// src/screens/PharmacyOrdersScreen.jsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { Provider as PaperProvider, Button, Portal, Modal } from "react-native-paper";

const API_BASE = "http://YOUR_BACKEND_IP:5000"; // adjust for device testing

const PharmacyOrdersScreen = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [prescription, setPrescription] = useState(null);
  const [deliveryMode, setDeliveryMode] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/medicines`)
      .then((res) => {
        const result = Array.isArray(res.data)
          ? res.data
          : res.data.medicines || [];
        setMedicines(result);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load medicines.");
      });
  }, []);

  const addToCart = (item) => {
    if (!cart.find((m) => m.id === item.id)) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const pickPrescription = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });
    if (!res.canceled) {
      const file = res.assets[0];
      setPrescription(file);
    }
  };

  const placeOrder = async () => {
    if (!deliveryMode) return Alert.alert("Select delivery mode");
    if (cart.length === 0 && !prescription)
      return Alert.alert("Add items or upload prescription");

    setLoading(true);
    const formData = new FormData();
    cart.forEach((item, i) => {
      formData.append(`items[${i}][id]`, item.id);
      formData.append(`items[${i}][qty]`, item.quantity);
    });
    if (prescription) {
      formData.append("prescription", {
        uri: prescription.uri,
        name: prescription.name,
        type: prescription.mimeType || "application/octet-stream",
      });
    }
    formData.append("deliveryMode", deliveryMode);

    try {
      await axios.post(`${API_BASE}/api/pharmacy/order`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Alert.alert("Order placed!");
      setCart([]);
      setPrescription(null);
      setDeliveryMode("");
      setVisible(false);
    } catch (err) {
      console.error(err);
      Alert.alert("Error placing order");
    } finally {
      setLoading(false);
    }
  };

  const renderMedicine = ({ item }) => (
    <View style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 }}>
      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
      <Text>₹{item.price} | Stock: {item.stock}</Text>
      <Button mode="contained" onPress={() => addToCart(item)} style={{ marginTop: 5 }}>
        Add
      </Button>
    </View>
  );

  return (
    <PaperProvider>
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>💊 Order Medicines</Text>
        {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}

        <TextInput
          placeholder="Search medicine"
          value={search}
          onChangeText={setSearch}
          style={{ borderWidth: 1, padding: 8, borderRadius: 8, marginBottom: 10 }}
        />

        <FlatList
          data={medicines.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMedicine}
        />

        <Text style={{ fontSize: 18, marginTop: 20, fontWeight: "bold" }}>🛒 Cart</Text>
        {cart.length === 0 ? (
          <Text>No items added.</Text>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={{ marginVertical: 5 }}>
              <Text>
                {item.name} (x{item.quantity})
              </Text>
              <TextInput
                keyboardType="numeric"
                value={String(item.quantity)}
                onChangeText={(val) =>
                  setCart((prev) =>
                    prev.map((c) =>
                      c.id === item.id ? { ...c, quantity: Number(val) } : c
                    )
                  )
                }
                style={{ borderWidth: 1, padding: 4, borderRadius: 4, width: 60 }}
              />
            </View>
          ))
        )}

        <TouchableOpacity onPress={pickPrescription} style={{ marginTop: 15 }}>
          <Text style={{ color: "#007bff" }}>📎 Upload Prescription</Text>
          {prescription && <Text style={{ fontSize: 12, color: "green" }}>✔️ {prescription.name}</Text>}
        </TouchableOpacity>

        <Text style={{ fontWeight: "bold", marginTop: 15 }}>🚚 Select Delivery Type:</Text>
        {["home", "pickup", "express", "elder"].map((mode) => (
          <TouchableOpacity key={mode} onPress={() => setDeliveryMode(mode)}>
            <Text
              style={{
                padding: 5,
                backgroundColor: deliveryMode === mode ? "#007bff" : "#eee",
                color: deliveryMode === mode ? "#fff" : "#333",
                marginVertical: 2,
                borderRadius: 5,
              }}
            >
              {mode === "home" && "🏠 Home Delivery"}
              {mode === "pickup" && "🏬 In-store Pickup"}
              {mode === "express" && "⚡ Express (90 min)"}
              {mode === "elder" && "👴 Elder Assist"}
            </Text>
          </TouchableOpacity>
        ))}

        <Button mode="contained" onPress={() => setVisible(true)} style={{ marginTop: 20 }}>
          ✅ Confirm & Pay
        </Button>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{ backgroundColor: "white", margin: 20, padding: 20, borderRadius: 8 }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Confirm Order</Text>
            <Text>Total Items: {cart.length}</Text>
            <Text>Delivery: {deliveryMode}</Text>
            {prescription && <Text>Prescription: ✅ {prescription.name}</Text>}
            {loading ? (
              <ActivityIndicator style={{ marginTop: 10 }} />
            ) : (
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                <Button mode="outlined" onPress={() => setVisible(false)}>
                  Cancel
                </Button>
                <Button mode="contained" onPress={placeOrder}>
                  Place Order
                </Button>
              </View>
            )}
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default PharmacyOrdersScreen;
