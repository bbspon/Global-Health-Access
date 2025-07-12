import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Button, Table, Form,
  Badge, Modal, Alert, Dropdown
} from "react-bootstrap";

// Simulated API data
const fetchPlans = () => Promise.resolve([
  { insurer: 'Daman', plan: 'Enhanced', price: 120, currency: 'AED', benefits: 'Maternity, chronic', region: 'UAE' },
  { insurer: 'Sukoon', plan: 'HealthPlus', price: 95, currency: 'AED', benefits: 'Wide network', region: 'UAE' },
  { insurer: 'AXA Gulf', plan: 'Prime', price: 140, currency: 'AED', benefits: 'Corporate friendly', region: 'UAE' },
]);

const fetchUserPolicy = () => Promise.resolve({
  insurer: 'Sukoon',
  plan: 'HealthPlus',
  expiry: '2026-02-15',
  sumInsured: 'AED 200,000',
  claimStatus: 'Pending',
  claimAmount: 'AED 8,500',
  claimDate: '2025-07-01',
  pdfFile: 'sukoon-healthplus.pdf',
  autoRenew: true,
  corporate: { name: 'ABC Corp', plan: true },
});

export default function UAEInsuranceIntegration() {
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
    if (!consent) {
      alert(lang === 'en' ? 'Please consent first.' : 'يرجى الموافقة أولاً.');
      return;
    }
    setSelected(plan);
    setModalInfo({ show: true, type: 'buy' });
  };

  return (
    <Container className="mt-4 mb-5">
      <Row className="mb-3">
        <Col><h3>{lang === 'en' ? '🏥 UAE Hospital Cover Add-On' : '🏥 إضافة تغطية المستشفى'}</h3></Col>
        <Col className="text-end">
          <Dropdown onSelect={setLang}>
            <Dropdown.Toggle variant="outline-secondary">
              {lang === 'en' ? 'EN' : 'عربي'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="en">EN</Dropdown.Item>
              <Dropdown.Item eventKey="ar">عربي</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Alert variant="info">
        {lang === 'en'
          ? 'BBSCART Care Pass covers outpatient only. Add regulated insurer for hospitalization.'
          : 'يغطي باقة BBSCART العيادات الخارجية فقط. أضف تأمينًا معتمدًا للمستشفى.'}
      </Alert>

      {policy && (
        <Card className="mb-4">
          <Card.Body>
            <h5>{lang === 'en' ? 'Your Current Policy' : 'بوليصتك الحالية'}</h5>
            <Table bordered>
              <tbody>
                <tr><td>{lang === 'en' ? 'Insurer' : 'شركة التأمين'}</td><td>{policy.insurer}</td></tr>
                <tr><td>{lang === 'en' ? 'Plan' : 'الخطة'}</td><td>{policy.plan}</td></tr>
                <tr><td>{lang === 'en' ? 'Expiry' : 'تاريخ الانتهاء'}</td><td>{policy.expiry}</td></tr>
                <tr><td>{lang === 'en' ? 'Sum Insured' : 'المبلغ المؤمن'}</td><td>{policy.sumInsured}</td></tr>
                <tr>
                  <td>{lang === 'en' ? 'Claim Status' : 'حالة المطالبة'}</td>
                  <td>
                    <Badge bg="warning">{policy.claimStatus}</Badge>
                    {" "}{policy.claimAmount} on {policy.claimDate}
                  </td>
                </tr>
                <tr>
                  <td>{lang === 'en' ? 'Policy Document' : 'وثيقة التأمين'}</td>
                  <td>
                    <a
                      href={`/policies/${policy.pdfFile}`}
                      download
                      target="_blank"
                      rel="noreferrer"
                    >
                      📥 {lang === 'en' ? 'Download' : 'تحميل'}
                    </a>
                  </td>
                </tr>
              </tbody>
            </Table>
            <Form.Check
              type="switch"
              label={lang === 'en' ? 'Auto-Renew' : 'تجديد تلقائي'}
              checked={policy.autoRenew}
              onChange={() => setPolicy(p => ({ ...p, autoRenew: !p.autoRenew }))}
            />
            {policy.corporate.plan && (
              <Badge bg="primary" className="mt-2">
                {lang === 'en' ? 'Covered by Employer' : 'تغطية من جهة العمل'}
              </Badge>
            )}
          </Card.Body>
        </Card>
      )}

      <Card className="mb-4">
        <Card.Body>
          <h5>{lang === 'en' ? 'Compare & Add Insurance' : 'قارن وأضف التأمين'}</h5>
          <Row>
            {plans.map((pl, i) => (
              <Col md={4} key={i} className="mb-3">
                <Card className="p-3 shadow-sm">
                  <h6>{pl.insurer} — {pl.plan}</h6>
                  <p>{pl.benefits}</p>
                  <p><strong>{pl.price} {pl.currency}/mo</strong></p>
                  <Button variant="primary" onClick={() => handleBuy(pl)}>
                    {lang === 'en' ? 'Buy Now' : 'اشتري الآن'}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          <Form.Check
            className="mt-2"
            type="checkbox"
            label={lang === 'en' ? 'I consent to share my data with insurer.' : 'أوافق على مشاركة بياناتي مع شركة التأمين.'}
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
          />
        </Card.Body>
      </Card>

      <Button
        variant="outline-secondary"
        onClick={() => setModalInfo({ show: true, type: 'help' })}
        className="mb-3"
      >
        {lang === 'en' ? '💬 Ask Insurance Coach' : '💬 استشر المرشد'}
      </Button>

      <Modal show={modalInfo.show} onHide={() => setModalInfo({ ...modalInfo, show: false })}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalInfo.type === 'help'
              ? (lang === 'en' ? 'Insurance Coach' : 'مرشد التأمين')
              : (lang === 'en' ? `Buy ${selected?.insurer}` : `شراء ${selected?.insurer}`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalInfo.type === 'help' ? (
            <>
              <p><strong>{lang === 'en' ? 'Q: Why add this?' : 'س: لماذا تضيف هذا؟'}</strong></p>
              <p>{lang === 'en'
                ? 'Because Care Pass excludes hospital care, so you need additional insurance.'
                : 'لأن باقة العناية لا تشمل تكاليف المستشفى، لذا تحتاج إلى تأمين إضافي.'}</p>
              <p><strong>{lang === 'en' ? 'Q: Who handles claims?' : 'س: من يتولى المطالبات؟'}</strong></p>
              <p>{lang === 'en'
                ? 'The insurer is fully responsible for claim processing.'
                : 'شركة التأمين مسؤولة تمامًا عن معالجة المطالبات.'}</p>
            </>
          ) : (
            <>
              <p>
                {lang === 'en'
                  ? `You will be redirected to ${selected?.insurer} for policy purchase.`
                  : `سيتم توجيهك إلى ${selected?.insurer} لشراء البوليصة.`}
              </p>
              <Button variant="success" onClick={() => setModalInfo({ ...modalInfo, show: false })}>
                {lang === 'en' ? 'Proceed' : 'متابعة'}
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
