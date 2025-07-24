import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Form } from "react-bootstrap";

const PaymentsWalletPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = JSON.parse(localStorage.getItem("bbsUser"))?.token;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/wallet/wallet-history${
            typeFilter ? `?type=${typeFilter}` : ""
          }`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions(res.data);
        console.log("Fetched wallet data ➜", res.data);

      } catch (err) {
        console.error("Error fetching wallet history", err);
      }
    };

    fetchTransactions();
  }, [typeFilter]);

  return (
    <Container className="mt-4">
      <h3>💸 Wallet Payments</h3>
      <Form.Select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="my-3"
      >
        <option value="">All Transactions</option>
        <option value="credit">Credits</option>
        <option value="debit">Debits</option>
      </Form.Select>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td>{txn.type}</td>
              <td>₹{txn.amount}</td>
              <td>{txn.purpose}</td>
              <td>{new Date(txn.timestamp).toLocaleString()}</td> 


            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PaymentsWalletPage;
