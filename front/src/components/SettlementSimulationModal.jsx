import React from "react";

const SettlementSimulationModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.4)" }}
    >
      <div className="modal-dialog modal-md modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">Settlement Result</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {data ? (
              <>
                <p>
                  <strong>Hospital:</strong> {data.hospitalName}
                </p>
                <p>
                  <strong>Month:</strong> {data.month}
                </p>
                <p>
                  <strong>Total Visits:</strong> {data.totalVisits}
                </p>
                <p>
                  <strong>Total Payout:</strong> ₹{data.totalPayout}
                </p>
              </>
            ) : (
              <p>No settlement data available</p>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementSimulationModal;
