import React, { useEffect, useState } from "react";

const HealthIDCard = () => {
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState("");

  const fetchHealthID = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem("bbsUser"));
      if (!stored || !stored.token) {
        setError("User not logged in");
        return;
      }

      const token = stored.token;

      const res = await fetch(`${import.meta.env.VITE_API_URI}/qr/my-health-id`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to fetch Health ID.");
        return;
      }

      setHealthData(data);
    } catch (err) {
      setError("Unable to fetch Health ID. Please try again.");
    }
  };

  useEffect(() => {
    fetchHealthID();
  }, []);

  return (
    <div className="health-card-container">
      <h2>My Health ID</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!error && !healthData && <p>Loading...</p>}

      {healthData && (
        <div className="health-card">
          <p>
            <strong>Name:</strong> {healthData.name}
          </p>
          <p>
            <strong>Health ID:</strong> {healthData.healthId}
          </p>

          {healthData.qrCode ? (
            <img
              src={healthData.qrCode}
              alt="Health QR Code"
              style={{ width: "200px", marginTop: "20px" }}
            />
          ) : (
            <p>QR not generated yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthIDCard;
