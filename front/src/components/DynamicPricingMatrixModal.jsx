import React, { useEffect, useState } from "react";
import { getPricingMatrix } from "../services/pricingAPI";

const DynamicPricingMatrixModal = ({ show, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [matrix, setMatrix] = useState(null);

  useEffect(() => {
    if (show) fetchMatrix();
  }, [show]);

  const fetchMatrix = async () => {
    try {
      setLoading(true);

      const res = await getPricingMatrix();

      if (res?.success && res?.matrix) {
        setMatrix(res.matrix);
      } else {
        console.error("Invalid matrix response:", res);
        setMatrix({});
      }
    } catch (error) {
      console.error("Pricing Matrix Load Error:", error);
      setMatrix({});
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(matrix, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pricing-matrix.json";
    a.click();
  };

  if (!show) return null;

  const safeEntries = (obj) => {
    if (!obj || typeof obj !== "object") return [];
    return Object.entries(obj);
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="fw-bold">Pricing Matrix (Reference Data)</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {loading && <p>Loading matrix...</p>}

            {!loading && !matrix && (
              <p className="text-danger">Unable to load pricing matrix.</p>
            )}

            {matrix && !loading && (
              <>
                <button
                  className="btn btn-sm btn-outline-primary mb-3"
                  onClick={downloadJSON}
                >
                  Download JSON
                </button>

                {/* AGE RISK */}
                <h5 className="mt-4">Age Risk Table</h5>
                {safeEntries(matrix.ageRiskTable).length > 0 ? (
                  <table className="table table-bordered">
                    <tbody>
                      {safeEntries(matrix.ageRiskTable).map(([age, val]) => (
                        <tr key={age}>
                          <td>{age}</td>
                          <td>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No Age Risk data found.</p>
                )}

                {/* CITY COST INDEX */}
                <h5 className="mt-4">City Cost Index</h5>
                {safeEntries(matrix.cityCostIndex).length > 0 ? (
                  <table className="table table-bordered">
                    <tbody>
                      {safeEntries(matrix.cityCostIndex).map(([city, val]) => (
                        <tr key={city}>
                          <td>{city}</td>
                          <td>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No City Cost Index data found.</p>
                )}

                {/* TIER MULTIPLIERS */}
                <h5 className="mt-4">Tier Multipliers</h5>
                {safeEntries(matrix.tierMultipliers).length > 0 ? (
                  <table className="table table-bordered">
                    <tbody>
                      {safeEntries(matrix.tierMultipliers).map(
                        ([tier, val]) => (
                          <tr key={tier}>
                            <td>{tier}</td>
                            <td>
                              {typeof val === "object"
                                ? JSON.stringify(val, null, 2)
                                : val}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p>No Tier Multipliers data found.</p>
                )}

                {/* ADDON PRICING */}
                <h5 className="mt-4">Add-on Pricing</h5>
                {safeEntries(matrix.addonPricing).length > 0 ? (
                  <table className="table table-bordered">
                    <tbody>
                      {safeEntries(matrix.addonPricing).map(([addon, obj]) => (
                        <tr key={addon}>
                          <td>{addon}</td>
                          <td>{obj?.type || "-"}</td>
                          <td>
                            {obj?.type === "flat"
                              ? `₹${obj?.price || 0}`
                              : `${(obj?.load || 0) * 100}%`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No Add-on pricing data found.</p>
                )}

                {/* PLAN STRUCTURE */}
                <h5 className="mt-4">Plan Structure</h5>
                {matrix.planStructure ? (
                  <pre className="bg-light p-3 rounded">
                    {JSON.stringify(matrix.planStructure, null, 2)}
                  </pre>
                ) : (
                  <p>No plan structure found.</p>
                )}
              </>
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

export default DynamicPricingMatrixModal;
