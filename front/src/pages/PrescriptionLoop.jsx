import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

const PrescriptionLoop = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { userId } = useParams(); // dynamically comes from route like /prescription-loop/:userId
  console.log(userId, "userId");

  // Dummy user ID (replace with auth in future)
  // const userId = "64eea12345bfc123abc456de";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URI}/prescription-loop/${userId}`
        );
        console.log("✅ API Data:", res.data); // ADD THIS LINE
        setData(res.data);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOrderMedicine = () => {
    setMessage("🛒 Redirecting to medicine ordering page...");
  };

  const handleBookLabTest = () => {
    setMessage("🧪 Redirecting to lab test booking...");
  };

  return (
    <Container className="p-4">
      <h4>💊 Prescription & Follow-up Loop</h4>

      {message && <Alert variant="info">{message}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <Card className="mb-3">
            <Card.Body>
              <h6>📄 Your Prescription</h6>
              {data?.prescriptions?.map((item, index) => (
                <p
                  key={index}
                >{`Tab ${item.medicine} ${item.dosage} - ${item.frequency}`}</p>
              ))}
              <Button variant="success" onClick={handleOrderMedicine}>
                Order Medicine
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h6>🧪 Recommended Tests</h6>
              <ul>
                {data?.recommendedTests?.map((test, index) => (
                  <li key={index}>{test}</li>
                ))}
              </ul>
              <Button variant="warning" onClick={handleBookLabTest}>
                Book Lab Test
              </Button>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default PrescriptionLoop;
