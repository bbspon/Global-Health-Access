import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Modal,
  Accordion,
} from "react-bootstrap";
import { Wallet, CreditCard, Gift, PersonPlus } from "react-bootstrap-icons";

const PaymentsWalletPage = () => {
  const [walletBalance, setWalletBalance] = useState(850);
  const [topupAmount, setTopupAmount] = useState("");
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("basic");

  const getPlanPrice = () => {
    switch (paymentPlan) {
      case "basic":
        return 499;
      case "premium":
        return 999;
      case "govt":
        return 0;
      default:
        return 0;
    }
  };

  const handleTopUp = () => {
    const amt = parseInt(topupAmount);
    if (!isNaN(amt) && amt > 0) {
      setWalletBalance(walletBalance + amt);
      setTopupAmount("");
      setShowTopUpModal(false);
      alert("Wallet topped up successfully!");
    }
  };

  const handlePlanPayment = () => {
    const price = getPlanPrice();
    if (price > walletBalance) {
      alert("Insufficient wallet balance. Please top-up.");
      return;
    }
    setWalletBalance(walletBalance - price);
    alert(`Plan '${paymentPlan}' activated!`);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col md={8}>
          <h3><Wallet className="me-2" />Payments & Wallet</h3>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="success" onClick={() => setShowTopUpModal(true)}>
            Top-up Wallet
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-3 shadow-sm ">
            <Card.Body>
              <h5>💼 Wallet Balance</h5>
              <h3>₹{walletBalance}</h3>
              <small>Use for bookings, plans, and offers</small>
            </Card.Body>
          </Card>

          <Card className=" shadow-sm">
            <Card.Body>
              <h5><CreditCard /> Buy Health Plan</h5>
              <Form.Select
                value={paymentPlan}
                onChange={(e) => setPaymentPlan(e.target.value)}
                className="mb-2"
              >
                <option value="basic">Basic Plan – ₹499</option>
                <option value="premium">Premium Plan – ₹999</option>
                <option value="govt">Govt Sponsored – ₹0</option>
              </Form.Select>

              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline-primary" onClick={() => alert(`Applied coupon: ${couponCode}`)}>Apply</Button>
              </InputGroup>

              <Button variant="primary" className="w-100" onClick={handlePlanPayment}>
                Pay & Activate Plan
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className=" shadow-sm h-100 ">
            <Card.Body>
              <h5><PersonPlus className="me-2" />Referral Program</h5>
              <p>Your Code: <strong>BBSCART123</strong></p>
              <InputGroup>
                <Form.Control
                  placeholder="Enter Referral Code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                <Button variant="outline-success" onClick={() => alert(`Referral applied: ${referralCode}`)}>Apply</Button>
              </InputGroup>
              <small className="text-muted d-block mt-2">
                Invite friends & earn wallet bonus.
              </small>
            </Card.Body>
          </Card>

        </Col>
        
          <Accordion defaultActiveKey="0" className="shadow-sm my-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header><Gift className="me-2" />Available Offers</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>💸 ₹50 Cashback on ₹500 Top-up</li>
                  <li>🎁 10% off Premium Plan</li>
                  <li>🆓 Free Plan for Approved Users</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
      </Row>

      {/* Top-up Modal */}
      <Modal show={showTopUpModal} onHide={() => setShowTopUpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Top-up Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTopUpModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleTopUp}>Top-up Now</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaymentsWalletPage;
