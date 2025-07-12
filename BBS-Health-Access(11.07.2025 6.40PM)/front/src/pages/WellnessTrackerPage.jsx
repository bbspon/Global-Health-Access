import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table } from "react-bootstrap";

const WellnessTrackerPage = () => {
  const [log, setLog] = useState({
    steps: "",
    sleepHours: "",
    waterLitres: "",
  });
  const [logs, setLogs] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.get("/api/wellness/recent").then((res) => setLogs(res.data));
  }, []);

  const submit = async () => {
    await axios.post("/api/wellness/log", { ...log, date: today });
    const { data } = await axios.get("/api/wellness/recent");
    setLogs(data);
    setLog({ steps: "", sleepHours: "", waterLitres: "" });
  };

  return (
    <div className="container py-4">
      <h4>Wellness Tracker</h4>

      <Form className="mb-4">
        <Form.Control
          type="number"
          placeholder="Steps Walked"
          value={log.steps}
          onChange={(e) => setLog({ ...log, steps: e.target.value })}
          className="mb-2"
        />
        <Form.Control
          type="number"
          placeholder="Sleep Hours"
          value={log.sleepHours}
          onChange={(e) => setLog({ ...log, sleepHours: e.target.value })}
          className="mb-2"
        />
        <Form.Control
          type="number"
          placeholder="Water Intake (L)"
          value={log.waterLitres}
          onChange={(e) => setLog({ ...log, waterLitres: e.target.value })}
          className="mb-2"
        />
        <Button onClick={submit}>Save Entry</Button>
      </Form>

      <h5>Last 7 Days</h5>
      <Table bordered>
        <thead>
          <tr>
            <th>Date</th>
            <th>Steps</th>
            <th>Sleep</th>
            <th>Water</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.date}</td>
              <td>{entry.steps}</td>
              <td>{entry.sleepHours} hrs</td>
              <td>{entry.waterLitres} L</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WellnessTrackerPage;
