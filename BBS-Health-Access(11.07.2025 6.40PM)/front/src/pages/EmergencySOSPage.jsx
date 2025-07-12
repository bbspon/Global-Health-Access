import React, { useState } from "react";
import axios from "axios";

const EmergencySOSPage = () => {
  const [result, setResult] = useState(null);

  const triggerSOS = async () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const res = await axios.post("/api/emergency/trigger", {
        lat,
        lng,
        address: "User's current location",
      });

      setResult(res.data);
    });
  };

  return (
    <div className="container py-5 text-center">
      <h4>Emergency SOS</h4>
      <button className="btn btn-danger btn-lg mt-4" onClick={triggerSOS}>
        Trigger SOS
      </button>

      {result && result.hospital && (
        <div className="alert alert-warning mt-4">
          <h5>Nearest Hospital: {result.hospital.name}</h5>
          <p>
            Phone:{" "}
            <a href={`tel:${result.hospital.phone}`}>{result.hospital.phone}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default EmergencySOSPage;
