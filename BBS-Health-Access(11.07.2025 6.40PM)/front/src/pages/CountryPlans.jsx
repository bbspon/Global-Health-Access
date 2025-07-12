import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Button, Form, Spinner, Dropdown, Badge,
} from "react-bootstrap";
import axios from "axios";
import { Globe, CurrencyExchange, GeoAltFill } from "react-bootstrap-icons";

const CountryPlans = () => {
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("Chennai");
  const [plans, setPlans] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const countryOptions = ["India", "UAE"];
  const cityOptions = {
    India: ["Chennai", "Delhi", "Bengaluru"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah"]
  };

  useEffect(() => {
    fetchPlansAndHospitals(country, city);
  }, [country, city]);

  const fetchPlansAndHospitals = async (selectedCountry, selectedCity) => {
    setLoading(true);
    // Simulated data fetching
    setTimeout(() => {
      const samplePlans = [
        { name: "Basic", price: selectedCountry === "UAE" ? "AED 80" : "₹499", features: ["OPD Access", "Lab Discounts"] },
        { name: "Premium", price: selectedCountry === "UAE" ? "AED 199" : "₹1499", features: ["IPD", "Dental", "Ayurveda"] },
      ];
      const sampleHospitals = [
        { name: "Sunrise Hospital", city: selectedCity, tier: "Premium", services: ["OPD", "IPD"] },
        { name: "MediCare", city: selectedCity, tier: "Basic", services: ["OPD", "Labs"] },
      ];
      setPlans(samplePlans);
      setHospitals(sampleHospitals);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container className="my-4">
      <h2><Globe /> BBSCART Health Plans by Region</h2>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Select Country</Form.Label>
          <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
            {countryOptions.map((c) => <option key={c}>{c}</option>)}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Select City</Form.Label>
          <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
            {cityOptions[country].map((ct) => <option key={ct}>{ct}</option>)}
          </Form.Select>
        </Col>
      </Row>

      {loading ? <Spinner animation="border" /> : (
        <>
          <h4 className="mt-4">📦 Available Plans in {city}</h4>
          <Row>
            {plans.map((plan, idx) => (
              <Col md={6} key={idx}>
                <Card className="mb-3 shadow border-info">
                  <Card.Body>
                    <Card.Title>{plan.name} <Badge bg="info">{plan.price}</Badge></Card.Title>
                    <ul>
                      {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                    <Button variant="primary">Buy {plan.name}</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h4 className="mt-4">🏥 Partner Hospitals in {city}</h4>
          <Row>
            {hospitals.map((h, idx) => (
              <Col md={6} key={idx}>
                <Card className="mb-2 border-success">
                  <Card.Body>
                    <Card.Title>{h.name}</Card.Title>
                    <p><GeoAltFill /> {h.city}</p>
                    <p>Supports: {h.services.join(", ")}</p>
                    <Badge bg="success">{h.tier} Tier</Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default CountryPlans;
