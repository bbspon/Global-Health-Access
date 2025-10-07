import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap";

const API = import.meta.env.VITE_API_URI; // e.g. http://localhost:5000/api

const WellnessTrackerPage = () => {
  const [log, setLog] = useState({
    steps: "",
    sleepHours: "",
    waterLitres: "",
  });
  const [logs, setLogs] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  // --- helper: normalize any API shape to an array
  const toArray = (data) => (Array.isArray(data) ? data : data?.logs || []);

  useEffect(() => {
    const raw = localStorage.getItem("bbsUser");
    const token = raw ? JSON.parse(raw).token : null;

    axios
      .get(`${API}/wellness/recent`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => setLogs(toArray(res.data)))
      .catch((err) => {
        console.error("Fetch recent wellness logs failed:", err);
        setLogs([]); // keep logs as an array to avoid .map crash
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const raw = localStorage.getItem("bbsUser");
      const token = raw ? JSON.parse(raw).token : null;

      // keep your original submit: add today's date if needed
      await axios.post(
        `${API}/wellness/log`,
        { ...log, date: today },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      // refresh list; keep logs an array even if API shape changes
      const { data } = await axios.get(`${API}/wellness/recent`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setLogs(toArray(data));

      // reset form (kept as in your original intent)
      setLog({ steps: "", sleepHours: "", waterLitres: "" });
    } catch (err) {
      console.error("Save wellness log failed:", err);
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3">Wellness Tracker</h4>

      <Form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={today} disabled />
          </div>

          <div className="col-md-3">
            <Form.Label>Steps</Form.Label>
            <Form.Control
              name="steps"
              type="number"
              min="0"
              value={log.steps}
              onChange={handleChange}
              placeholder="e.g., 8000"
            />
          </div>

          <div className="col-md-3">
            <Form.Label>Sleep (hours)</Form.Label>
            <Form.Control
              name="sleepHours"
              type="number"
              step="0.1"
              min="0"
              value={log.sleepHours}
              onChange={handleChange}
              placeholder="e.g., 7.5"
            />
          </div>

          <div className="col-md-3">
            <Form.Label>Water (L)</Form.Label>
            <Form.Control
              name="waterLitres"
              type="number"
              step="0.1"
              min="0"
              value={log.waterLitres}
              onChange={handleChange}
              placeholder="e.g., 2.5"
            />
          </div>
        </div>

        <div className="mt-3">
          <Button type="submit">Save</Button>
        </div>
      </Form>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Steps</th>
            <th>Sleep</th>
            <th>Water</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(logs) && logs.length > 0 ? (
            logs.map((entry) => (
              <tr
                key={
                  entry._id ||
                  `${entry.date}-${entry.steps}-${entry.sleepHours}-${entry.waterLitres}`
                }
              >
                <td>{entry.date}</td>
                <td>{entry.steps}</td>
                <td>{entry.sleepHours} hrs</td>
                <td>{entry.waterLitres} L</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default WellnessTrackerPage;
