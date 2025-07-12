// GlobalRolloutPage.jsx
import React from "react";
import { Container, Row, Col, Card, Accordion, Badge, ListGroup } from "react-bootstrap";
import { Globe, Gear, Building, DatabaseCheck, ShieldLock, Terminal, Translate, CurrencyExchange } from "react-bootstrap-icons";

const GlobalRolloutPage = () => {
  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">🌐 Global Rollout Logic + Country Plug-in Architecture</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Header><Globe /> A. Global Rollout Strategy</Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>🇦🇪 UAE – Pilot region, digital hospital support</ListGroup.Item>
            <ListGroup.Item>🇮🇳 India – Urban base, NABH partner mapping</ListGroup.Item>
            <ListGroup.Item>🌍 MENA/SEA – Egypt, Saudi, Singapore, Malaysia</ListGroup.Item>
            <ListGroup.Item>🇺🇸🇪🇺 US/EU – HIPAA/GDPR-ready plugin layers</ListGroup.Item>
            <ListGroup.Item>🌍 Africa/LATAM – Offline mode, NGO-ready expansion</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Header><Gear /> B. Country Plug-in System</Card.Header>
        <Card.Body>
          <Accordion>
            {[
              { title: "🏛 Regulation Adapter", desc: "Country-specific laws, T&C formats, medical disclaimers" },
              { title: "🧾 Taxation Adapter", desc: "Applies GST/VAT/TDS logic automatically" },
              { title: "🏥 Hospital Format Adapter", desc: "Supports HL7/FHIR, CSV or JSON uploads" },
              { title: "🌐 Locale Adapter", desc: "UI language and medical terminology translation" },
              { title: "💳 Payment Adapter", desc: "Handles currency, gateway, EMI, wallet routing" },
              { title: "📊 Reporting Adapter", desc: "Formats financial/insurance reports per region" },
              { title: "🧠 Smart Logic Adapter", desc: "Injects AI into plan eligibility + compliance rules" },
              { title: "🧾 Consent & Doc Adapter", desc: "E-sign, Aadhaar/OTP, local doc formats" }
            ].map((item, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>{item.desc}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Header><ShieldLock /> C. Data Governance & Privacy Layer</Card.Header>
        <Card.Body>
          <ul>
            <li>AES-256 encryption & geo-fenced storage</li>
            <li>Role-based access, consent logs, audit trails</li>
            <li>Per-country archival & data portability APIs</li>
            <li>Incident breach hooks & retention policies</li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Header><Terminal /> D. Dynamic Plan Generator</Card.Header>
        <Card.Body>
          <p>Auto-generates localized health plans per country with:</p>
          <ul>
            <li>Pricing & Tiers in native currency</li>
            <li>Coverage options, add-ons, plan upgrade AI</li>
            <li>Localized legal terms & regional hospital mapping</li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Header><Building /> E. Partner Setup Wizard</Card.Header>
        <Card.Body>
          <ol>
            <li>Enter country details</li>
            <li>Load regulation/tax adapters</li>
            <li>Upload hospitals, labs, pharmacies</li>
            <li>Localize UI + terms</li>
            <li>Run test adapter simulation</li>
            <li>Launch sandbox environment</li>
            <li>Push live with rollback fallback</li>
          </ol>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Header><Translate /> F. Future AI + NLP Enhancements</Card.Header>
        <Card.Body>
          <ul>
            <li>AI-translates medical/legal terminology regionally</li>
            <li>Adaptive response tone (formal/informal)</li>
            <li>Policy Copilot for Admin teams</li>
            <li>Smart plan suggestions, breach detection AI</li>
          </ul>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Header><CurrencyExchange /> G. Challenges & Risk Mitigation</Card.Header>
        <Card.Body>
          <ul>
            <li>Legal complexity handled via plugin + consultants</li>
            <li>Data localization via country-wise cloud zones</li>
            <li>Multi-tax resolver & dashboard heatmap alerts</li>
            <li>Fail-safe rollback + audit-first governance</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GlobalRolloutPage;
