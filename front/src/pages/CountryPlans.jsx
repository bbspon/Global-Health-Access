import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { Globe, GeoAltFill } from "react-bootstrap-icons";

const CountryPlans = () => {
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("Chennai");
  const [plans, setPlans] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const countryOptions = ["India", "UAE"];
  const cityOptions = {
    India: ["Chennai", "Delhi", "Bengaluru"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah"],
  };

  useEffect(() => {
    fetchPlansAndHospitals(country, city);
  }, [country, city]);

const fetchPlansAndHospitals = async (selectedCountry, selectedCity) => {
  setLoading(true);
  try {
    const planRes = await axios.get(
      `${import.meta.env.VITE_API_URI}/region/plans?country=${selectedCountry}&city=${selectedCity}`
    );
    const hospRes = await axios.get(
      `${import.meta.env.VITE_API_URI}/region/hospitals?country=${selectedCountry}&city=${selectedCity}`
    );

    console.log("✅ Plans API:", planRes.data);
    console.log("✅ Hospitals API:", hospRes.data);

    // If the API wraps data like { success: true, plans: [...] }
    const plansArray = Array.isArray(planRes.data)
      ? planRes.data
      : planRes.data.plans || [];

    const hospitalsArray = Array.isArray(hospRes.data)
      ? hospRes.data
      : hospRes.data.hospitals || [];

    setPlans(plansArray);
    setHospitals(hospitalsArray);
  } catch (err) {
    console.error("Error loading region data", err);
    setPlans([]);
    setHospitals([]);
  } finally {
    setLoading(false);
  }
};


  return (
    <Container className="my-4">
      <h2>
        <Globe /> BBSCART Health Plans by Region
      </h2>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Label>Select Country</Form.Label>
          <Form.Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countryOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label>Select City</Form.Label>
          <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
            {cityOptions[country].map((ct) => (
              <option key={ct}>{ct}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <h4 className="mt-4">📦 Available Plans in {city}</h4>
          <Row>
            {plans.map((plan, idx) => (
              <Col md={6} key={idx}>
                <Card className="mb-3 shadow border-info">
                  <Card.Body>
                    <Card.Title>
                      {plan.name}{" "}
                      <Badge bg="info">
                        {country === "India" ? plan.priceINR : plan.priceAED}
                      </Badge>
                    </Card.Title>
                    <ul>
                      {plan.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
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
                    <p>
                      <GeoAltFill /> {h.city}
                    </p>
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
