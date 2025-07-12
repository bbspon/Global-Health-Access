import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const RazorpayCheckoutScreen = ({ route, navigation }) => {
  const { planId, user } = route.params;
  const [orderURL, setOrderURL] = useState('');

  useEffect(() => {
    axios
      .post('https://yourdomain.com/api/payment/razorpay-order', { planId })
      .then(res => {
        const { id, amount } = res.data.order;
        const html = `
          <html><body>
          <script src="https://checkout.razorpay.com/v1/checkout.js"
          data-key="RAZORPAY_KEY_HERE"
          data-amount="${amount}"
          data-currency="INR"
          data-order_id="${id}"
          data-name="BBSCART Health"
          data-description="Purchase Plan"
          data-prefill.name="${user.name}"
          data-prefill.email="${user.email}"
          ></script></body></html>`;
        setOrderURL(`data:text/html,${encodeURIComponent(html)}`);
      });
  }, []);

  if (!orderURL) return null;
  return <WebView originWhitelist={['*']} source={{ uri: orderURL }} />;
};

export default RazorpayCheckoutScreen;
