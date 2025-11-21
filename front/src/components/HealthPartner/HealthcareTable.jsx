import React, { useEffect, useState } from "react";
import {
  getHealthcarePartners,
  updatePartnerStatus,
  deleteHealthcarePartner,
} from "../../services/healthPartnerAPI";

const HealthcareTable = ({ filters, refresh }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 20;
  const [total, setTotal] = useState(0);

  const loadPartners = async () => {
    try {
      setLoading(true);

      const query = {
        page,
        limit,
        ...filters,
      };

      const list = await getHealthcarePartners(query.page, query.limit, query);

      // FIXED: Backend returns { success, partners: [...] }
      if (list && Array.isArray(list.partners)) {
        setPartners(list.partners);
        setTotal(list.partners.length); // No total field → use length
      } else {
        setPartners([]);
        setTotal(0);
      }
    } catch (err) {
      console.log("Fetch partners error:", err);
      setPartners([]);
      setTotal(0);
    }
    setLoading(false);
  };

  // Reload table when filters, refresh, or page changes
  useEffect(() => {
    loadPartners();
  }, [page, refresh, filters]);

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
            <strong>Partner Type:</strong> {viewData.partnerType || "N/A"}{" "}
            <br />
            <strong>Clinic Type:</strong> {viewData.clinicType || "N/A"} <br />
            <strong>Location:</strong> {viewData.city}, {viewData.district},{" "}
            {viewData.state} <br />
            <strong>Phone:</strong> {viewData.phone} <br />
            <strong>Email:</strong> {viewData.email} <br />
            <strong>Departments:</strong>{" "}
            {viewData.departments?.length
              ? viewData.departments.join(", ")
              : "N/A"}{" "}
            <br />
            <strong>Hospital Tier:</strong> {viewData.tier || "N/A"} <br />
            <strong>Add Ons:</strong>{" "}
            {viewData.addOns?.length ? viewData.addOns.join(", ") : "None"}{" "}
            <br />
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
              <th style={{ width: "130px" }}>Partner Type</th>
              <th style={{ width: "130px" }}>Tier</th>
              <th style={{ width: "100px" }}>Status</th>
              <th style={{ width: "260px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {partners.map((p, index) => (
              <tr key={p._id} className="text-center">
                <td>{(page - 1) * limit + index + 1}</td>

                <td>{p.clinicName}</td>

                <td className="fw-semibold">{p.partnerCode}</td>

                <td>
                  {p.city}, {p.district}, {p.state}
                </td>

                <td>
                  <span className="badge bg-info text-dark">
                    {p.partnerType || "N/A"}
                  </span>
                </td>

                <td>
                  <span className="badge bg-primary text-white">
                    {p.tier || "N/A"}
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
                <td colSpan="8" className="text-center py-3">
                  No healthcare partners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-outline-primary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <button
            className="btn btn-outline-primary"
            disabled={page * limit >= total}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
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
