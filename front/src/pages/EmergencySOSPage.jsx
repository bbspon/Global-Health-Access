import React, { useState } from "react";
import axios from "axios";

const EmergencySOSPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const triggerSOS = async () => {
  setLoading(true);
  setError("");
  setResult(null);

  if (!navigator.geolocation) {
    setLoading(false);
    return setError("Geolocation is not supported in this browser.");
  }

  const bbsUserData = JSON.parse(localStorage.getItem("bbsUser"));
  const token = bbsUserData?.token;
  if (!token) {
    setLoading(false);
    return setError("User not authenticated. Please log in.");
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const response = await axios.post(
          `${import.meta.env.VITE_API_URI}/emergency/trigger`,
          {
            lat,
            lng,
            address: "User's current location",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResult(response.data);
      } catch (err) {
        console.error("SOS Trigger Error:", err);
        setError("Failed to trigger SOS. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    (geoErr) => {
      console.error("Geolocation Error:", geoErr);
      setError("Unable to access your location. Please enable GPS.");
      setLoading(false);
    }
  );
};


  return (
    <div className="container py-5 text-center">
      <h4>🚨 Emergency SOS</h4>
      <button
        className="btn btn-danger btn-lg mt-4"
        onClick={triggerSOS}
        disabled={loading}
      >
        {loading ? "Sending SOS..." : "Trigger SOS"}
      </button>

      {error && <div className="alert alert-danger mt-4">{error}</div>}

      {result?.hospital ? (
        <div className="alert alert-warning mt-4">
          <h5>🏥 Nearest Hospital: {result.hospital.name}</h5>
          <p>
            📞 Phone:{" "}
            <a href={`tel:${result.hospital.phone}`}>{result.hospital.phone}</a>
          </p>
        </div>
      ) : result && !result.hospital ? (
        <div className="alert alert-info mt-4">
          No nearby hospital found. Try again in a different location.
        </div>
      ) : null}
    </div>
  );
};

export default EmergencySOSPage;
