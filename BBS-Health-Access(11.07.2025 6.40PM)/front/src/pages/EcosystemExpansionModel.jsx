import React, { useState, useEffect } from 'react';
import {
  Container, Navbar, Nav,
  Card, Button, Row, Col,
  Modal, Badge, Table
} from 'react-bootstrap';

// Mock data
const fetchNgos = async () => [
  { id: 'n1', name: 'Hope Foundation', region: 'Village X', onboarded: 120, renewals: 80 }
];
const fetchSchools = async () => [
  { id: 's1', name: 'Govt School A', district: 'District Y', students: 300, parents: 150 }
];
const fetchCsr = async () => [
  { id: 'c1', company: 'XYZ Ltd', plans: 500, impacted: 480 }
];
const fetchRurals = async () => [
  {
    id: 'r1', volunteer: 'John Doe', villages: ['Village Z','Hamlet A'],
    fieldSyncs: 22, lastSync: '2025-07-10 14:30', pendingUploads: 5,
    syncStatus: 'yellow', syncScore: 88, volunteerPhone: '+91-9876543210',
    kitAssigned: true, healthZone: 'PHC-A Block', notes: 'Low signal observed', lastLat: 12.345, lastLng: 78.901
  }
];
const fetchLeaderboard = async () => [
  { id: 'l1', label: 'Hero John', category: 'Volunteer', score: 95 }
];

export default function EcosystemExpansionModel() {
  const [ngos, setNgos] = useState([]);
  const [schools, setSchools] = useState([]);
  const [csr, setCsr] = useState([]);
  const [rurals, setRurals] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      setNgos(await fetchNgos());
      setSchools(await fetchSchools());
      setCsr(await fetchCsr());
      setRurals(await fetchRurals());
      setLeaderboard(await fetchLeaderboard());
    })();
  }, []);

  const openModal = (type, item) => {
    setModalType(type);
    setModalData(item);
    setShowModal(true);
  };

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>BBSCART Ecosystem Expansion</Navbar.Brand>
          <Nav>
            <Nav.Link href="#ngo">NGO</Nav.Link>
            <Nav.Link href="#school">School</Nav.Link>
            <Nav.Link href="#csr">CSR</Nav.Link>
            <Nav.Link href="#rural">Rural</Nav.Link>
            <Nav.Link href="#leaderboard">Recognition</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">

        <Section title="NGO Partnerships" id="ngo">
          <Row>
            {ngos.map(n => (
              <Col md={4} key={n.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{n.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{n.region}</Card.Subtitle>
                    <Card.Text>Onboarded: {n.onboarded}<br />Renewals: {n.renewals}</Card.Text>
                    <Button onClick={() => openModal('ngo', n)}>View</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="School Programs" id="school">
          <Row>
            {schools.map(s => (
              <Col md={4} key={s.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{s.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{s.district}</Card.Subtitle>
                    <Card.Text>Students: {s.students}<br />Parents onboarded: {s.parents}</Card.Text>
                    <Button onClick={() => openModal('school', s)}>View</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="Corporate CSR Campaigns" id="csr">
          <Row>
            {csr.map(c => (
              <Col md={4} key={c.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{c.company}</Card.Title>
                    <Card.Text>Funded Plans: {c.plans}<br />Lives Impacted: {c.impacted}</Card.Text>
                    <Button onClick={() => openModal('csr', c)}>View</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="Rural Volunteer Deployment" id="rural">
          <Row>
            {rurals.map(r => (
              <Col md={4} key={r.id}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{r.volunteer}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{r.villages.join(', ')}</Card.Subtitle>
                    <Card.Text>Sync Count: {r.fieldSyncs}</Card.Text>
                    <Badge bg={r.syncStatus === 'green' ? 'success' : r.syncStatus === 'yellow' ? 'warning' : 'danger'}>
                      {r.syncStatus.toUpperCase()}
                    </Badge>
                    <Button className="mt-2" onClick={() => openModal('rural', r)}>View</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="Recognition Leaderboard" id="leaderboard">
          <Table striped bordered hover>
            <thead><tr><th>Entity</th><th>Role</th><th>Score</th></tr></thead>
            <tbody>
              {leaderboard.map(l => (
                <tr key={l.id}><td>{l.label}</td><td>{l.category}</td><td>{l.score}</td></tr>
              ))}
            </tbody>
          </Table>
        </Section>

      </Container>

      <DetailModal show={showModal} onHide={() => setShowModal(false)} type={modalType} data={modalData} />
    </>
  );
}

const Section = ({ title, id, children }) => (
  <div id={id} className="mb-5">
    <h3>{title}</h3>
    {children}
  </div>
);

const DetailModal = ({ show, onHide, type, data }) => {
  if (!data) return null;
  const m = data;
  const statusColor = (status) => status === 'green' ? 'success' : status === 'yellow' ? 'warning' : 'danger';

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton><Modal.Title>{type.toUpperCase()} Details</Modal.Title></Modal.Header>
      <Modal.Body>
        {type === 'ngo' && <>
          <p><strong>Name:</strong> {m.name}</p>
          <p><strong>Region:</strong> {m.region}</p>
          <p><strong>Onboarded:</strong> {m.onboarded}</p>
          <p><strong>Renewals:</strong> {m.renewals}</p>
        </>}
        {type === 'school' && <>
          <p><strong>Name:</strong> {m.name}</p>
          <p><strong>District:</strong> {m.district}</p>
          <p><strong>Students:</strong> {m.students}</p>
          <p><strong>Parents onboarded:</strong> {m.parents}</p>
        </>}
        {type === 'csr' && <>
          <p><strong>Company:</strong> {m.company}</p>
          <p><strong>Funded Plans:</strong> {m.plans}</p>
          <p><strong>Lives Impacted:</strong> {m.impacted}</p>
        </>}
        {type === 'rural' && <>
          <p><strong>Volunteer:</strong> {m.volunteer}</p>
          <p><strong>Villages:</strong> {m.villages.join(', ')}</p>
          <p><strong>Field Syncs:</strong> {m.fieldSyncs}</p>
          <p><strong>Last Sync:</strong> {m.lastSync}</p>
          <p><strong>Pending Uploads:</strong> {m.pendingUploads}</p>
          <p><strong>Sync Score:</strong> {m.syncScore}%</p>
          <p><strong>Contact:</strong> {m.volunteerPhone}</p>
          <p><strong>Kit Assigned:</strong> {m.kitAssigned ? 'Yes' : 'No'}</p>
          <p><strong>Health Zone:</strong> {m.healthZone}</p>
          <p><strong>Field Notes:</strong> {m.notes}</p>
          <p><strong>Last Location:</strong> <a href={`https://maps.google.com/?q=${m.lastLat},${m.lastLng}`} target="_blank">View Map</a></p>
          <Badge bg={statusColor(m.syncStatus)}>{m.syncStatus.toUpperCase()}</Badge>
        </>}
      </Modal.Body>
      <Modal.Footer><Button onClick={onHide}>Close</Button></Modal.Footer>
    </Modal>
  );
};
