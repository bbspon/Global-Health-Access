import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Card,
  Button,
  Row,
  Col,
  Modal,
  Badge,
  Table,
} from "react-bootstrap";
import axios from "axios";

export default function EcosystemExpansionModel() {
  const [ngos, setNgos] = useState([]);
  const [schools, setSchools] = useState([]);
  const [csr, setCsr] = useState([]);
  const [rurals, setRurals] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ngoRes, schoolRes, csrRes, ruralRes, lbRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URI}/ecosystem/ngos`),
          axios.get(`${import.meta.env.VITE_API_URI}/ecosystem/schools`),
          axios.get(`${import.meta.env.VITE_API_URI}/ecosystem/csr`),
          axios.get(`${import.meta.env.VITE_API_URI}/ecosystem/rurals`),
          axios.get(`${import.meta.env.VITE_API_URI}/ecosystem/leaderboard`),
        ]);
        console.log("NGO response:", ngoRes.data);

        setNgos(ngoRes.data.data || ngoRes.data); // <-- updated here
        setSchools(schoolRes.data.data || schoolRes.data);
        setCsr(csrRes.data.data || csrRes.data);
        setRurals(ruralRes.data.data || ruralRes.data);
        setLeaderboard(lbRes.data.data || lbRes.data);
      } catch (err) {
        console.error("API fetch error:", err);
      }
    };
    fetchData();
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
            {ngos.map((n, idx) => (
              <Col md={4} key={idx}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{n.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {n.city}
                    </Card.Subtitle>
                    <Card.Text>
                      Type: {n.type}
                      <br />
                      Contact: {n.contact}
                    </Card.Text>
                    <Button onClick={() => openModal("ngo", n)}>View</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="School Programs" id="school">
          <Row>
            {schools.map((s, idx) => (
              <Col md={4} key={idx}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{s.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {s.state}
                    </Card.Subtitle>
                    <Card.Text>
                      Board: {s.board}
                      <br />
                      Students: {s.studentsCount}
                    </Card.Text>
                    <Button onClick={() => openModal("school", s)}>View</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="Corporate CSR Campaigns" id="csr">
          <Row>
            {csr.map((c, idx) => (
              <Col md={4} key={idx}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{c.company}</Card.Title>
                    <Card.Text>
                      Initiative: {c.initiative}
                      <br />
                      Impact Area: {c.impactArea}
                      <br />
                      Budget: ₹{c.budget}
                    </Card.Text>
                    <Button onClick={() => openModal("csr", c)}>View</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="Rural Volunteer Deployment" id="rural">
          <Row>
            {rurals.map((r, idx) => (
              <Col md={4} key={idx}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{r.villageName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {r.region}
                    </Card.Subtitle>
                    <Card.Text>
                      Access: {r.accessLevel}
                      <br />
                      Population: {r.population}
                    </Card.Text>
                    <Button onClick={() => openModal("rural", r)}>View</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Section>

        <Section title="Recognition Leaderboard" id="leaderboard">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Score</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((l, idx) => (
                <tr key={idx}>
                  <td>{l.name}</td>
                  <td>{l.role}</td>
                  <td>{l.score}</td>
                  <td>{l.region}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      </Container>

      <DetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        type={modalType}
        data={modalData}
      />
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

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{type.toUpperCase()} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.entries(m).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong>{" "}
            {typeof value === "object" ? JSON.stringify(value) : value}
          </p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
