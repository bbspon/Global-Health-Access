import React, { useEffect, useState } from "react";
import axios from "axios";

const QRCodeDisplay = () => {
  const [qrUrl, setQrUrl] = useState(null);
  const [planInfo, setPlanInfo] = useState(null);

  useEffect(() => {
   const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
   const token = bbsUserData?.token;
   console.log(token, "token");
    axios
      .get(`${import.meta.env.VITE_API_URI}/user/qr`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setQrUrl(res.data.qr);
        setPlanInfo(res.data.info);
      })
      .catch((err) => {
        console.error("Failed to fetch QR code", err);
      });
  }, []);

  if (!qrUrl) return <p>Loading your health card...</p>;

  return (
    <div className="text-center">
      <h5>Your Digital Health Access Card</h5>
      <img src={qrUrl} alt="Health QR" style={{ width: "200px" }} />
      <p>
        <strong>Plan:</strong> {planInfo.planName}
      </p>
      <p>
        <strong>Valid Until:</strong>{" "}
        {new Date(planInfo.endDate).toDateString()}
      </p>
      <p>
        <strong>Txn ID:</strong> {planInfo.transactionId}
      </p>
    </div>
  );
};

export default QRCodeDisplay;
