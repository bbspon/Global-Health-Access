import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Card, Button, List } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const carouselImages = [
  {
    uri: "https://images.livemint.com/img/2021/12/21/600x338/health-insurance-kMkD--621x414@LiveMint_1640076030753.jpg",
  },
  {
    uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6388ac148310363.62d33beab66cd.jpg",
  },
  {
    uri: "https://tse4.mm.bing.net/th/id/OIP.e7DiYK2qJN-gq46DBIDOlAHaFj?w=1200&h=900",
  },
];

const HealthObjectivePage = () => {
  const carouselRef = useRef(null);

  return (
    <ScrollView style={styles.container}>
      {/* 🎞️ Carousel Header */}
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={carouselImages}
          renderItem={({ item }) => (
            <ImageBackground
              source={{ uri: item.uri }}
              style={styles.carouselImage}
              imageStyle={{ opacity: 0.4 }}
            />
          )}
          sliderWidth={width}
          itemWidth={width}
          autoplay
          loop
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>
            🎯 Affordable Health Membership for All
          </Text>
          <Text style={styles.headerSubtitle}>
            Access OPD, diagnostics, dental, accident care — no insurance needed.
          </Text>
          <Button mode="contained" onPress={() => {}} color="#28a745">
            Explore Plans & Pricing
          </Button>
        </View>
      </View>

      {/* 🧭 Benefits Cards */}
      <View style={styles.section}>
        <Card style={styles.card}>
          <Card.Title title="👨‍⚕️ Citizen Benefits" />
          <Card.Content>
            <Text>• Affordable prepaid plans</Text>
            <Text>• Predictable monthly cost</Text>
            <Text>• Easy OPD/IPD/Diagnostic access</Text>
            <Text>• No claims or waiting</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="🏥 Hospital Benefits" />
          <Card.Content>
            <Text>• Monthly recurring revenue</Text>
            <Text>• Better patient footfall</Text>
            <Text>• No insurance dependency</Text>
            <Text>• Higher utilization of resources</Text>
          </Card.Content>
        </Card>
      </View>

      {/* 📸 Banner */}
      <ImageBackground
        source={{
          uri: "https://www.novotel-visakhapatnam.com/wp-content/uploads/sites/24/2022/12/unnamed.jpg",
        }}
        style={styles.banner}
        imageStyle={{ borderRadius: 12 }}
      />

      {/* 🧬 Services Covered */}
      <Card style={styles.card}>
        <Card.Title title="❤️ Services Covered" />
        <Card.Content>
          <Text>✔️ OPD consultations</Text>
          <Text>✔️ Diagnostics & blood tests</Text>
          <Text>✔️ Basic dental care</Text>
          <Text>✔️ Partial IPD room discount</Text>
          <Text>✔️ Minor accidental care</Text>
          <Text>❌ No claim insurance model</Text>
          <Text style={styles.note}>* This is a prepaid health plan, not insurance.</Text>
        </Card.Content>
      </Card>

      {/* 🌍 Expansion */}
      <Card style={styles.card}>
        <Card.Title title="🌍 Designed for India, UAE — and beyond" />
        <Card.Content>
          <Text>
            Our model is built to scale. With offline + online integration and legal
            compliance, we're ready to expand across emerging markets.
          </Text>
        </Card.Content>
      </Card>

      {/* 👥 Testimonials */}
      <Card style={styles.card}>
        <Card.Title title="👥 What People Say" />
        <Card.Content>
          <Text style={styles.italic}>“Saved my family ₹10,000 last year!”</Text>
          <Text style={styles.italic}>
            “Super convenient — booked an OPD appointment in 2 clicks.”
          </Text>
        </Card.Content>
      </Card>

      {/* 💬 FAQs */}
      <List.AccordionGroup>
        <List.Accordion title="💬 Is this a health insurance plan?" id="1">
          <Text>
            No. This is a prepaid membership model with fixed benefits. No claims or forms.
          </Text>
        </List.Accordion>
        <List.Accordion title="💬 What if I don’t use it?" id="2">
          <Text>
            Benefits reset monthly. If unused, the next month starts fresh. Cancel anytime.
          </Text>
        </List.Accordion>
        <List.Accordion title="💬 Can I use this with family?" id="3">
          <Text>
            Yes! We offer discounted family packs. See the plans section.
          </Text>
        </List.Accordion>
      </List.AccordionGroup>

      {/* 🔗 CTA Buttons */}
      <View style={styles.buttonGroup}>
        <Button mode="outlined" icon="cart" onPress={() => {}}>
          Membership Plans
        </Button>
        <Button mode="outlined" icon="hospital" onPress={() => {}}>
          Partner Hospitals
        </Button>
        <Button mode="outlined" icon="calendar" onPress={() => {}}>
          Book a Visit
        </Button>
      </View>

      {/* Footer Note */}
      <Text style={styles.footerNote}>
        This is informational. Plans subject to hospital availability. BBS Health © 2025
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  carouselContainer: { height: 400, marginBottom: 20 },
  carouselImage: { height: 400, width: "100%" },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 400,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#f1f1f1",
    textAlign: "center",
    marginBottom: 15,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    marginHorizontal: 15,
    elevation: 3,
  },
  banner: {
    height: 200,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  italic: {
    fontStyle: "italic",
    marginBottom: 8,
  },
  note: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  buttonGroup: {
    paddingHorizontal: 15,
    marginVertical: 25,
    gap: 10,
  },
  footerNote: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});

export default HealthObjectivePage;
