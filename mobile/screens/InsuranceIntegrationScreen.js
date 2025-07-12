import React, { useState, useEffect } from 'react';
import {
  ScrollView, View, Linking, Alert, StyleSheet
} from 'react-native';
import {
  Text, Button, Card, Checkbox, Dialog, Portal, Paragraph, Switch,
  DataTable, Title, Badge, IconButton, Menu
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

const fetchPlans = () => Promise.resolve([
  { insurer: 'Daman', plan: 'Enhanced', price: 120, currency: 'AED', benefits: 'Maternity, chronic diseases', region: 'UAE' },
  { insurer: 'Sukoon', plan: 'HealthPlus', price: 95, currency: 'AED', benefits: 'UAE-wide network', region: 'UAE' },
  { insurer: 'Star Health', plan: 'Family Optima', price: 299, currency: 'INR', benefits: 'India IPD + surgeries', region: 'India' },
]);

const fetchUserPolicy = () => Promise.resolve({
  insurer: 'Sukoon', plan: 'HealthPlus', expiry: '2026-02-15',
  sumInsured: 'AED 200,000', claimStatus: 'Pending', claimAmount: 'AED 8,500', claimDate: '2025-07-01',
  pdfUrl: 'https://example.com/policies/sukoon-healthplus.pdf',
  autoRenew: true,
  corporate: { name: 'ABC Corp', plan: true },
});

export default function InsuranceIntegrationScreen() {
  const [plans, setPlans] = useState([]);
  const [policy, setPolicy] = useState(null);
  const [consent, setConsent] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [lang, setLang] = useState('en');
  const [visible, setVisible] = useState(false);
  const [dialogType, setDialogType] = useState('help');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    fetchPlans().then(setPlans);
    fetchUserPolicy().then(setPolicy);
  }, []);

  const handleBuy = (plan) => {
    if (!consent) {
      Alert.alert(lang === 'en' ? 'Consent required' : 'موافقة مطلوبة');
      return;
    }
    setSelectedPlan(plan);
    setDialogType('buy');
    setVisible(true);
  };

  const handleDownload = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={styles.headerRow}>
        <Title>{lang === 'en' ? '🏥 Add Hospital Cover' : '🏥 إضافة تغطية المستشفى'}</Title>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<IconButton icon="translate" onPress={() => setMenuVisible(true)} />}
        >
          <Menu.Item onPress={() => setLang('en')} title="English" />
          <Menu.Item onPress={() => setLang('ar')} title="العربية" />
        </Menu>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Paragraph style={{ color: '#0275d8' }}>
            {lang === 'en'
              ? 'BBSCART Care Plan covers OPD only. Add a regulated insurance partner for IPD.'
              : 'تغطي خطة BBSCART العيادات فقط. أضف شريك تأمين معتمد للحالات الداخلية.'}
          </Paragraph>
        </Card.Content>
      </Card>

      {policy && (
        <Card style={styles.card}>
          <Card.Title title={lang === 'en' ? 'Your Policy' : 'بوليصتك'} />
          <Card.Content>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>{lang === 'en' ? 'Insurer' : 'شركة التأمين'}</DataTable.Cell>
                <DataTable.Cell>{policy.insurer}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{lang === 'en' ? 'Plan' : 'الخطة'}</DataTable.Cell>
                <DataTable.Cell>{policy.plan}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{lang === 'en' ? 'Expiry' : 'تاريخ الانتهاء'}</DataTable.Cell>
                <DataTable.Cell>{policy.expiry}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{lang === 'en' ? 'Sum Insured' : 'مبلغ التأمين'}</DataTable.Cell>
                <DataTable.Cell>{policy.sumInsured}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>{lang === 'en' ? 'Claim Status' : 'المطالبة'}</DataTable.Cell>
                <DataTable.Cell>
                  <Badge>{policy.claimStatus}</Badge> – {policy.claimAmount}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            <Button
              icon="download"
              onPress={() => handleDownload(policy.pdfUrl)}
              mode="outlined"
              style={{ marginTop: 8 }}
            >
              {lang === 'en' ? 'Download Policy' : 'تحميل الوثيقة'}
            </Button>
            <View style={styles.switchRow}>
              <Text>{lang === 'en' ? 'Auto-Renew' : 'تجديد تلقائي'}</Text>
              <Switch
                value={policy.autoRenew}
                onValueChange={() =>
                  setPolicy(p => ({ ...p, autoRenew: !p.autoRenew }))
                }
              />
            </View>
            {policy.corporate.plan && <Badge>{lang === 'en' ? 'Corporate Plan' : 'خطة شركة'}</Badge>}
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Title title={lang === 'en' ? 'Compare & Buy Insurance' : 'قارن واشتر التأمين'} />
        <Card.Content>
          {plans.map((plan, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <Card.Content>
                <Title>{plan.insurer} — {plan.plan}</Title>
                <Paragraph>{plan.benefits}</Paragraph>
                <Paragraph><Text style={{ fontWeight: 'bold' }}>{plan.price} {plan.currency}/mo</Text></Paragraph>
                <Button mode="contained" onPress={() => handleBuy(plan)}>
                  {lang === 'en' ? 'Buy Now' : 'اشتر الآن'}
                </Button>
              </Card.Content>
            </Card>
          ))}
          <Checkbox.Item
            label={lang === 'en' ? 'I consent to share data with insurer' : 'أوافق على مشاركة البيانات'}
            status={consent ? 'checked' : 'unchecked'}
            onPress={() => setConsent(!consent)}
          />
        </Card.Content>
      </Card>

      <Button mode="outlined" icon="chat-question" onPress={() => { setDialogType('help'); setVisible(true); }}>
        {lang === 'en' ? '💬 Ask Insurance Coach' : '💬 اسأل المدرب'}
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>
            {dialogType === 'help'
              ? (lang === 'en' ? 'Insurance Coach' : 'مرشد التأمين')
              : (lang === 'en' ? `Buy ${selectedPlan?.insurer}` : `شراء ${selectedPlan?.insurer}`)}
          </Dialog.Title>
          <Dialog.Content>
            {dialogType === 'help' ? (
              <>
                <Paragraph>{lang === 'en' ? 'Why add insurance?' : 'لماذا تضيف التأمين؟'}</Paragraph>
                <Paragraph>{lang === 'en'
                  ? 'BBSCART Care Plan only covers outpatient care. Insurance covers surgeries and IPD.'
                  : 'خطة BBSCART تغطي العيادات فقط. التأمين يغطي المستشفى والجراحات.'}</Paragraph>
              </>
            ) : (
              <Paragraph>{lang === 'en'
                ? `Redirecting to ${selectedPlan?.insurer} for secure purchase.`
                : `جارٍ التحويل إلى ${selectedPlan?.insurer} للشراء.`}</Paragraph>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>{lang === 'en' ? 'Close' : 'إغلاق'}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});
