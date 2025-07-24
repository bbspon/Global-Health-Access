import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Card,
  Button,
  Form,
  Row,
  Col,
  Modal,
  ProgressBar,
  Image,
} from "react-bootstrap";
import axios from "axios";
// Mock APIs
const fetchCategories = () =>
  Promise.resolve([
    "Cleanliness",
    "Wait time",
    "Doctor care",
    "Billing",
    "Other",
  ]);
const fetchPartnerStats = () =>
  Promise.resolve({
    overallRating: 4.2,
    ratingCount: 128,
    breakdown: { Cleanliness: 4.0, "Doctor care": 4.5, Billing: 3.9 },
  });
const fetchReviews = () =>
  Promise.resolve([
    {
      id: "r1",
      user: "Verified User",
      time: "2025‑07‑10",
      emoji: "😊",
      comment: "Good service",
      image: null,
      partnerReply: "Thank you for your feedback.",
    },
    {
      id: "r2",
      user: "Verified User",
      time: "2025‑06‑20",
      emoji: "😠",
      comment: "Overbilling in OPD",
      image: null,
      partnerReply: null,
    },
  ]);

export default function UserFeedbackRatingsSystem({ partnerId }) {
  const [step, setStep] = useState("prompt"); // prompt, partnerProfile, adminDashboard
  const [categories, setCategories] = useState([]);
  const [prompt, setPrompt] = useState({
    emoji: "",
    rating: 0,
    category: "",
    comment: "",
    image: null,
    anonymous: false,
  });
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [adminStats, setAdminStats] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchPartnerStats().then(setStats);
    fetchReviews().then(setReviews);
    setAdminStats({
      total: 150,
      flagged: 12,
      avgRating: 4.2,
      lowPartners: ["Hospital A", "Lab X"],
    });
  }, []);

const handleSubmitPrompt = async () => {
  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;

  const formData = new FormData();

  // Backend expects "type" instead of "emoji"
  formData.append("type", prompt.emoji);

  // Backend expects "rating" — keep as-is
  formData.append(
    "rating",
    prompt.emoji === "😃" ? 5 : prompt.emoji === "😐" ? 3 : 1
  );

  // Backend expects "message" instead of "comment"
  formData.append("message", prompt.comment);

  // Optional fields — backend does not use these unless you update it
  formData.append("category", prompt.category);
  formData.append("anonymous", prompt.anonymous);
  formData.append("partnerId", partnerId); // only if backend supports it

  // Attach image if present
  if (prompt.image) {
    formData.append("image", prompt.image);
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/feedback/submit",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("Feedback submitted. Thank you!");
    setStep("partnerProfile");
  } catch (error) {
    console.error("Feedback submit failed", error);
    alert("Error submitting feedback.");
  }
};

  const handleReply = (id) => alert(`Replying to review ${id}`);

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>BBSCART Feedback & Ratings</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => setStep("prompt")}>
              Leave Feedback
            </Nav.Link>
            <Nav.Link onClick={() => setStep("partnerProfile")}>
              View Partner Profile
            </Nav.Link>
            <Nav.Link onClick={() => setStep("adminDashboard")}>
              Admin Dashboard
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {step === "prompt" && (
          <Card>
            <Card.Body>
              <Card.Title>Post-Visit Feedback</Card.Title>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Emoji Rating</Form.Label>
                  <div>
                    {["😃", "😐", "😠"].map((e) => (
                      <Button
                        key={e}
                        variant={
                          prompt.emoji === e ? "primary" : "outline-secondary"
                        }
                        className="me-2"
                        onClick={() => setPrompt({ ...prompt, emoji: e })}
                      >
                        {e}
                      </Button>
                    ))}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={prompt.category}
                    onChange={(e) =>
                      setPrompt({ ...prompt, category: e.target.value })
                    }
                  >
                    <option value="">Select...</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comment (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={prompt.comment}
                    onChange={(e) =>
                      setPrompt({ ...prompt, comment: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image (optional)</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) =>
                      setPrompt({ ...prompt, image: e.target.files[0] })
                    }
                  />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Submit Anonymously"
                  className="mb-3"
                  checked={prompt.anonymous}
                  onChange={(e) =>
                    setPrompt({ ...prompt, anonymous: e.target.checked })
                  }
                />
                <Button variant="primary" onClick={handleSubmitPrompt}>
                  Submit Feedback
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
        {step === "partnerProfile" && stats && (
          <Card>
            <Card.Body>
              <Card.Title>Partner Public Profile</Card.Title>
              <h5>
                Overall Rating: {stats.overallRating} / 5 ({stats.ratingCount}{" "}
                reviews)
              </h5>
              <ul>
                {Object.entries(stats.breakdown).map(([k, v]) => (
                  <li key={k}>
                    {k}: {v.toFixed(1)}
                  </li>
                ))}
              </ul>
              <hr />
              <h6>Verified Reviews:</h6>
              {reviews.map((r) => (
                <Card key={r.id} className="mb-2">
                  <Card.Body>
                    <div>
                      <strong>{r.emoji}</strong> – {r.user}, {r.time}
                    </div>
                    <p>{r.comment}</p>
                    {r.image && (
                      <Image src={URL.createObjectURL(r.image)} fluid />
                    )}
                    {r.partnerReply && (
                      <Card.Footer>
                        <em>Partner replied:</em> {r.partnerReply}
                      </Card.Footer>
                    )}
                    {!r.partnerReply && (
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => handleReply(r.id)}
                      >
                        Reply
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        )}
        {step === "adminDashboard" && adminStats && (
          <Card>
            <Card.Body>
              <Card.Title>Admin Feedback Dashboard</Card.Title>
              <p>Total reviews: {adminStats.total}</p>
              <p>Flagged reviews: {adminStats.flagged}</p>
              <p>Avg partner rating: {adminStats.avgRating}</p>
              <ProgressBar
                now={(100 * adminStats.flagged) / adminStats.total}
                label={`${Math.round(
                  (100 * adminStats.flagged) / adminStats.total
                )}% flagged`}
                className="mb-3"
              />
              <h6>Low-rated partners:</h6>
              <ul>
                {adminStats.lowPartners.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => alert("Exporting feedback logs")}
              >
                Export CSV/PDF
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}

// import React, { useState, useEffect } from 'react';
// import {
//   Container, Row, Col, Card, Form, Button, Badge, ProgressBar
// } from 'react-bootstrap';

// const mockFeedback = [
//   {
//     id: 'f1',
//     user: 'Ravi Kumar',
//     role: 'Patient',
//     rating: 5,
//     comment: 'Excellent doctor care and short wait time!',
//     category: 'Doctor',
//     date: '2025-07-05'
//   },
//   {
//     id: 'f2',
//     user: 'Aisha Fatima',
//     role: 'Patient',
//     rating: 3,
//     comment: 'Clean hospital but billing was confusing.',
//     category: 'Hospital',
//     date: '2025-07-07'
//   },
//   {
//     id: 'f3',
//     user: 'Mohammed Ali',
//     role: 'Patient',
//     rating: 1,
//     comment: 'Report was inaccurate. Please review this lab.',
//     category: 'Lab',
//     date: '2025-07-03'
//   },
//   {
//     id: 'f4',
//     user: 'Sneha Jain',
//     role: 'Patient',
//     rating: 4,
//     comment: 'Pharmacy was helpful but queue was long.',
//     category: 'Pharmacy',
//     date: '2025-07-02'
//   }
// ];

// export default function UserFeedbackRatingsSystem() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [filterCategory, setFilterCategory] = useState('all');

//   useEffect(() => {
//     setFeedbacks(mockFeedback);
//   }, []);

//   const handleExport = () => {
//     alert('Exporting feedback data to CSV...');
//   };

//   const filteredFeedbacks = feedbacks.filter((f) =>
//     (filterCategory === 'all' || f.category === filterCategory) &&
//     f.comment.toLowerCase().includes(searchKeyword.toLowerCase())
//   );

//   const averageRating = (
//     feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length
//   ).toFixed(1);

//   return (
//     <Container className="mt-4">
//       <Card>
//         <Card.Body>
//           <Card.Title>🌐 BBSCART Partner Feedback & Ratings</Card.Title>
//           <p className="text-muted">
//             Real-time ratings from verified users. Transparent, auditable, and built for trust.
//           </p>

//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Control
//                 type="text"
//                 placeholder="Search feedback (e.g., 'billing')"
//                 value={searchKeyword}
//                 onChange={(e) => setSearchKeyword(e.target.value)}
//               />
//             </Col>
//             <Col md={4}>
//               <Form.Select
//                 value={filterCategory}
//                 onChange={(e) => setFilterCategory(e.target.value)}
//               >
//                 <option value="all">All Categories</option>
//                 <option value="Doctor">Doctor</option>
//                 <option value="Hospital">Hospital</option>
//                 <option value="Lab">Lab</option>
//                 <option value="Pharmacy">Pharmacy</option>
//               </Form.Select>
//             </Col>
//             <Col md={4} className="text-end">
//               <Button variant="outline-success" onClick={handleExport}>
//                 📤 Export Feedback
//               </Button>
//             </Col>
//           </Row>

//           <h6 className="mb-3">
//             ⭐ Average Rating: <strong>{averageRating}</strong>{' '}
//             {averageRating >= 4.5 && <Badge bg="success">Top Rated Partner</Badge>}
//           </h6>

//           <ProgressBar className="mb-4">
//             <ProgressBar variant="success" now={60} key={1} label="😊 60%" />
//             <ProgressBar variant="warning" now={30} key={2} label="😐 30%" />
//             <ProgressBar variant="danger" now={10} key={3} label="😠 10%" />
//           </ProgressBar>

//           {filteredFeedbacks.map((f) => (
//             <Card key={f.id} className="mb-3">
//               <Card.Body>
//                 <Card.Title>
//                   <strong>{f.user}</strong> — <Badge bg="info">{f.category}</Badge>
//                   <span className="ms-2">⭐ {f.rating}</span>
//                 </Card.Title>
//                 <Card.Text>{f.comment}</Card.Text>
//                 <div className="text-muted small">🕒 {f.date}</div>
//               </Card.Body>
//             </Card>
//           ))}

//           {/* Insights & Summary */}
//           <Card className="mt-4">
//             <Card.Body>
//               <Card.Title>📊 System Insights</Card.Title>
//               <ul>
//                 <li><strong>Most Common Complaint:</strong> Billing delays</li>
//                 <li><strong>Positive Feedback %:</strong> 75%</li>
//                 <li><strong>Negative Escalation Rate:</strong> 12%</li>
//                 <li><strong>Auto-Suspension Triggered:</strong> 0 partners (this month)</li>
//               </ul>
//               <p className="text-muted">Powered by BBSCART Sentiment AI</p>
//             </Card.Body>
//           </Card>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }
