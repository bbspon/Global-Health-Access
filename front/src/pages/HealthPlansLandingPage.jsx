import React, { useEffect, useState } from "react";
import axios from "axios";
import PlanCard from "../components/HealthAccess/PlanCard";
import BuyPlanModal from "../components/HealthAccess/BuyPlanModal";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
} from "react-bootstrap";
const HealthPlansLandingPage = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedTier, setSelectedTier] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/plans")
      .then((res) => {
        setPlans(res.data);
        setFilteredPlans(res.data); // Default: all plans
      })
      .catch((err) => console.error("Failed to fetch plans", err));
  }, []);

  const handleTierFilter = (tier) => {
    setSelectedTier(tier);
    if (tier === "all") {
      setFilteredPlans(plans);
    } else {
      setFilteredPlans(plans.filter((p) => p.tier === tier));
    }
  };

  const handleBuyClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Explore Our Health Plans</h2>

      {/* Tier Filters */}
      <div className="mb-4">
        <label className="me-3 fw-semibold">Filter by Tier:</label>
        {["all", "basic", "premium", "elite"].map((tier) => (
          <button
            key={tier}
            className={`btn btn-sm me-2 ${
              selectedTier === tier ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => handleTierFilter(tier)}
          >
            {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </button>
        ))}
        <Button variant="info" as={Link} to="/health-access/plan-eligibility">
          Check Plan Eligibility
        </Button>
      </div>

      {/* Plan Cards */}
      <div className="row">
        {filteredPlans.map((plan) => (
          <div key={plan._id} className="col-md-4 mb-3">
            <PlanCard plan={plan} onBuyClick={handleBuyClick} />
          </div>
        ))}
      </div>

      {/* Buy Plan Modal */}
      {showModal && selectedPlan && (
        <BuyPlanModal
          show={showModal}
          onClose={() => setShowModal(false)}
          plan={selectedPlan}
        />
      )}

      <Button
        variant="outline-info"
        size="sm"
        onClick={() => navigate("/compare")}
      >
        Compare All Plans
      </Button>
    </div>
  );
};

export default HealthPlansLandingPage;
