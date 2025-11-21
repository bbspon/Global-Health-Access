import React, { useState } from "react";
import AddHealthcareModal from "./AddHealthcareModal";
import HealthcareTable from "./HealthcareTable";
import HealthcareFilterBar from "./HealthcareFilterBar";

const Healthcare = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Filters (FULL LIST)
  const [filters, setFilters] = useState({
    search: "",
    state: "",
    district: "",
    city: "",
    clinicType: "",
    partnerType: "",
    hospitalTier: "",
  });

  const [refresh, setRefresh] = useState(false);

  const handleFilter = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Healthcare Partners</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          + Add Partner
        </button>
      </div>

      {/* Filter Bar */}
      <HealthcareFilterBar onFilterChange={handleFilter} filters={filters} />

      {/* Table */}
      <HealthcareTable filters={filters} refresh={refresh} />

      {/* Add Partner Modal */}
      {showAddModal && (
        <AddHealthcareModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default Healthcare;
