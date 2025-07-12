import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Row, Col } from "react-bootstrap";

const WalletHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    min: "",
    max: "",
    startDate: "",
    endDate: "",
  });

  const fetchHistory = async () => {
    const { data } = await axios.get("/api/wallet/history", {
      params: filters,
    });
    setTransactions(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="container py-4">
      <h4>Wallet Transaction History</h4>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Select name="type" onChange={handleChange}>
            <option value="">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            placeholder="Min Amount"
            name="min"
            onChange={handleChange}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            placeholder="Max Amount"
            name="max"
            onChange={handleChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control type="date" name="startDate" onChange={handleChange} />
        </Col>
        <Col md={3}>
          <Form.Control type="date" name="endDate" onChange={handleChange} />
        </Col>
      </Row>

      <button className="btn btn-primary mb-3" onClick={fetchHistory}>
        Apply Filters
      </button>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{new Date(txn.createdAt).toLocaleString()}</td>
              <td>{txn.type}</td>
              <td>₹{txn.amount}</td>
              <td>{txn.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WalletHistoryPage;
