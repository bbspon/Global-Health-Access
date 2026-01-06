import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Card,
  Button,
  Menu,
  Provider as PaperProvider,
  List,
} from 'react-native-paper';
import { useAppTheme } from '../theme/ThemeContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('window');


const features = [
  { icon: 'heart-pulse', label: 'Health Access Plans', route: 'Health Access' },
  {
    icon: 'calendar-check',
    label: 'Book Doctor / Lab',
    route: 'Booking',
    screen: 'BookingManager',
  },
  {
    icon: 'calendar-heart',
    label: 'Health Data Flow',
    route: 'DataFlow',
    screen: 'DataFlow',
  },
  {
    icon: 'file-document',
    label: 'Records Vault',
    route: 'MedicalVaultStack',
    screen: 'MedicalVaultStack',
  },
  { icon: 'map-marker', label: 'Nearby Hospitals', route: 'HospitalPartner' },
  {
    icon: 'robot',
    label: 'Plan Usage',
    route: 'PlanUsage',
    screen: 'PlanUsage',
  },
  {
    icon: 'credit-card',
    label: 'My Wallet',
    route: 'Wallet',
    screen: 'Wallet',
  },
  {
    icon: 'storefront',
    label: 'Digital Health Card',
    route: 'DigitalHealth',
    screen: 'DigitalHealth',
  },
  { icon: 'hospital-building', label: 'Insurance Plans', route: 'InsuranceIntegration' },
  { icon: 'stethoscope', label: 'Consult Room', route: 'ConsultRoom' },
  {
    icon: 'account-group',
    label: 'Family Health',
    route: 'FamilyHealthTimeline',
  },
  {
    icon: 'account-group',
    label: 'Feedback & Support',
    route: 'PatientFeedbackEngine',
  },
  {
    icon: 'account-group',
    label: 'Pharmacy & Labs',
    route: 'PharmacyIntegrationDashboard',
  },
];

const banners = [
  { id: 1, src: require('../assets/images/banner1.png') },
  { id: 2, src: require('../assets/images/banner2.jpg') },
  { id: 3, src: require('../assets/images/banner3.jpg') },
];
const INDIA_CITIES = [
  "Chennai",
  "Bengaluru",
  "Hyderabad",
  "Mumbai",
  "Delhi",
  "Coimbatore",
  "Madurai",
];

const HomeDashboardScreen = () => {
  const navigation = useNavigation();
  const [visibleLang, setVisibleLang] = useState(false);
  const [visibleRegion, setVisibleRegion] = useState(false);
  // Add these states at the top inside your component
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const { isDark, toggle } = useAppTheme();

  const actionsRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);
  const ACTION_SCROLL_AMOUNT = 220;
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [alertCount, setAlertCount] = useState(3); // replace with API later
  const [showLocationModal, setShowLocationModal] = useState(false);

  const COUNTRIES = ["India"];

  const CITY_MAP = {
    India: [
      "Chennai",
      "Bengaluru",
      "Hyderabad",
      "Mumbai",
      "Delhi",
      "Coimbatore",
      "Madurai",
    ],
  };
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedCity, setSelectedCity] = useState("Chennai");  

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);

      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 32),
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const openMenu = setter => setter(true);
  const closeMenu = setter => setter(false);
  /* Load saved location */
  useEffect(() => {
    const loadLocation = async () => {
      const saved = await AsyncStorage.getItem("bbs_location");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSelectedCountry(parsed.country || "India");
        setSelectedCity(parsed.city || "Chennai");
      }
    };
    loadLocation();
  }, []);
  const saveLocation = async (country, city) => {
    setSelectedCountry(country);
    setSelectedCity(city);
    await AsyncStorage.setItem(
      "bbs_location",
      JSON.stringify({ country, city })
    );
    setShowLocationModal(false);
  };

  const handleQuickAction = action => {
    Alert.alert('Quick Action', `Triggered: ${action}`);
  };
  useEffect(() => {
    const loadCity = async () => {
      const savedCity = await AsyncStorage.getItem("bbs_city");
      if (savedCity) {
        setSelectedCity(savedCity);
      }
    };
    loadCity();
  }, []);
const handleCityChange = async (city) => {
  setSelectedCity(city);
  await AsyncStorage.setItem("bbs_city", city);
};

  return (
    <PaperProvider>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>BBS Global Health Access</Text>
          <Text style={styles.title}>Welcome</Text>

          <Text style={styles.subtitle}>
            Futuristic Health Access Dashboard
          </Text>
        </View>

        {/* Auto Image Slider */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.slider}
          scrollEventThrottle={16}
        >
          {banners.map(banner => (
            <Image
              key={banner.id}
              source={banner.src}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Actions */}
        <View style={{ marginBottom: 24 }}>
          <View style={styles.actionsWrapper}>
            {/* ⬅️ LEFT ARROW */}
            {scrollX > 0 && (
              <TouchableOpacity
                style={[styles.arrowBtn, styles.leftArrow]}
                onPress={() =>
                  actionsRef.current?.scrollTo({
                    x: Math.max(scrollX - ACTION_SCROLL_AMOUNT, 0),
                    animated: true,
                  })
                }
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={22}
                  color="#fff"
                />
              </TouchableOpacity>
            )}

            {/* 👉 ACTION SCROLLER */}
            <ScrollView
              ref={actionsRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.actionsScroll}
              onScroll={e => setScrollX(e.nativeEvent.contentOffset.x)}
              onContentSizeChange={w => setContentWidth(w)}
              onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
              scrollEventThrottle={16}
            >
              {/* Your Buttons and Menus */}
              <Button
                mode="outlined"
                icon="map-marker"
                textColor="white"
                style={styles.actionBtn}
                onPress={() => setShowLocationModal(true)}
              >
                {selectedCity}, {selectedCountry}
              </Button>
              <Modal
                visible={showLocationModal}
                transparent
                animationType="fade"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalCard}>
                    <Text style={styles.modalTitle}>Select Location</Text>

                    {/* Country */}
                    <Text style={styles.label}>Country</Text>
                    {COUNTRIES.map((country) => (
                      <TouchableOpacity
                        key={country}
                        style={[
                          styles.optionItem,
                          selectedCountry === country && styles.optionActive,
                        ]}
                        onPress={() => setSelectedCountry(country)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedCountry === country &&
                            styles.optionTextActive,
                          ]}
                        >
                          {country}
                        </Text>
                      </TouchableOpacity>
                    ))}

                    {/* City */}
                    <Text style={[styles.label, { marginTop: 12 }]}>
                      City
                    </Text>
                    <View style={styles.cityList}>
                      {CITY_MAP[selectedCountry].map((city) => (
                        <TouchableOpacity
                          key={city}
                          style={[
                            styles.optionItem,
                            selectedCity === city && styles.optionActive,
                          ]}
                          onPress={() =>
                            saveLocation(selectedCountry, city)
                          }
                        >
                          <Text
                            style={[
                              styles.optionText,
                              selectedCity === city &&
                              styles.optionTextActive,
                            ]}
                          >
                            {city}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <TouchableOpacity
                      style={styles.closeBtn}
                      onPress={() => setShowLocationModal(false)}
                    >
                      <Text style={styles.closeText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Menu
                visible={visibleLang}
                onDismiss={() => closeMenu(setVisibleLang)}
                anchor={
                  <Button
                    mode="outlined"
                    icon="account"
                    textColor="white"
                    style={styles.actionBtn}
                    onPress={() => openMenu(setVisibleLang)}
                  >
                    Language
                  </Button>
                }
              >
                <Menu.Item title="English" />
                <Menu.Item title="Arabic" />
                <Menu.Item title="Hindi" />
              </Menu>

              <Button
                mode="outlined"
                textColor="white"
                style={styles.actionBtn}
                onPress={toggle}
                icon={() => (
                  <MaterialCommunityIcons
                    name={isDark ? 'white-balance-sunny' : 'weather-night'}
                    size={18}
                    color="#fff"
                  />
                )}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Button
                mode="outlined"
                icon={() => (
                  <View>
                    <MaterialCommunityIcons name="bell-outline" size={18} color="#fff" />
                    {alertCount > 0 && (
                      <View
                        style={{
                          position: 'absolute',
                          top: -4,
                          right: -6,
                          backgroundColor: 'red',
                          borderRadius: 8,
                          width: 16,
                          height: 16,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 10 }}>
                          {alertCount}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
                textColor="white"
                style={styles.actionBtn}
                onPress={() => navigation.navigate('Notifications')}
              >
                Alerts
              </Button>

              <Button
                mode="outlined"
                icon="brain"
                textColor="white"
                style={styles.actionBtn}
                onPress={() =>
                  navigation.navigate('AIDiseasePredictionRiskEngine')
                }
              >
                AI Risk
              </Button>

              <Button
                mode="outlined"
                icon="shield-check"
                textColor="white"
                style={styles.actionBtn}
                onPress={() => navigation.navigate('ComplianceMainPage')}
              >
                Compliance
              </Button>

              <Button
                mode="outlined"
                icon="qrcode"
                textColor="white"
                style={styles.actionBtn}
                onPress={() => navigation.navigate('QR')}
              >
                QR
              </Button>

              <Button
                mode="outlined"
                icon="hospital"
                textColor="white"
                style={styles.actionBtn}
                onPress={() => navigation.navigate('InsuranceIntegration')}
              >
                Insurance
              </Button>

              <Button
                mode="outlined"
                icon="bell"
                textColor="white"
                style={styles.actionBtn}
                onPress={() => navigation.navigate('Notifications')}
              >
                Notifications
              </Button>

              <Button
                mode="outlined"
                icon="map-marker"
                textColor="white"
                style={styles.actionBtn}
                onPress={() => navigation.navigate('UAEInsuranceIntegration')}
              >
                UAE Insurance
              </Button>

              <Button
                mode="outlined"
                icon="calendar-check"
                textColor="white"
                style={styles.actionBtn}
                onPress={() => navigation.navigate('AppointmentOtp')}
              >
                Appointment
              </Button>

              <Button
                mode="outlined"
                icon="flask"
                textColor="white"
                style={styles.actionBtn}
                onPress={() => navigation.navigate('LabDiagnostics')}
              >
                Lab
              </Button>
            </ScrollView>

            {/* ➡️ RIGHT ARROW */}
            {scrollX < contentWidth - containerWidth && (
              <TouchableOpacity
                style={[styles.arrowBtn, styles.rightArrow]}
                onPress={() =>
                  actionsRef.current?.scrollTo({
                    x: Math.min(
                      scrollX + ACTION_SCROLL_AMOUNT,
                      contentWidth - containerWidth,
                    ),
                    animated: true,
                  })
                }
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={26}
                  color="#fff"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.grid}>
          {features.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(item.route)}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={32}
                color="#0d6efd"
              />
              <Text style={styles.cardText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <Card style={styles.quickCard}>
          <Card.Content>
            <Text style={styles.quickTitle}>⚡ Quick Actions</Text>
            <View style={styles.quickActions}>
              <Button
                mode="contained"
                buttonColor="#28a745"
                onPress={() => navigation.navigate('UserFeedbackRatingsSystem')}
              >
                User Feedback & Ratings
              </Button>

              <Button
                mode="contained"
                buttonColor="#dc3545"
                onPress={() => navigation.navigate('DigitalHealth')}
              >
                Digital Health
              </Button>

              <Button
                mode="contained"
                buttonColor="#0dcaf0"
                onPress={() => navigation.navigate('PerformanceScoring')}
              >
                Doctor ScoreCard
              </Button>

              <Button
                mode="contained"
                onPress={() => navigation.navigate('PurchaseSummary')}
                buttonColor="#212529"
              >
                Purchase Summary
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Vision Cards */}
        <View style={styles.row}>
          <Card style={styles.visionCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>
                <MaterialCommunityIcons
                  name="clipboard-heart"
                  size={20}
                  color="green"
                />{' '}
                Citizen Benefits
              </Text>
              <Text>• Affordable prepaid plans</Text>
              <Text>• Predictable monthly cost</Text>
              <Text>• Easy OPD/IPD/Diagnostic access</Text>
              <Text>• No claims or waiting</Text>
            </Card.Content>
          </Card>

          <Card style={styles.visionCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>
                <MaterialCommunityIcons
                  name="hospital-building"
                  size={20}
                  color="#0d6efd"
                />{' '}
                Hospital Benefits
              </Text>
              <Text>• Monthly recurring revenue</Text>
              <Text>• Better patient footfall</Text>
              <Text>• No insurance dependency</Text>
              <Text>• Higher utilization of resources</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Banner */}
        <Image
          source={{
            uri: 'https://www.novotel-visakhapatnam.com/wp-content/uploads/sites/24/2022/12/unnamed.jpg',
          }}
          style={styles.coverImage}
        />

        {/* Services Covered */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="heart-pulse"
                size={20}
                color="red"
              />{' '}
              Services Covered
            </Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text>• OPD consultations</Text>
                <Text>• Diagnostics & blood tests</Text>
                <Text>• Basic dental care</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>• Partial IPD room discount</Text>
                <Text>• Minor accidental care</Text>
                <Text>• No claim model</Text>
              </View>
            </View>
            <Text style={{ color: 'gray', marginTop: 5, fontSize: 12 }}>
              *This is a prepaid health plan, not an insurance policy.
            </Text>
          </Card.Content>
        </Card>

        {/* Expansion */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Text style={styles.sectionHeader}>
              <MaterialCommunityIcons
                name="this-icon-does-not-exist"
                size={26}
                color="#fff"
              />
              Designed for India, UAE — and beyond
            </Text>
            <Text>
              Our model is built to scale. With offline + online integration and
              non-insurance compliance, we're ready to expand across markets.
            </Text>
          </Card.Content>
        </Card>

        {/* Testimonials */}
        <Card style={styles.testimonialCard}>
          <Text style={styles.sectionHeader}>👥 What People Say</Text>
          <Text style={styles.quote}>
            "This health membership helped my family save ₹10,000 last year!"
          </Text>
          <Text style={styles.quote}>
            "Super convenient — booked an OPD appointment in 2 clicks."
          </Text>
        </Card>

        {/* FAQ */}
        <List.Section>
          <List.Accordion
            title="Is this a health insurance plan?"
            left={props => <List.Icon {...props} icon="information" />}
          >
            <Text style={{ color: "white" }}>
              No. This is a prepaid membership model with fixed benefits. No
              claim forms or hassles.
            </Text>
          </List.Accordion>
          <List.Accordion
            title="What happens if I don't use it?"
            left={props => <List.Icon {...props} icon="information" />}
          >
            <Text style={{ color: "white" }}>
              Your benefits reset monthly. If unused, the next month starts
              fresh. You can cancel anytime.
            </Text>
          </List.Accordion>
          <List.Accordion
            title="Can I use this with my family?"
            left={props => <List.Icon {...props} icon="information" />}
          >
            <Text style={{ color: "white" }}>Yes! We offer family packs at discounted pricing.</Text>
          </List.Accordion>
        </List.Section>

        {/* Quick Navigation */}
        <View style={styles.quickNav}>
          <Button
            mode="outlined"
            icon="cart"
            onPress={() => navigation.navigate('HealthMembership')}
          >
            View Membership Plans
          </Button>
          <Button
            mode="outlined"
            icon="hospital-building"
            onPress={() => navigation.navigate('PartnerHospitals')}
          >
            Find Partner Hospitals
          </Button>
          <Button
            mode="outlined"
            icon="calendar"
            onPress={() => navigation.navigate('BookHealthVisit')}
          >
            Book a Health Visit
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2027',
    padding: 16,
  },
  actionsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    gap: 10,
  },

  actionBtn: {
    borderRadius: 30,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  /* ---------- Header ---------- */
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  brand: {
    color: '#38bdf8',
    fontWeight: '800',
    fontSize: 22,

  },
  subtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    marginTop: 4,
  },

  /* ---------- Banner Slider ---------- */
  slider: {
    marginBottom: 24,
  },
  bannerImage: {
    width: width - 32,
    height: 170,
    borderRadius: 18,
    marginRight: 12,
  },

  /* ---------- Top Actions ---------- */
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 24,
  },

  /* ---------- Feature Grid ---------- */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  cardText: {
    color: '#e5e7eb',
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 13,
  },

  /* ---------- Quick Actions ---------- */
  quickCard: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  quickTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },

  /* ---------- Info Cards ---------- */
  row: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  visionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  /* ---------- Section Cards ---------- */
  sectionCard: {
    marginTop: 22,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },

  /* ---------- Cover Image ---------- */
  coverImage: {
    width: '100%',
    height: 190,
    borderRadius: 20,
    marginVertical: 20,
  },

  /* ---------- Testimonials ---------- */
  testimonialCard: {
    marginTop: 22,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  quote: {
    fontStyle: 'italic',
    marginVertical: 6,
    color: '#374151',
  },

  /* ---------- Bottom Navigation ---------- */
  quickNav: {
    marginVertical: 24,
    gap: 12,
  },
  actionsWrapper: {
    position: 'relative',
    marginBottom: 24,
  },

  actionsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    gap: 10,
  },

  actionBtn: {
    borderRadius: 30,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  arrowBtn: {
    position: 'absolute',
    top: '50%',
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -18 }],
  },
  locationButton: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    marginBottom: 20,
  },

  locationText: { fontSize: 15, fontWeight: "700", color: "#111" },
  changeText: { fontSize: 12, color: "#0b5ed7" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  label: { fontSize: 12, color: "#666", marginBottom: 6 },

  cityList: { maxHeight: 220 },

  optionItem: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    marginBottom: 6,
  },

  optionActive: { backgroundColor: "#e6f0ff" },

  optionText: { fontSize: 14, color: "#111" },
  optionTextActive: { fontWeight: "700", color: "#003d99" },

  closeBtn: {
    marginTop: 12,
    alignSelf: "flex-end",
  },

  closeText: { color: "#999" },

  leftArrow: {
    left: 4,
  },

  rightArrow: {
    right: 4,
  },

});


export default HomeDashboardScreen;
