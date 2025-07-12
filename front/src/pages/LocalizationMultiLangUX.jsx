import React from "react";
import { Container, Card, Accordion, ListGroup, Button } from "react-bootstrap";
import {
  Translate, Globe, Palette, Robot, ShieldCheck, Calendar3, Gear, PersonBadge, VolumeUp
} from "react-bootstrap-icons";

const LocalizationMultiLangUX = () => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">
        🌐 Localization Engine, Multi-Language AI & Cultural UX Framework
      </h2>

      {/* A. Localization Engine */}
      <Card className="mb-4 shadow-sm">
        <Card.Header><Globe /> A. Localization Engine</Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>🌐 Language Packs – Tamil, Hindi, Arabic, Tagalog, Malay, Spanish</ListGroup.Item>
            <ListGroup.Item>🧭 Plan Terminology – “Care Pass” → “Wellness Shield”, “Sugadhara Plan”</ListGroup.Item>
            <ListGroup.Item>🧾 Legal Disclaimers – IRDAI, DHA, GDPR</ListGroup.Item>
            <ListGroup.Item>💳 Currency/Tax – ₹ / AED / $, dual tax logic</ListGroup.Item>
            <ListGroup.Item>📍 Hospital Lists – Location + plan-filtered</ListGroup.Item>
            <ListGroup.Item>🏙 UI Format – RTL/LTR, calendar & units</ListGroup.Item>
            <ListGroup.Item>🪪 National ID Support – Aadhaar, Emirates ID</ListGroup.Item>
            <ListGroup.Item>📥 Language Detection – SIM/IP/browser</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {/* B. AI Layer */}
      <Card className="mb-4 shadow-sm">
        <Card.Header><Robot /> B. Multi-Language AI Layer</Card.Header>
        <Card.Body>
          <Accordion defaultActiveKey="0">
            {[
              "🤖 Plan Advisor Bot",
              "📅 Booking Assistant",
              "🧪 Report Interpreter",
              "🔄 AI Translator",
              "📜 Regulation Explainer",
              "🔊 Voice + Accessibility UI",
              "🤝 Emotion + Tone Detector",
              "🧠 Conversational Memory"
            ].map((label, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>{label}</Accordion.Header>
                <Accordion.Body>
                  Powered by NLP. Supports regional languages, tone matching, voice UI, memory, and accessibility.
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* C. Cultural UX */}
      <Card className="mb-4 shadow-sm">
        <Card.Header><Palette /> C. Cultural UX Framework</Card.Header>
        <Card.Body>
          <ul>
            <li>🎨 Color psychology by region</li>
            <li>🙏 Sensitive icons optional (religious symbols)</li>
            <li>🏠 City-based homepage defaults</li>
            <li>🪞 Formality/tone control by locale/demographic</li>
            <li>📣 Smart notifications – avoid prayer/holiday times</li>
            <li>🧏 Accessibility support – contrast, dyslexia fonts</li>
          </ul>
        </Card.Body>
      </Card>

      {/* D. Architecture */}
      <Card className="mb-4 shadow-sm">
        <Card.Header><Gear /> D. Architecture Stack</Card.Header>
        <Card.Body>
          <ul>
            <li>🗂 React-i18n + async language detection</li>
            <li>📁 JSON Locale Structure: /locales/{'{country}'}/{'{lang}'}/</li>
            <li>🧠 AI prompt tuning per region</li>
            <li>🔄 UX intent tags (e.g., #formal, #elder, #quick)</li>
            <li>🛠 Admin UI for testing tone + uploading JSON</li>
          </ul>
        </Card.Body>
      </Card>

      {/* E. Testing Strategy */}
      <Card className="mb-4 shadow-sm">
        <Card.Header><Calendar3 /> E. Testing Strategy</Card.Header>
        <Card.Body>
          <ol>
            <li>Stage 1: Load Indian languages (Tamil, Hindi)</li>
            <li>Stage 2: Load Arabic, Urdu, Filipino</li>
            <li>Stage 3: AI bot stress testing (Plan, Booking)</li>
            <li>Stage 4: Human UX QA with tone/dialect testers</li>
            <li>Stage 5: Feedback loop for AI tone refinement</li>
          </ol>
        </Card.Body>
      </Card>

      {/* F. Guardrails */}
      <Card className="mb-4 shadow-sm">
        <Card.Header><ShieldCheck /> F. Challenges & Mitigation</Card.Header>
        <Card.Body>
          <ul>
            <li>🧾 Glossary fallback for misunderstood terms</li>
            <li>📣 AI tone adaptation via user profile (age, gender)</li>
            <li>🌐 NGO/Govt training for rare language models</li>
            <li>🎯 Bias reduction – A/B testing, UX advisory boards</li>
          </ul>
        </Card.Body>
      </Card>

      <div className="text-center mt-4">
        <Button variant="outline-primary" className="me-3">
          <PersonBadge className="me-2" /> Upload Language JSON
        </Button>
        <Button variant="outline-secondary">
          <VolumeUp className="me-2" /> Simulate Voice Test
        </Button>
      </div>
    </Container>
  );
};

export default LocalizationMultiLangUX;
