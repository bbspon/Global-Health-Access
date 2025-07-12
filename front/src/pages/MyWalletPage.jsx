import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";

const MyWalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchWallet = async () => {
    const res = await axios.get("/api/wallet/me");
    setBalance(res.data.balance);
    setTransactions(res.data.transactions);
  };

  const recharge = async () => {
    await axios.post("/api/wallet/topup", {
      amount: parseFloat(amount),
      method: "gateway", // assumed gateway
      transactionId: "TXN" + Date.now(),
    });
    fetchWallet();
    alert("Wallet Recharged");
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div className="container py-4">
      <h4>My Wallet</h4>
      <p>Current Balance: ₹{balance}</p>

      <Form.Group>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <Button className="mt-2" onClick={recharge}>
          Recharge Wallet
        </Button>
      </Form.Group>

      <hr />
      <h5>Recharge History</h5>
      <Table striped>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
            <th>Txn ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, idx) => (
            <tr key={idx}>
              <td>₹{txn.amount}</td>
              <td>{txn.method}</td>
              <td>{new Date(txn.timestamp).toLocaleString()}</td>
              <td>{txn.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyWalletPage;
