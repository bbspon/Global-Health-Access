import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Alert,
} from "react-bootstrap";

const WellnessTracker = () => {
  const [steps, setSteps] = useState(0);
  const [stepGoal, setStepGoal] = useState(10000);
  const [mealsLogged, setMealsLogged] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [wellnessScore, setWellnessScore] = useState(0);
  const [error, setError] = useState("");

  const fetchWellnessData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URI}/wellness`);
      const data = res.data;
      setSteps(data.steps);
      setMealsLogged(data.mealsLogged);
      setAppointments(data.appointments);
    } catch (err) {
      setError("❌ Error fetching wellness data");
    }
  };

  const updateSteps = async (newSteps) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URI}/wellness/steps`, {
        steps: newSteps,
      });
      setSteps(newSteps);
    } catch (err) {
      setError("Failed to update steps");
    }
  };

  const logMeal = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URI}/wellness/meal`);
      setMealsLogged((prev) => prev + 1);
    } catch (err) {
      setError("Failed to log meal");
    }
  };

  useEffect(() => {
    fetchWellnessData();
  }, []);

  useEffect(() => {
    const stepScore = Math.min((steps / stepGoal) * 40, 40);
    const mealScore = Math.min((mealsLogged / 3) * 30, 30);
    const apptScore = appointments.length > 0 ? 30 : 0;
    setWellnessScore(Math.round(stepScore + mealScore + apptScore));
  }, [steps, mealsLogged, appointments]);

  return (
    <Container className="py-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="g-4">
        {/* Steps Widget */}
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>🚶 Daily Steps</h5>
            <p>
              {steps.toLocaleString()} / {stepGoal} steps
            </p>
            <ProgressBar
              now={(steps / stepGoal) * 100}
              label={`${Math.round((steps / stepGoal) * 100)}%`}
            />
            <Button
              variant="outline-primary"
              size="sm"
              className="mt-2"
              onClick={() => updateSteps(steps + 1000)}
            >
              +1000 Steps
            </Button>
          </Card>
        </Col>

        {/* Meals Widget */}
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>🥗 Meals Logged</h5>
            <p>{mealsLogged} / 3 meals</p>
            <ProgressBar
              variant="success"
              now={(mealsLogged / 3) * 100}
              label={`${mealsLogged}/3`}
            />
            <Button
              variant="outline-success"
              size="sm"
              className="mt-2"
              onClick={logMeal}
              disabled={mealsLogged >= 3}
            >
              Log Meal
            </Button>
          </Card>
        </Col>

        {/* Appointments Widget */}
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h5>📅 Appointments</h5>
            {appointments.map((appt, idx) => (
              <div key={idx} className="mb-2">
                <strong>{appt.date}</strong> @ {appt.time} – {appt.doctor}{" "}
                <span className="badge bg-info text-dark">{appt.status}</span>
              </div>
            ))}
            <Button variant="outline-secondary" size="sm" className="mt-2">
              View All
            </Button>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="p-4 text-center shadow-sm">
            <h4>📊 Weekly Wellness Score</h4>
            <h1
              className={
                wellnessScore >= 70
                  ? "text-success"
                  : wellnessScore >= 40
                  ? "text-warning"
                  : "text-danger"
              }
            >
              {wellnessScore}/100
            </h1>
            <p>
              {wellnessScore >= 70
                ? "Great job! Keep it up!"
                : wellnessScore >= 40
                ? "Doing well, but room to improve."
                : "Let’s get moving for better health!"}
            </p>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Alert variant="info">
            💡 Tip: Logging your meals and completing daily steps consistently
            can improve your score and health outcomes.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default WellnessTracker;
