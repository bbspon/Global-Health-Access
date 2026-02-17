import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Form, Spinner } from "react-bootstrap";
import {
  FaWallet,
  FaGift,
  FaHeartbeat,
  FaShoppingCart,
  FaRobot,
  FaSyncAlt,
} from "react-icons/fa";
import axios from "axios";

const HealthAccessEcosystem = () => {
  const [showCoach, setShowCoach] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [plan, setPlan] = useState("Loading...");
  const [cashback, setCashback] = useState(0);
  const [coachQuery, setCoachQuery] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Load Plan, Wallet, Cashback
  useEffect(() => {
    const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
    // backend returns `_id` only, and Mongoose attaches `id` sometimes, so support both
    const userId =
      bbsUserData?.user?.id || bbsUserData?.user?._id || null;
    setIsLoggedIn(!!userId);
    if (!userId) {
      // user not logged in yet – nothing to fetch
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/ecosystem/user-plan/${userId}`
        );
        if (res.data) {
          setPlan(res.data.planName || "Basic Plan");
          setWallet(res.data.walletBalance || 0);
          setCashback(res.data.cashbackEarned || 0);
        }
      } catch (err) {
        console.error("Error fetching plan data", err);
      }
    };

    fetchData();
  }, []);

  // ✅ Book Appointment
  const handleBookAppointment = async () => {
    setBookingSubmitted(true);
    try {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));

      const userId =
        bbsUserData?.user?.id || bbsUserData?.user?._id || null;
      if (!userId) {
        alert("⚠️ You must be logged in to book an appointment.");
        setBookingSubmitted(false);
        return;
      }

      console.debug("booking request", { userId });
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/ecosystem/book-appointment`,
        {
          userId,
        }
      );
      if (res.data?.status === "success") {
        alert(`✅ ${res.data.message}`);
      } else {
        alert("⚠️ Booking failed. Try again.");
      }
    } catch (err) {
      alert("❌ Network error while booking.");
    } finally {
      setBookingSubmitted(false);
    }
  };

  // ✅ AI Health Coach Submit
  const handleCoachSubmit = async () => {
    if (!coachQuery.trim()) {
      alert("❗ Please enter a health question.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URI}/ecosystem/ai-health-coach`,
        {
          question: coachQuery,
        }
      );
      alert(
        `🤖 AI Coach says: “${res.data?.answer || "Advice coming soon..."}”`
      );
      setCoachQuery("");
      setShowCoach(false);
    } catch (err) {
      alert("AI Coach not available. Try later.");
    }
  };

  // ✅ Feature Navigation Placeholder
  const handleExploreClick = (title) => {
    alert(`🚀 Navigating to: ${title} (coming soon)`);
  };

  return (
    <div className="container mt-4">
      <h2>🏥 BBSCART Health Access Ecosystem</h2>

      {/* 🔷 Main Plan Card */}
      <Card className="mb-3 shadow">
        <Card.Body>
          <h5>Your Plan: {plan}</h5>
          <p>
            🎁 Wallet Balance: ₹{wallet} | 💰 Cashback Earned: ₹{cashback}
          </p>
          <Button
            variant="success"
            className="me-2"
            onClick={handleBookAppointment}
            disabled={bookingSubmitted || !isLoggedIn}
          >
            {bookingSubmitted ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Book Appointment"
            )}
          </Button>
          <Button variant="primary" onClick={() => setShowCoach(true)}>
            <FaRobot /> Ask Health AI
          </Button>
        </Card.Body>
      </Card>

      {/* 🔷 Feature Cards */}
      <div className="row">
        <FeatureCard
          icon={<FaWallet />}
          title="Golldex Wallet"
          desc="Pay for health plans, get rewards"
          onExplore={handleExploreClick}
        />
        <FeatureCard
          icon={<FaGift />}
          title="Gift Health Plan"
          desc="Send a plan to loved ones"
          onExplore={handleExploreClick}
        />
        <FeatureCard
          icon={<FaHeartbeat />}
          title="Nearby Labs"
          desc="Book scans instantly"
          onExplore={handleExploreClick}
        />
        <FeatureCard
          icon={<FaShoppingCart />}
          title="Health Shop"
          desc="Buy items & earn cashback"
          onExplore={handleExploreClick}
        />
        <FeatureCard
          icon={<FaSyncAlt />}
          title="Priority Delivery"
          desc="Fast meds & kit delivery"
          onExplore={handleExploreClick}
        />
        <FeatureCard
          icon={<FaRobot />}
          title="AI Suggestions"
          desc="Daily nudges, insights & scoring"
          onExplore={handleExploreClick}
        />
      </div>

      {/* 🔷 AI Coach Modal */}
      <Modal show={showCoach} onHide={() => setShowCoach(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🤖 AI Health Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ask your health or lifestyle question:</p>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="e.g. How to manage cholesterol?"
            value={coachQuery}
            onChange={(e) => setCoachQuery(e.target.value)}
          />
          <Button
            className="mt-3"
            variant="success"
            onClick={handleCoachSubmit}
          >
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

// 🔷 Reusable Feature Card
const FeatureCard = ({ icon, title, desc, onExplore }) => (
  <div className="col-md-4 mb-3">
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <h4>
          {icon} {title}
        </h4>
        <p>{desc}</p>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onExplore(title)}
        >
          Explore
        </Button>
      </Card.Body>
    </Card>
  </div>
);

export default HealthAccessEcosystem;
