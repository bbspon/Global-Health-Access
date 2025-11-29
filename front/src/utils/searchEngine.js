/**
 * Global Search Engine for BBSCART Health Access
 * Covers: Plans, Compare, Labs, Doctors, Specialties, Hospitals, Pages
 */

export const DIRECT_ROUTES = {
  // Direct Pages
  plans: "/plans",
  plan: "/plans",
  compare: "/plan-comparison",
  "compare plans": "/compare",
  "plan comparison": "/compare",

  buy: "/buy-plan",
  "buy plan": "/buy-plan",

  cart: "/cart",
  about: "/about",

  dashboard: "/admin-dashboard",
  "my plan": "/myplan",

  wallet: "/wallet/my",
  "wallet topup": "/wallet/topup",

  "digital card": "/digital-health-card",
  "health card": "/health-card",

  "family members": "/user-plan/:planId/family",
  "book appointment": "/book-appointment",
  "appointment otp": "/appointment-otp",

  "qr pass": "/qr-pass",
  "doctor scorecard": "/doctor-scorecard",
  "health insights": "/health-insights",

  "lab diagnostics": "/lab-diagnostics",
  labs: "/lab-diagnostics",
  diagnostics: "/lab-diagnostics",
  tests: "/lab-diagnostics",

  pharmacy: "/pharmacy-order",
  kiosk: "/offline",

  renewal: "/health-plan-renewal",
  grievance: "/grievance-resolution",
  feedback: "/user-feedback",
  ecosystem: "/health-ecosystem",

  "profile sharing": "/profileSharingPage",
  insurance: "/insurance-integration",
  "uae insurance": "/uae-insurance-integration",

  "plan eligibility": "/health-access/plan-eligibility",
  "purchase summary": "/health-access/purchase-summary",
  "premium calculator": "/premiumCalculatorPage",

  "settlement simulation": "/settlement-simulation",

  notifications: "/hospital/notifications",
  billing: "/hospital/billing",
  analytics: "/hospital/analytics",
  support: "/hospital/support",
  onboarding: "/hospital/onboarding",
  "plan tiers": "/hospital/plan-tiers",
  availability: "/hospital/availability",
  "carepass scan": "/hospital/carepass-scan",
};

// Recognised specialties
export const SPECIALTIES = [
  "dentist",
  "cardiologist",
  "orthopedic",
  "skin specialist",
  "neurologist",
  "general physician",
  "pediatrician",
  "gynecologist",
  "dermatologist",
  "ent",
];

// Hospital-related keywords
export const HOSPITAL_KEYWORDS = [
  "hospital",
  "medical center",
  "clinic",
  "healthcare",
];

// ----------------------
// CLASSIFY SEARCH INPUT
// ----------------------

export function classifySearchQuery(q) {
  if (!q) return { type: "none" };

  q = q.toLowerCase().trim();

  // 1️⃣ EXACT MATCH for Direct Routes
  if (DIRECT_ROUTES[q]) {
    return { type: "direct", route: DIRECT_ROUTES[q] };
  }

  // 2️⃣ PARTIAL MATCH inside Direct Routes
  for (const key in DIRECT_ROUTES) {
    if (q.includes(key)) {
      return { type: "direct", route: DIRECT_ROUTES[key] };
    }
  }

  // 3️⃣ Doctor name detection
  // Ex: "Dr Rajesh", "Dr. Meera"
  if (q.startsWith("dr ") || q.includes(" dr ")) {
    return {
      type: "doctor",
      route: `/health-partners?type=doctor&query=${encodeURIComponent(q)}`,
    };
  }

  // 4️⃣ Specialty detection
  if (SPECIALTIES.includes(q)) {
    return {
      type: "doctor",
      route: `/health-partners?type=specialty&query=${encodeURIComponent(q)}`,
    };
  }

  // 5️⃣ Hospital/Clinic detection
  if (HOSPITAL_KEYWORDS.some((word) => q.includes(word))) {
    return {
      type: "hospital",
      route: `/health-partners?type=hospital&query=${encodeURIComponent(q)}`,
    };
  }

  // 6️⃣ Labs / Tests
  if (q.includes("test") || q.includes("lab") || q.includes("scan")) {
    return {
      type: "lab",
      route: `/lab-diagnostics?query=${encodeURIComponent(q)}`,
    };
  }

  // 7️⃣ DEFAULT – FULL SEARCH
  return {
    type: "general",
    route: `/search?q=${encodeURIComponent(q)}`,
  };
}
