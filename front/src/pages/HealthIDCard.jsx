import React, { useEffect, useState } from "react";
import axios from "axios";

const HealthIDCard = () => {
  const [qr, setQr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQR = async () => {
    try {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;
      const res = await axios.get("http://localhost:5000/api/qr/my-health-id", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQr(res.data);
    } catch (err) {
      setError("Unable to fetch Health ID. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const regenerateQR = async () => {
    try {
      const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
      const token = bbsUserData?.token;
      await axios.post(
        "http://localhost:5000/api/qr/generate",
        { planType: qr?.planType || "Basic" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchQR();
    } catch (err) {
      alert("Failed to regenerate QR");
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  if (loading)
    return <div className="text-center mt-5">Loading QR Code...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container text-center py-5">
      <h4>Digital Health ID</h4>
      <img src={qr.imageUrl} alt="Health ID QR" className="my-3" width={180} />
      <p>Scan to view your health profile</p>
      <p>
        <strong>Plan:</strong> {qr.planType}
      </p>
      <a
        href={qr.qrString}
        className="btn btn-outline-primary me-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Profile
      </a>
      <button className="btn btn-outline-secondary" onClick={regenerateQR}>
        Regenerate QR
      </button>
    </div>
  );
};

export default HealthIDCard;
