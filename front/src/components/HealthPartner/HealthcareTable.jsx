import React, { useEffect, useState } from "react";
import {
  getHealthcarePartners,
  updatePartnerStatus,
  deleteHealthcarePartner,
} from "../../services/healthPartnerAPI";

const HealthcareTable = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState(null);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const list = await getHealthcarePartners();
      setPartners(list);
    } catch (err) {
      console.log("Fetch partners error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updatePartnerStatus(id, status);
      loadPartners();
    } catch (err) {
      console.log("Status update error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this partner?"))
      return;
    try {
      await deleteHealthcarePartner(id);
      loadPartners();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const ViewModal = () => {
    if (!viewData) return null;

    return (
      <div className="modal-overlay" style={overlayStyle}>
        <div style={modalStyle}>
          <h4 className="mb-3">Healthcare Partner Details</h4>

          <div className="details-box">
            <strong>Hospital:</strong> {viewData.clinicName} <br />
            <strong>Partner Code:</strong> {viewData.partnerCode} <br />
            <strong>Type:</strong> {viewData.clinicType} <br />
            <strong>Location:</strong> {viewData.city}, {viewData.district},{" "}
            {viewData.state} <br />
            <strong>Phone:</strong> {viewData.phone} <br />
            <strong>Email:</strong> {viewData.email} <br />
            <strong>Services:</strong>{" "}
            {viewData.supportedServices?.slice(0, 10)?.join(", ")}… <br />
            <strong>Plan Tiers:</strong>{" "}
            {viewData.supportedPlanTiers?.join(", ")} <br />
            <strong>Status:</strong> {viewData.status}
          </div>

          <button
            className="btn btn-secondary w-100 mt-3"
            onClick={() => setViewData(null)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ViewModal />

      <div className="table-responsive mt-4">
        <table
          className="table table-hover table-bordered align-middle shadow-sm"
          style={{ borderRadius: "8px", overflow: "hidden" }}
        >
          <thead className="bg-dark text-white text-center">
            <tr>
              <th style={{ width: "60px" }}>S.No</th>
              <th style={{ minWidth: "180px" }}>Hospital Name</th>
              <th style={{ minWidth: "220px" }}>Partner Code</th>
              <th style={{ minWidth: "200px" }}>Location</th>
              <th style={{ width: "130px" }}>Clinic Type</th>
              <th style={{ width: "100px" }}>Status</th>
              <th style={{ width: "260px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {partners.map((p, index) => (
              <tr key={p._id} className="text-center">
                <td>{index + 1}</td>

                <td>{p.clinicName}</td>
                <td className="fw-semibold">{p.partnerCode}</td>

                <td>
                  {p.city}, {p.district}, {p.state}
                </td>

                <td>
                  <span className="badge bg-info text-dark">
                    {p.clinicType}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge px-3 py-2 ${
                      p.status === "approved"
                        ? "bg-success"
                        : p.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td style={{ whiteSpace: "nowrap" }}>
                  <div className="d-flex gap-2 justify-content-center align-items-center flex-nowrap">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setViewData(p)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleStatus(p._id, "approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-warning btn-sm text-white"
                      onClick={() => handleStatus(p._id, "rejected")}
                    >
                      Reject
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {partners.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-3">
                  No healthcare partners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HealthcareTable;

// ===============================
// Modal Inline Styles
// ===============================
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "650px",
  maxHeight: "85vh",
  overflowY: "auto",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
};
