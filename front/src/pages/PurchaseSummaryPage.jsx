import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";

const PurchaseSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    plan,
    addons = [],
    usedWalletAmount = 0,
    paymentMethod = "wallet",
    referralCode = "",
  } = location.state || {};

  if (!plan) return <p>No purchase summary available.</p>;

  const totalAddonPrice = addons.reduce(
    (sum, addon) => sum + (addon?.price || 0),
    0
  );
  const totalPrice = (plan.price || 0) + totalAddonPrice;

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-success">🎉 Purchase Successful!</h3>

      <Card>
        <Card.Header>Plan Summary</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Plan:</strong> {plan.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Tier:</strong> {plan.tier?.toUpperCase() || "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Price:</strong> ₹ {plan.price}
          </ListGroup.Item>
          {addons.length > 0 && (
            <ListGroup.Item>
              <strong>Addons:</strong>
              <ul className="mb-0">
                {addons.map((addon, i) => (
                  <li key={i}>
                    {addon.name} (+₹{addon.price})
                  </li>
                ))}
              </ul>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <strong>Referral Code:</strong>{" "}
            {referralCode ? referralCode : "Not Used"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Wallet Used:</strong> ₹ {usedWalletAmount}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Payment Method:</strong> {paymentMethod}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Total Paid:</strong> ₹ {totalPrice}
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <div className="mt-4">
        <Button
          variant="primary"
          onClick={() => navigate("/health-access/my-plan")}
        >
          Go to My Plan
        </Button>
        <Button
          variant="outline-secondary"
          className="ms-2"
          onClick={() => navigate("/health-access/plans")}
        >
          Back to Plans
        </Button>
      </div>
    </div>
  );
};

export default PurchaseSummaryPage;
