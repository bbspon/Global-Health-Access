import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, ListGroup, Badge, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const MyWalletPage = () => {
  const [wallet, setWallet] = useState({ balance: 0, transactions: [] });

  useEffect(() => {
    const fetchWallet = async () => {
      const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/wallet/my-wallet`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWallet(res.data);
      } catch (err) {
        console.error("Error loading wallet data", err);
      }
    };

    fetchWallet();
  }, []);

  return (
    <Container className="mt-4">
      <h3>My Wallet</h3>
      <Button as={Link} to="/wallet/topup" variant="success">
        ➕ Top Up Wallet
      </Button>
      <Card className="my-3 shadow-sm">
        <Card.Body>
          <h4>
            Current Balance:{" "}
            <Badge bg="success">₹{wallet.balance.toFixed(2)}</Badge>
          </h4>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header>Transaction History</Card.Header>
        <ListGroup variant="flush">
          {wallet.transactions.map((txn, index) => (
            <ListGroup.Item key={index}>
              <strong>{txn.type.toUpperCase()}</strong> - ₹{txn.amount}{" "}
              <span className="text-muted">({txn.purpose})</span>
              <div className="text-muted small">
                {new Date(txn.timestamp).toLocaleString()}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default MyWalletPage;
