import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import PlanBuilder from "./PlanBuilder";
import HospitalCMS from "./HospitalCMS";
import LabCMS from "./LabCMS";
import DoctorCMS from "./DoctorCMS";
import HealthCardGenerator from "./HealthCardGenerator";
import SOSManager from "./EmergencySOSSection";
import PlanComparisonEditor from "./PlanComparisonEditor";
import PartnerInquiryForm from "./PartnerWithUsForm";
import HealthPlan from "./HealthPlanValueCalculator";
import WellnessTrackerWidgets from "./WellnessTracker";

/** Small helper to render a card with one or more route buttons */
const LinkCard = ({ title, items = [] }) => (
  <Card className="mb-3">
    <Card.Body>
      <Card.Title className="mb-3">{title}</Card.Title>
      <div className="d-flex flex-wrap gap-2">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="btn btn-outline-primary btn-sm"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </Card.Body>
  </Card>
);

const HealthAccessCMS = () => {
  const [activeKey, setActiveKey] = useState("plan");
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="pt-4"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Row className="flex-grow-1">
          <Col md={3}>
            <Card className="shadow-sm rounded-3 h-100 p-3 border border-2 border-dark shadow-sm rounded-3">
              <Card.Header className="fw-bold bg-primary text-white p-2">
                BBS Health CMS
              </Card.Header>

              {/* LEFT SIDEBAR */}
              <Nav variant="pills" className="flex-column p-2 text-start">
                {/* ---- Existing items (unchanged) ---- */}
                <Nav.Item>
                  <Nav.Link eventKey="healthplan">
                    🧱 Health Plan Value Calculator
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="plan">🧱 Plan Builder</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="hospital">🏥 Hospital CMS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="lab">🧪 Lab Test CMS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="doctor">🩺 Doctor CMS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="card">🆔 Health Card Generator</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sos">🚨 Emergency SOS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="compare">
                    📊 Plan Comparison Editor
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="partner">🤝 Partner With Us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="wellnesstracker">
                    🧘 Wellness Tracker Widgets
                  </Nav.Link>
                </Nav.Item>

                {/* ---- NEW GROUPS (only additions) ---- */}

                <div className="mt-3 small text-muted text-uppercase ps-2">
                  Plans
                </div>
                <Nav.Item>
                  <Nav.Link eventKey="planTerms">
                    📄 Plan Terms (per Plan)
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="dynamicPricing">
                    ⚙️ Dynamic Pricing
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="addOnSelector">
                    ➕ Add-On Selector
                  </Nav.Link>
                </Nav.Item>

                <div className="mt-3 small text-muted text-uppercase ps-2">
                  Wallet & Revenue
                </div>
                <Nav.Item>
                  <Nav.Link eventKey="walletAdmin">👛 Wallet Admin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="revenueEngine">
                    📈 Revenue Engine
                  </Nav.Link>
                </Nav.Item>

                <div className="mt-3 small text-muted text-uppercase ps-2">
                  Governance
                </div>
                <Nav.Item>
                  <Nav.Link eventKey="adminPartner">🏢 Partner Admin</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="intropGov">
                    🏛️ InterOp / Gov Health
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="govtCorp">🏬 Govt & Corporate</Nav.Link>
                </Nav.Item>

                <div className="mt-3 small text-muted text-uppercase ps-2">
                  Wellness
                </div>
                <Nav.Item>
                  <Nav.Link eventKey="adminWellness">
                    🧑‍⚕️ Admin Wellness
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="wellnessTracker">
                    📟 Wellness Tracker
                  </Nav.Link>
                </Nav.Item>

                <div className="mt-3 small text-muted text-uppercase ps-2">
                  Localization & Rollout
                </div>
                <Nav.Item>
                  <Nav.Link eventKey="localization">🌐 Localization</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="globalRollout">
                    🚀 Global Rollout
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="multiLingual">🗣️ Multi-lingual</Nav.Link>
                </Nav.Item>

                <div className="mt-3 small text-muted text-uppercase ps-2">
                  Insurance
                </div>
                <Nav.Item>
                  <Nav.Link eventKey="insuranceIntegration">
                    🧾 Insurance Integration
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="uaeInsurance">🇦🇪 UAE Insurance</Nav.Link>
                </Nav.Item>

                <div className="mt-3 small text-muted text-uppercase ps-2">
                  Ecosystem
                </div>
                <Nav.Item>
                  <Nav.Link eventKey="healthEcosystem">
                    🏥 Health Ecosystem
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="healthAccessEcosystem">
                    🩺 Health-Access Ecosystem
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="unifiedApi">🧩 Unified API</Nav.Link>
                </Nav.Item>

                <div className="mt-3 small text-muted text-uppercase ps-2">
                  Security / Risk
                </div>
                <Nav.Item>
                  <Nav.Link eventKey="fraudDetection">
                    🛡️ Fraud Detection
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="offlineDeployment">
                    🛰️ Offline Deployment
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card>
          </Col>

          <Col
            md={9}
            className="p-3 border border-2 border-dark shadow-sm rounded-3"
            // (fixed tiny typo: removed stray comma in the string)
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 60px)" }}
          >
            <Tab.Content>
              {/* ---- Existing panes (unchanged) ---- */}
              <Tab.Pane eventKey="healthplan">
                <HealthPlan />
              </Tab.Pane>
              <Tab.Pane eventKey="plan">
                <PlanBuilder />
              </Tab.Pane>
              <Tab.Pane eventKey="hospital">
                <HospitalCMS />
              </Tab.Pane>
              <Tab.Pane eventKey="lab">
                <LabCMS />
              </Tab.Pane>
              <Tab.Pane eventKey="doctor">
                <DoctorCMS />
              </Tab.Pane>
              <Tab.Pane eventKey="card">
                <HealthCardGenerator />
              </Tab.Pane>
              <Tab.Pane eventKey="sos">
                <SOSManager />
              </Tab.Pane>
              <Tab.Pane eventKey="compare">
                <PlanComparisonEditor />
              </Tab.Pane>
              <Tab.Pane eventKey="partner">
                <PartnerInquiryForm />
              </Tab.Pane>
              <Tab.Pane eventKey="wellnesstracker">
                <WellnessTrackerWidgets />
              </Tab.Pane>

              {/* ---- NEW panes: each shows route buttons (non-destructive) ---- */}

              {/* Plans */}
              <Tab.Pane eventKey="planTerms">
                <LinkCard
                  title="Plan Terms"
                  items={[
                    { to: "/plans", label: "Go to Plans" },
                    {
                      to: "/plan-terms-modal/demo-plan-id",
                      label: "Open Plan Terms (demo)",
                    },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="dynamicPricing">
                <LinkCard
                  title="Dynamic Pricing"
                  items={[
                    { to: "/dynamic-pricing", label: "Open Dynamic Pricing" },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="addOnSelector">
                <LinkCard
                  title="Add-On Selector"
                  items={[
                    { to: "/add-on-selector", label: "Open Add-On Selector" },
                  ]}
                />
              </Tab.Pane>

              {/* Wallet & Revenue */}
              <Tab.Pane eventKey="walletAdmin">
                <LinkCard
                  title="Wallet Admin"
                  items={[{ to: "/wallet-admin", label: "Open Wallet Admin" }]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="revenueEngine">
                <LinkCard
                  title="Revenue Engine"
                  items={[
                    { to: "/revenue-engine", label: "Open Revenue Engine" },
                  ]}
                />
              </Tab.Pane>

              {/* Governance */}
              <Tab.Pane eventKey="adminPartner">
                <LinkCard
                  title="Partner Admin"
                  items={[
                    { to: "/admin-partner", label: "Open Partner Admin" },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="intropGov">
                <LinkCard
                  title="InterOp / Gov Health"
                  items={[
                    { to: "/introp-gov", label: "Open InterOp / Gov Health" },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="govtCorp">
                <LinkCard
                  title="Govt & Corporate"
                  items={[{ to: "/govt-corp", label: "Open Govt & Corporate" }]}
                />
              </Tab.Pane>

              {/* Wellness */}
              <Tab.Pane eventKey="adminWellness">
                <LinkCard
                  title="Admin Wellness"
                  items={[
                    { to: "/admin-wellness", label: "Open Admin Wellness" },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="wellnessTracker">
                <LinkCard
                  title="Wellness Tracker"
                  items={[
                    { to: "/wellness-tracker", label: "Open Wellness Tracker" },
                  ]}
                />
              </Tab.Pane>

              {/* Localization & Rollout */}
              <Tab.Pane eventKey="localization">
                <LinkCard
                  title="Localization"
                  items={[{ to: "/localization", label: "Open Localization" }]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="globalRollout">
                <LinkCard
                  title="Global Rollout"
                  items={[
                    { to: "/global-rollout", label: "Open Global Rollout" },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="multiLingual">
                <LinkCard
                  title="Multi-lingual"
                  items={[
                    {
                      to: "/multi-lingual",
                      label: "Open Multi-lingual Center",
                    },
                  ]}
                />
              </Tab.Pane>

              {/* Insurance */}
              <Tab.Pane eventKey="insuranceIntegration">
                <LinkCard
                  title="Insurance Integration"
                  items={[
                    {
                      to: "/insurance-integration",
                      label: "Open Insurance Integration",
                    },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="uaeInsurance">
                <LinkCard
                  title="UAE Insurance Integration"
                  items={[
                    {
                      to: "/uae-insurance-integration",
                      label: "Open UAE Insurance Integration",
                    },
                  ]}
                />
              </Tab.Pane>

              {/* Ecosystem */}
              <Tab.Pane eventKey="healthEcosystem">
                <LinkCard
                  title="Health Ecosystem"
                  items={[
                    { to: "/health-ecosystem", label: "Open Health Ecosystem" },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="healthAccessEcosystem">
                <LinkCard
                  title="Health-Access Ecosystem"
                  items={[
                    {
                      to: "/health-access-ecosystem",
                      label: "Open Health-Access Ecosystem",
                    },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="unifiedApi">
                <LinkCard
                  title="Unified API"
                  items={[{ to: "/unified-api", label: "Open Unified API" }]}
                />
              </Tab.Pane>

              {/* Security / Risk */}
              <Tab.Pane eventKey="fraudDetection">
                <LinkCard
                  title="Fraud Detection"
                  items={[
                    { to: "/fraud-detection", label: "Open Fraud Detection" },
                  ]}
                />
              </Tab.Pane>

              <Tab.Pane eventKey="offlineDeployment">
                <LinkCard
                  title="Offline Deployment"
                  items={[
                    {
                      to: "/offline-deployment",
                      label: "Open Offline Deployment",
                    },
                    { to: "/offline", label: "Offline Ops Status" },
                  ]}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default HealthAccessCMS;
