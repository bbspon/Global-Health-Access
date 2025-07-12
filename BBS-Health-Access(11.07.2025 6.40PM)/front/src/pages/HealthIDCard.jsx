import React, { useEffect, useState } from "react";
import axios from "axios";

const HealthIDCard = () => {
  const [qr, setQr] = useState(null);

  useEffect(() => {
    axios.get("/api/qr/my-health-id").then((res) => setQr(res.data));
  }, []);

  if (!qr) return <div>Loading QR Code...</div>;

  return (
    <div className="container text-center py-5">
      <h4>Digital Health ID</h4>
      <img src={qr.imageUrl} alt="Health ID QR" className="my-3" />
      <p>Scan to view your health profile</p>
      <a
        href={qr.qrString}
        className="btn btn-outline-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Profile
      </a>
    </div>
  );
};

export default HealthIDCard;
