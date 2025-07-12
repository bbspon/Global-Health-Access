import React, { useState, useEffect } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import {
  Card, Button, Paragraph, Title, Text, Switch,
  Divider, Checkbox, Modal, Portal, Provider as PaperProvider
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

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

export default function UAEInsuranceIntegrationScreen() {
  const [plans, setPlans] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [consent, setConsent] = useState(false);
  const [lang, setLang] = useState('en');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('help');
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchPlans().then(setPlans);
    fetchUserPolicy().then(setPolicy);
  }, []);

  const handleBuy = (plan) => {
    if (!consent) {
      alert(lang === 'en' ? 'Please consent first.' : 'يرجى الموافقة أولاً.');
      return;
    }
    setSelectedPlan(plan);
    setModalType('buy');
    setModalVisible(true);
  };

  const openPDF = () => {
    if (policy?.pdfFile) {
      WebBrowser.openBrowserAsync(`https://your-domain.com/policies/${policy.pdfFile}`);
    }
  };

  return (
    <PaperProvider>
      <ScrollView style={{ padding: 16 }}>
        <Title>{lang === 'en' ? '🏥 UAE Hospital Cover Add-On' : '🏥 إضافة تغطية المستشفى'}</Title>
        <Paragraph style={{ marginVertical: 10, backgroundColor: '#e6f0ff', padding: 10 }}>
          {lang === 'en'
            ? 'BBSCART Care Pass covers outpatient only. Add regulated insurer for hospitalization.'
            : 'يغطي باقة BBSCART العيادات الخارجية فقط. أضف تأمينًا معتمدًا للمستشفى.'}
        </Paragraph>

        {policy && (
          <Card style={{ marginVertical: 10 }}>
            <Card.Title title={lang === 'en' ? 'Your Current Policy' : 'بوليصتك الحالية'} />
            <Card.Content>
              <Paragraph>{lang === 'en' ? 'Insurer' : 'شركة التأمين'}: {policy.insurer}</Paragraph>
              <Paragraph>{lang === 'en' ? 'Plan' : 'الخطة'}: {policy.plan}</Paragraph>
              <Paragraph>{lang === 'en' ? 'Expiry' : 'تاريخ الانتهاء'}: {policy.expiry}</Paragraph>
              <Paragraph>{lang === 'en' ? 'Sum Insured' : 'المبلغ المؤمن'}: {policy.sumInsured}</Paragraph>
              <Paragraph>
                {lang === 'en' ? 'Claim Status' : 'حالة المطالبة'}: {policy.claimStatus} | {policy.claimAmount} on {policy.claimDate}
              </Paragraph>
              <Button onPress={openPDF} icon="download">
                {lang === 'en' ? 'Download Policy PDF' : 'تحميل البوليصة'}
              </Button>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text>{lang === 'en' ? 'Auto-Renew' : 'تجديد تلقائي'}</Text>
                <Switch value={policy.autoRenew} onValueChange={() => setPolicy(p => ({ ...p, autoRenew: !p.autoRenew }))} />
              </View>
              {policy.corporate?.plan && (
                <Paragraph style={{ marginTop: 8, color: 'green' }}>
                  ✅ {lang === 'en' ? 'Covered by Employer' : 'مغطى من جهة العمل'}
                </Paragraph>
              )}
            </Card.Content>
          </Card>
        )}

        <Card style={{ marginVertical: 10 }}>
          <Card.Title title={lang === 'en' ? 'Compare & Add Insurance' : 'قارن وأضف التأمين'} />
          <Card.Content>
            {plans.map((plan, i) => (
              <Card key={i} style={{ marginBottom: 10, backgroundColor: '#f9f9f9' }}>
                <Card.Content>
                  <Text style={{ fontWeight: 'bold' }}>{plan.insurer} — {plan.plan}</Text>
                  <Text>{plan.benefits}</Text>
                  <Text>{plan.price} {plan.currency}/mo</Text>
                  <Button mode="contained" onPress={() => handleBuy(plan)} style={{ marginTop: 5 }}>
                    {lang === 'en' ? 'Buy Now' : 'اشتري الآن'}
                  </Button>
                </Card.Content>
              </Card>
            ))}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                status={consent ? 'checked' : 'unchecked'}
                onPress={() => setConsent(!consent)}
              />
              <Text>{lang === 'en' ? 'I consent to share my data with insurer.' : 'أوافق على مشاركة بياناتي مع شركة التأمين.'}</Text>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="outlined"
          icon="chat-question"
          onPress={() => { setModalType('help'); setModalVisible(true); }}
        >
          {lang === 'en' ? '💬 Ask Insurance Coach' : '💬 استشر المرشد'}
        </Button>

        {/* Modal for Help or Buy */}
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 }}>
            {modalType === 'help' ? (
              <>
                <Title>{lang === 'en' ? 'Insurance Coach' : 'مرشد التأمين'}</Title>
                <Paragraph>
                  <Text style={{ fontWeight: 'bold' }}>{lang === 'en' ? 'Q: Why add this?' : 'س: لماذا تضيف هذا؟'}</Text>
                  {"\n"}
                  {lang === 'en'
                    ? 'Because Care Pass excludes hospital care, so you need additional insurance.'
                    : 'لأن باقة العناية لا تشمل تكاليف المستشفى، لذا تحتاج إلى تأمين إضافي.'}
                </Paragraph>
                <Paragraph>
                  <Text style={{ fontWeight: 'bold' }}>{lang === 'en' ? 'Q: Who handles claims?' : 'س: من يتولى المطالبات؟'}</Text>
                  {"\n"}
                  {lang === 'en'
                    ? 'The insurer is fully responsible for claim processing.'
                    : 'شركة التأمين مسؤولة تمامًا عن معالجة المطالبات.'}
                </Paragraph>
              </>
            ) : (
              <>
                <Title>{lang === 'en' ? `Buy from ${selectedPlan?.insurer}` : `شراء من ${selectedPlan?.insurer}`}</Title>
                <Paragraph>
                  {lang === 'en'
                    ? `You will be redirected to ${selectedPlan?.insurer} to complete your policy purchase.`
                    : `سيتم توجيهك إلى ${selectedPlan?.insurer} لإكمال عملية الشراء.`}
                </Paragraph>
                <Button mode="contained" onPress={() => setModalVisible(false)}>
                  {lang === 'en' ? 'Proceed' : 'متابعة'}
                </Button>
              </>
            )}
          </Modal>
        </Portal>
      </ScrollView>
    </PaperProvider>
  );
}
