import React, { useEffect, useState } from "react";
import axios from "axios";

const QRCodeDisplay = () => {
  const [qrUrl, setQrUrl] = useState(null);
  const [planInfo, setPlanInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setLoading(true);
        setError(null);

        const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
        const token = bbsUserData?.token;

        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_API_URI}/user/qr`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });

        if (res.data?.qr && res.data?.info) {
          setQrUrl(res.data.qr);
          setPlanInfo(res.data.info);
        } else {
          setError("Invalid QR code response from server");
        }
      } catch (err) {
        console.error("Failed to fetch QR code:", err);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to load health card. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your health card...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger p-4 text-center m-3">
        <h5>⚠️ Unable to Load Health Card</h5>
        <p>{error}</p>
        <button
          className="btn btn-primary mt-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!qrUrl || !planInfo) {
    return (
      <div className="alert alert-warning p-4 text-center m-3">
        <p>No health card data available.</p>
      </div>
    );
  }

  return (
    <div className="text-center p-4">
      <h5>Your Digital Health Access Card</h5>
      <img src={qrUrl} alt="Health QR" style={{ width: "200px" }} />
      {planInfo && (
        <>
          <p className="mt-3">
            <strong>Plan:</strong> {planInfo.planName || "N/A"}
          </p>
          <p>
            <strong>Valid Until:</strong>{" "}
            {planInfo.endDate ? new Date(planInfo.endDate).toDateString() : "N/A"}
          </p>
          <p>
            <strong>Txn ID:</strong> {planInfo.transactionId || "N/A"}
          </p>
        </>
      )}
    </div>
  );
};

export default QRCodeDisplay;
