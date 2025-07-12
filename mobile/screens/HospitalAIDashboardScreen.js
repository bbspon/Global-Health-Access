import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const HospitalAIDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState("hospital");

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(13, 110, 253, ${opacity})`,
    labelColor: () => "#000",
    style: { borderRadius: 16 },
  };

  const usageData = {
    labels: ["OPD", "IPD", "Labs", "Dental", "Pharma"],
    datasets: [{ data: [340, 123, 285, 78, 190] }],
  };

  const doctorPerformance = [
    { name: "Dr. A Sharma", avgTime: "12 min", satisfaction: "92%", followUp: "18%" },
    { name: "Dr. M Singh", avgTime: "15 min", satisfaction: "85%", followUp: "25%" },
    { name: "Dr. R Patel", avgTime: "10 min", satisfaction: "96%", followUp: "10%" },
  ];

  const PanelCard = ({ title, children }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );

  const TabButton = ({ label, keyName }) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === keyName && styles.activeTab]}
      onPress={() => setActiveTab(keyName)}
    >
      <Text style={styles.tabText}>{label}</Text>
    </TouchableOpacity>
  );

  const renderHospitalTab = () => (
    <>
      <PanelCard title="Usage Analytics Bot">
        <Text>- Track OPD/IPD/Labs/Dental usage</Text>
        <Text>- Spike predictions (flu, etc)</Text>
        <Text>- Trendline charts</Text>
      </PanelCard>

      <PanelCard title="Pharmacy & Lab Revenue Predictor">
        <Text>- AI restocking suggestions</Text>
        <Text>- Revenue trends by tier</Text>
      </PanelCard>

      <PanelCard title="Care Pass Usage Chart">
        <BarChart
          data={usageData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          fromZero
          style={{ borderRadius: 16 }}
        />
      </PanelCard>

      <PanelCard title="Doctor Performance">
        {doctorPerformance.map((doc, index) => (
          <Text key={index}>
            • {doc.name} - {doc.avgTime} - {doc.satisfaction} - {doc.followUp}
          </Text>
        ))}
      </PanelCard>

      <PanelCard title="Emergency Load Predictor">
        <Text>- Predict surges based on weather/festivals</Text>
      </PanelCard>

      <PanelCard title="Queue Optimization Engine">
        <Text>- Predicts wait time, optimizes slots</Text>
      </PanelCard>

      <PanelCard title="Clinical Anomaly Detector">
        <Text>- Flags overuse of diagnostics or prescriptions</Text>
      </PanelCard>

      <PanelCard title="Triage AI Assistant">
        <Text>- Routes patients based on symptoms</Text>
      </PanelCard>

      <PanelCard title="Digital Twin - Bed Management">
        <Text>- Simulates ICU/IPD occupancy</Text>
      </PanelCard>

      <PanelCard title="Voice-to-EHR AI (Coming Soon)">
        <Text style={styles.muted}>- Auto transcripts from consultation audio</Text>
      </PanelCard>
    </>
  );

  const renderCityTab = () => (
    <>
      <PanelCard title="Geo Heatmap Engine">
        <Text>- Overlay active users by region</Text>
        <Text>- Detect saturation or service gaps</Text>
      </PanelCard>

      <PanelCard title="Churn Risk Detector">
        <Text>- Flags inactivity zones</Text>
        <Text>- Suggests nudges</Text>
      </PanelCard>

      <PanelCard title="Disease Spread Mapper">
        <Text>- Predict disease clusters (e.g., dengue)</Text>
      </PanelCard>

      <PanelCard title="Public Health Alert AI">
        <Text>- Sends alerts during medical surges</Text>
      </PanelCard>

      <PanelCard title="Smart Expansion Planner">
        <Text>- Identifies underserved areas for growth</Text>
      </PanelCard>

      <PanelCard title="Agent Optimizer + Migration Tool">
        <Text>- Agent performance</Text>
        <Text>- City-wise migration trends</Text>
      </PanelCard>
    </>
  );

  const renderAdminTab = () => (
    <>
      <PanelCard title="Smart Report Generator">
        <Text>- Auto-generate KPIs, NPS, revenue</Text>
        <Text>- Templates for Govt, CSR, Investors</Text>
      </PanelCard>

      <PanelCard title="AI Strategy Simulator">
        <Text>- What-if feature and pricing scenarios</Text>
      </PanelCard>

      <PanelCard title="Plan Performance Predictor">
        <Text>- Predict plan popularity before rollout</Text>
      </PanelCard>

      <PanelCard title="Security & Role Control">
        <Text>- Role-based visibility, alerts</Text>
      </PanelCard>

      <PanelCard title="Fraud Risk Detector">
        <Text>- Flags abnormal usage patterns</Text>
      </PanelCard>

      <PanelCard title="Audit Trail + Explainability">
        <Text>- Shows AI recommendation logic</Text>
      </PanelCard>

      <PanelCard title="Sentiment Analyzer (Coming Soon)">
        <Text style={styles.muted}>- Detects frustration in support messages</Text>
      </PanelCard>
    </>
  );

  const renderInvestorTab = () => (
    <>
      <PanelCard title="Investor Dashboard">
        <Text>- % using 2+ services in 60 days</Text>
        <Text>- Plan engagement + revenue metrics</Text>
      </PanelCard>

      <PanelCard title="Cohort Analysis AI">
        <Text>- Segment behavior by age, region</Text>
      </PanelCard>

      <PanelCard title="Customer Lifetime Value Estimator">
        <Text>- Predict revenue per user type</Text>
      </PanelCard>

      <PanelCard title="Impact Score (CSR/ESG)">
        <Text>- Measures health access uplift</Text>
      </PanelCard>
    </>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "hospital":
        return renderHospitalTab();
      case "city":
        return renderCityTab();
      case "admin":
        return renderAdminTab();
      case "investor":
        return renderInvestorTab();
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧠 AI Tools & Dashboards</Text>

      <View style={styles.tabContainer}>
        <TabButton label="🏥 Hospital" keyName="hospital" />
        <TabButton label="🌆 City" keyName="city" />
        <TabButton label="🛠️ Admin" keyName="admin" />
        <TabButton label="💼 Investor" keyName="investor" />
      </View>

      {renderTabContent()}
    </ScrollView>
  );
};

export default HospitalAIDashboardScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    marginBottom: 8,
  },
  activeTab: {
    backgroundColor: "#0d6efd",
  },
  tabText: {
    color: "#000",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 8,
  },
  muted: {
    color: "#888",
    fontStyle: "italic",
  },
});
