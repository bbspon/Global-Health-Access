// GlobalRolloutScreen.jsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const Section = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.header}>{title}</Text>
    <View style={styles.body}>{children}</View>
  </View>
);

const Bullet = ({ text }) => <Text style={styles.bullet}>• {text}</Text>;

const GlobalRolloutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌐 Global Rollout Logic + Plug-in Architecture</Text>

      <Section title="🧭 A. Global Rollout Strategy">
        {["🇦🇪 UAE – Pilot-ready", "🇮🇳 India – Urban + Tier-2", "🌍 MENA + SEA – Multi-reg", "🇺🇸🇪🇺 US/EU – HIPAA, GDPR", "🌍 Africa/LATAM – NGO, Offline"].map(text => <Bullet key={text} text={text} />)}
      </Section>

      <Section title="🧩 B. Country Plug-in System">
        {["🏛 Regulation Adapter", "🧾 Taxation Adapter", "🏥 Hospital Format Adapter", "🌐 Locale Adapter", "💳 Payment Adapter", "📊 Reporting Adapter", "🧠 Smart Logic Adapter", "🧾 Consent Adapter"].map(text => <Bullet key={text} text={text} />)}
      </Section>

      <Section title="🔒 C. Data Governance & Privacy">
        {["AES-256, geo-fenced storage", "Role-based access + audit logs", "Retention policies", "Incident response hooks"].map(text => <Bullet key={text} text={text} />)}
      </Section>

      <Section title="🌍 D. Dynamic Plan Generator">
        {["Plan tiers, pricing by region", "Add-on support & AI upgrades", "Hospital network + compliance auto-mapping"].map(text => <Bullet key={text} text={text} />)}
      </Section>

      <Section title="💼 E. Partner Setup Wizard">
        {["Enter country → Load law → Upload partners → Localize → Test → Sandbox → Go Live"].map(text => <Bullet key={text} text={text} />)}
      </Section>

      <Section title="🧠 F. AI + NLP Enhancements">
        {["Translate medical/legal terms", "Localize tone (formal/informal)", "Compliance Copilot AI", "Smart plan matching"].map(text => <Bullet key={text} text={text} />)}
      </Section>

      <Section title="🎯 G. Challenges & Guardrails">
        {["Plugin governance dashboard", "Geo storage + fallback", "Regional audit logs", "Multi-tax & consent compliance"].map(text => <Bullet key={text} text={text} />)}
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6', padding: 15 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#fff', marginBottom: 15, padding: 15, borderRadius: 12, elevation: 2 },
  header: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  body: { paddingLeft: 5 },
  bullet: { fontSize: 14, marginBottom: 6 },
});

export default GlobalRolloutScreen;
