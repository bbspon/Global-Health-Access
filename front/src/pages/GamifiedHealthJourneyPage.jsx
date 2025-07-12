// Filename: GamifiedHealthJourneys.jsx (Final Full Version with All Features)

import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
  Form,
  Modal,
} from 'react-bootstrap';
import {
  Mic,
  Gift,
  Trophy,
  Star,
  People,
  Clock,
  Download,
  Share,
} from 'react-bootstrap-icons';

const journeys = [
  {
    title: 'Step Up!',
    progress: 70,
    streak: 10,
    badge: 'Step Warrior',
    reward: '₹50 Golldex',
    description: 'Track 10,000+ steps per day',
  },
  {
    title: 'Hydration Hero',
    progress: 90,
    streak: 14,
    badge: 'Hydro Master',
    reward: 'Free Water Bottle Coupon',
    description: 'Log 8+ glasses daily',
  },
];

export default function GamifiedHealthJourneys() {
  const [askCoach, setAskCoach] = useState('');
  const [showCoach, setShowCoach] = useState(false);

  return (
    <Container className="py-4">
      <h2 className="mb-4">🎮 Gamified Health Journeys + AI Habit Builder</h2>

      {/* Journey Cards */}
      <Row>
        {journeys.map((j, idx) => (
          <Col md={6} key={idx}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>
                  {j.title}{' '}
                  <Badge bg="success" className="ms-2">
                    🔥 Streak: {j.streak} days
                  </Badge>
                </Card.Title>
                <Card.Text>{j.description}</Card.Text>
                <ProgressBar now={j.progress} label={`${j.progress}%`} />
                <div className="mt-2 d-flex justify-content-between">
                  <span>
                    <Trophy /> Badge: <strong>{j.badge}</strong>
                  </span>
                  <span>
                    <Gift /> {j.reward}
                  </span>
                </div>
                <div className="d-flex justify-content-end mt-2 gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => alert('PDF download triggered')}
                  >
                    <Download /> PDF
                  </Button>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => alert('Shared journey card')}
                  >
                    <Share /> Share
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Ask AI Coach */}
      <Card className="mb-4 p-3 shadow-sm">
        <h5>
          🧠 Ask the AI Health Coach{' '}
          <Mic
            role="button"
            style={{ cursor: 'pointer' }}
            onClick={() => alert('Voice input activated')}
          />
        </h5>
        <Form.Control
          placeholder="e.g., Is 4 hours of sleep harmful?"
          value={askCoach}
          onChange={(e) => setAskCoach(e.target.value)}
        />
        <Button className="mt-2" onClick={() => setShowCoach(true)} variant="primary">
          Ask Coach
        </Button>
      </Card>

      <Modal show={showCoach} onHide={() => setShowCoach(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>AI Coach Says</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          🤖 "Sleep less than 6 hours may increase stress, inflammation and BP. Aim for 7-8 hours ideally."
        </Modal.Body>
      </Modal>

      {/* Stats and Leaderboard */}
      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={4}>
              <h6>
                <Clock /> Current Streaks
              </h6>
              <ul>
                <li>Step Up: 10 Days</li>
                <li>Hydration Hero: 14 Days</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6>
                <Star /> Badges Earned
              </h6>
              <ul>
                <li>Step Warrior</li>
                <li>Hydro Master</li>
              </ul>
            </Col>
            <Col md={4}>
              <h6>
                <People /> Leaderboard
              </h6>
              <ul>
                <li>You are #4 in Chennai Walk Club</li>
                <li>#1: Ramesh (21-day streak)</li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Admin/Employer View */}
      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <h5>👨‍💼 Corporate Wellness Status</h5>
          <p>
            Employees completing journeys: <strong>72%</strong>
            <br /> Top performing teams: Tech, Sales
            <br /> Eligible for bonus rewards: <strong>45 members</strong>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}