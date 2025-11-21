import React, { useEffect, useState } from "react";
import { getHealthcareFilterOptions } from "../../services/healthPartnerAPI";

const HealthcareFilterBar = ({ onFilterChange, filters }) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [clinicTypes, setClinicTypes] = useState([]);
  const [partnerTypes, setPartnerTypes] = useState([]);
  const [hospitalTiers, setHospitalTiers] = useState([]);

  const [localFilters, setLocalFilters] = useState(
    filters || {
      search: "",
      state: "",
      district: "",
      city: "",
      clinicType: "",
      partnerType: "",
      hospitalTier: "",
    }
  );

  const loadOptions = async () => {
    try {
      const opts = await getHealthcareFilterOptions();
      setStates(opts.states || []);
      setDistricts(opts.districts || []);
      setCities(opts.cities || []);
      setClinicTypes(opts.clinicTypes || []);
      setPartnerTypes(opts.partnerTypes || []);
      setHospitalTiers(opts.hospitalTiers || []);
    } catch (err) {
      console.log("Filter option error:", err);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...localFilters, [name]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="filter-bar card p-3 mb-3">
      <div className="row">
        <div className="col-md-3">
          <label>Search by Hospital</label>
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="Search..."
            value={localFilters.search}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>State</label>
          <select
            name="state"
            className="form-control"
            value={localFilters.state}
            onChange={handleChange}
          >
            <option value="">All</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>District</label>
          <select
            name="district"
            className="form-control"
            value={localFilters.district}
            onChange={handleChange}
          >
            <option value="">All</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>City</label>
          <select
            name="city"
            className="form-control"
            value={localFilters.city}
            onChange={handleChange}
          >
            <option value="">All</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <label>Clinic Type</label>
          <select
            name="clinicType"
            className="form-control"
            value={localFilters.clinicType}
            onChange={handleChange}
          >
            <option value="">All</option>
            {clinicTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>Partner Type</label>
          <select
            name="partnerType"
            className="form-control"
            value={localFilters.partnerType}
            onChange={handleChange}
          >
            <option value="">All</option>
            {partnerTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label>Hospital Tier</label>
          <select
            name="hospitalTier"
            className="form-control"
            value={localFilters.hospitalTier}
            onChange={handleChange}
          >
            <option value="">All</option>
            {hospitalTiers.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HealthcareFilterBar;
