import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  MaterialCommunityIcons, Ionicons, FontAwesome5, Entypo, Feather
} from '@expo/vector-icons';

const Section = ({ title, icon, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{icon}  {title}</Text>
    <View style={styles.content}>{children}</View>
  </View>
);

const Bullet = ({ text }) => (
  <Text style={styles.bullet}>• {text}</Text>
);

const LocalizationMultiLangUXMobile = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🌐 Localization Engine, Multi-Language AI & Cultural UX</Text>

      <Section title="A. Localization Engine" icon={<Ionicons name="language" size={22} color="#006" />}>
        <Bullet text="🌐 Language Packs (Arabic, Hindi, Tamil, etc.)" />
        <Bullet text="🧭 Plan Terminology – region-based" />
        <Bullet text="🧾 Legal Notices – IRDAI, DHA, GDPR" />
        <Bullet text="💳 Currency, Tax, Invoice Localization" />
        <Bullet text="📍 Geo-based Hospital Lists" />
        <Bullet text="🏙 UI Metrics (kg/lbs, RTL/LTR)" />
        <Bullet text="🪪 National ID field formats" />
        <Bullet text="📥 Auto Language Detection via IP/SIM" />
      </Section>

      <Section title="B. Multi-Language AI Layer" icon={<MaterialCommunityIcons name="robot" size={22} color="#006" />}>
        <Bullet text="🤖 Plan Advisor – localized chatbot" />
        <Bullet text="📅 Booking Assistant (Urdu, Arabic, etc.)" />
        <Bullet text="🧪 Report Interpreter – health insights simplified" />
        <Bullet text="🔄 AI Translator – tone/slang aware" />
        <Bullet text="📜 Regulatory Explainer Bot" />
        <Bullet text="🔊 Voice UI (elder friendly)" />
        <Bullet text="🤝 Emotion & tone detector" />
        <Bullet text="🧠 AI Memory + Accessibility layer" />
      </Section>

      <Section title="C. Cultural UX Framework" icon={<FontAwesome5 name="palette" size={20} color="#006" />}>
        <Bullet text="🎨 Regional Color Psychology" />
        <Bullet text="🙏 Iconography Rules (religion-neutral)" />
        <Bullet text="🏠 Personalized Homepage per City" />
        <Bullet text="🪞 Tone/Formality by user demographic" />
        <Bullet text="📣 Localized Notification Rules (Iftar, Mass, etc.)" />
        <Bullet text="🧏 Accessibility Optimized UI" />
      </Section>

      <Section title="D. Architecture Stack" icon={<Entypo name="layers" size={20} color="#006" />}>
        <Bullet text="🗂 i18n + async fallback + locale files" />
        <Bullet text="📁 /locales/{country}/{lang}/index.json" />
        <Bullet text="🧠 Prompt tuning for each AI function" />
        <Bullet text="🧪 Tone Sim Test Tools (Admin)" />
      </Section>

      <Section title="E. Testing & Rollout" icon={<Ionicons name="calendar" size={20} color="#006" />}>
        <Bullet text="Stage 1: Indian languages" />
        <Bullet text="Stage 2: Arabic, Urdu, Filipino, Bahasa" />
        <Bullet text="Stage 3: AI Stress Simulations" />
        <Bullet text="Stage 4: Human QA (real dialects)" />
        <Bullet text="Stage 5: AI Feedback Loop" />
      </Section>

      <Section title="F. Challenges & Guardrails" icon={<FontAwesome5 name="shield-alt" size={20} color="#006" />}>
        <Bullet text="🧾 Misinterpretation → Glossary fallback" />
        <Bullet text="📣 Tone mismatch → AI tuning by profile" />
        <Bullet text="🌐 Low-resource languages → NGO support" />
        <Bullet text="🎯 Cultural Bias → UX testing + advisory" />
      </Section>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button}>
          <Feather name="file-text" size={18} color="white" />
          <Text style={styles.buttonText}>Upload JSON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Feather name="volume-2" size={18} color="white" />
          <Text style={styles.buttonText}>Voice AI Test</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#222' },
  card: { marginBottom: 16, backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#003366' },
  content: { paddingLeft: 8 },
  bullet: { fontSize: 15, marginVertical: 2, lineHeight: 22, color: '#333' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 },
  button: { flexDirection: 'row', backgroundColor: '#007bff', padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', marginLeft: 8, fontWeight: 'bold' },
});

export default LocalizationMultiLangUXMobile;
