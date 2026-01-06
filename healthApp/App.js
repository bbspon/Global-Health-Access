// App.js
import React, { useMemo } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext';

import Intro from './src/screens/IntroScreen';
import Registration from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HealthPlansLandingScreen from './src/HealthPlansLandingScreen';
import AboutUs from './src/screens/AboutUsScreen';
import HospitalDashboardHome from './src/screens/HospitalDashboard';
import HospitalOnboardingForm from './src/screens/HospitalOnboarding';
import PlanComparisonScreen from './src/screens/PlanComparisonScreen';
import MyPlanScreen from './src/screens/MyPlanScreen';
import HealthAccessScreen from './src/screens/HealthAccessScreen';
import AdminWellnessDashboard from './src/screens/AdminWellnessScreen';
import BookingScreen from './src/screens/BookingManagerScreen';
import DataFlowScreen from './src/screens/DataFlowScreen';
import MedicalVaultScreen from './src/screens/MedicalVaultScreen';
import PlanUsageScreen from './src/screens/PlanUsageScreen';
import HealthMembershipScreen from './src/screens/HealthMembershipScreen';
import PartnerHospitals from './src/screens/PartnerHospitalsScreen';
import BookHealthVisit from './src/screens/BookHealthVisitScreen';
import ContactUs from './src/screens/ContactUsScreens';
import DownloadsPage from './src/screens/DownloadScreen';
import TermsConditionsAdvanced from './src/screens/TermsConditionsScreen';
import DataProtectionPolicy from './src/screens/DataProtection';
import HelpCenter from './src/screens/HelpCenter';
import HealthcareCartScreen from './src/screens/CartScreen';
import StakeholdersPage from './src/screens/StakeholdersScreen';
import HealthCarePage from './src/screens/HealthcareScreen';
import HospitalPlanTiers from './src/screens/HospitalPlanTiersScreen';
import ServiceAvailability from './src/screens/ServiceAvailability';
import CarePassScanner from './src/screens/CarePassScannerScreen';
import AnalyticsPage from './src/screens/BillAnalyticsScreen';
import SupportPage from './src/screens/SupportScreen';
import PaymentsWalletPage from './src/screens/PaymentsWalletScreen';
import DigitalHealthCard from './src/screens/DigitalHealthCardScreen';
import RevenueEngineDashboardScreen from './src/screens/RevenueEngineScreen';
import EmergencyDashboard from './src/screens/EmergencyScreen';
import WellnessTrackerScreen from './src/screens/WellnessTrackerScreen';
import PlanComparisonEditor from './src/screens/PlanComparisonEditor';
import PlanEligibility from './src/screens/PlanEligibilityScreen';
import PrescriptionLoop from './src/screens/PrescriptionLoop';
import PlanPaymentScreen from './src/screens/PlanPaymentScreen';
import AIDiseasePredictionRiskEngine from './src/screens/AIDiseasePredictionRiskEngine';
import CountryPlans from './src/screens/CountryPlans';
import CoverageStatus from './src/screens/CoverageStatus';
import HospitalPartnershipKit from './src/screens/HospitalPartnershipKit';
import HealthAccessPage from './src/screens/HealthAccessPage';
import LabDiagnostics from './src/screens/LabDiagnostics';
import ComplianceMainPage from './src/screens/ComplianceMainPage';
import PatientFeedbackEngine from './src/screens/PatientFeedbackEngine';
import familyHealthTimeline from './src/screens/FamilyHealthTimeline';
import FamilyMember from './src/screens/FamilyMembersPage';
import consultRoom from './src/screens/ConsultRoom';
import healthInsightsEngine from './src/screens/HealthInsightsEngine';
import grievanceResolution from './src/screens/GrievanceResolutionSystem';
import PharmacyIntegrationDashboard from './src/screens/PharmacyIntegrationDashboard';
import UserFeedbackRatingsSystem from './src/screens/UserFeedbackRatingsSystem';
import UnifiedAPIAdminDashboard from './src/screens/UnifiedAPIAdminDashboard';
import PurchaseSummary from './src/screens/PurchaseSummary';
import QRHealthPass from './src/screens/QRHealthPass';
import PerformanceScoring from './src/screens/PerformanceScoring';
import AppointmentOtp from './src/screens/AppointmentOtp';
import PublicPartnerAccessDashboard from './src/screens/PublicPartnerAccessDashboard';
import Notifications from './src/screens/Notifications';
import OfflineDeployment from './src/screens/OfflineDeployment';
import InteropGovHealthSystem from './src/screens/InteropGovHealthSystem';
import UAEInsuranceIntegration from './src/screens/UAEInsuranceIntegration';
import InsuranceIntegration from './src/screens/InsuranceIntegration';
import HomeVisitBooking from './src/screens/HomeVisitBooking';
import QR from './src/screens/QR';
import HealthInsightsTrendsAI from './src/screens/HealthInsightsTrendsAI';
import HealthPassportExportSystem from './src/screens/HealthPassportExportSystem';
import FormCard from './src/screens/FormCardForm';
import PlanDetailsScreen from './src/screens/PlanDetailsScreen';
import DoctorReferral from './src/screens/DoctorReferral'
// --------- Stack & Drawer instances ----------
const RootStack = createNativeStackNavigator();
const AuthStackNav = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HospitalStackNav = createNativeStackNavigator();
const OnboardingStackNav = createNativeStackNavigator();
const DataFlowStackNav = createNativeStackNavigator();
const MedicalVaultStackNav = createNativeStackNavigator();
const PlanUsageStackNav = createNativeStackNavigator();
const HealthMembershipStackNav = createNativeStackNavigator();
const HospitalPartnerStackNav = createNativeStackNavigator();
const PartnerHospitalsStackNav = createNativeStackNavigator();
const BookHealthVisitStackNav = createNativeStackNavigator();
const CartStackNav = createNativeStackNavigator();
const PlanTierPlanStackNav = createNativeStackNavigator();
const ServiceAvailabilityStackNav = createNativeStackNavigator();
const CarePassScannerStackNav = createNativeStackNavigator();
const BillAnalyticsStackNav = createNativeStackNavigator();
const SupportStackNav = createNativeStackNavigator();
const WalletStackNav = createNativeStackNavigator();
const DigitalHealthStackNav = createNativeStackNavigator();

function AuthStack() {
  return (
    <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNav.Screen name="Intro" component={Intro} />
      <AuthStackNav.Screen name="SignUp" component={Registration} />
      <AuthStackNav.Screen name="SignIn" component={SignInScreen} />
      <AuthStackNav.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStackNav.Navigator>
  );
}

// --------- Drawer Flow (theme aware) ----------
function DrawerStack() {
  const { isDark } = useAppTheme();

  const drawerActive = '#0dcaf0';
  const drawerInactive = isDark ? '#bbb' : '#333';
  const headerBg = isDark ? '#111' : '#0dcaf0';
  const headerText = '#fff';

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: drawerActive,
        drawerInactiveTintColor: drawerInactive,
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: headerText,
        headerTitleAlign: 'center',
        drawerStyle: { backgroundColor: isDark ? '#0b0b0b' : '#fff' },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigation.navigate('Cart')}>
              <MaterialCommunityIcons name="cart" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />

      <Drawer.Screen
        name="Health"
        component={HealthAccessPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Health Plans"
        component={HealthPlansLandingScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Hospital Partner"
        component={HospitalDashboardHome}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="medical-bag" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Plan Comparison"
        component={PlanComparisonScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="My Plan"
        component={MyPlanScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-group" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Health Access"
        component={HealthAccessScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="leaf" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Admin Wellness"
        component={AdminWellnessDashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="kodi" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Wellness Tracker"
        component={WellnessTrackerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="kodi" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="card-account-phone-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Download"
        component={DownloadsPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="download-multiple" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsConditionsAdvanced}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="triforce" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Data Protection Policy"
        component={DataProtectionPolicy}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="access-point" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Help Center"
        component={HelpCenter}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="help-network-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Stakeholders"
        component={StakeholdersPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="horizontal-rotate-counterclockwise" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Health Partners"
        component={HealthCarePage}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="hospital" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Revenue Engine"
        component={RevenueEngineDashboardScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightning-bolt-circle" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="CoverageStatus"
        component={CoverageStatus}
        options={{ drawerItemStyle: { display: 'none' } }}
      />

      <Drawer.Screen
        name="Emergency Care"
        component={EmergencyDashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wall-sconce-flat-variant-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function OnboardingStack() {
  return (
    <OnboardingStackNav.Navigator screenOptions={{ headerShown: true }}>
      <OnboardingStackNav.Screen name="Onboarding" component={HospitalOnboardingForm} options={{ title: 'Onboarding' }} />
    </OnboardingStackNav.Navigator>
  );
}

function BookingStack() {
  return (
    <HospitalStackNav.Navigator screenOptions={{ headerShown: true }}>
      <HospitalStackNav.Screen name="BookingManager" component={BookingScreen} options={{ title: 'Booking Manager' }} />
    </HospitalStackNav.Navigator>
  );
}

function DataFlowStack() {
  const { isDark } = useAppTheme();
  const headerBg = isDark ? '#111' : '#0dcaf0';

  return (
    <DataFlowStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <DataFlowStackNav.Screen name="DataFlow" component={DataFlowScreen} options={{ title: 'Health Data Flow' }} />
    </DataFlowStackNav.Navigator>
  );
}

function HospitalPartnerStack() {
  const { isDark } = useAppTheme();
  const headerBg = isDark ? '#111' : '#0dcaf0';

  return (
    <HospitalPartnerStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <HospitalPartnerStackNav.Screen name="HospitalPartner" component={HospitalDashboardHome} options={{ title: 'Hospital Partner' }} />
    </HospitalPartnerStackNav.Navigator>
  );
}

function MedicalVaultStack() {
  return (
    <MedicalVaultStackNav.Navigator screenOptions={{ headerShown: true }}>
      <MedicalVaultStackNav.Screen name="MedicalVaultHome" component={MedicalVaultScreen} options={{ title: 'Medical Vault' }} />
    </MedicalVaultStackNav.Navigator>
  );
}

function PlanUsageStack() {
  const { isDark } = useAppTheme();
  const headerBg = isDark ? '#111' : '#0dcaf0';

  return (
    <PlanUsageStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <PlanUsageStackNav.Screen name="PlanUsageHome" component={PlanUsageScreen} options={{ title: 'Plan Usage' }} />
    </PlanUsageStackNav.Navigator>
  );
}

function PartnerHospitalsStack() {
  const { isDark } = useAppTheme();
  const headerBg = isDark ? '#111' : '#0dcaf0';

  return (
    <PartnerHospitalsStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <PartnerHospitalsStackNav.Screen name="PartnerHospitals" component={PartnerHospitals} options={{ title: 'Partner Hospitals' }} />
    </PartnerHospitalsStackNav.Navigator>
  );
}

function HealthMembershipStack() {
  const { isDark } = useAppTheme();
  const headerBg = isDark ? '#111' : '#0dcaf0';

  return (
    <HealthMembershipStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <HealthMembershipStackNav.Screen name="HealthMembership" component={HealthMembershipScreen} options={{ title: 'Health Membership' }} />
    </HealthMembershipStackNav.Navigator>
  );
}

function BookHealthVisitStack() {
  const { isDark } = useAppTheme();
  const headerBg = isDark ? '#111' : '#0dcaf0';

  return (
    <BookHealthVisitStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <BookHealthVisitStackNav.Screen name="BookHealthVisit" component={BookHealthVisit} options={{ title: 'Book Health Visit' }} />
    </BookHealthVisitStackNav.Navigator>
  );
}

function CartStack() {
  const { isDark } = useAppTheme();
  const headerBg = isDark ? '#111' : '#0dcaf0';

  return (
    <CartStackNav.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <CartStackNav.Screen name="Cart" component={HealthcareCartScreen} options={{ title: 'Cart' }} />
    </CartStackNav.Navigator>
  );
}

function PlanTierPlanStack() {
  return (
    <PlanTierPlanStackNav.Navigator screenOptions={{ headerShown: true }}>
      <PlanTierPlanStackNav.Screen name="PlanTierPlan" component={HospitalPlanTiers} options={{ title: 'PlanTierPlan' }} />
    </PlanTierPlanStackNav.Navigator>
  );
}

function ServiceAvailabilityStack() {
  return (
    <ServiceAvailabilityStackNav.Navigator screenOptions={{ headerShown: true }}>
      <ServiceAvailabilityStackNav.Screen name="ServiceAvailability" component={ServiceAvailability} options={{ title: 'ServiceAvailability' }} />
    </ServiceAvailabilityStackNav.Navigator>
  );
}

function CarePassScannerStack() {
  return (
    <CarePassScannerStackNav.Navigator screenOptions={{ headerShown: true }}>
      <CarePassScannerStackNav.Screen name="CarePassScanner" component={CarePassScanner} options={{ title: 'CarePassScanner' }} />
    </CarePassScannerStackNav.Navigator>
  );
}

function BillAnalyticsStack() {
  return (
    <BillAnalyticsStackNav.Navigator screenOptions={{ headerShown: true }}>
      <BillAnalyticsStackNav.Screen name="BillAnalyticsHome" component={AnalyticsPage} options={{ title: 'Bill Analytics' }} />
    </BillAnalyticsStackNav.Navigator>
  );
}

function SupportStack() {
  return (
    <SupportStackNav.Navigator screenOptions={{ headerShown: true }}>
      <SupportStackNav.Screen name="SupportHome" component={SupportPage} options={{ title: 'Support' }} />
    </SupportStackNav.Navigator>
  );
}

function WalletStack() {
  return (
    <WalletStackNav.Navigator screenOptions={{ headerShown: true }}>
      <WalletStackNav.Screen name="WalletHome" component={PaymentsWalletPage} options={{ title: 'Wallet' }} />
    </WalletStackNav.Navigator>
  );
}

function DigitalHealthStack() {
  return (
    <DigitalHealthStackNav.Navigator screenOptions={{ headerShown: true }}>
      <DigitalHealthStackNav.Screen name="DigitalHealth" component={DigitalHealthCard} options={{ title: 'Digital Health' }} />
    </DigitalHealthStackNav.Navigator>
  );
}

// --------- App Shell (theme -> navigation + paper) ----------
function AppShell() {
  const { isDark, ready } = useAppTheme();

  const navTheme = useMemo(() => (isDark ? DarkTheme : DefaultTheme), [isDark]);

  const paperTheme = useMemo(() => {
    const base = isDark ? MD3DarkTheme : MD3LightTheme;

    // Optional: keep your brand color consistent
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: '#0dcaf0',
      },
    };
  }, [isDark]);

  if (!ready) return null;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
          <RootStack.Screen name="Auth" component={AuthStack} />
          <RootStack.Screen name="Main" component={DrawerStack} />
          <RootStack.Screen name="Booking" component={BookingStack} />
          <RootStack.Screen name="Onboarding" component={OnboardingStack} />
          <RootStack.Screen name="DataFlow" component={DataFlowStack} />
          <RootStack.Screen name="MedicalVaultStack" component={MedicalVaultStack} />
          <RootStack.Screen name="PlanUsage" component={PlanUsageStack} />
          <RootStack.Screen name="HealthMembership" component={HealthMembershipStack} />
          <RootStack.Screen name="HospitalPartner" component={HospitalPartnerStack} />
          <RootStack.Screen name="PartnerHospitals" component={PartnerHospitalsStack} />
          <RootStack.Screen name="BookHealthVisit" component={BookHealthVisitStack} />
          <RootStack.Screen name="Cart" component={CartStack} />
          <RootStack.Screen name="PlanTierPlan" component={PlanTierPlanStack} />
          <RootStack.Screen name="ServiceAvailability" component={ServiceAvailabilityStack} />
          <RootStack.Screen name="CarePassScanner" component={CarePassScannerStack} />
          <RootStack.Screen name="BillAnalyticsStack" component={BillAnalyticsStack} />
          <RootStack.Screen name="Support" component={SupportStack} />
          <RootStack.Screen name="Wallet" component={WalletStack} />
          <RootStack.Screen name="DigitalHealth" component={DigitalHealthStack} />
          <RootStack.Screen name="PlanComparisonEditor" component={PlanComparisonEditor} />
          <RootStack.Screen name="PlanEligibility" component={PlanEligibility} />
          <RootStack.Screen name="PrescriptionLoop" component={PrescriptionLoop} />
          <RootStack.Screen name="PlanPaymentScreen" component={PlanPaymentScreen} />
          <RootStack.Screen name="HospitalPartnershipKit" component={HospitalPartnershipKit} />
          <RootStack.Screen name="LabDiagnostics" component={LabDiagnostics} />
          <RootStack.Screen name="ComplianceMainPage" component={ComplianceMainPage} />
          <RootStack.Screen name="PatientFeedbackEngine" component={PatientFeedbackEngine} />
          <RootStack.Screen name="AIDiseasePredictionRiskEngine" component={AIDiseasePredictionRiskEngine} />
          <RootStack.Screen name="CountryPlans" component={CountryPlans} />
          <RootStack.Screen name="FamilyHealthTimeline" component={familyHealthTimeline} />
          <RootStack.Screen name="FamilyMember" component={FamilyMember} />
          <RootStack.Screen name="ConsultRoom" component={consultRoom} />
          <RootStack.Screen name="HealthInsightsEngine" component={healthInsightsEngine} />
          <RootStack.Screen name="GrievanceResolutionSystem" component={grievanceResolution} />
          <RootStack.Screen name="PharmacyIntegrationDashboard" component={PharmacyIntegrationDashboard} />
          <RootStack.Screen name="UserFeedbackRatingsSystem" component={UserFeedbackRatingsSystem} />
          <RootStack.Screen name="UnifiedAPIAdminDashboard" component={UnifiedAPIAdminDashboard} />
          <RootStack.Screen name="PurchaseSummary" component={PurchaseSummary} />
          <RootStack.Screen name="QRHealthPass" component={QRHealthPass} />
          <RootStack.Screen name="PerformanceScoring" component={PerformanceScoring} />
          <RootStack.Screen name="AppointmentOtp" component={AppointmentOtp} />
          <RootStack.Screen name="PublicPartnerAccessDashboard" component={PublicPartnerAccessDashboard} />
          <RootStack.Screen name="Notifications" component={Notifications} />
          <RootStack.Screen name="OfflineDeployment" component={OfflineDeployment} />
          <RootStack.Screen name="InteropGovHealthSystem" component={InteropGovHealthSystem} />
          <RootStack.Screen name="UAEInsuranceIntegration" component={UAEInsuranceIntegration} />
          <RootStack.Screen name="InsuranceIntegration" component={InsuranceIntegration} />
          <RootStack.Screen name="HomeVisitBooking" component={HomeVisitBooking} />
          <RootStack.Screen name="HealthInsightsTrendsAI" component={HealthInsightsTrendsAI} />
          <RootStack.Screen name="HealthPassport" component={HealthPassportExportSystem} />
          <RootStack.Screen name="FormCard" component={FormCard} />
          <RootStack.Screen name="QR" component={QR} />
          <RootStack.Screen name="PlanDetails" component={PlanDetailsScreen} />
          <RootStack.Screen name="DoctorReferral" component={DoctorReferral} />

        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// --------- Root App ----------
export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
