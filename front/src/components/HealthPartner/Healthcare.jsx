import React, { useState } from "react";
import AddHealthcareModal from "./AddHealthcareModal";
import HealthcareTable from "./HealthcareTable";
import HealthcareFilterBar from "./HealthcareFilterBar";

const Healthcare = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Filters coming from FilterBar
  const [filters, setFilters] = useState({
    search: "",
    state: "",
    district: "",
    clinicType: "",
  });

  // Reload trigger
  const [refresh, setRefresh] = useState(false);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
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
      <HealthcareFilterBar onFilterChange={handleFilter} />

      {/* Healthcare Table */}
      <HealthcareTable filters={filters} refresh={refresh} />

      {/* Modal */}
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
