import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Badge,
  Modal,
  Alert,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

export default function InsuranceIntegrationPage() {
  const [plans, setPlans] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [selected, setSelected] = useState(null);
  const [consent, setConsent] = useState(false);
  const [modalInfo, setModalInfo] = useState({ show: false, type: "buy" });
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/insurance/plans");
      setPlans(res.data || []);
    } catch (err) {
      setError("❌ Failed to fetch insurance plans.");
    }
  };

  const fetchUserPolicy = async () => {
    try {
       const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
       const token = bbsUserData?.token;
      const res = await axios.get(
        "http://localhost:5000/api/insurance/user-policy",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
setPolicy(res.data.policy);
    } catch (err) {
      setError("❌ Failed to fetch your insurance policy.");
    }
  };

  const toggleAutoRenew = async () => {
    try {
      setToggleLoading(true);
       const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
       const token = bbsUserData?.token;
      const res = await axios.put(
        "http://localhost:5000/api/insurance/user-policy/auto-renew",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPolicy(res.data);
    } catch (err) {
      setError("❌ Failed to toggle auto-renewal.");
    } finally {
      setToggleLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchPlans(), fetchUserPolicy()]).finally(() =>
      setLoading(false)
    );
  }, []);

  const handleBuy = (plan) => {
    if (!consent)
      return alert(
        lang === "en" ? "Please consent first." : "يرجى الموافقة أولاً."
      );
    setSelected(plan);
    setModalInfo({ show: true, type: "buy" });
  };

  const downloadPDF = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "policy-document.pdf";
    a.target = "_blank";
    a.click();
  };

  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4 mb-5">
      <Row className="mb-3">
        <Col>
          <h3>{lang === "en" ? "🏥 Insurance Add-On" : "🏥 إضافة التأمين"}</h3>
        </Col>
        <Col className="text-end">
          <Dropdown onSelect={setLang}>
            <Dropdown.Toggle variant="outline-secondary">
              {lang === "en" ? "EN" : "عربي"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="en">EN</Dropdown.Item>
              <Dropdown.Item eventKey="ar">عربي</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Alert variant="info">
        {lang === "en"
          ? "BBSCART Care Plan covers OPD only. Add a regulated insurance partner for IPD."
          : "تغطي خطة BBSCART العيادات فقط. أضف شريك تأمين معتمد للحالات الداخلية."}
      </Alert>

      {policy ? (
        <Card className="mb-4">
          <Card.Body>
            <h5>{lang === "en" ? "Your Policy" : "بوليصتك"}</h5>
            <Table bordered>
              <tbody>
                <tr>
                  <td>{lang === "en" ? "Policy ID" : "رقم البوليصة"}</td>
                  <td>{policy._id}</td>
                </tr>
                <tr>
                  <td>{lang === "en" ? "Plan" : "الخطة"}</td>
                  <td>{policy.planName}</td>
                </tr>
                <tr>
                  <td>{lang === "en" ? "Status" : "الحالة"}</td>
                  <td>{policy.status}</td>
                </tr>
                <tr>
                  <td>{lang === "en" ? "Download Policy" : "تحميل الوثيقة"}</td>
                  <td>
                    <Button
                      size="sm"
                      onClick={() => downloadPDF(policy.pdfUrl)}
                    >
                      📥 {lang === "en" ? "Download" : "تحميل"}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Form.Check
              type="switch"
              label={lang === "en" ? "Auto-Renew" : "تجديد تلقائي"}
              checked={policy.isAutoRenewal}
              onChange={toggleAutoRenew}
              disabled={toggleLoading}
            />
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning">
          {lang === "en"
            ? "You don’t have a policy yet."
            : "ليس لديك بوليصة حتى الآن."}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <h5>
            {lang === "en" ? "Compare & Add Insurance" : "قارن وأضف التأمين"}
          </h5>
          <Row>
            {Array.isArray(plans) &&
              plans.map((pl, i) => (
                <Col md={4} key={i} className="mb-3">
                  <Card className="p-3 shadow-sm">
                    <h6>{pl.name}</h6>
                    <p>{pl.coverage}</p>
                    <p>
                      <strong>₹{pl.premium}/mo</strong>
                    </p>
                    <p>{pl.benefits?.join(", ")}</p>
                    <Button variant="primary" onClick={() => handleBuy(pl)}>
                      {lang === "en" ? "Buy Now" : "اشتر الآن"}
                    </Button>
                  </Card>
                </Col>
              ))}
          </Row>
          <Form.Check
            className="mt-2"
            type="checkbox"
            label={
              lang === "en"
                ? "I consent to share data with insurer"
                : "أوافق على مشاركة البيانات"
            }
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
        </Card.Body>
      </Card>

      <Button
        variant="outline-secondary"
        onClick={() => setModalInfo({ show: true, type: "help" })}
      >
        {lang === "en" ? "💬 Ask Insurance Coach" : "💬 اسأل المدرب"}
      </Button>

      <Modal
        show={modalInfo.show}
        onHide={() => setModalInfo({ ...modalInfo, show: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalInfo.type === "help"
              ? lang === "en"
                ? "Insurance Coach"
                : "مرشد التأمين"
              : lang === "en"
              ? `Buy ${selected?.insurer}`
              : `شراء ${selected?.insurer}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalInfo.type === "help" ? (
            <>
              <p>
                <strong>
                  {lang === "en" ? "Why add this?" : "لماذا تضيف هذا؟"}
                </strong>
              </p>
              <p>
                {lang === "en"
                  ? "Because BBSCART only covers OPD, not hospitalization."
                  : "لأن BBSCART يغطي العيادات فقط، ليس المستشفى."}
              </p>
              <p>
                <strong>
                  {lang === "en" ? "Who handles claims?" : "من يدير المطالبات؟"}
                </strong>
              </p>
              <p>
                {lang === "en"
                  ? "The insurer directly manages the claim."
                  : "تدير شركة التأمين المطالبة مباشرةً."}
              </p>
            </>
          ) : (
            <>
              <p>
                {lang === "en"
                  ? `Redirecting to ${selected?.insurer}...`
                  : `سيتم التحويل إلى ${selected?.insurer}...`}
              </p>
              <Button
                variant="success"
                onClick={() => setModalInfo({ show: false })}
              >
                {lang === "en" ? "Proceed" : "متابعة"}
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
