import React, { useEffect, useState } from "react";
import { getHealthcareFilterOptions } from "../../services/healthPartnerAPI";

const HealthcareFilterBar = ({ onFilterChange }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [clinicTypes, setClinicTypes] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    state: "",
    district: "",
    clinicType: "",
  });

  // ================================
  // Load filter options from backend
  // ================================
  const loadOptions = async () => {
    try {
      const opts = await getHealthcareFilterOptions();
      setStates(opts.states);
      setDistricts(opts.districts);
      setClinicTypes(opts.clinicTypes);
    } catch (err) {
      console.log("Filter option error:", err);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  // ================================
  // Change handler
  // ================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    // Send updated filters to parent (Healthcare.jsx)
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-bar card p-3 mb-3">
      {/* Search */}
      <div className="row">
        <div className="col-md-3">
          <label>Search by Hospital</label>
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="Search..."
            onChange={handleChange}
          />
        </div>

        {/* State Filter */}
        <div className="col-md-3">
          <label>State</label>
          <select name="state" className="form-control" onChange={handleChange}>
            <option value="">All</option>
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div className="col-md-3">
          <label>District</label>
          <select
            name="district"
            className="form-control"
            onChange={handleChange}
          >
            <option value="">All</option>
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Clinic Type Filter */}
        <div className="col-md-3">
          <label>Clinic Type</label>
          <select
            name="clinicType"
            className="form-control"
            onChange={handleChange}
          >
            <option value="">All</option>
            {clinicTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HealthcareFilterBar;
