import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button, Card, Row, Col, Modal, ProgressBar } from 'react-bootstrap';

// Mock API stubs
const fetchCategories = async () => ['Doctor', 'Hospital', 'Lab', 'Pharmacy', 'Plan', 'Billing', 'Other'];
const fetchTimeline = async () => [
  { stage: 'Raised', time: '2025‑07‑10 10:15', by: 'User' },
  { stage: 'Assigned', time: '2025‑07‑10 12:00', by: 'BBSCART' },
  { stage: 'In Progress', time: '2025‑07‑11 10:00', by: 'Partner' },
];
const fetchPartnerInbox = async () => [
  { id: 'c1', user: 'Jane Doe', category: 'Lab', priority: 'Critical', status: 'In Progress' },
];
const fetchAdminStats = async () => ({
  total: 125, resolved: 90, pending: 35, avgTAT: 48,
  partnerHotspots: ['Hospital A', 'Lab X'],
});
export default function GrievanceResolutionSystem() {
  // States
  const [step, setStep] = useState('form'); // form, timeline, inbox, stats
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    category: '', priority: 'Low', anonymous: false, description: ''
  });
  const [uploads, setUploads] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      setCategories(await fetchCategories());
      setTimeline(await fetchTimeline());
      setInbox(await fetchPartnerInbox());
      setStats(await fetchAdminStats());
    })();
  }, []);

  const handleSubmit = () => {
    alert('Complaint submitted with details:\n' + JSON.stringify({ form, uploads }));
    setStep('timeline');
  };
  const handleInboxResolve = (id) => {
    alert(`Partner resolving complaint ${id}`);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb‑4">
        <Container>
          <Navbar.Brand>BBSCART Grievance System</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => setStep('form')}>Raise Complaint</Nav.Link>
            <Nav.Link onClick={() => setStep('timeline')}>My Timeline</Nav.Link>
            <Nav.Link onClick={() => setStep('inbox')}>Partner Inbox</Nav.Link>
            <Nav.Link onClick={() => setStep('stats')}>Admin Analytics</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {step === 'form' && (
          <Card>
            <Card.Body>
              <Card.Title>Raise a Complaint</Card.Title>
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    value={form.category}
                  >
                    <option value="">-- Select --</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea" rows={3}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value })}
                  >
                    {['Low', 'Medium', 'Critical'].map(p => <option key={p} value={p}>{p}</option>)}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Check
                    type="checkbox"
                    label="Submit Anonymously"
                    checked={form.anonymous}
                    onChange={e => setForm({ ...form, anonymous: e.target.checked })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Evidence</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={e => setUploads(Array.from(e.target.files))}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>Submit Complaint</Button>
              </Form>
            </Card.Body>
          </Card>
        )}

        {step === 'timeline' && (
          <Card>
            <Card.Body>
              <Card.Title>Complaint Timeline</Card.Title>
              {timeline.map((t, i) => (
                <div key={i} className="mb‑2">
                  <strong>{t.stage}:</strong> {t.time} <em>({t.by})</em>
                </div>
              ))}
            </Card.Body>
          </Card>
        )}

        {step === 'inbox' && (
          <>
            <h5>Partner Complaint Inbox</h5>
            {inbox.map(item => (
              <Card key={item.id} className="mb‑2">
                <Card.Body>
                  <Card.Title>{item.user} - {item.category}</Card.Title>
                  <Card.Subtitle className="text-muted">Priority: {item.priority}, Status: {item.status}</Card.Subtitle>
                  <Button onClick={() => handleInboxResolve(item.id)} variant="success" className="mt‑2">Resolve</Button>
                </Card.Body>
              </Card>
            ))}
          </>
        )}

        {step === 'stats' && stats && (
          <Card>
            <Card.Body>
              <Card.Title>Admin Analytics</Card.Title>
              <p>Total Complaints: {stats.total}</p>
              <p>Resolved: {stats.resolved}, Pending: {stats.pending}</p>
              <p>Average TAT: {stats.avgTAT} hours</p>
              <ProgressBar now={(stats.resolved/stats.total)*100} label={`${Math.round(stats.resolved/stats.total*100)}% Resolved`} />
              <Card className="mt‑3">
                <Card.Body>
                  <Card.Title>Hotspot Providers</Card.Title>
                  <ul>
                    {stats.partnerHotspots.map(h => <li key={h}>{h}</li>)}
                  </ul>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
