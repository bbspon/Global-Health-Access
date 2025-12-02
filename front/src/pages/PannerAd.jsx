import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Accordion,
  Badge,
  Image,
  Carousel,
} from "react-bootstrap";
import HomeBanner from "../assets/HomeBanner.JPG";
import { useNavigate } from "react-router-dom";

/* ---------------------------------------------------
   GLOBAL SEARCH ENGINE (FULL VERSION)
---------------------------------------------------- */

const DIRECT_ROUTES = {
  plans: "/plans",
  plan: "/plans",
  compare: "/plan-comparison",
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

const SPECIALTIES = [
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

const HOSPITAL_KEYWORDS = [
  "hospital",
  "medical center",
  "clinic",
  "healthcare",
];

function classifySearchQuery(q) {
  if (!q) return { type: "none" };

  q = q.toLowerCase().trim();

  // 1️⃣ EXACT MATCH
  if (DIRECT_ROUTES[q]) {
    return { type: "direct", route: DIRECT_ROUTES[q] };
  }

  // 2️⃣ PARTIAL MATCH
  for (const key in DIRECT_ROUTES) {
    if (q.includes(key)) {
      return { type: "direct", route: DIRECT_ROUTES[key] };
    }
  }

  // 3️⃣ Doctor detection
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

  // 5️⃣ Hospital detection
  if (HOSPITAL_KEYWORDS.some((word) => q.includes(word))) {
    return {
      type: "hospital",
      route: `/health-partners?type=hospital&query=${encodeURIComponent(q)}`,
    };
  }

  // 6️⃣ Labs / tests
  if (q.includes("test") || q.includes("lab") || q.includes("scan")) {
    return {
      type: "lab",
      route: `/lab-diagnostics?query=${encodeURIComponent(q)}`,
    };
  }

  // 7️⃣ Default
  return {
    type: "general",
    route: `/search?q=${encodeURIComponent(q)}`,
  };
}

/* ---------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------- */

function PannerAd() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const result = classifySearchQuery(search);
    if (result.route) navigate(result.route);
  };

  return (
    <>
      <div
        className="py-1 my-3"
        style={{
          backgroundImage: `url(${HomeBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "450px",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            padding: "40px",
            width: "50%",
            color: "white",
          }}
        >
          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <div
              style={{
                position: "absolute",
                bottom: "200px", // move vertically (adjust)
                left: "150px", // move horizontally (adjust)

                display: "flex",
                alignItems: "center",
                background: "white",
                height: "40px",
                width: "260px",
                borderRadius: "25px",
                padding: "0px 15px",

                boxShadow: "0px 4px 18px rgba(0,0,0,0.18)",

                border: "1px solid rgba(200,200,200,0.5)",
              }}
            >
              <input
                type="text"
            
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "14px",
                }}
              />

              <button
                type="submit"
                style={{
                  border: "none",
                  background: "#0d6efd",
                  height: "26px",
                  width: "26px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <BiSearchAlt2 size={16} color="white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PannerAd;
