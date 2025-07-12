import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  Modal,
  Spinner,
} from "react-bootstrap";
import { GeoAltFill, StarFill, Search } from "react-bootstrap-icons";

const hospitalsDummy = [
  {
    id: 1,
    name: "CityCare Multispeciality Hospital",
    location: "Chennai",
    specialties: ["Cardiology", "Pediatrics"],
    accessTier: "Premium",
    rating: 4.7,
    openNow: true,
    emergency: true,
    distanceKm: 3.5,
    liveWaitTime: "15 mins",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    doctors: [
      { name: "Dr. Anika Sharma", specialty: "Cardiologist", available: true },
      { name: "Dr. Ramesh Iyer", specialty: "Pediatrician", available: false },
    ],
    facilities: ["ICU", "Pharmacy", "Imaging", "Emergency", "OT"],
  },
  {
    id: 2,
    name: "Global Heart Institute",
    location: "Hyderabad",
    specialties: ["Cardiology"],
    accessTier: "Basic",
    rating: 4.2,
    openNow: false,
    emergency: false,
    distanceKm: 12.3,
    liveWaitTime: "45 mins",
    coordinates: { lat: 17.3850, lng: 78.4867 },
    doctors: [
      { name: "Dr. Sunita Nair", specialty: "Cardiologist", available: true },
    ],
    facilities: ["Imaging", "Emergency"],
  },
];

export default function HospitalDiscovery() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(hospitalsDummy);
  const [selectedTier, setSelectedTier] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    filterResults();
  }, [search, selectedTier]);

  const filterResults = () => {
    const filtered = hospitalsDummy.filter((h) => {
      const matchSearch =
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.specialties.join(", ").toLowerCase().includes(search.toLowerCase());
      const matchTier = selectedTier === "All" || h.accessTier === selectedTier;
      return matchSearch && matchTier;
    });
    setFiltered(filtered);
  };

  const openModal = (hospital) => {
    setSelectedHospital(hospital);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedHospital(null);
    setBookingStatus(null);
  };

  const bookAppointment = () => {
    setBookingStatus("loading");
    setTimeout(() => {
      setBookingStatus("success");
    }, 1500);
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={8}>
          <h3>🏥 Discover Hospitals</h3>
        </Col>
        <Col md={4}>
          <Form.Select
            onChange={(e) => setSelectedTier(e.target.value)}
            value={selectedTier}
          >
            <option value="All">All Tiers</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
          </Form.Select>
        </Col>
      </Row>

      <InputGroup className="my-3">
        <InputGroup.Text>
          <Search />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search hospital or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Row>
        {filtered.map((hospital) => (
          <Col md={6} lg={4} className="mb-4" key={hospital.id}>
            <Card className="shadow-sm rounded-4">
              <Card.Body>
                <Card.Title>{hospital.name}</Card.Title>
                <div>
                  <Badge bg="info" className="me-2">
                    <GeoAltFill className="me-1" />
                    {hospital.location}
                  </Badge>
                  {hospital.openNow && <Badge bg="success">Open Now</Badge>}
                  {hospital.emergency && (
                    <Badge bg="danger" className="ms-2">24/7 Emergency</Badge>
                  )}
                </div>
                <div className="mt-2">
                  {hospital.specialties.map((sp) => (
                    <Badge key={sp} bg="secondary" className="me-1">
                      {sp}
                    </Badge>
                  ))}
                </div>
                <div className="mt-2">
                  <small>
                    Access: <strong>{hospital.accessTier}</strong>
                  </small>
                  <br />
                  <small>Distance: {hospital.distanceKm} km</small>
                  <br />
                  <small>Wait Time: {hospital.liveWaitTime}</small>
                </div>
                <div className="mt-2">
                  <StarFill className="text-warning me-1" />
                  {hospital.rating}
                </div>
                <Button
                  variant="primary"
                  className="mt-3 w-100"
                  onClick={() => openModal(hospital)}
                >
                  View Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedHospital?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedHospital && (
            <>
              <p><strong>Location:</strong> {selectedHospital.location}</p>
              <p><strong>Specialties:</strong> {selectedHospital.specialties.join(", ")}</p>
              <p><strong>Access Tier:</strong> {selectedHospital.accessTier}</p>
              <p><strong>Rating:</strong> <StarFill className="text-warning me-1" />{selectedHospital.rating}</p>
              <p><strong>Distance:</strong> {selectedHospital.distanceKm} km</p>
              <p><strong>Wait Time:</strong> {selectedHospital.liveWaitTime}</p>
              <p>
                <strong>Status:</strong> {selectedHospital.openNow ? (
                  <Badge bg="success">Open Now</Badge>
                ) : (
                  <Badge bg="secondary">Closed</Badge>
                )} {selectedHospital.emergency && (
                  <Badge bg="danger" className="ms-2">24/7 Emergency</Badge>
                )}
              </p>
              <hr />
              <h5>�펺 Doctors</h5>
              {selectedHospital.doctors.map((doc, i) => (
                <p key={i}>{doc.name} - {doc.specialty} {doc.available ? (
                  <Badge bg="success" className="ms-2">Available</Badge>
                ) : (
                  <Badge bg="warning" className="ms-2">Unavailable</Badge>
                )}</p>
              ))}
              <hr />
              <h5>🏥 Facilities</h5>
              <ul>
                {selectedHospital.facilities.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <hr />
              <iframe
                title="map"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${selectedHospital.coordinates.lat},${selectedHospital.coordinates.lng}`}
              ></iframe>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {bookingStatus === "loading" ? (
            <Button variant="success" disabled>
              <Spinner animation="border" size="sm" className="me-2" /> Booking...
            </Button>
          ) : bookingStatus === "success" ? (
            <Button variant="outline-success" disabled>
              Appointment Booked!
            </Button>
          ) : (
            <Button variant="success" onClick={bookAppointment}>
              Book Appointment
            </Button>
          )}
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
