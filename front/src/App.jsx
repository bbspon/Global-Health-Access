import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Context
import { AuthProvider } from "../context/AuthContext";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HealthPlansLandingPage from "./pages/HealthPlansLandingPage";
import PlanComparisonPage from "./pages/PlanComparisonPage";
import BuyPlanPage from "./pages/BuyPlanPage";
import MyHealthPlan from "./pages/MyHealthPlan";

// Layout
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import HealthAccessPage from "./pages/HealthAccessPage";
import HealthMembershipPage from "./pages/HealthMembershipPage";
import HealthObjectivePage from "./pages/HealthObjectivePage";
import StakeholdersPage from "./pages/StakeholdersPage";
import PlanManagementDashboard from "./pages/PlanManagementDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import HospitalOnboarding from "./pages/hospital-dashboard/HospitalOnboarding";
import HospitalPlanTiers from "./pages/hospital-dashboard/HospitalPlanTiers";
import ServiceAvailability from "./pages/hospital-dashboard/ServiceAvailability";
import CarePassScanner from "./pages/hospital-dashboard/CarePassScanner";
import HospitalBilling from "./pages/hospital-dashboard/HospitalBilling";
import AnalyticsPage from "./pages/hospital-dashboard/AnalyticsPage";
import SupportPage from "./pages/hospital-dashboard/SupportPage";
import StaffManager from "./pages/hospital-dashboard/StaffManager";
import NotificationsPage from "./pages/hospital-dashboard/NotificationsPage";
import HealthRecordVaultPage from "./pages/HealthRecordVaultPage";
import BookingManager from "./pages/BookingManager";
import PaymentsWalletPage from "./pages/PaymentsWalletPage";
import PlanTermsModal from "./components/HealthAccess/PlanTermsModal";
import DataFlowPage from "./pages/DataFlowPage";
import PlanComparison from "./pages/PlanComparison";
import BuyPlan from "./pages/BuyPlan";
import DigitalHealthCard from "./pages/DigitalHealthCard";
import CountryPlans from "./pages/CountryPlans";
import MedicalVault from "./pages/MedicalVault";
import RevenueEngineDashboard from "./pages/RevenueEngineDashboard";
import HospitalAIDashboard from "./pages/HospitalAIDashboard";
import ComplianceDashboard from "./pages/ComplianceDashboard";
import WalletAdminDashboard from "./pages/WalletAdminDashboard";
import AdminDashboardsPartnerControl from "./pages/AdminDashboardsPartnerControl";
import GlobalRolloutPage from "./pages/GlobalRolloutPage";
import LocalizationMultiLangUX from "./pages/LocalizationMultiLangUX";
import AdminWellnessDashboard from "./pages/AdminWellnessDashboard";
import EmergencyDashboard from "./pages/EmergencyDashboard";
import DoctorManagement from "./pages/DoctorManagement";
import PlanUsageDashboard from "./pages/PlanUsageDashboard";
import LoyaltyRewardsDashboard from "./pages/LoyaltyRewardsDashboard";
import RoleBasedDashboard from "./pages/RoleBasedDashboard";
import CoverageStatusDashboard from "./pages/CoverageStatus";
import HealthCoachDashboard from "./pages/HealthCoachDashboard";
import ConsultRoom from "./pages/ConsultRoom";
import HomeVisitBooking from "./pages/HomeVisitBooking";
import PrescriptionLoop from "./pages/PrescriptionLoop";
import HospitalDiscovery from "./pages/HospitalAdminDashboard";
import FamilyDependentDashboard from "./pages/FamilyDependentDashboard";
import PharmacyIntegrationDashboard from "./pages/PharmacyIntegrationDashboard";
import HealthInsightsTrendsAI from "./pages/HealthInsightsTrendsAI";
import VirtualHealthCommunity from "./pages/VirtualHealthCommunity";
import FeedbackEngineDashboard from "./pages/FeedbackEngineDashboard";
import GovtCorpNGOPartnershipsWeb from "./pages/PublicPartnerAccessDashboard";
import HealthIntelligenceDashboard from "./pages/HealthIntelligenceDashboard";
import AIDiseasePredictionRiskEngine from "./pages/AIDiseasePredictionRiskEngine";
import InteropGovHealthSystem from "./pages/InteropGovHealthSystem";
import GamifiedHealthJourneyPage from "./pages/GamifiedHealthJourneyPage";
import InsuranceIntegration from "./pages/InsuranceIntegration";
import UAEInsuranceIntegration from "./UaeInsuranceIntegration";
import InsuranceIntegrationPage from "./pages/InsuranceIntegrationPage";
import HealthAccessAPIEcosystem from "./pages/HealthAccessAPIEcosystem";
import OfflineDeploymentDashboard from "./pages/OfflineDeploymentDashboard";
import HealthEcosystemHub from "./pages/HealthAccessEcosystem";
import HospitalPartnershipDashboard from "./pages/HospitalPartnershipDashboard";
import LabDiagnostics from "./pages/LabDiagnostics";
import PharmacyOrders from "./pages/PharmacyOrders";
import OfflineHealthKiosk from "./pages/OfflineHealthKiosk";
import DoctorScoreCard from "./pages/PerformanceScoringDashboard";
import HealthInsightsEngine from "./pages/HealthInsightsEngine";
import DiseaseSurveillanceDashboard from "./pages/DiseaseSurveillanceDashboard";
import UnifiedAPIAdminDashboard from "./pages/UnifiedAPIAdminDashboard";
import ComplianceMainPage from "./pages/ComplianceMainPage";
import EcosystemExpansionModel from "./pages/EcosystemExpansionModel";
import HealthPassportExportSystem from "./pages/HealthPassportExportSystem";
import GrievanceResolutionSystem from "./pages/GrievanceResolutionSystem";
import UserFeedbackRatingsSystem from "./pages/UserFeedbackRatingsSystem";
import HealthPlanRenewal from "./pages/HealthPlanRenewal";
import FamilyHealthTimeline from "./pages/FamilyHealthTimeline";
import DynamicPricingEngine from "./pages/DynamicPricingEngine";
import FraudDetectionDashboard from "./pages/FraudDetectionDashboard";
import MultilingualSupportDashboard from "./pages/MultilingualSupportDashboard";
import QRHealthPass from "./pages/QRHealthPass";
import DoctorReferralPage from "./pages/DoctorReferralPage";
import HealthcareCartPage from "./pages/Cart";
import AddOnSelector from "./pages/AddOnSelector";
import AboutUs from "./pages/AboutUs";
import HealthAccessCMS from "./cms/HealthAccessCMS";
import PlanBuilder from "./cms/PlanBuilder";
import HospitalCMS from "./cms/HospitalCMS";
import LabCMS from "./cms/LabCMS";
import AdminDashboardUtilities from "./cms/AdminDashboardUtilities";
import QRCodeDisplay from "./pages/QRCodeDisplay";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import PurchaseSummaryPage from "./pages/PurchaseSummaryPage";
import PlanPaymentPage from "./pages/PlanPaymentPage";
import PlanEligibilityPage from "./pages/PlanEligibilityPage";
import WalletTopupPage from "./pages/WalletTopupPage";
import MyWalletPage from "./pages/MyWalletPage";
import RazorpayCheckoutPage from "./pages/RazorpayCheckoutPage";
import HealthPlanValueCalculator from "./cms/HealthPlanValueCalculator";
import FamilyMembersPage from "./pages/FamilyMembersPage";
import EmergencySOSSection from "./cms/EmergencySOSSection";
import EmergencySOSPage from "./pages/EmergencySOSPage";
import BuyWithWalletPage from "./pages/BuyWithWalletPage";
import PlanUsagePage from "./pages/PlanUsagePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import AppointmentOtpPage from "./pages/AppointmentOtpPage";
import WellnessTrackerWidgets from "./cms/WellnessTracker";
import WellnessTrackerPage from "./pages/WellnessTrackerPage";
import HealthIDCard from "./pages/HealthIDCard";
import ProfileSharingPage from "./pages/ProfileSharingPage";
import PlanComparisonEditor from "./cms/PlanComparisonEditor";
import PartnerWithUsForm from "./cms/PartnerWithUsForm";
import ScrollToTop from "./components/ScrollToTop";
import Card from "./card";
import FormCard from "./FormCard";
import VendorIdentityCardForm from "./VendorIdentityCardForm";
import VendorIdentityCard from "./VendorIdentityCard";
import TerrotoryIdentityCardForm from "./TerrotoryIdentityCardForm";
import TerritoryCard from "./TerritoryCard";
import HealthcareAgentCardForm from "./AgentCardForm";
import AgentIdentityCard from "./AgentIdentityCard";
import FranchiseIdentityCardForm from "./FranchiseIdentityCardForm";
import FranchiseCard from "./FranchiseCard";
import Healthcare from "./components/HealthPartner/Healthcare";
function App() {
  return (
    <AuthProvider>
      <ScrollToTop />

      <Header />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<HealthcareCartPage />} />
        <Route path="/about" element={<AboutUs />} />
        {/* Main app routes */}
        <Route path="/" element={<HealthObjectivePage />} />
        <Route path="/plans-landing" element={<HealthAccessPage />} />
        <Route path="/health-membership" element={<HealthMembershipPage />} />
        <Route path="/stakeholders" element={<StakeholdersPage />} />
        <Route path="/plan-management" element={<PlanManagementDashboard />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        {/*Hospital Dashboard*/}
        <Route path="/hospital/onboarding" element={<HospitalOnboarding />} />
        <Route path="/hospital/plan-tiers" element={<HospitalPlanTiers />} />
        <Route
          path="/hospital/availability"
          element={<ServiceAvailability />}
        />
        <Route
          path="/hospital/plancomparison-editor"
          element={<PlanComparisonEditor />}
        />
        <Route path="/hospital/carepass-scan" element={<CarePassScanner />} />
        <Route path="/hospital/billing" element={<HospitalBilling />} />
        <Route path="/hospital/analytics" element={<AnalyticsPage />} />
        <Route path="/hospital/support" element={<SupportPage />} />
        <Route path="/hospital/staff-manager" element={<StaffManager />} />
        <Route path="/hospital/notifications" element={<NotificationsPage />} />
        <Route
          path="/health-access/plan/:id/records"
          element={<HealthRecordVaultPage />}
        />
        <Route path="/booking-manager" element={<BookingManager />} />
        <Route path="/payments-wallet" element={<PaymentsWalletPage />} />
        <Route path="/plan-terms-modal/:planId" element={<PlanTermsModal />} />
        <Route path="/data-flow" element={<DataFlowPage />} />
        <Route path="/plan-comparison" element={<PlanComparison />} />
        <Route path="/buy-plan" element={<BuyPlan />} />
        <Route path="/digital-health-card" element={<DigitalHealthCard />} />
        <Route path="/health-card" element={<HealthIDCard />} />
        <Route path="/country-plans" element={<CountryPlans />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/medical-vault" element={<MedicalVault />} />
        {/*09.07.2025*/}
        <Route path="/revenue-engine" element={<RevenueEngineDashboard />} />
        <Route path="/hospital-ai" element={<HospitalAIDashboard />} />
        <Route path="/compliance" element={<ComplianceDashboard />} />
        <Route path="/wallet-admin" element={<WalletAdminDashboard />} />
        <Route
          path="/admin-partner"
          element={<AdminDashboardsPartnerControl />}
        />
        <Route path="/global-rollout" element={<GlobalRolloutPage />} />
        <Route path="/localization" element={<LocalizationMultiLangUX />} />
        <Route path="/admin-wellness" element={<AdminWellnessDashboard />} />
        <Route path="/emergency" element={<EmergencyDashboard />} />
        <Route path="/doctor-management" element={<DoctorManagement />} />
        <Route path="/plan-usage" element={<PlanUsageDashboard />} />
        <Route path="/plan-usage-Page" element={<PlanUsagePage />} />
        <Route path="/loyalty-reward" element={<LoyaltyRewardsDashboard />} />
        <Route path="/role-based" element={<RoleBasedDashboard />} />
        <Route path="/coverage-status" element={<CoverageStatusDashboard />} />
        <Route
          path="/health-access/my-plan/coach/:userId"
          element={<HealthCoachDashboard />}
        />
        {/* Telehealth Engine */}
        <Route path="/consult-room" element={<ConsultRoom />} />
        <Route path="/home-visit" element={<HomeVisitBooking />} />
        <Route
          path="/my-health/prescription-loop/:userId"
          element={<PrescriptionLoop />}
        />
        <Route path="/hospital-admin" element={<HospitalDiscovery />} />
        <Route
          path="/family-dependent"
          element={<FamilyDependentDashboard />}
        />
        <Route
          path="/pharmacy-integration"
          element={<PharmacyIntegrationDashboard />}
        />
        {/*10.07.2025*/}
        <Route
          path="/health-insights-trFends"
          element={<HealthInsightsTrendsAI />}
        />
        <Route path="/virtual-health" element={<VirtualHealthCommunity />} />
        <Route path="/feedback-engine" element={<FeedbackEngineDashboard />} />
        <Route path="/govt-corp" element={<GovtCorpNGOPartnershipsWeb />} />
        <Route
          path="/health-intelligence"
          element={<HealthIntelligenceDashboard />}
        />
        <Route
          path="/ai-risk-engine"
          element={<AIDiseasePredictionRiskEngine />}
        />
        <Route path="/introp-gov" element={<InteropGovHealthSystem />} />
        <Route
          path="/gamified-health"
          element={<GamifiedHealthJourneyPage />}
        />
        <Route
          path="/insurance-integration"
          element={<InsuranceIntegration />}
        />
        <Route
          path="/uae-insurance-integration"
          element={<UAEInsuranceIntegration />}
        />

        <Route
          path="/health-access-ecosystem"
          element={<HealthAccessAPIEcosystem />}
        />
        <Route
          path="/offline-deployment"
          element={<OfflineDeploymentDashboard />}
        />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/bookingManager" element={<BookingManager />} />
        <Route path="/appointment-otp" element={<AppointmentOtpPage />} />
        <Route
          path="/Wellness-tracker-Widgets"
          element={<WellnessTrackerWidgets />}
        />
        <Route path="/Wellness-tracker" element={<WellnessTrackerPage />} />
        <Route path="/health-ecosystem" element={<HealthEcosystemHub />} />
        <Route
          path="/hospital-partnership"
          element={<HospitalPartnershipDashboard />}
        />
        <Route path="/emergencySOSSection" element={<EmergencySOSSection />} />
        <Route path="/emergencySOSPage" element={<EmergencySOSPage />} />
        <Route path="/lab-diagnostics" element={<LabDiagnostics />} />
        <Route path="/pharmacy-order" element={<PharmacyOrders />} />
        <Route path="/offline" element={<OfflineHealthKiosk />} />
        <Route path="/doctor-scorecard" element={<DoctorScoreCard />} />
        <Route path="/health-insights" element={<HealthInsightsEngine />} />
        <Route
          path="/disease-surveillance"
          element={<DiseaseSurveillanceDashboard />}
        />
        <Route path="/unified-api" element={<UnifiedAPIAdminDashboard />} />
        <Route path="/compliance-center" element={<ComplianceMainPage />} />
        <Route
          path="/ecosystem-expansion"
          element={<EcosystemExpansionModel />}
        />
        <Route
          path="/health-passport"
          element={<HealthPassportExportSystem />}
        />
        <Route path="/profileSharingPage" element={<ProfileSharingPage />} />
        <Route
          path="/grievance-resolution"
          element={<GrievanceResolutionSystem />}
        />
        <Route path="/user-feedback" element={<UserFeedbackRatingsSystem />} />
        <Route path="/health-plan-renewal" element={<HealthPlanRenewal />} />
        <Route
          path="/user-plan/:planId/family"
          element={<FamilyMembersPage />}
        />
        <Route path="/family-timeline" element={<FamilyHealthTimeline />} />
        <Route path="/dynamic-pricing" element={<DynamicPricingEngine />} />
        <Route path="/fraud-detection" element={<FraudDetectionDashboard />} />
        <Route
          path="/multi-lingual"
          element={<MultilingualSupportDashboard />}
        />
        <Route path="/qr-pass" element={<QRHealthPass />} />
        <Route path="/doctor-referral" element={<DoctorReferralPage />} />
        <Route path="/add-on-selector" element={<AddOnSelector />} />
        <Route path="/admin-dashboard" element={<AdminDashboardUtilities />} />
        <Route path="/plans" element={<HealthPlansLandingPage />} />
        <Route path="/qr" element={<QRCodeDisplay />} />
        <Route path="/compare" element={<PlanComparisonPage />} />
        <Route path="/health-access/buy-plan" element={<BuyPlanPage />} />
        <Route path="/myplan" element={<MyHealthPlan />} />
        <Route path="/health-access/plan/:id" element={<PlanDetailsPage />} />
        <Route path="/buyWithWalletPage" element={<BuyWithWalletPage />} />
        <Route
          path="/health-access/renew-plan"
          element={<HealthPlanRenewal />}
        />
        <Route path="/wallet/topup" element={<WalletTopupPage />} />
        <Route path="/wallet/my" element={<MyWalletPage />} />
        <Route
          path="/walletAdminDashboard"
          element={<WalletAdminDashboard />}
        />
        <Route
          path="/wallet/razorpay-checkout"
          element={<RazorpayCheckoutPage />}
        />
        <Route
          path="/health-plan-calculator"
          element={<HealthPlanValueCalculator />}
        />
        <Route
          path="/health-access/purchase-summary"
          element={<PurchaseSummaryPage />}
        />
        <Route
          path="/health-access/plan-eligibility"
          element={<PlanEligibilityPage />}
        />
        {/* 18-11-2025 Start */}
        <Route path="/beneficiary-form" element={<FormCard />} />
        <Route path="/card/:id" element={<Card />} />

        <Route path="/vendor" element={<VendorIdentityCardForm />} />
        <Route path="/vendorcard" element={<VendorIdentityCard />} />

        <Route path="/terrotory" element={<TerrotoryIdentityCardForm />} />
        <Route path="/terrotory-card" element={<TerritoryCard />} />

        <Route path="/agentform" element={<HealthcareAgentCardForm />} />
        <Route path="/agent-card" element={<AgentIdentityCard />} />

        <Route path="/franchise-form" element={<FranchiseIdentityCardForm />} />
        <Route path="/franchise-card" element={<FranchiseCard />} />
        {/* 18-11-2025 End */}
        <Route path="/health-access/partner" element={<PartnerWithUsForm />} />
        <Route path="/health-access/pay-plan" element={<PlanPaymentPage />} />
        <Route path="/admin" element={<HealthAccessCMS />}>
          <Route path="plan" element={<PlanBuilder />} />
          <Route path="hospital-cms" element={<HospitalCMS />} />
          <Route path="lab-cms" element={<LabCMS />} />
        </Route>
      </Routes>

      <Footer />
    </AuthProvider>
  );
}

export default App;
