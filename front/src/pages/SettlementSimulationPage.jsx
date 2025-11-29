import React, { useEffect, useState } from "react";
import { generateSettlement, getSettlements } from "../services/settlementAPI";
import SettlementSimulationModal from "../components/SettlementSimulationModal";
import axios from "axios";

const SettlementSimulationPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalId, setHospitalId] = useState("");
  const [month, setMonth] = useState("");
  const [settlements, setSettlements] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const API = import.meta.env.VITE_API_URI;

  // Extract token from bbsUser
  const getAuthToken = () => {
    const bbsUser = JSON.parse(localStorage.getItem("bbsUser"));
    return bbsUser?.token || "";
  };
useEffect(() => {
  if (hospitalId) loadSettlements();
}, [hospitalId]);

  // Load hospitals for dropdown
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const token = getAuthToken();
        const res = await axios.get(`${API}/hospitals/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.success) {
          setHospitals(res.data.hospitals);
        }
      } catch (err) {
        console.error("Hospital Fetch Error:", err);
      }
    };
    fetchHospitals();
  }, []);

  // Load settlement history
  const loadSettlements = async () => {
    if (!hospitalId) return;

    console.log("Loading settlements for hospital:", hospitalId);
    const res = await getSettlements(hospitalId);

    if (res.success) {
      setSettlements(res.payouts);
    } else {
      console.log("Failed to load settlements:", res);
    }
  };
const formatMonth = (value) => {
  const d = new Date(value);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

  // Handle Generate Settlement
const handleGenerate = async () => {
  if (!hospitalId || !month) {
    alert("Please select hospital and month");
    return;
  }

  const formattedMonth = formatMonth(month); // <-- FIX

  const payload = {
    hospitalId,
    month: formattedMonth, // <-- FIX
  };

  const res = await generateSettlement(payload);

  if (res.success) {
    setModalData(res.data);
    setModalOpen(true);
    loadSettlements();
  } else {
    alert(res.message || "Something went wrong");
  }
};


  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Settlement Simulation</h3>

      <div className="card p-3 shadow-sm mb-4">
        <div className="row g-3">
          <div className="col-md-5">
            <label className="form-label fw-semibold">Select Hospital</label>
            <select
              className="form-control"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
            >
              <option value="">Choose...</option>
              {hospitals.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.clinicName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Select Month</label>
            <input
              type="month"
              className="form-control"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <div className="col-md-3 d-flex align-items-end">
            <button className="btn btn-primary w-100" onClick={handleGenerate}>
              Generate Settlement
            </button>
          </div>
        </div>
      </div>

      {/* Settlement History */}
      <div className="card p-3 shadow-sm">
        <h5 className="fw-bold">Settlement History</h5>
        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th>Month</th>
              <th>Total Visits</th>
              <th>Payout</th>
            </tr>
          </thead>

          <tbody>
            {settlements.length === 0 ? (
              <tr>
                <td colSpan={3}>No settlements available</td>
              </tr>
            ) : (
              settlements.map((s) => (
                <tr key={s._id}>
                  <td>{s.month}</td>
                  <td>{s.totalVisits}</td>
                  <td>₹{s.totalPayout}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <SettlementSimulationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
      />
    </div>
  );
};

export default SettlementSimulationPage;
