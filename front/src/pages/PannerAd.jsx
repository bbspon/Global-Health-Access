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
import bbscart from "../assets/bbscart.png";
import thia from "../assets/thia.png";

/* ---------------------------------------------------
   PRODUCTS LIST FOR DROPDOWN
---------------------------------------------------- */

const ALL_PRODUCTS = [
  "Appointments",
  "Lab Tests",
  "Pharmacy",
  "Insurance Plans",
  "Health Cards",
  "Diagnostics",
  "Wellness Programs",
  "Doctor Consultation",
  "Hospital Search",
  "Medical Records",
  "Health Tracking",
  "Emergency Care",
  "Ambulance Services",
  "Blood Bank",
  "Dental Services",
  "Eye Care",
  "Fitness Programs",
  "Mental Health",
  "Nutrition Counseling",
  "Pharmacy Delivery",
  "Prescription Management",
  "Preventive Care",
  "Rehabilitation",
  "Surgery",
  "Telemedicine",
  "Vaccination",
  "Wound Care",
  "X-Ray Services",
  "Youth Health",
  "Zone Health Checkup",
];

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
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const result = classifySearchQuery(search);
    if (result.route) navigate(result.route);
    setShowDropdown(false);
  };

  // Filter products based on search input
  const filteredProducts = ALL_PRODUCTS.filter((product) =>
    product.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectProduct = (product) => {
    setSearch(product);
    setShowDropdown(false);
  };

  return (
    <>
      <Container fluid style={{ padding: 0, position: "relative" }}>
        {/* Sticky Header with Top Links */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "white",
            padding: "12px 0",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Container>
            <Row className="align-items-center">
              <Col className="d-flex justify-content-center align-items-center gap-3">
                <Button
                  className="px-3"
                  variant="none"
                  size="sm"
                  style={{ color: "black", whiteSpace: "nowrap" }}
                  onClick={() => (window.location.href = "https://bbscart.com/")}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={bbscart}
                      alt="BBSCart"
                      style={{ height: "30px", objectFit: "contain" }}
                    />
                    BBSCart Online Shopping
                  </span>
                </Button>

                <Button
                  className="px-3"
                  variant="none"
                  size="sm"
                  style={{ color: "black", whiteSpace: "nowrap" }}
                  onClick={() =>
                    (window.location.href = "https://thiaworld.bbscart.com/")
                  }
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={thia}
                      alt="Thiaworld"
                      style={{ height: "30px", objectFit: "contain" }}
                    />
                    Thiaworld Jewellery
                  </span>
                </Button>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Banner with Search Bar */}
        <div
          style={{
            position: "relative",
            backgroundImage: `url(${HomeBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >

          {/* Band Title - Right End */}
          <div
            style={{
              textAlign: "right",
              paddingRight: "40px",
              paddingTop: "40px",
              color: "white",
              fontSize: "20px",
              fontWeight: "500",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Your Health, Our Priority
          </div>

          {/* Search Bar - Centered */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "80px",
              paddingLeft: "0",
              paddingRight: "0",
              position: "relative",
            }}
          >
            <form
              onSubmit={handleSearch}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div style={{ position: "relative", width: "280px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    height: "45px",
                    width: "280px",
                    borderRadius: "25px",
                    padding: "0px 18px",
                    boxShadow: "0px 4px 18px rgba(0,0,0,0.18)",
                    border: "1px solid rgba(200,200,200,0.5)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowDropdown(e.target.value.trim().length > 0);
                    }}
                    onFocus={() => {
                      setShowDropdown(search.trim().length > 0);
                    }}
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
                      height: "28px",
                      width: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      marginLeft: "8px",
                    }}
                  >
                    <BiSearchAlt2 size={16} color="white" />
                  </button>
                </div>

                {/* Dropdown Suggestions */}
                {showDropdown && filteredProducts.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "0",
                      right: "0",
                      background: "white",
                      border: "1px solid #ddd",
                      borderTop: "none",
                      borderRadius: "0 0 15px 15px",
                      maxHeight: "300px",
                      overflowY: "auto",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                      zIndex: 1000,
                    }}
                  >
                    {filteredProducts.map((product, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectProduct(product)}
                        style={{
                          padding: "12px 18px",
                          borderBottom:
                            idx < filteredProducts.length - 1
                              ? "1px solid #f0f0f0"
                              : "none",
                          cursor: "pointer",
                          fontSize: "14px",
                          color: "#333",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f0f7ff";
                          e.currentTarget.style.color = "#0d6efd";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "white";
                          e.currentTarget.style.color = "#333";
                        }}
                      >
                        {product}
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results Message */}
                {showDropdown && filteredProducts.length === 0 && search.trim() && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "0",
                      right: "0",
                      background: "white",
                      border: "1px solid #ddd",
                      borderTop: "none",
                      borderRadius: "0 0 15px 15px",
                      padding: "12px 18px",
                      textAlign: "center",
                      fontSize: "13px",
                      color: "#999",
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    No products found
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PannerAd;
