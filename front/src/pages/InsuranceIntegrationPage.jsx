import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Button, Table, Form,
  Badge, Modal, Alert, Dropdown
} from "react-bootstrap";

const fetchPlans = () => Promise.resolve([
  { insurer: 'Daman', plan: 'Enhanced', price: 120, currency: 'AED', benefits: 'Maternity, chronic diseases', region: 'UAE' },
  { insurer: 'Sukoon', plan: 'HealthPlus', price: 95, currency: 'AED', benefits: 'UAE-wide network', region: 'UAE' },
  { insurer: 'Star Health', plan: 'Family Optima', price: 299, currency: 'INR', benefits: 'India IPD + surgeries', region: 'India' },
]);

const fetchUserPolicy = () => Promise.resolve({
  insurer: 'Sukoon', plan: 'HealthPlus', expiry: '2026-02-15',
  sumInsured: 'AED 200,000', claimStatus: 'Pending', claimAmount: 'AED 8,500', claimDate: '2025-07-01',
  pdfUrl: '/policies/sukoon-healthplus.pdf', autoRenew: true,
  corporate: { name: 'ABC Corp', plan: true },
});

export default function InsuranceIntegrationPage() {
  const [plans, setPlans] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [selected, setSelected] = useState(null);
  const [consent, setConsent] = useState(false);
  const [modalInfo, setModalInfo] = useState({ show: false, type: 'buy' });
  const [lang, setLang] = useState('en');

  useEffect(() => {
    fetchPlans().then(setPlans);
    fetchUserPolicy().then(setPolicy);
  }, []);

  const handleBuy = (plan) => {
    if (!consent) return alert(lang === 'en' ? 'Please consent first.' : 'يرجى الموافقة أولاً.');
    setSelected(plan);
    setModalInfo({ show: true, type: 'buy' });
  };

  const downloadPDF = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "policy-document.pdf";
    a.target = "_blank";
    a.click();
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="mb-3">
        <Col><h3>{lang==='en'?'🏥 Insurance Add-On':'🏥 إضافة التأمين'}</h3></Col>
        <Col className="text-end">
          <Dropdown onSelect={setLang}>
            <Dropdown.Toggle variant="outline-secondary">{lang==='en'?'EN':'عربي'}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="en">EN</Dropdown.Item>
              <Dropdown.Item eventKey="ar">عربي</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Alert variant="info">
        {lang==='en'
          ? 'BBSCART Care Plan covers OPD only. Add a regulated insurance partner for IPD.'
          : 'تغطي خطة BBSCART العيادات فقط. أضف شريك تأمين معتمد للحالات الداخلية.'}
      </Alert>

      {policy && (
        <Card className="mb-4">
          <Card.Body>
            <h5>{lang==='en'?'Your Policy':'بوليصتك'}</h5>
            <Table bordered>
              <tbody>
                <tr><td>{lang==='en'?'Insurer':'شركة التأمين'}</td><td>{policy.insurer}</td></tr>
                <tr><td>{lang==='en'?'Plan':'الخطة'}</td><td>{policy.plan}</td></tr>
                <tr><td>{lang==='en'?'Expiry':'تاريخ الانتهاء'}</td><td>{policy.expiry}</td></tr>
                <tr><td>{lang==='en'?'Sum Insured':'مبلغ التأمين'}</td><td>{policy.sumInsured}</td></tr>
                <tr><td>{lang==='en'?'Claim Status':'حالة المطالبة'}</td>
                  <td><Badge bg="warning">{policy.claimStatus}</Badge> - {policy.claimAmount} on {policy.claimDate}</td></tr>
                <tr><td>{lang==='en'?'Download Policy':'تحميل الوثيقة'}</td>
                  <td><Button size="sm" onClick={() => downloadPDF(policy.pdfUrl)}>📥 {lang==='en'?'Download':'تحميل'}</Button></td></tr>
              </tbody>
            </Table>
            <Form.Check
              type="switch"
              label={lang==='en'?'Auto-Renew':'تجديد تلقائي'}
              checked={policy.autoRenew}
              onChange={() => setPolicy(p => ({ ...p, autoRenew: !p.autoRenew }))}
            />
            {policy.corporate.plan && <Badge bg="primary">{lang==='en'?'Corporate Plan':'خطة شركة'}</Badge>}
          </Card.Body>
        </Card>
      )}

      <Card className="mb-4">
        <Card.Body>
          <h5>{lang==='en'?'Compare & Add Insurance':'قارن وأضف التأمين'}</h5>
          <Row>
            {plans.map((pl, i) => (
              <Col md={4} key={i} className="mb-3">
                <Card className="p-3 shadow-sm">
                  <h6>{pl.insurer} — {pl.plan}</h6>
                  <p>{pl.benefits}</p>
                  <p><strong>{pl.price} {pl.currency}/mo</strong></p>
                  <Button variant="primary" onClick={() => handleBuy(pl)}>
                    {lang==='en'?'Buy Now':'اشتر الآن'}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          <Form.Check
            className="mt-2"
            type="checkbox"
            label={lang==='en'?'I consent to share data with insurer':'أوافق على مشاركة البيانات مع شركة التأمين'}
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
          />
        </Card.Body>
      </Card>

      <Button variant="outline-secondary" onClick={() => setModalInfo({ show: true, type: 'help' })}>
        {lang==='en'?'💬 Ask Insurance Coach':'💬 اسأل المدرب'}
      </Button>

      <Modal show={modalInfo.show} onHide={() => setModalInfo({ ...modalInfo, show: false })}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalInfo.type === 'help'
              ? (lang==='en'?'Insurance Coach':'مرشد التأمين')
              : (lang==='en'?`Buy ${selected?.insurer}`:`شراء ${selected?.insurer}`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalInfo.type === 'help' ? (
            <>
              <p><strong>{lang==='en'?'Why add this?':'لماذا تضيف هذا؟'}</strong></p>
              <p>{lang==='en'
                ? 'Because BBSCART only covers OPD, not hospitalization.'
                : 'لأن BBSCART يغطي العيادات فقط، ليس المستشفى.'}</p>
              <p><strong>{lang==='en'?'Who handles claims?':'من يدير المطالبات؟'}</strong></p>
              <p>{lang==='en'
                ? 'The insurer directly manages the claim.'
                : 'تدير شركة التأمين المطالبة مباشرةً.'}</p>
            </>
          ) : (
            <>
              <p>{lang==='en'
                ? `Redirecting to ${selected?.insurer}...`
                : `سيتم التحويل إلى ${selected?.insurer}...`}</p>
              <Button variant="success" onClick={() => setModalInfo({ show: false })}>
                {lang==='en'?'Proceed':'متابعة'}
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
